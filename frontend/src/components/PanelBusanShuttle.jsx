import React from "react";

/* 원형 배지 안 버스 아이콘 (currentColor) */
const BusIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
    <path
      fill="currentColor"
      d="M7 3h10a3 3 0 013 3v10a2 2 0 01-2 2v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2H9v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2a2 2 0 01-2-2V6a3 3 0 013-3zm10 2H7a1 1 0 00-1 1v5h12V6a1 1 0 00-1-1zM6 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm12 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
    />
  </svg>
);

export default function PanelBusanShuttle({ labels = {}, data = {} }) {
  if (!data || Object.keys(data).length === 0) {
    return <div className="tt-page-inner tt-empty">준비 중입니다.</div>;
  }

  const { pickup, linesText, timetable = [], note } = data;
  const times = Array.isArray(timetable)
    ? timetable
    : String(timetable ?? "")
        .split(/[,/ ]+/)
        .filter(Boolean);

  return (
    <div className="tt-page-inner">
      <div className="shuttle-card">
        <header className="shuttle-head">
          <span className="shuttle-badge">
            <BusIcon />
          </span>
          <div className="shuttle-headtext">
            <div className="shuttle-caption">BUSAN STATION SHUTTLE</div>
            <h3>부산역 셔틀</h3>
          </div>
        </header>

        <div className="shuttle-row">
          <div className="shuttle-label">{labels.pickupLabel}</div>
          <div className="shuttle-value">
            <p className="shuttle-pickup">{pickup}</p>
          </div>
        </div>

        <div className="shuttle-row">
          <div className="shuttle-label">{labels.timetableLabel}</div>
          <div className="shuttle-value">
            <p className="shuttle-pickup">{times}</p>
          </div>
        </div>

        {note && <div className="shuttle-note">※ {note}</div>}
      </div>
    </div>
  );
}
