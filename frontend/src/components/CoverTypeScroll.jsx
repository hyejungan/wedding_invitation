import React, { useEffect, useRef, useMemo, useState } from "react";
import "../style/cover-typing.css";

export default function CoverTypeScroll({
  src,
  text = "FOREVER\nSTARTS NOW",
  color = "#83ACBE",
  topOffset = 95,     
  speed = 3000,    
  startAfterGestures = 3
}) {
  const COVER = `${process.env.PUBLIC_URL}/hero/cover.png`;
  const [p, setP] = useState(0); 
  const pRef = useRef(0);
  const raf = useRef(null);
  const pend = useRef(0);

  const lockedRef = useRef(true);  
  const startedRef = useRef(false); 
  const gestureCountRef = useRef(0);   
  const lastWheelAtRef = useRef(0);   

  const chars = useMemo(() => {
    const out = [];
    for (const ch of text) {
      if (ch === "\n") out.push({ type: "br" });
      else out.push({ type: "ch", v: ch === " " ? "\u00A0" : ch });
    }
    return out;
  }, [text]);
  const N = chars.filter(c => c.type === "ch").length; // 실제 글자 수
  const shownChars = Math.max(0, Math.min(N, Math.round(p * N)));

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const bumpGestureCount = () => {
    gestureCountRef.current += 1;
    if (!startedRef.current && gestureCountRef.current >= startAfterGestures) {
      startedRef.current = true;
    }
  };

  useEffect(() => {
    const flush = () => {
      const delta = Math.max(-150, Math.min(150, pend.current));
      pend.current = 0;
      if (!startedRef.current) { raf.current = null; return; }

      const add = delta / speed;
      const next = Math.max(0, Math.min(1, pRef.current + add));
      pRef.current = next; setP(next);

      if (next >= 1 && lockedRef.current) {
        lockedRef.current = false;
        requestAnimationFrame(() => { document.body.style.overflow = ""; });
      }
      raf.current = null;
    };

    const schedule = (dy) => {
      if (!lockedRef.current || !startedRef.current) return;
      pend.current += dy;
      if (!raf.current) raf.current = requestAnimationFrame(flush);
    };

    const onWheel = (e) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelAtRef.current > 400) { lastWheelAtRef.current = now; bumpGestureCount(); }
      if (startedRef.current) schedule(e.deltaY);
    };

    let dragging = false, lastY = 0;
    const onTS = (e) => { if (!lockedRef.current) return; dragging = true; lastY = e.touches[0].clientY; bumpGestureCount(); };
    const onTM = (e) => {
      if (!lockedRef.current || !dragging) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      if (startedRef.current) schedule((lastY - y) * 0.6);
      lastY = y;
    };
    const onTE = () => { dragging = false; };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTS, { passive: false });
    window.addEventListener("touchmove", onTM, { passive: false });
    window.addEventListener("touchend", onTE, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchmove", onTM);
      window.removeEventListener("touchend", onTE);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [speed, startAfterGestures]);

  let revealedCount = 0;
  const renderChars = chars.map((c, idx) => {
    if (c.type === "br") return <br key={`br-${idx}`} />;
    const visible = revealedCount < shownChars;
    revealedCount += 1;
    return (
      <span
        key={`ch-${idx}`}
        className="char"
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden={!visible} 
      >
        {c.v}
      </span>
    );
  });

  return (
    <section className="cover-type-wrap">
      <div className="cover-bg">
        <img src={src} alt="cover" />
      </div>

      <div className="cover-text-abs" style={{ top: `${topOffset}px` }}>
        <div className="cover-text" style={{ color }} aria-label={text}>
          {renderChars}
        </div>
      </div>
    </section>
  );
}
  