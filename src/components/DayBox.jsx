export default function DayBox({value,label}) {
  return (
    <div className="flex-col day-box-content">
      <h2>
        {value}
      </h2>
      <p>
        {label}
      </p>
    </div>
  )
}