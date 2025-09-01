import React from "react";

export default function NoticeBox({ title, line }) {
  const lines = Array.isArray(line) ? line : String(line ?? "").split("\n");

  return (
    <div>
      <h3 className="notice-title">{title}</h3>
      {lines.map((t, i) => (
        <p className="notice-text" key={i}>{t}</p>
      ))}
    </div>
  );
}
