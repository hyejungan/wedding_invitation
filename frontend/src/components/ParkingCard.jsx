import React from "react";
export default function ParkingCard({ place, capacity }) {
  return (
    <div className="tt-parking-box">
      <div>{place}</div>
      {capacity && <div>수용 {capacity}</div>}
    </div>
  );
}
