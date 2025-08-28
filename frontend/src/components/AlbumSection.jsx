// src/components/AlbumSection.jsx
import React, { useState, useEffect, useRef } from "react";
import Modal from "../modal/GalleryModal";
import "../style/global.css";

/** 화면에 들어오면 단 한 번만 실제 src로 치환 */
function LazyImage({ src, alt = "", rootRef }) {
  const IMG_PLACEHOLDER =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; // 1x1 투명
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false); // 실제 src로 교체했는지

  useEffect(() => {
    const el = imgRef.current;
    const root = rootRef?.current || null;
    if (!el || loaded == null) return;

    // 이미 교체됐다면 관찰 안 함
    if (loaded) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 실제 src로 한 번만 교체
            el.src = src;
            setLoaded(true);
            io.unobserve(el); // 이 이미지에 대한 관찰만 해제
          }
        });
      },
      { root, rootMargin: "200px", threshold: 0.01 }
    );

    io.observe(el);
    return () => io.unobserve(el);
  }, [src, loaded, rootRef]);

  return (
    <img
      ref={imgRef}
      src={IMG_PLACEHOLDER}   // 초기에 절대 undefined로 두지 않음
      alt={alt}
      draggable="false"
      // 렌더링만 하고, 로딩 타이밍은 IO가 관리 → loading="lazy" 사용 안 함
      style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", objectPosition: "center" }}
    />
  );
}

export default function AlbumSection({ images = [], title }) {
  const [openIndex, setOpenIndex] = useState(null);
  const stripRef = useRef(null); // 가로 스크롤 컨테이너

  // 모달 시 바디 스크롤 잠금
  useEffect(() => {
    if (openIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [openIndex]);

  // 데스크톱: 마우스 드래그로 가로 스크롤
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let isDown = false, startX = 0, startScroll = 0;

    const onDown = (e) => {
      isDown = true;
      el.classList.add("is-dragging");
      startX = e.pageX;
      startScroll = el.scrollLeft;
    };
    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      el.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      isDown = false;
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

      {/* ✅ 하나의 가로 스크롤 컨테이너만 사용 */}
      <div ref={stripRef} className="album-scroll">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            className="album-tile"
            onClick={() => setOpenIndex(i)}
            aria-label={`photo ${i + 1}`}
          >
            <LazyImage src={src} alt="" rootRef={stripRef} />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Modal onClose={() => setOpenIndex(null)}>
          <img src={images[openIndex]} alt="" className="modal-img" loading="eager" />
        </Modal>
      )}
    </section>
  );
}
