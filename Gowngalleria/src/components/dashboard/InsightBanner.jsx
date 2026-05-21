export default function InsightBanner({ title, message, actionLabel }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-gg-lavender/30 via-gg-cream to-gg-gold/20 border border-gg-gold/20 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-soft">
      <div>
        <h3 className="font-display text-xl text-gg-charcoal">{title}</h3>
        <p className="text-sm text-gg-gray mt-1">{message}</p>
      </div>
      {actionLabel && (
        <button
          type="button"
          className="px-5 py-2.5 rounded-xl bg-gg-gold text-white text-sm font-semibold hover:opacity-90 transition shadow-gold shrink-0"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
