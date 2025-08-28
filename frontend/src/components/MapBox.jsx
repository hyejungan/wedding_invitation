import { useEffect, useRef } from "react";

export default function MapBox({ lat, lng }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.naver?.maps && typeof lat === "number" && typeof lng === "number") {
      const location = new window.naver.maps.LatLng(lat, lng);

      const map = new window.naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 16,
      });

      new window.naver.maps.Marker({ position: location, map });
    } else if (!window.naver?.maps) {
      console.error("Naver Maps API not loaded.");
    }
  }, [lat, lng]);

  return <div ref={mapRef} className="map-box" />;
}
