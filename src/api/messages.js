// src/api/messages.js
const envBase = (process.env.REACT_APP_API_BASE || "").replace(/\/+$/, "");
const base = envBase; // 개발: "", 배포: "https://<배포된 API 주소>"

async function req(path, options = {}) {
  const r = await fetch(`${base}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!r.ok) {
    let msg = r.statusText;
    try { const j = await r.json(); if (j.error) msg = j.error; } catch {}
    throw new Error(msg || "요청 실패");
  }
  return r.status === 204 ? null : r.json();
}

export const fetchMessages = ({ limit=100, offset=0 } = {}) =>
  req(`/api/messages?limit=${limit}&offset=${offset}`);

export const createMessage = ({ name, password, content }) =>
  req(`/api/messages`, { method: "POST", body: JSON.stringify({ name, password, content }) });

export const deleteMessage = (id, password) =>
  req(`/api/messages/${id}`, { method: "DELETE", body: JSON.stringify({ password }) });
