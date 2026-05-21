const POINTS = [32, 45, 38, 52, 48, 61, 55, 68, 72, 65, 78, 84];

export default function RevenueChart({ title = 'Revenue Analytics', subtitle }) {
  const max = Math.max(...POINTS);
  const width = 100;
  const height = 40;
  const coords = POINTS.map((p, i) => {
    const x = (i / (POINTS.length - 1)) * width;
    const y = height - (p / max) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass-card p-6 h-full">
      <div className="mb-6">
        <h3 className="font-semibold text-gg-charcoal">{title}</h3>
        {subtitle && <p className="text-xs text-gg-gray mt-1">{subtitle}</p>}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8B6FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon points={`0,${height} ${coords} ${width},${height}`} fill="url(#chartFill)" />
        <polyline
          points={coords}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex justify-between mt-4 text-xs text-gg-gray">
        {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}
