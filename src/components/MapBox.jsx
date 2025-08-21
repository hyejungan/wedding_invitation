import { useEffect, useRef } from "react";
export default function MapBox(lat, lng) {
  const mapRef = useRef(null);
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      const location = new window.naver.maps.LatLng(lat, lng);
      const mapOptions = {
        center: location,
        zoom: 14,
        zoomControl: true,
        zoomControlOptions: { position: window.naver.maps.Position.TOP_RIGHT },
      };
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      const marker = new window.naver.maps.Marker({
        position: location,
        map: map,
      });
    } else {
      console.error("Naver Maps API not loaded.");
    }
  }, []);
  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
}
