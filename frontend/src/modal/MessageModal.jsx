import React, { useEffect, useState } from "react";
import "../style/message.css";

export default function MessageModal({
  open,
  onClose,
  onSubmit,
  brand = "#809E70",
}) {
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const left = 200 - content.length;
  const valid =
    name.trim() && pw.trim() && content.trim() && content.length <= 200;

  useEffect(() => {
    if (open) {
      setName("");
      setPw("");
      setContent("");
    }
  }, [open]);
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close flex-row" onClick={onClose} aria-label="닫기">
          ✕
        </button>
        <header className="modal-header">
          <div className="caption">축하 메시지 남기기</div>
        </header>

        <label className="field">
          <span className="label">닉네임</span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label className="field">
          <span className="label">비밀번호</span>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="label">메시지</span>
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="200자 이내로 작성해 주세요"
          />
          <div
            className={`count ${left < 0 ? "bad" : ""}`}
            style={{ color: left < 0 ? "#c0392b" : brand }}
          >
            {Math.max(left, 0)}자 남음
          </div>
        </label>

        <div className="flex-row">
          <button
            className="btn-pill btn-brand"
            disabled={!valid || submitting}
            onClick={async () => {
              try {
                setSubmitting(true);
                const ok = await onSubmit({ name, password: pw, content });
                if (ok) onClose(); // 성공 시에만 닫기
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? "등록 중..." : "작성 완료"}
          </button>
        </div>
      </section>
    </div>
  );
}
