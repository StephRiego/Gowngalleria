export function getHomePathForRole(role) {
  return role === 'admin' ? '/admin/users' : '/dashboard';
}
