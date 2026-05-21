export default function DonutChart({ title, segments }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let offset = 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="glass-card p-6 flex flex-col items-center">
      <h3 className="font-semibold text-gg-charcoal self-start mb-4">{title}</h3>
      <svg width="120" height="120" viewBox="0 0 100 100">
        {segments.map((seg) => {
          const dash = (seg.value / total) * circumference;
          const circle = (
            <circle
              key={seg.label}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="12"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 50 50)"
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>
      <ul className="mt-4 space-y-2 w-full text-sm">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center justify-between text-gg-gray">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: seg.color }} />
              {seg.label}
            </span>
            <span className="font-medium text-gg-charcoal">{seg.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
