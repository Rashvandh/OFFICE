import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import AdminLayout from '../layout/AdminLayout.jsx';

export default function AdminRouteGuard({ permission, children }) {
  const { isAuthenticated, can } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (permission && !can(permission)) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
