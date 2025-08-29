// src/modal/GalleryModal.jsx
import React, { useEffect, useRef } from "react";
import '../style/global.css'

export default function GalleryModal({ onClose, onPrev, onNext, children }) {
  const startX = useRef(null);

  // 키보드: ESC / ← / →
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  // 포인터 드래그(마우스/터치 통합)
  const onPointerDown = (e) => {
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? null;
  };
  const onPointerUp = (e) => {
    const x = e.clientX ?? e.changedTouches?.[0]?.clientX ?? null;
    if (startX.current == null || x == null) return;
    const dx = x - startX.current;
    if (Math.abs(dx) > 40) dx > 0 ? onPrev?.() : onNext?.();
    startX.current = null;
  };

  return (
    <div
      className="gallery-modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="gallery-modal-sheet"
        onClick={(e) => e.stopPropagation()} // 내부 클릭은 닫기 방지
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        {/* 닫기: 우상단(ESC) */}
        <button
          type="button"
          className="gallery-modal-close"
          onClick={(e) => { e.stopPropagation(); onClose?.(); }}
          aria-label="닫기 (ESC)"
        >
          ✕
        </button>

        {/* 양쪽 히트존(보이지 않음) */}
        <button
          type="button"
          className="modal-hit modal-hit-left"
          onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
          aria-label="이전"
        />
        <button
          type="button"
          className="modal-hit modal-hit-right"
          onClick={(e) => { e.stopPropagation(); onNext?.(); }}
          aria-label="다음"
        />

        {/* 이미지 */}
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
}
