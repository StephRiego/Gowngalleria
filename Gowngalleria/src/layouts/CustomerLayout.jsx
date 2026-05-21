import DashboardShell from './DashboardShell';
import { CUSTOMER_NAV } from '../config/navigation';

export default function CustomerLayout() {
  return (
    <DashboardShell
      brandSubtitle="Boutique Client"
      panelTitle="My GownGalleria"
      navItems={CUSTOMER_NAV}
      searchPlaceholder="Search gowns, reservations, messages..."
    />
  );
}
