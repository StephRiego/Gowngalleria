import StatCard from '../../components/dashboard/StatCard';
import { NavIcon } from '../../components/icons/Icon';
import { formatPeso } from '../../utils/currency';
import RevenueChart from '../../components/dashboard/RevenueChart';
import DonutChart from '../../components/dashboard/DonutChart';
import InsightBanner from '../../components/dashboard/InsightBanner';

const PENDING_SHOPS = [
  { name: 'GlamFits Boutique', owner: 'Maria L.', date: 'Today', status: 'Pending' },
  { name: 'Elegance Atelier', owner: 'James K.', date: 'Today', status: 'Review' },
  { name: 'Silk & Veil', owner: 'Anna P.', date: 'Yesterday', status: 'Pending' },
];

const ACTIVITIES = [
  { text: 'Admin approved storefront — GlamFits', time: '2m ago' },
  { text: 'User updated profile — shopuser', time: '18m ago' },
  { text: 'Inventory stock modified — Elegance', time: '1h ago' },
  { text: 'New reservation created — #RV-2041', time: '2h ago' },
];

const STOREFRONTS = [
  { name: 'Rose Veil Studio', status: 'Verified', gowns: 48 },
  { name: 'Pearl Lane Bridal', status: 'Pending', gowns: 22 },
  { name: 'Luna Lace House', status: 'Verified', gowns: 61 },
];

const TRANSACTIONS = [
  { id: '#GG-1024', client: 'Sophie M.', gown: 'Ivory Cascade', amount: 1240, status: 'Completed' },
  { id: '#GG-1023', client: 'Elena R.', gown: 'Blush Royale', amount: 980, status: 'Pending' },
  { id: '#GG-1022', client: 'Claire T.', gown: 'Champagne Dream', amount: 1450, status: 'Completed' },
];

export default function SuperadminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl text-gg-charcoal">System overview</h2>
        <p className="text-gg-gray text-sm mt-1">
          Monitor sales, users, and activity across all shops — you control the entire platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Users" value="1,248" trend="12.4%" icon="users" />
        <StatCard label="Active Shops" value="38" trend="5.1%" icon="shop" />
        <StatCard label="Pending Storefronts" value="12" trend="3 new" trendUp={false} icon="clipboard" />
        <StatCard label="Reservations Today" value="86" trend="18.2%" icon="calendar" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart title="Reservation Analytics" subtitle="Platform-wide booking revenue" />
        </div>
        <DonutChart
          title="Reservation Mix"
          segments={[
            { label: 'Bridal', value: 42, color: '#D4AF37' },
            { label: 'Evening', value: 33, color: '#C8B6FF' },
            { label: 'Cocktail', value: 25, color: '#8B7762' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-gg-lavender/20 flex justify-between items-center">
            <h3 className="font-semibold text-gg-charcoal">Pending Shop Approval</h3>
            <span className="text-xs text-gg-gold font-medium">3 awaiting</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-gg-gray bg-gg-beige/50">
                <tr>
                  <th className="px-6 py-3">Shop</th>
                  <th className="px-6 py-3">Owner</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gg-lavender/10">
                {PENDING_SHOPS.map((shop) => (
                  <tr key={shop.name} className="hover:bg-gg-lavender/5 transition">
                    <td className="px-6 py-4 font-medium">{shop.name}</td>
                    <td className="px-6 py-4 text-gg-gray">{shop.owner}</td>
                    <td className="px-6 py-4 text-gg-gray">{shop.date}</td>
                    <td className="px-6 py-4">
                      <button type="button" className="text-gg-gold font-medium hover:underline text-xs mr-3">
                        Approve
                      </button>
                      <button type="button" className="text-rose-500 font-medium hover:underline text-xs">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="glass-card p-6">
          <h3 className="font-semibold text-gg-charcoal mb-4">Audit Trail Feed</h3>
          <ul className="space-y-4">
            {ACTIVITIES.map((a) => (
              <li key={a.text} className="flex gap-3 text-sm">
                <span className="w-8 h-8 rounded-full bg-gg-lavender/30 flex items-center justify-center shrink-0">
                  <NavIcon name="check" tone="success" size={16} />
                </span>
                <div>
                  <p className="text-gg-charcoal">{a.text}</p>
                  <p className="text-xs text-gg-gray mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-gg-lavender/20">
            <h3 className="font-semibold text-gg-charcoal">Recent Transactions</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-gg-gray bg-gg-beige/50">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left">Gown</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gg-lavender/10">
              {TRANSACTIONS.map((t) => (
                <tr key={t.id} className="hover:bg-gg-lavender/5">
                  <td className="px-6 py-4 font-medium">{t.id}</td>
                  <td className="px-6 py-4">{t.client}</td>
                  <td className="px-6 py-4 text-gg-gray">{t.gown}</td>
                    <td className="px-6 py-4">{formatPeso(t.amount)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        t.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="glass-card p-6 space-y-4">
          <h3 className="font-semibold text-gg-charcoal">Storefront Verification</h3>
          {STOREFRONTS.map((s) => (
            <div
              key={s.name}
              className="p-4 rounded-xl bg-gradient-to-r from-gg-cream to-gg-lavender/10 border border-gg-lavender/20 hover:shadow-soft transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gg-charcoal">{s.name}</p>
                  <p className="text-xs text-gg-gray mt-1">{s.gowns} gowns listed</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    s.status === 'Verified'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-gg-gold/20 text-gg-charcoal'
                  }`}
                >
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Bridal Suite', 'Evening Luxe', 'Designer Edit'].map((cat, i) => (
          <div key={cat} className="glass-card-hover p-5">
            <div className="h-24 rounded-xl bg-gradient-to-br from-gg-lavender/40 to-gg-gold/20 mb-3" />
            <p className="font-medium text-gg-charcoal">{cat}</p>
            <p className="text-xs text-gg-gray mt-1">{120 + i * 34} active listings</p>
          </div>
        ))}
      </div>

      <InsightBanner
        title="Platform insight"
        message="Reservation volume is up 18% this week. Review 3 pending storefront requests to unlock new boutique revenue."
        actionLabel="Review storefronts"
      />
    </div>
  );
}
