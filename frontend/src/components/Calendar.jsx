import Calendar from 'react-calendar';
import "../style/calendar.css"

const WEDDING_DATE = new Date(2025, 10, 15); // 2025-11-15

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

export default function WeddingCalendar() {
  const startOfMonth = new Date(WEDDING_DATE.getFullYear(), WEDDING_DATE.getMonth(), 1);

  return (
    <div className="mt-10">
      <Calendar
        className="wc"
        locale="ko-KR"
        calendarType="gregory"           // ✅ 일요일 시작
        value={WEDDING_DATE}
        activeStartDate={startOfMonth}
        showNavigation={false}
        showNeighboringMonth={false}
        minDetail="month"
        maxDetail="month"
        selectRange={false}
        onChange={() => {}}
        tileDisabled={() => true}
        formatDay={(l, d) => String(d.getDate())}
        formatShortWeekday={(l, d) => ['일','월','화','수','목','금','토'][d.getDay()]}
        tileClassName={({ date: d, view }) => {
          if (view !== 'month') return;
          const cls = [];
          if (isSameDay(d, WEDDING_DATE)) cls.push('is-wedding');
          const dow = d.getDay();           // 0=일, 6=토
          if (dow === 0) cls.push('is-sun');
          if (dow === 6) cls.push('is-sat');
          return cls;
        }}
      />
    </div>
  );
}
