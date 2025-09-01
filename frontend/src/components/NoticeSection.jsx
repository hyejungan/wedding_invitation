import React from "react";
import NoticeBox from "./NoticeBox";
import "../style/notice.css";

export default function NoticeSection({ slides = [], heading = "NOTICE" }) {
  return (
    <section className="notice-section">
      <h1 className="notice-heading">{heading}</h1>

      <div className="notice-items">
        {slides.map((s, i) => (
          <NoticeBox key={i} title={s.title} line={s.body} />
        ))}
      </div>
    </section>
  );
}
