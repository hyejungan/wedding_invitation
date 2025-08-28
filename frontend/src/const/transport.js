// 라벨(텍스트) — 필요하면 여기만 바꾸면 됨
export const LABELS = {
  tabGuide: "교통안내",
  tabBusan: "부산역 셔틀",
  tabCharter: "지방 버스대절",

  sectionPublicTransit: "대중교통",
  sectionCar: "자가용",
  sectionParking: "주차장 안내",

  pickupLabel: "승차 장소",
  timetableLabel: "운행 시간"
};

// 탭 구성 — 순서/표시 라벨
export const TABS = [
  { id: "guide",  label: LABELS.tabGuide },
  { id: "busan",  label: LABELS.tabBusan },
  { id: "charter",label: LABELS.tabCharter },
];

// 콘텐츠 데이터
export const GUIDE = {
  publicTransit: [
    "지하철 남포역 6번출구 하차 후 영도대교에서 버스 환승 7, 71, 508",
    "부산역 맞은편 버스 508번",
  ],
  carRoutes: [
    { title: "남해고속도로", steps: ["남해고속도로", "사상 IC", "구덕터널", "부산대교", "목장원"] },
    { title: "경부고속도로", steps: ["경부고속도로", "구서톨게이트", "부두길", "목장원"] },
  ],
  parking: [{ place: "목장원 내부", capacity: "150대" }],
};

// 다른 탭들(비워두면 화면에 ‘탭’은 나오되 내용만 비어 있음)
export const BUSAN_SHUTTLE = {
  pickup: "부산역사 1번출구 왼편 토요코인호텔",
  linesText: "KTX·SRT 하차 후 도보 이동",
  timetable: "13:00",
  note: "25인승 버스 1회 운행예정입니다 (편도)"
};

export const CHARTER = {
  // contact: "담당자 010-XXXX-XXXX",
  // cities: [{ name:"대구", pickup:"동대구역", time:"10:30", note:"정차 없음" }]
};
