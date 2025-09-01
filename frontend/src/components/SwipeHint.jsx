import React, { useEffect, useState } from "react";

export default function SwipeHint({
  targetRef,
  text,
  storageKey,
  handSrc,
  autoHideMs = 20000, 
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = targetRef?.current;
    if (!el) return;

    const seen = (() => {
      try { return localStorage.getItem(storageKey) === "1"; } catch { return true; }
    })();
    const hasOverflow = el.scrollWidth > el.clientWidth + 8;
    setShow(hasOverflow && !seen);
    if (!hasOverflow || seen) return;

    let lastLeft = el.scrollLeft;
    let accum = 0;
    let tm;

    const hide = () => {
      setShow(false);
      try { localStorage.setItem(storageKey, "1"); } catch {}
      if (tm) clearTimeout(tm);
    };

    const onScroll = () => {
      const dx = Math.abs(el.scrollLeft - lastLeft);
      lastLeft = el.scrollLeft;
      accum += dx;
      if (accum > 40) hide(); // 조금만 움직여도 종료
    };
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 8) hide();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    // 자동 종료 타이머
    if (autoHideMs > 0) tm = setTimeout(hide, autoHideMs);

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      if (tm) clearTimeout(tm);
    };
  }, [targetRef, storageKey, autoHideMs]);

  if (!show) return null;

  return (
    <div className="swipe-hint" aria-hidden="true">
      <div className="swipe-card">
        <div className="swipe-track">
          <img className="hand-img" src={handSrc} alt="" />
        </div>
        <div className="swipe-text">{text}</div>
      </div>
    </div>
  );
}
