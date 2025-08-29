import React, { useMemo } from "react";
import { createPortal } from "react-dom";

export default function FlowerDrift({ count = 24, zIndex = 9500 }) {
  const petals = useMemo(() => {
    const rnd = (min, max) => Math.random() * (max - min) + min;
    return Array.from({ length: count }, () => ({
      // 오른쪽 쪽에서 시작(65% ~ 100%)
      start: rnd(65, 100).toFixed(2) + "%",
      // 왼쪽으로 얼마나 이동할지(40vw ~ 80vw)
      dx: `${Math.round(rnd(40, 80))}vw`,
      // 작고 잔잔하게
      size: Math.round(rnd(8, 14)) + "px",
      dur:  rnd(18, 28).toFixed(2) + "s",
      delay: (-rnd(0, 20)).toFixed(2) + "s", // 음수로 시작하면 이미 흩어져 보임
      rot:  Math.round(rnd(0, 360)) + "deg"
    }));
  }, [count]);

  const layer = (
    <div className="flower-drift" style={{ zIndex }} aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="flower"
          style={{
            "--start": p.start,
            "--dx": p.dx,
            "--size": p.size,
            "--dur": p.dur,
            "--delay": p.delay,
            "--rot": p.rot
          }}
        />
      ))}
    </div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(layer, document.body);
}
