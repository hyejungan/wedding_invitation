import React, { useEffect, useMemo, useRef, useState } from "react";
import "../style/info-carousel.css";

export default function InfoCarousel({
  slides = [],
  loop = true,
  aspect = 9 / 4,
  swipeThreshold = 0.15,
  transitionMs = 380,
}) {
  const [idx, setIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [anim, setAnim] = useState(true);

  const shellRef = useRef(null);
  const boxRef = useRef(null);
  const startRef = useRef({ x: 0, y: 0 });
  const preventScrollRef = useRef(false);

  const count = slides.length;
  const safe = (n) => (loop ? (n + count) % count : Math.max(0, Math.min(count - 1, n)));
  const goTo = (n) => { setAnim(true); setIdx(safe(n)); setDragX(0); };
  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  // 키보드 좌우 이동
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, count, loop]);

  // 트랙패드 수평 휠
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        e.deltaX > 0 ? next() : prev();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [idx]);

  // 드래그(터치/마우스)
  const onPointerDown = (e) => {
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    startRef.current = { x, y };
    preventScrollRef.current = false;
    setDragging(true);
    setAnim(false);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const dx = x - startRef.current.x;
    const dy = y - startRef.current.y;

    if (!preventScrollRef.current) {
      if (Math.abs(dy) > Math.abs(dx)) {
        // 세로 스크롤 의도 → 드래그 취소
        setDragging(false); setAnim(true); setDragX(0); return;
      }
      preventScrollRef.current = true;
    }
    e.preventDefault();
    setDragX(dx);
  };
  const onPointerUp = () => {
    if (!dragging) return;
    const width = boxRef.current?.clientWidth || 1;
    const ratio = Math.abs(dragX) / width;
    setDragging(false); setAnim(true);
    if (ratio > swipeThreshold) (dragX < 0 ? next() : prev());
    else setDragX(0);
  };

  // 트랙 transform
  const trackStyle = useMemo(() => {
    const base = -idx * 100;
    const width = boxRef.current?.clientWidth || 1;
    const dragPct = (dragX / width) * 100;
    return {
      transform: `translate3d(${base + dragPct}%,0,0)`,
      transition: anim ? `transform ${transitionMs}ms ease` : "none",
    };
  }, [idx, dragX, anim, transitionMs]);

  return (
    <>
      <header>
        <h1 className="center">NOTICE</h1>
      </header>
      <div className="info-shell" ref={shellRef} style={{ "--aspect": aspect }}>
        {/* 비율 고정 슬라이더 */}
        <div
          className="info-carousel"
          ref={boxRef}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseLeave={onPointerUp}
          onMouseUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          role="region"
          aria-label="안내 배너"
        >
          <div className="info-viewport">
            <div className="info-track" style={trackStyle}>
              {slides.map((s, i) => (
                <article className="info-slide" key={i} aria-hidden={i !== idx}>
                  <div className="info-card">
                    {s.imgSrc ? (
                      <div className="info-hero">
                        <img src={s.imgSrc} alt="" />
                      </div>
                    ) : null}
                    <div className="info-body">
                      {s.title ? <h3 className="info-title">{s.title}</h3> : null}
                      {s.body?.split("\n").map((line, k) => (
                        <p key={k} className="info-text">{line}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* 카드 '아래'에 분리된 컨트롤 바 (겹침/잘림 없음) */}
        <div className="info-ctrlbar" role="group" aria-label="배너 제어">
          <button
            type="button"
            className="ctrl-btn"
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
            onClick={(e) => { e.preventDefault(); prev(); }}
            aria-label="이전 슬라이드"
          >‹</button>

          <span className="ctrl-index" aria-live="polite">
            {String(idx + 1).padStart(2, "0")} · {String(count).padStart(2, "0")}
          </span>

          <button
            type="button"
            className="ctrl-btn"
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
            onClick={(e) => { e.preventDefault(); next(); }}
            aria-label="다음 슬라이드"
          >›</button>
        </div>
      </div>
    </>
  );
}
