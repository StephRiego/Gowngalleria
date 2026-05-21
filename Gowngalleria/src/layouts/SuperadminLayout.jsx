import DashboardShell from './DashboardShell';
import { SUPERADMIN_NAV } from '../config/navigation';

export default function SuperadminLayout() {
  return (
    <DashboardShell
      brandSubtitle="System Owner"
      panelTitle="GownGalleria Superadmin"
      navItems={SUPERADMIN_NAV}
      searchPlaceholder="Search shops, users, system logs..."
    />
  );
}
