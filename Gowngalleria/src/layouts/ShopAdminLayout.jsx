import DashboardShell from './DashboardShell';
import { SHOP_ADMIN_NAV } from '../config/navigation';

export default function ShopAdminLayout() {
  return (
    <DashboardShell
      brandSubtitle="Shop Manager"
      panelTitle="Shop Operations"
      navItems={SHOP_ADMIN_NAV}
      searchPlaceholder="Search inventory, reservations, customers..."
    />
  );
}
