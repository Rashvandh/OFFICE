import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'gramiyam_auth_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved).user : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved).token : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (user || token) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [user, token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', credentials);
      setUser(data.user);
      setToken(data.token);
      return { success: true, user: data.user };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Authentication service is currently unavailable. Please ensure the backend /api/auth/login endpoint is active.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', payload);
      setUser(data.user);
      setToken(data.token);
      return { success: true, user: data.user };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Registration service is currently unavailable. Please ensure the backend /api/auth/register endpoint is active.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profile', updates);
      setUser(data.user || { ...user, ...updates });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          'Unable to update profile until backend authentication is connected.',
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      loading,
      login,
      register,
      updateProfile,
      logout,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
