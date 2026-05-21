import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getHomePathForRole } from '../utils/auth';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  // 1. If the AuthContext is still checking for an existing token, show a elegant loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-luxury-beige">
        <div className="text-luxury-muted font-medium animate-pulse">
          Verifying security clearance...
        </div>
      </div>
    );
  }

  // 2. Clearances Check: If no user is authenticated, redirect them to the login screen cleanly
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Authorization Check: If roles are specified and the user does not have clearance, redirect to unauthorized page
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getHomePathForRole(user.role)} replace />;
  }

  // 4. If all checkpoints pass successfully, render the target protected UI views
  return children;
}