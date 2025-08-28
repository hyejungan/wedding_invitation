import React from "react";
import MapBox from "./MapBox";
import NavAppButtons from "./NavAppButtons";
import "../style/global.css";

export default function DirectionsSection({
  placeName,
  address,
  lat,
  lng,
}) {
  return (
    <section className="directions-section">
      <header className="mt-20">
        <h1 className="mb-8">LOCATION</h1>
        <p className="dir-title">{placeName}</p>
        <p className="dir-sub">{address}</p>
        <p className="small">Tel. 051-404-5011</p>
      </header>
      <div className="dir-card">
        <MapBox lat={lat} lng={lng} />
        <NavAppButtons
          placeName={placeName}
          address={address}
          lat={lat}
          lng={lng}
        />
      </div>
    </section>
  );
}
