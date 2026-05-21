import StatCard from '../../components/dashboard/StatCard';
import { NavIcon, StarIcon, TrendUpIcon } from '../../components/icons/Icon';
import { formatPeso } from '../../utils/currency';
import RevenueChart from '../../components/dashboard/RevenueChart';
import DonutChart from '../../components/dashboard/DonutChart';
import InsightBanner from '../../components/dashboard/InsightBanner';

const RESERVATIONS = [
  { client: 'Amelia H.', gown: 'Silk Ember', date: 'May 22', status: 'Pending' },
  { client: 'Nina C.', gown: 'Luna Pearl', date: 'May 23', status: 'Confirmed' },
  { client: 'Grace W.', gown: 'Golden Veil', date: 'May 24', status: 'Fitting' },
];

const LOW_STOCK = [
  { name: 'Ivory Cascade M', qty: 2 },
  { name: 'Blush Royale S', qty: 1 },
  { name: 'Champagne Dream L', qty: 3 },
];

const PRODUCTS = [
  { name: 'Pearl Serenade', rentals: 28, rating: 4.9 },
  { name: 'Velvet Nocturne', rentals: 19, rating: 4.8 },
  { name: 'Dawn Tulle', rentals: 15, rating: 4.7 },
];

export default function ShopAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl text-gg-charcoal">Shop dashboard</h2>
        <p className="text-gg-gray text-sm mt-1">
          Your shop at a glance — inventory, reservations, and customer activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Orders Today" value="24" trend="8.2%" icon="bag" />
        <StatCard label="Pending Reservations" value="11" trend="4 urgent" trendUp={false} icon="calendar" />
        <StatCard label="Inventory Health" value="92%" trend="Stable" icon="inventory" />
        <StatCard label="Inquiries" value="7" trend="2 new" icon="chat" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart title="Shop Revenue" subtitle="Last 12 months — your boutique" />
        </div>
        <div className="glass-card p-6">
          <h3 className="font-semibold text-gg-charcoal mb-4">Customer Inquiries</h3>
          <ul className="space-y-3">
            {['Size exchange request', 'Fitting reschedule', 'Custom lace inquiry'].map((msg) => (
              <li
                key={msg}
                className="p-3 rounded-xl bg-gg-lavender/10 border border-gg-lavender/20 text-sm flex justify-between"
              >
                <span>{msg}</span>
                <span className="text-gg-gold text-xs inline-flex items-center gap-1">
                  <NavIcon name="bell" tone="stat" size={12} />
                  New
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-gg-lavender/20">
            <h3 className="font-semibold text-gg-charcoal">Recent Reservations</h3>
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-gg-gray bg-gg-beige/50">
              <tr>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left">Gown</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gg-lavender/10">
              {RESERVATIONS.map((r) => (
                <tr key={r.client} className="hover:bg-gg-lavender/5">
                  <td className="px-6 py-4 font-medium">{r.client}</td>
                  <td className="px-6 py-4 text-gg-gray">{r.gown}</td>
                  <td className="px-6 py-4">{r.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-gg-gold/15 text-gg-charcoal">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="glass-card p-6">
          <h3 className="font-semibold text-gg-charcoal mb-4">Low Stock Alerts</h3>
          <ul className="space-y-3">
            {LOW_STOCK.map((item) => (
              <li
                key={item.name}
                className="flex justify-between p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-sm"
              >
                <span>{item.name}</span>
                <span className="font-semibold text-rose-600">{item.qty} left</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => (
          <div key={p.name} className="glass-card-hover p-5">
            <div className="h-20 rounded-xl bg-gradient-to-br from-gg-gold/20 to-gg-lavender/30 mb-3" />
            <p className="font-medium">{p.name}</p>
            <p className="text-xs text-gg-gray mt-1 flex items-center justify-center gap-1">
              {p.rentals} rentals
              <StarIcon tone="stat" size={12} className="inline" />
              {p.rating}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DonutChart
          title="Inventory Status"
          segments={[
            { label: 'In stock', value: 72, color: '#D4AF37' },
            { label: 'Reserved', value: 18, color: '#C8B6FF' },
            { label: 'Low', value: 10, color: '#E11D48' },
          ]}
        />
        <div className="glass-card p-6 flex flex-col justify-center">
          <p className="text-sm text-gg-gray">Quick widget</p>
          <p className="font-display text-4xl text-gg-charcoal mt-2">{formatPeso(18400, { compact: true })}</p>
          <p className="text-sm text-gg-gray mt-1">Revenue this month</p>
          <p className="stat-trend-up mt-4 inline-flex items-center gap-1 w-fit">
            <TrendUpIcon tone="success" size={14} className="!text-emerald-600" />
            14.3% vs last month
          </p>
        </div>
      </div>

      <InsightBanner
        title="Boutique tip"
        message="3 gowns are running low on stock. Restock before the weekend wedding rush."
        actionLabel="View inventory"
      />
    </div>
  );
}
