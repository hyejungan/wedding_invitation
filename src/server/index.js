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
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? "*"
  })
);
app.use(morgan("dev"));

/** 유틸 */
const sanitize = (s, max = 200) =>
  String(s ?? "").replace(/\s+/g, " ").trim().slice(0, max);

/** health */
app.get("/health", (_req, res) => res.json({ ok: true }));

/** 메시지 목록 (페이지네이션) */
app.get("/api/messages", async (req, res) => {
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
});

/** 메시지 작성 */
app.post("/api/messages", async (req, res) => {
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
  const [rows] = await pool.query(
    `SELECT id, name, content, created_at FROM messages WHERE id=?`,
    [r.insertId]
  );
  res.status(201).json(rows[0]);
});

/** 메시지 삭제 (비번 검증) */
app.delete("/api/messages/:id", async (req, res) => {
  const id = Number(req.params.id);
  const password = String(req.body?.password ?? "");
  const [[row]] = await pool.query(`SELECT id, password_hash FROM messages WHERE id=?`, [id]);
  if (!row) return res.status(404).json({ error: "not_found" });

  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) return res.status(403).json({ error: "wrong_password" });

  await pool.query(`UPDATE messages SET deleted_at = NOW() WHERE id = ?`, [id]);
  res.json({ ok: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
