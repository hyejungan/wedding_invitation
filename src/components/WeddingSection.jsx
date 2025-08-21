import { useMemo } from "react";
import WeddingCalendar from "./Calendar";

const WEDDING_DATE = new Date(2025, 10, 15); // 2025-11-15

function toYMD(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function daysBetween(a, b) {
  const A = toYMD(a).getTime();
  const B = toYMD(b).getTime();
  const MS = 24 * 60 * 60 * 1000;
  return Math.round((B - A) / MS);
}

function AfterBlock({ customMessage }) {
  return (
    <div className="hero after">
      <p className="center">
        축하해 주신 모든 분들께 진심으로 감사드립니다.
        <br />
        <span>{customMessage}</span>
      </p>
    </div>
  );
}

export default function WeddingSection({ parts, DayBox }) {
  const now = new Date();
  const today = toYMD(now);
  const dDay = useMemo(() => daysBetween(today, WEDDING_DATE), [today]);

  const isWeddingDay = dDay === 0;
  const isAfter2PM =
    isWeddingDay &&
    (now.getHours() > 14 || (now.getHours() === 14 && now.getMinutes() > 0));

  return (
    <section>
      <div className="mt-6">
        <h1 className="center">WEDDING DAY</h1>
        <WeddingCalendar date={WEDDING_DATE} />
      </div>

      {dDay > 0 && (
        <div className="flex-row day-box">
          {parts.map((p) => (
            <DayBox key={p.label} value={p.value} label={p.label} />
          ))}
        </div>
      )}

      {(dDay < 0 || isAfter2PM) && (
        <AfterBlock customMessage="희락아! 우리 행복하게 잘 살자💜" />
      )}
    </section>
  );
}
