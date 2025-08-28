import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcryptjs";
import { pool } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json({ limit: "20kb" }));

const allowList = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // origin == undefined 는 curl/서버사이드/헬스체크 같은 경우 허용
    if (!origin || allowList.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS: " + origin));
  },
  credentials: false
}));

// 프리플라이트(OPTIONS)도 확실히 통과
app.options("*", cors());
const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/** 유틸 */
const sanitize = (s, max = 200) =>
  String(s ?? "").replace(/\s+/g, " ").trim().slice(0, max);

/** health */
app.get("/health", (_req, res) => res.json({ ok: true }));

/** 메시지 목록 (페이지네이션) */
app.get("/api/messages", ah(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || "100", 10), 200);
  const offset = Math.max(parseInt(req.query.offset || "0", 10), 0);
  const [rows] = await pool.query(
    `SELECT id, name, content, created_at 
     FROM messages 
     WHERE deleted_at IS NULL
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  res.json({ items: rows });
}));

/** 메시지 작성 */
app.post("/api/messages", ah(async (req, res) => {
  const name = sanitize(req.body.name, 40);
  const content = sanitize(req.body.content, 200);
  const password = String(req.body.password ?? "");
  if (!name || !content || !password) {
    return res.status(400).json({ error: "name, content, password 필요" });
  }
  if (content.length > 200) {
    return res.status(400).json({ error: "200자 이하로 작성해 주세요." });
  }
  const hash = await bcrypt.hash(password, 10);
  const [r] = await pool.query(
    `INSERT INTO messages (name, content, password_hash) VALUES (?,?,?)`,
    [name, content, hash]
  );
  const [[row]] = await pool.query(
    `SELECT id, name, content, created_at FROM messages WHERE id=?`,
    [r.insertId]
  );
  res.status(201).json(row);
}));

/** 삭제 */
app.delete("/api/messages/:id", ah(async (req, res) => {
  const id = Number(req.params.id);
  const password = String(req.body?.password ?? "");
  const [[row]] = await pool.query(`SELECT id, password_hash FROM messages WHERE id=?`, [id]);
  if (!row) return res.status(404).json({ error: "not_found" });
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) return res.status(403).json({ error: "wrong_password" });
  await pool.query(`UPDATE messages SET deleted_at = NOW() WHERE id = ?`, [id]);
  res.json({ ok: true });
}));

// 디버그: DB 핑
app.get("/debug/db", ah(async (_req, res) => {
  const [[r]] = await pool.query("SELECT 1 AS ok");
  res.json({ db: r.ok === 1 ? "up" : "unknown", host: process.env.DB_HOST, dbname: process.env.DB_NAME });
}));

// 글로벌 에러 미들웨어(맨 마지막)
app.use((err, req, res, _next) => {
  console.error("ERROR:", err);
  if (!res.headersSent) {
    res.status(500).json({
      error: "server_error",
      detail: process.env.NODE_ENV === "production" ? undefined : String(err?.message || err)
    });
  }
});

process.on("uncaughtException", e => console.error("UNCAUGHT", e?.stack || e));
process.on("unhandledRejection", e => console.error("UNHANDLED", e?.stack || e));
console.log("Booting API", {
  cwd: process.cwd(),
  node: process.version,
  env: { PORT: process.env.PORT, DB_HOST: process.env.DB_HOST, DB_NAME: process.env.DB_NAME }
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, "0.0.0.0", () => console.log(`API on http://localhost:${port}`));