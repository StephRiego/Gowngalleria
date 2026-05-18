import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Configure baseline defaults for handling operations cleanly to your Laravel backend
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Accept'] = 'application/json';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Check local storage memory for an existing session token on app load
    const token = localStorage.getItem('gg_auth_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch the active profile data to verify the token is still valid
      axios.get('/user')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          // If token is invalid or expired, clear out the broken configuration cleanly
          localStorage.removeItem('gg_auth_token');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // 3. Login function to store token and track profile data seamlessly
  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      const { token, user_data } = response.data;

      localStorage.setItem('gg_auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user_data);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  // 4. Logout function to clear session memory entirely
  const logout = async () => {
    try {
      await axios.post('/logout');
    } catch (error) {
      console.error("Logout error on server:", error);
    } finally {
      localStorage.removeItem('gg_auth_token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to quickly access authentication states across your pages
export function useAuth() {
  return useContext(AuthContext);
}