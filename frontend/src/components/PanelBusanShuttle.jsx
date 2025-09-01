import React from "react";

export default function PanelBusanShuttle({ labels = {}, data = {} }) {
  if (!data || Object.keys(data).length === 0) {
    return <div className="tt-page-inner tt-empty">준비 중입니다.</div>;
  }

  const { pickup, timetable = [], note } = data;
  const times = Array.isArray(timetable)
    ? timetable
    : String(timetable ?? "")
        .split(/[,/ ]+/)
        .filter(Boolean);

  return (
    <div className="tt-page-inner">
        <header className="shuttle-head">
          <p className="small">🚐 부산역 셔틀</p>
        </header>

        <div >
          <p className="shuttle-value" >- {labels.pickupLabel} : {pickup}</p>
          <p className="shuttle-value" >- {labels.timetableLabel} : {times}</p>
        </div>
        {note && <div className="shuttle-note">※ {note}</div>}
    </div>
  );
}
