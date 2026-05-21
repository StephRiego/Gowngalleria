import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import SuperadminLayout from './layouts/SuperadminLayout';
import ShopAdminLayout from './layouts/ShopAdminLayout';
import CustomerLayout from './layouts/CustomerLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SuperadminDashboard from './pages/admin/SuperadminDashboard';
import SuperadminUsers from './pages/admin/SuperadminUsers';
import SuperadminShops from './pages/admin/SuperadminShops';
import ShopAdminDashboard from './pages/shop/ShopAdminDashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ModulePlaceholder from './components/dashboard/ModulePlaceholder';
import { getHomePathForRole } from './utils/auth';
import { useAuth } from './context/AuthContext';

function RoleRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={getHomePathForRole(user.role)} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Superadmin — full system control */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <SuperadminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SuperadminDashboard />} />
          <Route path="shops" element={<SuperadminShops />} />
          <Route path="users" element={<SuperadminUsers />} />
          <Route path="settings" element={<ModulePlaceholder title="System Settings" />} />
          <Route path="reports" element={<ModulePlaceholder title="Reports" />} />
          <Route path="audit" element={<ModulePlaceholder title="Audit Trail" />} />
        </Route>

        {/* Shop Admin — one shop operations */}
        <Route
          path="/shop"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ShopAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ShopAdminDashboard />} />
          <Route path="shop" element={<ModulePlaceholder title="Shop Management" />} />
          <Route path="inventory" element={<ModulePlaceholder title="Inventory" />} />
          <Route path="reservations" element={<ModulePlaceholder title="Reservations" />} />
          <Route path="chat" element={<ModulePlaceholder title="Chat" />} />
          <Route path="customer-reports" element={<ModulePlaceholder title="Customer Reports" />} />
          <Route path="returns" element={<ModulePlaceholder title="Returns" />} />
        </Route>

        {/* Customer — reserve, chat, returns */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<CustomerDashboard />} />
          <Route path="profile" element={<ModulePlaceholder title="Profile" />} />
          <Route path="reservations" element={<ModulePlaceholder title="Reservations" />} />
          <Route path="returns" element={<ModulePlaceholder title="Returns" />} />
          <Route path="chat" element={<ModulePlaceholder title="Chat" />} />
        </Route>

        <Route path="/dashboard" element={<RoleRedirect />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
