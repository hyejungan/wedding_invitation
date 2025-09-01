import "./style/global.css";
import coverImg from './assets/cover.png'
import WeddingSection from "./components/WeddingSection";
import DayBox from "./components/DayBox";
import { getDiffParts, WEDDING_TIME } from "./utils/create_day";
import { useEffect, useState } from "react";
import AlbumSection from "./components/AlbumSection";
import albumPhotos from "./const/albumPhotos";
import DirectionsSection from "./components/DirectionSection";
import LOCATION from "./const/location";
import CONTACTS from './const/contacts';
import ContactSection from "./components/ContactSection";
import { TABS, LABELS, GUIDE, BUSAN_SHUTTLE, CHARTER } from "./const/transport";
import TransportTabs from "./components/TransportTabs";
import MessageSection from "./components/MessageSection";
import CoverTypeScroll from "./components/CoverTypeScroll";
import Reveal from "./components/Reveal";
import RevealStagger from "./components/RevealStagger";
import InfoCarousel from "./components/InfoCarousel";
import slides from "./const/notice";

const MAINTENANCE = false;

function UnderConstruction() {
  return (
    <main className="maint-wrap">
      <section className="maint-card" role="status" aria-live="polite">
        <div className="maint-badge">🛠️</div>
        <h1 className="maint-title">페이지 리뉴얼 중</h1>
        <p className="maint-sub">더 예쁜 초대장을 준비하고 있어요.</p>

        <div className="maint-loader" aria-hidden="true">
          <span className="dot" /><span className="dot" /><span className="dot" />
        </div>
      </section>
    </main>
  );
}


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
  if (MAINTENANCE) return <UnderConstruction />;
  return (
    <div className="hero-bg">
      <main className="container">
        <CoverTypeScroll src={coverImg}
        />

        <section className="section">
          <Reveal>
            <div className="center">
              <h2 className="text-b-dg mb-16">
                소중한 분들을
                <br /> 초대합니다.
              </h2>
              <div className="mt-10 flex-c">
                <RevealStagger>
                  <p className="mb-8">
                    낯선 여행지에서 서로 닮은 얼굴을 마주보며 나눈 웃음은
                    <br />
                    평생의 사랑을 약속하게 했습니다.
                  </p>
                  <p className="mb-8">
                    따뜻한 겨울, 부부로서
                    <br />
                    새로운 여행을 함께 떠나려 합니다.
                  </p>
                  <p className="mb-8">
                    저희 여행의 출발점에 초대드리오니
                    <br />
                    오셔서 많이 축복해 주시면 큰 기쁨이겠습니다
                  </p>
                </RevealStagger>
              </div>
            </div>
          </Reveal>

          <Reveal >
            <div className="mt-12 center">
              <p className="text-b-lg">
                {CONTACTS.groom[1].name} ・ {CONTACTS.groom[2].name}{" "}
                <span className="text-muted">의 차남</span> {CONTACTS.groom[0].name}
              </p>
              <p className="text-b-lg">
                {CONTACTS.bride[1].name} ・ {CONTACTS.bride[2].name}{" "}
                <span className="text-muted">의 장녀</span> {CONTACTS.bride[0].name}
              </p>
            </div>
          </Reveal>

          <Reveal y={24}>
            <ContactSection contacts={CONTACTS} />
          </Reveal>
        </section>

        <Reveal y={28} >
          <WeddingSection parts={parts} DayBox={DayBox} />
        </Reveal>

        <AlbumSection
          title="GALLERY"
          images={albumPhotos}
          horizontal
        />


        <Reveal y={24} >
          <DirectionsSection
            placeName={LOCATION.placeName}
            address={LOCATION.address}
            lat={LOCATION.lat}
            lng={LOCATION.lng}
          />
        </Reveal>

        <Reveal y={24} >
          <TransportTabs
            tabs={TABS}
            labels={LABELS}
            guide={GUIDE}
            busan={BUSAN_SHUTTLE}
            charter={CHARTER}
          />
        </Reveal>

        <Reveal y={28} >
          <MessageSection brand="#809E70" />
        </Reveal>

        <Reveal>
          <InfoCarousel slides={slides}/>
        </Reveal>

        <div className="mt-20">
          <p>'                                              <br/>
          <br/>
          <br/>
          
          
          
          
          '</p>
        </div>
      </main>
    </div>
  );
}
