import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 1. Import your brand new AuthProvider engine layer
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap the App inside AuthProvider so useAuth() works on the Login page! */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)