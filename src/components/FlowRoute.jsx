import React from "react";
export default function FlowRoute({ title, steps = [], num }) {
  return (
    <li className="tt-route-row">
      {title && <div className="tt-route-title">{num}. {title}</div>}
      <div className="tt-flow">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <span >{s}</span>
            {i < steps.length - 1 && <span className="tt-flow-sep" aria-hidden>→</span>}
          </React.Fragment>
        ))}
      </div>
    </li>
  );
}
