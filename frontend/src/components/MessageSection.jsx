import React, { useEffect, useMemo, useState } from "react";
import { fetchMessages, createMessage, deleteMessage } from "../api/messages";
import MessageModal from "../modal/MessageModal";
import "../style/message.css";

const fmt = (ts) => {
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth()+1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

function MessageCard({ item, onDelete }) {
  return (
    <article className="msg-card">
      <button className="msg-x" aria-label="삭제" onClick={() => onDelete(item.id)}>×</button>
      <div className="msg-content">{item.content}</div>
      <footer className="msg-meta">
        <span className="from">From <b>{item.name}</b></span>
        <time className="date">{fmt(item.createdAt)}</time>
      </footer>
    </article>
  );
}

function PlaceholderCard() {
  return (
    <article className="msg-card msg-placeholder">
      <div className="msg-content">
        저희에게 따뜻한 방명록을 남겨주세요.
      </div>
    </article>
  );
}

export default function MessageSection({ brand = "#809E70" }) {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await fetchMessages();
        const list = Array.isArray(resp) ? resp : (resp.items || []);
        setItems(list.map(r => ({
          ...r,
          createdAt: new Date(r.created_at || r.createdAt).getTime()
        })));
      } catch (e) {
        console.warn("fetchMessages failed:", e); 
        setItems([]); 
      } finally { setLoading(false); }
    })();
  }, []);

  const sorted = useMemo(() => [...items].sort((a,b)=>b.createdAt - a.createdAt), [items]);
  const showPlaceholder = !loading && sorted.length === 0;

  const [open, setOpen] = useState(false);

const handleAdd = async ({ name, password, content }) => {
    try {
      const created = await createMessage({ name, password, content });
      created.createdAt = new Date(created.created_at || created.createdAt || Date.now()).getTime();
      setItems(prev => [created, ...prev]);
      return true;  
    } catch (e) {
      console.error(e);
      alert(e.message || "메시지 등록에 실패했어요.");
      return false; 
    }
  };

  const handleDelete = async (id) => {
    const pw = window.prompt("삭제 비밀번호를 입력하세요");
    if (pw == null) return;
    try {
      await deleteMessage(id, pw);
      setItems(prev => prev.filter(m => m.id !== id));
    } catch {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <section className="msg-wrap">
      <header className="msg-header">
        <h1 className="mt-16 mb-8">MESSAGE</h1>
      </header>

      <div className="msg-board" style={{ "--brand": brand }}>
        {loading && <div style={{padding:12,color:"#6a655f"}}>불러오는 중…</div>}
        {showPlaceholder && <PlaceholderCard />}
        {sorted.map((m) => <MessageCard key={m.id} item={m} onDelete={handleDelete} />)}
      </div>

      <div className="msg-footer">
        <button className="btn-pill btn-ghost small" onClick={()=>setOpen(true)}>
          ✉️ 메시지 남기기
        </button>
      </div>

      <MessageModal open={open} onClose={()=>setOpen(false)} onSubmit={handleAdd} brand={brand} />
    </section>
  );
}
