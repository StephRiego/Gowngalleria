import ModulePage from '../../components/dashboard/ModulePage';
import { formatPeso } from '../../utils/currency';

const SHOPS = [
  { name: 'GlamFits Boutique', owner: 'Maria L.', status: 'Pending', date: 'Today', gowns: 0 },
  { name: 'Elegance Atelier', owner: 'James K.', status: 'Pending', date: 'Today', gowns: 12 },
  { name: 'Rose Veil Studio', owner: 'Anna P.', status: 'Active', date: 'Mar 12', gowns: 48 },
  { name: 'Pearl Lane Bridal', owner: 'Sofia R.', status: 'Active', date: 'Feb 28', gowns: 61 },
];

export default function SuperadminShops() {
  return (
    <ModulePage
      title="Shop Management"
      icon="shop"
      description="Add, approve, or remove shop accounts across the platform. Approved shops can list inventory and accept reservations."
    >
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gg-lavender/20 flex justify-between items-center">
          <h3 className="font-semibold text-gg-charcoal">Registered storefronts</h3>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-gg-gold text-white text-sm font-medium hover:opacity-90 transition shadow-gold"
          >
            + Add shop
          </button>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase text-gg-gray bg-gg-beige/50">
            <tr>
              <th className="px-6 py-3">Shop</th>
              <th className="px-6 py-3">Owner</th>
              <th className="px-6 py-3">Listings</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gg-lavender/10">
            {SHOPS.map((shop) => (
              <tr key={shop.name} className="hover:bg-gg-lavender/5">
                <td className="px-6 py-4 font-medium">{shop.name}</td>
                <td className="px-6 py-4 text-gg-gray">{shop.owner}</td>
                <td className="px-6 py-4">{shop.gowns} gowns</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      shop.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {shop.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {shop.status === 'Pending' ? (
                    <>
                      <button type="button" className="text-gg-gold font-medium text-xs mr-3 hover:underline">
                        Approve
                      </button>
                      <button type="button" className="text-rose-600 font-medium text-xs hover:underline">
                        Remove
                      </button>
                    </>
                  ) : (
                    <button type="button" className="text-gg-gray font-medium text-xs hover:underline">
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gg-gray">
        System-wide sales from active shops are summarized in Reports ({formatPeso(248000, { compact: true })} this month).
      </p>
    </ModulePage>
  );
}
