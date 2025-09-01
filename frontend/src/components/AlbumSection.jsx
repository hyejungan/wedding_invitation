import React, { useEffect, useState, useRef } from "react";
import Modal from "../modal/GalleryModal";
import SwipeHint from "./SwipeHint";
import "../style/global.css";
import "../style/swipe-hint.css"; 
import handSVG from "../assets/hand-rtl.svg";

const getSrc = (item, kind = "tile") => {
  if (typeof item === "string") return item;
  if (kind === "modal") return item.large || item.src || item.small;
  return item.small || item.src || item.large;
};

export default function AlbumSection({
  images = [],
  title,
  horizontal = true,
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (openIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [openIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let down = false,
      sx = 0,
      base = 0;
    const onDown = (e) => {
      down = true;
      el.classList.add("is-dragging");
      sx = e.pageX;
      base = el.scrollLeft;
    };
    const onMove = (e) => {
      if (!down) return;
      e.preventDefault();
      el.scrollLeft = base - (e.pageX - sx);
    };
    const onUp = () => {
      down = false;
      el.classList.remove("is-dragging");
    };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <section className="album-section">
      <h1 className="album-title center">{title}</h1>
      <div className="album-box">
        <div
          ref={scrollRef}
          className={horizontal ? "album-scroll" : "album-grid"}
        >
          {images.map((it, i) => {
            const src = getSrc(it, "tile");
            const priority = i === 0; // 첫 타일만 우선
            return (
              <button
                key={typeof it === "string" ? `${i}-${src}` : i}
                type="button"
                className="album-tile"
                onClick={() => setOpenIndex(i)}
                aria-label={`photo ${i + 1}`}
              >
                <img
                  src={src}
                  alt=""
                  width={420}
                  height={420}
                  loading={priority ? "eager" : "lazy"}
                  decoding="async"
                  fetchpriority={priority ? "high" : "low"}
                  style={{ display: "block" }}
                />
              </button>
            );
          })}
        </div>
        <SwipeHint
          targetRef={scrollRef}
          storageKey="hint:album"
          text="왼쪽으로 움직여주세요"
          handSrc={handSVG} 
        />
      </div>

      {openIndex !== null && (
        <Modal
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((i) => (i - 1 + images.length) % images.length)
          }
          onNext={() => setOpenIndex((i) => (i + 1) % images.length)}
        >
          <img
            src={getSrc(images[openIndex], "modal")}
            alt=""
            className="modal-img"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </Modal>
      )}
    </section>
  );
}
