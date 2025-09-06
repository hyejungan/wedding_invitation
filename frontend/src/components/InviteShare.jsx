import React, { useState } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import "../style/invite-share.css";

export default function InviteShare({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "희락 · 혜정 청첩장",
  text = "우리 결혼식에 초대합니다.",
}) {
  const [copied, setCopied] = useState(false);

  const copy = async (val) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(val);
      } else {
        const ta = document.createElement("textarea");
        ta.value = val;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 무시
    }
  };

  return (
    <div className="invite-share-wrap">
      <button
        type="button"
        className={`invite-copy-btn ${copied ? "is-ok" : ""}`}
        onClick={() => copy(url)}
        aria-label="링크 복사"
        title="링크 복사"
      >
        {copied ? <Check size={16} /> : <LinkIcon size={16} />}
        <span className="label">{copied ? "복사됨" : "링크 복사"}</span>
      </button>
    </div>
  );
}
