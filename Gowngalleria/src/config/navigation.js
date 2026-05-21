/** Superadmin — full system control (owner / highest authority) */
export const SUPERADMIN_NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/admin/shops', label: 'Shop Management', icon: 'shop' },
  { to: '/admin/users', label: 'User Management', icon: 'users' },
  { to: '/admin/settings', label: 'System Settings', icon: 'settings' },
  { to: '/admin/reports', label: 'Reports', icon: 'chart' },
  { to: '/admin/audit', label: 'Audit Trail', icon: 'shield' },
];

/** Shop Admin — one shop: products, inventory, customers */
export const SHOP_ADMIN_NAV = [
  { to: '/shop/dashboard', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/shop/shop', label: 'Shop Management', icon: 'shop' },
  { to: '/shop/inventory', label: 'Inventory', icon: 'inventory' },
  { to: '/shop/reservations', label: 'Reservations', icon: 'calendar' },
  { to: '/shop/chat', label: 'Chat', icon: 'chat' },
  { to: '/shop/customer-reports', label: 'Customer Reports', icon: 'chart' },
  { to: '/shop/returns', label: 'Returns', icon: 'returns' },
];

/** Customer — browse, reserve, communicate */
export const CUSTOMER_NAV = [
  { to: '/customer/home', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/customer/profile', label: 'Profile', icon: 'profile' },
  { to: '/customer/reservations', label: 'Reservations', icon: 'calendar' },
  { to: '/customer/returns', label: 'Returns', icon: 'returns' },
  { to: '/customer/chat', label: 'Chat', icon: 'chat' },
];

export const ROLE_SUMMARY = {
  superadmin: {
    title: 'Superadmin',
    subtitle: 'System owner — controls and monitors the entire platform.',
  },
  admin: {
    title: 'Shop Admin',
    subtitle: 'Manages your shop’s inventory, reservations, and customers.',
  },
  user: {
    title: 'Customer',
    subtitle: 'Books services, requests returns, and chats with shops.',
  },
};
