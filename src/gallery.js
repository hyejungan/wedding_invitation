import React, { useEffect, useMemo, useRef, useState } from "react";

export default function WeddingGallery({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const overlayRef = useRef(null);

  const open = (idx) => setLightboxIndex(idx);
  const close = () => setLightboxIndex(null);
  const show = (dir) => {
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + dir + images.length) % images.length;
    setLightboxIndex(next);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const ratios = useMemo(() =>
    images.map((img) => (img.w && img.h ? img.h / img.w : 3 / 4)),
  [images]);

  return (
    <div className="wg-wrap">
      <div className="wg-grid" aria-label="사진 갤러리">
        {images.map((img, i) => (
          <figure key={i} className="wg-item" style={{ breakInside: "avoid" }}>
            <button
              className="wg-thumb"
              style={{ aspectRatio: `${1 / ratios[i]}` }}
              onClick={() => open(i)}
              aria-label={(img.alt ?? "사진") + " 확대"}
            >
              <img
                src={img.src}
                alt={img.alt ?? "photo"}
                loading="lazy"
                decoding="async"
              />
            </button>
            {img.alt && <figcaption className="wg-cap">{img.alt}</figcaption>}
          </figure>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="wg-overlay"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          onClick={(e) => { if (e.target === overlayRef.current) close(); }}
          onTouchStart={(e) => setTouchStart(e.changedTouches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStart === null) return;
            const dx = e.changedTouches[0].clientX - touchStart;
            if (dx > 50) show(-1);
            else if (dx < -50) show(1);
            setTouchStart(null);
          }}
        >
          <button className="wg-close" onClick={close} aria-label="닫기">×</button>
          <button className="wg-nav prev" onClick={() => show(-1)} aria-label="이전">‹</button>
          <button className="wg-nav next" onClick={() => show(1)} aria-label="다음">›</button>

          <img className="wg-full" src={images[lightboxIndex].src} alt={images[lightboxIndex].alt ?? "photo"} />
          {images[lightboxIndex].alt && (
            <div className="wg-full-cap">{images[lightboxIndex].alt}</div>
          )}
        </div>
      )}
    </div>
  );
}
