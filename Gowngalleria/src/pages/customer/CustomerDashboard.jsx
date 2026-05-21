import StatCard from '../../components/dashboard/StatCard';
import InsightBanner from '../../components/dashboard/InsightBanner';
import { formatPeso } from '../../utils/currency';

const BOOKINGS = [
  { gown: 'Ivory Cascade', event: 'Gala Night', date: 'Jun 12', status: 'Confirmed' },
  { gown: 'Blush Royale', event: 'Wedding Guest', date: 'Jun 28', status: 'Fitting' },
];

const GOWNS = [
  { name: 'Champagne Dream', designer: 'Atelier No. 7', price: 420 },
  { name: 'Luna Lace', designer: 'Pearl Lane', price: 380 },
  { name: 'Golden Veil', designer: 'Rose Veil', price: 510 },
];

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl text-gg-charcoal">Welcome back</h2>
        <p className="text-gg-gray text-sm mt-1">
          Browse gowns, manage reservations, chat with shops, and request returns.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Upcoming Bookings" value="2" icon="calendar" />
        <StatCard label="Open Returns" value="0" icon="returns" />
        <StatCard label="Chat Messages" value="3" trend="1 unread" icon="chat" />
      </div>

      <div className="glass-card p-6 overflow-hidden">
        <h3 className="font-semibold text-gg-charcoal mb-4">Gown Showcase</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {GOWNS.map((g) => (
            <div
              key={g.name}
              className="min-w-[220px] snap-start rounded-2xl overflow-hidden border border-gg-lavender/20 hover:shadow-soft transition"
            >
              <div className="h-36 bg-gradient-to-br from-gg-lavender/50 via-gg-cream to-gg-gold/30" />
              <div className="p-4 bg-gg-cream/90">
                <p className="font-medium text-gg-charcoal">{g.name}</p>
                <p className="text-xs text-gg-gray">{g.designer}</p>
                <p className="text-sm text-gg-gold font-semibold mt-2">{formatPeso(g.price)} / rental</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="glass-card p-6">
          <h3 className="font-semibold text-gg-charcoal mb-4">Reservation Tracking</h3>
          <ul className="space-y-4">
            {BOOKINGS.map((b) => (
              <li
                key={b.gown}
                className="p-4 rounded-xl border border-gg-lavender/20 bg-gradient-to-r from-gg-cream to-gg-lavender/5"
              >
                <div className="flex justify-between">
                  <p className="font-medium">{b.gown}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-gg-gold/15">{b.status}</span>
                </div>
                <p className="text-sm text-gg-gray mt-1">
                  {b.event} · {b.date}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card p-6">
          <h3 className="font-semibold text-gg-charcoal mb-4">Recommended Gowns</h3>
          <div className="space-y-3">
            {GOWNS.map((g) => (
              <div key={g.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gg-lavender/10 transition">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gg-gold/30 to-gg-lavender/40 shrink-0" />
                <div>
                  <p className="font-medium text-sm">{g.name}</p>
                  <p className="text-xs text-gg-gray">Perfect for your next event</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="glass-card p-6">
          <h3 className="font-semibold text-gg-charcoal mb-3">Returns</h3>
          <p className="text-sm text-gg-gray">Request a return or refund if something isn’t right with your rental.</p>
          <button
            type="button"
            className="mt-4 px-4 py-2 rounded-xl border border-gg-lavender/30 text-gg-charcoal text-sm font-medium hover:bg-gg-lavender/20 transition"
          >
            Request return
          </button>
        </section>

        <section className="glass-card p-6">
          <h3 className="font-semibold text-gg-charcoal mb-3">Chat with shop</h3>
          <p className="text-sm text-gg-gray">Message shop admins for sizing, fittings, and inquiries.</p>
          <button
            type="button"
            className="mt-4 px-4 py-2 rounded-xl bg-gg-lavender/30 text-gg-charcoal text-sm font-medium hover:bg-gg-lavender/50 transition"
          >
            Open chat
          </button>
        </section>
      </div>

      <InsightBanner
        title="Your profile"
        message="Keep your contact details up to date so shops can confirm reservations and fittings."
        actionLabel="Edit profile"
      />
    </div>
  );
}
