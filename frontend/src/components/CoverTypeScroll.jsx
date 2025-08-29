import React, { useEffect, useRef, useMemo, useState } from "react";
import "../style/cover-typing.css";

export default function CoverTypeScroll({
  src,
  text = "FOREVER\nSTARTS NOW",
  color = "#83ACBE",
  topOffset = 95,
  speed = 3000,
  startAfterGestures = 3,

  // (선택) 필요하면 prop으로 조절도 가능
  touchSpeed = 1200,     // 터치일 때 더 빠르게 진행
  touchBoost = 1.8,      // 터치 이동량 배수
  touchClamp = 600,      // 터치 delta 클램프
  wheelClamp = 150       // 휠 delta 클램프(기존값)
}) {
  const [p, setP] = useState(0);
  const pRef = useRef(0);
  const raf = useRef(null);
  const pend = useRef(0);

  const lockedRef = useRef(true);
  const startedRef = useRef(false);
  const gestureCountRef = useRef(0);
  const lastWheelAtRef = useRef(0);

  // 마지막 입력 방식 기억 ( 'wheel' | 'touch' )
  const lastInputRef = useRef("wheel");
  const isCoarse = typeof window !== "undefined"
    && window.matchMedia?.("(pointer: coarse)")?.matches;

  const chars = useMemo(() => {
    const out = [];
    for (const ch of text) {
      if (ch === "\n") out.push({ type: "br" });
      else out.push({ type: "ch", v: ch === " " ? "\u00A0" : ch });
    }
    return out;
  }, [text]);
  const N = chars.filter(c => c.type === "ch").length;
  const shownChars = Math.max(0, Math.min(N, Math.round(p * N)));

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const bumpGestureCount = () => {
    gestureCountRef.current += 1;
    const needed = isCoarse ? 1 : startAfterGestures; // 터치는 1번만
    if (!startedRef.current && gestureCountRef.current >= needed) {
      startedRef.current = true;
    }
  };

  useEffect(() => {
    const flush = () => {
      // 입력 방식별로 다른 클램프/속도 적용
      const mode = lastInputRef.current; // 'wheel' | 'touch'
      const clampMax = mode === "touch" ? touchClamp : wheelClamp;
      const denom = mode === "touch" ? touchSpeed : speed;

      const delta = Math.max(-clampMax, Math.min(clampMax, pend.current));
      pend.current = 0;

      if (!startedRef.current) { raf.current = null; return; }

      const add = delta / denom;
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

    // 휠
    const onWheel = (e) => {
      lastInputRef.current = "wheel";
      if (!lockedRef.current) return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelAtRef.current > 400) {
        lastWheelAtRef.current = now;
        bumpGestureCount();
      }
      if (startedRef.current) schedule(e.deltaY);
    };

    // 터치 드래그
    let dragging = false, lastY = 0;
    const onTS = (e) => {
      lastInputRef.current = "touch";
      if (!lockedRef.current) return;
      dragging = true;
      lastY = e.touches[0].clientY;
      bumpGestureCount(); // 터치는 1번만으로 시작
    };
    const onTM = (e) => {
      if (!lockedRef.current || !dragging) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      if (startedRef.current) {
        // 터치 이동량을 부스트해서 느리지 않도록
        schedule((lastY - y) * touchBoost);
      }
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
  }, [speed, startAfterGestures, isCoarse, touchSpeed, touchBoost, touchClamp, wheelClamp]);

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
