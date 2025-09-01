import React from "react";
import SectionTitle from "./SectionTitle";
import "../style/panel-charter.css";

export default function PanelCharter({
  labels,
  data,
}) {
  const routes = data?.routes ?? [];
  if (!routes.length) {
    return <div className="tt-page-inner tt-empty">준비 중입니다.</div>;
  }

  return (
    <div className="tt-page-inner">
      <SectionTitle>{labels.tapCharter}</SectionTitle>

      <ul className="charter-list">
        {routes.map((r, i) => (
          <li className="charter-row" key={`${r.title}-${i}`}>
            {/* 왼쪽: 하트 + 타이틀 */}
            <div className="charter-left">
              <span className="heart" aria-hidden="true">
                {/* 고정색 채움 하트 (SVG) */}
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path
                    d="M12 21s-6.2-4.6-8.7-7.1C.8 11 .8 6.8 3.6 4.7 5.9 3 8.7 3.7 10 5.4c1.3-1.7 4.1-2.4 6.4-.7 2.8 2.1 2.8 6.3.3 9.2C18.2 16.4 12 21 12 21z"
                    fill="#f2c7cf"
                  />
                </svg>
              </span>
              <span className="title">{r.title}</span>
            </div>

            {/* 오른쪽: 장소 · 시간 */}
            <div className="charter-right small">
              <span className="time">{r.time}</span>
              <span className="location">{r.location}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
