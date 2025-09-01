const SmsIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M20 4H4a2 2 0 00-2 2v12l4-3h14a2 2 0 002-2V6a2 2 0 00-2-2zm-1 6l-7 4-7-4V6l7 4 7-4v4z"
    />
  </svg>
);

const digits = (s = "") => s.replace(/[^\d+]/g, "");

const PhoneIcon = (props) => (
  <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1v3.48a1 1 0 01-.91 1c-10.17.88-18.64-7.59-17.76-17.76a1 1 0 011-.91H7.3a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2 2z"
    />
  </svg>
);

export {SmsIcon, digits, PhoneIcon}