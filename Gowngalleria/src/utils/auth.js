export function getHomePathForRole(role) {
  if (role === 'superadmin') return '/admin/dashboard';
  if (role === 'admin') return '/shop/dashboard';
  return '/customer/home';
}
