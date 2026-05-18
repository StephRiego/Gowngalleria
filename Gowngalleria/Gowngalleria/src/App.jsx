import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Security Gatekeeper Layer Checkpoint
import ProtectedRoute from './routes/ProtectedRoute';

// Real Application Module Interfaces
import Login from './pages/auth/Login';
import SuperadminUsers from './pages/SuperadminUsers';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Gateways */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Administration Channels 
          Only authenticated users with the 'admin' role can cross this line.
        */}
        <Route 
          path="/admin/users" 
          element = {
            <ProtectedRoute allowedRoles={['admin']}>
              <SuperadminUsers />
            </ProtectedRoute>
          } 
        />

        {/* Global System Fallback Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;