import React, { useState } from "react";
import "../style/global.css";

export default function AccordionSection({ items }) {
  const [openKey, setOpenKey] = useState(null);
  const toggle = (key) => setOpenKey((k) => (k === key ? null : key));

  return (
    <div className="accordion">
      {items.map(({ key, title, content }) => (
        <div key={key}>
          <button
            className="acc-header"
            type="button"
            onClick={() => toggle(key)}
            aria-expanded={openKey === key}
          >
            {title}
            <span className={`chev ${openKey === key ? "open" : ""}`}>⌄</span>
          </button>
          {openKey === key && (
            <div className="acc-panel">
              <div className="acc-text">{content}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
