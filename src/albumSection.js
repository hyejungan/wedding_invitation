import React, { useState, useEffect } from "react";
import Modal from "./modal/galleryModal";
import "./style/global.css";

export default function AlbumSection({
  images = [],
  title,
  horizontal = true,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  // 모달 열렸을 때 바디 스크롤 잠금
  useEffect(() => {
    if (openIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [openIndex]);

  return (
    <section className="album-section">
      <h1 className="album-title center">{title}</h1>

      <div className={horizontal ? "album-scroll" : "album-grid"}>
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            className="album-tile"
            onClick={() => setOpenIndex(i)}
            aria-label={`photo ${i + 1}`}
          >
            <img loading="lazy" src={src} alt="" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Modal onClose={() => setOpenIndex(null)}>
          <img
            src={images[openIndex]}
            alt=""
            className="modal-img"
            loading="eager"
          />
        </Modal>
      )}
    </section>
  );
}
