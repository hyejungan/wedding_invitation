// src/c.js
const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "assets");
const outPath = path.join(__dirname, 'const', "albumPhotos.js");
const exts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

const files = fs.readdirSync(assetsDir)
  .filter((f) => exts.includes(path.extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

// import 라인 만들기
const imports = files
  .map((f, i) => `import img${i} from "../assets/${f}";`)
  .join("\n");

const arr = `const albumPhotos = [\n${files
  .map((_, i) => `  img${i}`)
  .join(",\n")}\n];\n\nexport default albumPhotos;\n`;

fs.writeFileSync(outPath, `${imports}\n\n${arr}`, "utf8");
console.log(`✅ albumPhotos.js 생성 완료! (${files.length}개)`);
