import './style/global.css';
import coverImg from './assets/cover.png'
import WeddingCalendar from './calender';

export default function App() {

  return (
    <div className="hero-bg">
      <main className="container">
          <img src={coverImg} alt="cover" />


        <section className="section">
          <div className='center'>
            <h3 className='text-b-dg'>소중한 분들을<br/> 초대합니다.</h3>
            <div className='mt-10 flex-c'>
              <p>낯선 여행지에서 서로 닮은 얼굴을 마주보며 나눈 웃음은<br/>
              평생의 사랑을 약속하게 했습니다. </p>
              <p>따뜻한 겨울, 부부로서<br/>
              새로운 여행을 함께 떠나려 합니다.</p>
              <p>
              저희 여행의 출발점에 초대드리오니<br/>
              오셔서 많이 축복해 주시면 큰 기쁨이겠습니다</p>
            </div>
          </div>
          <div className="mt-12 center">
            <p className='text-b-lg'>손기칠 ・ 김순애 <span className="text-muted">의 차남</span> 손희락</p>
            <p className='text-b-lg'>안병현 ・ 박경영 <span className="text-muted">의 장녀</span> 안혜정</p>
          </div>
        </section>

        <section>
          <div className="mt-6">
            <p className='center'>WEDDING DAY</p>
            <WeddingCalendar date={new Date(2025, 10, 15)} />
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
