// src/Modal.js
import React, { useEffect } from "react";

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()} // 내부 클릭은 모달 유지
        role="dialog"
        aria-modal="true"
      >
        {children}
        <button
          className="modal-close"
          aria-label="close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
      </div>
    </div>
  );
}
