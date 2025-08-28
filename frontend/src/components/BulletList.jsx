import React from "react";
export default function BulletList({ items = [], dotColor = "#6e7c21" }) {
  return (
    <ul className="tt-bullets">
      {items.map((t, i) => (
        <li key={i} className="tt-bullet">
          <span className="tt-bullet-text">- {t}</span>
        </li>
      ))}
      <span className="small">💡 75광장 하차</span>
    </ul>
  );
}
