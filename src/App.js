// App.jsx
import "./style/global.css";
import coverImg from "./assets/cover.png";
import WeddingSection from "./components/WeddingSection";
import DayBox from "./components/DayBox";
import { getDiffParts, WEDDING_TIME } from "./utils/create_day";
import { useEffect, useState } from "react";
import AlbumSection from "./components/AlbumSection";
import albumPhotos from "./const/albumPhotos";
import DirectionsSection from "./components/DirectionSection";
import LOCATION from "./const/location";
import directionsAccordion from "./const/directionAccordion";
import CONTACTS from './const/contacts';
import ContactSection from "./components/ContactSection";

export default function App() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setNow(n);
      if (n >= WEDDING_TIME) {
        clearInterval(id);
      }
    };
    const id = setInterval(tick, 1000);
    tick(); // 즉시 1회 업데이트
    return () => clearInterval(id);
  }, []);

  const parts = getDiffParts(now);

  return (
    <div className="hero-bg">
      <main className="container">
        <img src={coverImg} alt="cover" />

        <section className="section">
          <div className="center">
            <h3 className="text-b-dg">
              소중한 분들을
              <br /> 초대합니다.
            </h3>
            <div className="mt-10 flex-c">
              <p>
                낯선 여행지에서 서로 닮은 얼굴을 마주보며 나눈 웃음은
                <br />
                평생의 사랑을 약속하게 했습니다.{" "}
              </p>
              <p>
                따뜻한 겨울, 부부로서
                <br />
                새로운 여행을 함께 떠나려 합니다.
              </p>
              <p>
                저희 여행의 출발점에 초대드리오니
                <br />
                오셔서 많이 축복해 주시면 큰 기쁨이겠습니다
              </p>
            </div>
          </div>
          <div className="mt-12 center">
            <p className="text-b-lg">
              {CONTACTS.groom[1].name} ・ {CONTACTS.groom[2].name} <span className="text-muted">의 차남</span>{" "}
              {CONTACTS.groom[0].name}
            </p>
            <p className="text-b-lg">
            {CONTACTS.bride[1].name} ・ {CONTACTS.bride[2].name} <span className="text-muted">의 장녀</span>{" "}
            {CONTACTS.bride[0].name}
            </p>
          </div>
          <ContactSection contacts={CONTACTS} />
        </section>

        <WeddingSection parts={parts} DayBox={DayBox} />
        <AlbumSection
          title="GALLERY"
          images={albumPhotos}
          horizontal
          onImageClick={(idx) => console.log("Clicked:", idx)}
        />
        <DirectionsSection
          placeName={LOCATION.placeName}
          address={LOCATION.address}
          lat={LOCATION.lat}
          lng={LOCATION.lng}
          shareUrl="https://naver.me/F1rxqNQ8"
          accordionItems={directionsAccordion}
        />
      </main>
      <div className="mt-20 mb-8"><p>'
        
        
        
        
        
        
        
        '</p></div>

      <div className="floating-bar">
        <button className="btn btn-primary">저장</button>
        <a className="btn btn-outline" href="#map">
          지도
        </a>
      </div>
    </div>
  );
}
