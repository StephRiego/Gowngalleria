import { NavIcon, IconBox, TrendUpIcon, TrendDownIcon } from '../icons/Icon';

export default function StatCard({ label, value, trend, trendUp = true, icon }) {
  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gg-gray font-medium">{label}</p>
          <p className="font-display text-3xl text-gg-charcoal mt-2">{value}</p>
          {trend && (
            <span
              className={`inline-flex items-center gap-1 mt-2 ${
                trendUp ? 'stat-trend-up' : 'stat-trend-down'
              }`}
            >
              {trendUp ? (
                <TrendUpIcon tone="success" size={14} className="!text-emerald-600" />
              ) : (
                <TrendDownIcon tone="muted" size={14} className="!text-rose-600" />
              )}
              {trend}
            </span>
          )}
        </div>
        {icon && (
          <IconBox>
            <NavIcon name={icon} tone="stat" size={22} />
          </IconBox>
        )}
      </div>
    </div>
  );
}
