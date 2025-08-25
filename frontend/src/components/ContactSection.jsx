import React, { useEffect, useState } from "react";
import "../style/global.css";
import ContactModal from "../modal/ContactModal";
import { PhoneIcon } from "../const/Icon";

export default function ContactSection({ contacts }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) {
      document.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      <div className="contact-pill-wrap">
        <button className="contact-pill" type="button" onClick={() => setOpen(true)}>
          <PhoneIcon />
          <span>연락하기</span>
        </button>
      </div>

      {open && (
        ContactModal(setOpen, contacts)
      )}
    </>
  );
}
