import React from "react";
import "../style/global.css";

/** 네이버/카카오/티맵 버튼 컴포넌트 */
export default function NavAppButtons({ placeName, address, lat, lng }) {
  const enc = (v) => encodeURIComponent(v ?? "");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const useCoords = typeof lat === "number" && typeof lng === "number";

  // 네이버 지도 URL
  const naverApp = `nmap://route/car?dlat=${enc(lat)}&dlng=${enc(lng)}&dname=${enc(placeName)}`;
  const naverWeb = `https://map.naver.com/v5/search/${enc(address || placeName)}`;
  
  // 카카오맵 URL
  const kakaoApp = `kakaomap://route?ep=${enc(lat)},${enc(lng)}&ename=${enc(placeName)}&by=PUBLICTRANSIT`;
  const kakaoWeb = `https://map.kakao.com/?q=${enc(address || placeName)}`;

  // 티맵 URL
  const tmapApp = `tmap://route?goalname=${enc(placeName)}&goalx=${enc(lng)}&goaly=${enc(lat)}`;
  const tmapWeb = `https://www.tmap.co.kr/tmap2/mobile/route.do?endName=${enc(placeName)}&endX=${enc(lng)}&endY=${enc(lat)}`;

  // 딥링크를 열고, 앱 실행 실패 시 웹으로 연결하는 함수
  const openDeepLink = (appUrl, webUrl) => {
    // 모바일 환경에서만 딥링크 시도
    if (isMobile) {
      // 1. 앱 링크를 먼저 시도
      window.location.href = appUrl;

      // 2. 앱 실행 실패 시 (약 700ms 후에도 페이지가 그대로 보이면) 웹으로 이동
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.open(webUrl, '_blank', 'noopener,noreferrer');
        }
      }, 700);
    } else {
      // PC 환경에서는 바로 웹으로 연결
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="nav-app-row fancy">
      <button 
        className="nav-chip naver"  
        type="button" 
        onClick={() => openDeepLink(naverApp, naverWeb)}
      >
        네이버지도
      </button>
      <span className="chip-sep">|</span>
      <button 
        className="nav-chip kakao"  
        type="button" 
        onClick={() => openDeepLink(kakaoApp, kakaoWeb)}
      >
        카카오내비
      </button>
      <span className="chip-sep">|</span>
      <button 
        className="nav-chip tmap"   
        type="button" 
        onClick={() => openDeepLink(tmapApp, tmapWeb)}
      >
        티맵
      </button>
    </div>
  );
}