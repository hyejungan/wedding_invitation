import { PhoneIcon, SmsIcon, digits } from "../const/Icon";

export default function ContactModal(setOpen, contacts) {
  return (
    <div
      className="contact-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="연락하기"
      onClick={() => setOpen(false)}
    >
      <div className="contact-sheet" onClick={(e) => e.stopPropagation()}>
        <button
          className="contact-close"
          type="button"
          aria-label="닫기"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        <header className="contact-header">
          <div className="contact-caption">CONTACT</div>
          <h3>연락하기</h3>
        </header>

        {/* 신부측 */}
        <section className="contact-section">
          <div className="contact-section-title">
            신부측 <span>BRIDE</span>
          </div>
          <ul className="contact-list">
            {contacts?.bride?.map((p) => (
              <li key={`${p.role}-${p.name}`} className="contact-row">
                <div className="col role">{p.role}</div>
                <div className="col name">{p.name}</div>
                <div className="col actions">
                  {p.phone && (
                    <a
                      className="icon-btn"
                      href={`tel:${digits(p.phone)}`}
                      aria-label={`${p.name} 전화`}
                    >
                      <PhoneIcon />
                    </a>
                  )}
                  {p.phone && (
                    <a
                      className="icon-btn"
                      href={`phone:${digits(p.phone)}`}
                      aria-label={`${p.name} 문자`}
                    >
                      <SmsIcon />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 신랑측 */}
        <section className="contact-section">
          <div className="contact-section-title">
            신랑측 <span>GROOM</span>
          </div>
          <ul className="contact-list">
            {contacts?.groom?.map((p) => (
              <li key={`${p.role}-${p.name}`} className="contact-row">
                <div className="col role">{p.role}</div>
                <div className="col name">{p.name}</div>
                <div className="col actions">
                  {p.phone && (
                    <a
                      className="icon-btn"
                      href={`tel:${digits(p.phone)}`}
                      aria-label={`${p.name} 전화`}
                    >
                      <PhoneIcon />
                    </a>
                  )}
                  {p.phone && (
                    <a
                      className="icon-btn"
                      href={`phone:${digits(p.phone)}`}
                      aria-label={`${p.name} 문자`}
                    >
                      <SmsIcon />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
