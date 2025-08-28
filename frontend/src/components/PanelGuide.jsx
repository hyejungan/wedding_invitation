import React from "react";
import SectionTitle from "./SectionTitle";
import BulletList from "./BulletList";
import FlowRoute from "./FlowRoute";
import ParkingCard from "./ParkingCard";

export default function PanelGuide({ labels, data }) {
  const { publicTransit = [], carRoutes = [], parking = [] } = data || {};
  return (
    <div>
      <SectionTitle>🚌 {labels.sectionPublicTransit}</SectionTitle>
      <BulletList items={publicTransit} />

      <div className="tt-divider" />

      <SectionTitle>🚗 {labels.sectionCar}</SectionTitle>
      <ul className="tt-routes">
        {carRoutes.map((r, i) => (
          <FlowRoute key={r.title} title={r.title} steps={r.steps} num={i+1} />
        ))}
      </ul>

      <div className="tt-divider" />

      <SectionTitle>🅿️ {labels.sectionParking}</SectionTitle>
      <div className="tt-parking">
        {parking.map((p, i) => <ParkingCard key={i} {...p} />)}
      </div>
    </div>
  );
}
