import './style/global.css';
import coverImg from './assets/청첩장용 서비스컷 -1.jpg'
export default function App() {
  return (
    <div className="hero-bg hero-blob">
      <main className="container">
        <header className="section center">
          <div className="eyebrow">Wedding Invitation</div>
          <h1>Hyejung & Heerak</h1>
          <p className="muted mt-2">2025년 11월 15일 · 부산 영도구 목장원 야외웨딩홀</p>
          <img className="cover rounded-lg shadow mt-6" src={coverImg} alt="cover" />
          <div className="mt-6">
            <button className="btn btn-primary">캘린더 저장</button>
            <button className="btn btn-secondary" style={{marginLeft:8}}>오시는 길</button>
          </div>
        </header>

        <section className="section">
          <h2>인사드립니다</h2>
          <div className="card card-content mt-4">
            서로의 마음을 확인하고 하나의 길을 걷기로 했습니다. 따뜻한 축복 부탁드립니다.
          </div>
        </section>

        <section className="section">
          <h2>결혼식 안내</h2>
          <div className="card card-content mt-4">
            <div className="list">
              <div className="row"><div className="label">일시</div><div className="value">2025.11.15 14:00</div></div>
              <div className="row"><div className="label">장소</div><div className="value">목장원 야외웨딩홀</div></div>
              <div className="row"><div className="label">주소</div><div className="value">부산 영도구 절영로 355</div></div>
            </div>
          </div>
          <div className="map-frame mt-4">지도 자리</div>
        </section>
      </main>

      <div className="floating-bar">
        <button className="btn btn-primary">저장</button>
        <a className="btn btn-outline" href="#map">지도</a>
      </div>
    </div>
  );
}
