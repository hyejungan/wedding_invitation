import React from "react";
import SectionTitle from "./SectionTitle";

export default function PanelCharter({ labels, data }) {
  if (!data || Object.keys(data).length === 0) {
    return <div className="tt-page-inner tt-empty">준비 중입니다.</div>;
  }
  const { contact, cities = [] } = data;
  return (
    <div className="tt-page-inner">
      <SectionTitle>{labels.tabCharter}</SectionTitle>
      {contact && <div className="tt-paragraph">{labels.contactLabel}: <strong>{contact}</strong></div>}
      <ul className="tt-city-list">
        {cities.map((c) => (
          <li key={c.name} className="tt-city-row">
            <div className="tt-city-name">{c.name}</div>
            <div className="tt-city-meta">
              <div>집결: <strong>{c.pickup}</strong></div>
              <div>출발: <strong>{c.time}</strong></div>
              {c.note && <div className="tt-muted">({c.note})</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
