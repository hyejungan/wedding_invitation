export default function DayBox({value,label}) {
  return (
    <div className="flex-col day-box-content">
      <h3>
        {value}
      </h3>
      <p>
        {label}
      </p>
    </div>
  )
}