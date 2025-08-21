import React from "react";
import MapBox from "./MapBox";
import NavAppButtons from "./NavAppButtons";
import AccordionSection from "./AccordionSection";
import "../style/global.css";

export default function DirectionsSection({
  placeName,
  address,
  lat, lng,
  shareUrl,
  accordionItems = [],
}) {
  return (
    <section className="directions-section">
      <h2 className="dir-title">오시는 길</h2>
      <MapBox
        // placeName={placeName}
        // address={address}
        lat={lat}
        lng={lng}
        // shareUrl={shareUrl}
      />
      <NavAppButtons placeName={placeName} address={address} lat={lat} lng={lng} />
      <AccordionSection items={accordionItems} />
    </section>
  );
}