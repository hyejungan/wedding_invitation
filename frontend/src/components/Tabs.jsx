import React from "react";

export default function Tabs({ items, activeId, onChange }) {
  return (
    <nav className="tt-nav" role="tablist" aria-label="오시는 길 안내">
      {items.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={activeId === t.id}
          className={`tt-tab ${activeId === t.id ? "is-active" : ""}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
