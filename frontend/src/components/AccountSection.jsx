import React, { useState } from "react";
import "../style/account.css";

function Chevron({ open }) {
  return (
    <svg
      className={`chev ${open ? "is-open" : ""}`}
      width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CopyButton({ text }) {
  const [ok, setOk] = useState(false);

  const copy = async () => {
    const toCopy = text.trim();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(toCopy);
      } else {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = toCopy;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setOk(true);
      setTimeout(() => setOk(false), 1200);
    } catch {
    }
  };

  return (
    <button type="button" className={`acc-copy ${ok ? "is-ok" : ""}`}
      onClick={copy}
      onMouseDown={(e) => e.preventDefault()}
      onTouchStart={(e) => e.preventDefault()}
      aria-label="계좌 복사"
      title="계좌 복사"
    >
      {/* 작은 클립보드 아이콘 */}
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 3h6a2 2 0 012 2v2h-2V5H9v2H7V5a2 2 0 012-2z" fill="currentColor"/>
        <rect x="6" y="7" width="12" height="14" rx="2" ry="2" fill="currentColor" opacity=".18"/>
        <rect x="8" y="9" width="8" height="10" rx="1.6" ry="1.6" fill="currentColor" opacity=".28"/>
      </svg>
      <span className="label">{ok ? "복사됨!" : "복사"}</span>
    </button>
  );
}

function AccountRow({ name, bank, number }) {
  const copyText = `${bank} ${number}`;
  return (
    <li className="acc-row">
      <div className="acc-info">
        <div className="acc-name">{name}</div>
        <div className="acc-bank">
          <span className="bank">{bank}</span>
          <span className="num">{number}</span>
        </div>
      </div>
      <CopyButton text={copyText} />
    </li>
  );
}

function AccountGroup({ title, items = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="acc-group">
      <button
        type="button"
        className="acc-head"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
      >
        <span className="head-title">{title}</span>
        <Chevron open={open} />
      </button>

      <div className={`acc-body ${open ? "is-open" : ""}`}>
        <ul className="acc-list">
          {items.map((it, i) => (
            <AccountRow key={`${it.name}-${i}`} {...it} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function AccountSection({ groom, bride }) {
  return (
    <section className="account-wrap">
      <header className="account-header">
        <p className="eyebrow">ACCOUNT</p>
        <h2 className="title">마음 전하실 곳</h2>
        <p className="desc">
          참석이 어려우신 분들을 위해<br/>
          계좌번호를 기재하였습니다.<br/>
          너그러운 마음으로 양해 부탁드립니다.
        </p>
      </header>

      <div className="account-inner">
        <AccountGroup title="신랑측" items={groom} />
        <AccountGroup title="신부측" items={bride} />
      </div>
    </section>
  );
}
