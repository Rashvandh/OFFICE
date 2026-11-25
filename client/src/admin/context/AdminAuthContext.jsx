import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { adminApi } from '../services/adminApi.js';
import { ROLE_LABELS, hasPermission } from '../permissions/roles.js';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      const raw = localStorage.getItem(adminApi.SESSION_KEY);
      return raw ? JSON.parse(raw).admin : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      const raw = localStorage.getItem(adminApi.SESSION_KEY);
      return raw ? JSON.parse(raw).token : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (admin && token) {
        localStorage.setItem(adminApi.SESSION_KEY, JSON.stringify({ admin, token }));
      } else {
        localStorage.removeItem(adminApi.SESSION_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [admin, token]);

  const login = async ({ email, password, rememberMe }) => {
    setLoading(true);
    try {
      const res = await adminApi.client.post('/admin/auth/login', {
        email,
        password,
        rememberMe: Boolean(rememberMe),
      });
      const data = res?.data?.data || res?.data;
      const authenticatedAdmin = data?.admin || data?.user;
      if (!authenticatedAdmin || !data?.token) {
        return {
          success: false,
          message: 'Authentication response did not include a valid session.',
        };
      }
      setAdmin(authenticatedAdmin);
      setToken(data.token);
      return { success: true, admin: authenticatedAdmin };
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        return {
          success: false,
          message: err.response?.data?.message || 'Invalid email or password.',
        };
      }
      return {
        success: false,
        unavailable: !status || status === 404 || status === 501,
        message:
          err.response?.data?.message ||
          'Authentication endpoint (POST /api/admin/auth/login) is not yet available on the backend.',
      };
    } finally {
      setLoading(false);
    }
  };

  const updateAdminProfile = async (updates) => {
    const res = await adminApi.client
      .put('/admin/auth/profile', updates)
      .then((r) => ({ ok: true, data: r.data }))
      .catch((e) => ({
        ok: false,
        message:
          e.response?.data?.message ||
          'Profile update endpoint (PUT /api/admin/auth/profile) is not yet available.',
      }));
    if (res.ok) {
      setAdmin((prev) => ({ ...prev, ...updates }));
    }
    return res;
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      admin,
      token,
      role: admin?.role || null,
      roleLabel: ROLE_LABELS[admin?.role] || admin?.role || '',
      isAuthenticated: Boolean(admin && token),
      loading,
      login,
      updateAdminProfile,
      logout,
      can: (permission) => hasPermission(admin?.role, permission),
    }),
    [admin, token, loading]
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
