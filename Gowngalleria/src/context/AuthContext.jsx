import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Accept'] = 'application/json';

const AuthContext = createContext(null);

function extractErrorMessage(error, fallback) {
  const data = error.response?.data;
  if (data?.message) return data.message;
  if (data?.errors) {
    const first = Object.values(data.errors)[0];
    return Array.isArray(first) ? first[0] : first;
  }
  return fallback;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(
    () => !!localStorage.getItem('gg_auth_token'),
  );

  const applySession = (token, userData) => {
    localStorage.setItem('gg_auth_token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  useEffect(() => {
    const token = localStorage.getItem('gg_auth_token');
    if (!token) return;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios
      .get('/user')
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem('gg_auth_token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (loginId, password) => {
    try {
      const response = await axios.post('/login', { login: loginId, password });
      const { token, user_data } = response.data;
      applySession(token, user_data);
      return { success: true, user: user_data };
    } catch (error) {
      return {
        success: false,
        message: extractErrorMessage(error, 'Login failed. Please check your credentials.'),
      };
    }
  };

  const register = async (payload) => {
    try {
      const response = await axios.post('/register', payload);
      const { token, user_data } = response.data;
      applySession(token, user_data);
      return { success: true, user: user_data };
    } catch (error) {
      return {
        success: false,
        message: extractErrorMessage(error, 'Registration failed. Please try again.'),
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
    } catch (error) {
      console.error('Logout error on server:', error);
    } finally {
      localStorage.removeItem('gg_auth_token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useAuth() {
  return useContext(AuthContext);
}
