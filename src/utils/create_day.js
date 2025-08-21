export const WEDDING_TIME = new Date("2025-11-15T14:00:00");

function pad2(n) {
  return String(n).padStart(2, "0");
}

export function getDiffParts(now) {
  const ms = WEDDING_TIME - now;
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: "day", value: days },
    { label: "hour", value: pad2(hours) },
    { label: "minute", value: pad2(minutes) },
    { label: "second", value: pad2(seconds) },
  ];
}
