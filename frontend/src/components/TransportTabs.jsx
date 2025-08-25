import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import Tabs from "./Tabs";
import PanelGuide from "./PanelGuide";
import PanelBusanShuttle from "./PanelBusanShuttle";
import PanelCharter from "./PanelCharter";

export default function TransportTabs({ tabs, labels, guide, busan, charter }) {
  const [active, setActive] = useState(tabs?.[0]?.id ?? "guide");

  const pageRefs = useRef([]);
  const setPageRef = (idx) => (node) => (pageRefs.current[idx] = node);

  const [maxH, setMaxH] = useState(null);
  const measure = useCallback(() => {
    const hs = pageRefs.current.map((n) => n?.scrollHeight || 0);
    const m = Math.max(0, ...hs);
    setMaxH(m || null);
  }, []);

  useLayoutEffect(() => { measure(); }, [measure, guide, busan, charter, tabs]);
  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  const pages = {
    guide:  <PanelGuide labels={labels} data={guide} />,
    busan:  <PanelBusanShuttle labels={labels} data={busan} />,
    charter:<PanelCharter labels={labels} data={charter} />,
  };

  return (
    <section className="tt-wrap">
      <Tabs items={tabs} activeId={active} onChange={setActive} />

      <div className="tt-panel-holder" style={{ height: maxH ?? "auto" }}>
        {tabs.map((t, i) => (
          <div
            key={t.id}
            ref={setPageRef(i)}
            className={`tt-panel-page ${active === t.id ? "is-active" : "is-hidden"}`}
          >
            {pages[t.id]}
          </div>
        ))}
      </div>
    </section>
  );
}
