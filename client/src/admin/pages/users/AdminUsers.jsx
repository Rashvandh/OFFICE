import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Plus, Edit } from 'lucide-react';
import {
  PageHeader,
  StatusBadge,
  ApiBoundaryBanner,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { ROLE_LABELS } from '../../permissions/roles.js';
import { formatDate } from '../../../utils/formatters.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminUsers() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isForm = pathname.endsWith('/add') || pathname.endsWith('/edit');
  const isEdit = Boolean(id);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { role: 'PRODUCT_MANAGER', status: 'active' },
  });

  useEffect(() => {
    setLoading(true);
    if (isForm && isEdit) {
      adminApi.getAdminUser(id).then((res) => {
        if (res.data) reset(res.data);
        setUnavailable(res.unavailable);
        setLoading(false);
      });
    } else if (!isForm) {
      adminApi.getAdminUsers().then((res) => {
        setUsers(res.data || []);
        setUnavailable(res.unavailable);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id, isEdit, isForm, reset]);

  if (isForm) {
    const onSubmit = async (values) => {
      const res = await adminApi.saveAdminUser(id, values);
      showToast(res.message, res.ok ? 'success' : 'info');
      if (res.ok) navigate('/admin/users');
    };

    return (
      <div>
        <PageHeader
          title={isEdit ? 'Edit Admin User' : 'Create Admin User'}
          description="Assign one of the five GRAMIYAM administrative roles. Passwords are never displayed."
          breadcrumbs={[
            { label: 'Admin Users', to: '/admin/users' },
            { label: isEdit ? 'Edit' : 'Create' },
          ]}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4"
        >
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Full Name *</span>
            <input type="text" required className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('name', { required: true })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Email *</span>
            <input type="email" required className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('email', { required: true })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Contact Number</span>
            <input type="tel" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('phone')} />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Assigned Role *</span>
              <select className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('role', { required: true })}>
                {Object.entries(ROLE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Account Status</span>
              <select className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('status')}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="rounded-sm bg-[#B93627] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]">
              Save Admin User
            </button>
            <Link to="/admin/users" className="rounded-sm border border-[#E9E1D5] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#34332C]">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (r) => ROLE_LABELS[r.role] || r.role },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status || 'active'} /> },
    { key: 'lastLogin', label: 'Last Login', render: (r) => formatDate(r.lastLogin) },
    { key: 'createdAt', label: 'Created', render: (r) => formatDate(r.createdAt) },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <Link to={`/admin/users/${r._id}/edit`} className="inline-flex items-center gap-1 rounded-sm border border-[#E9E1D5] px-2.5 py-1 text-[11px] font-semibold hover:border-[#B93627] hover:text-[#B93627]">
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Users & Permissions"
        description="Super Admin control over administrator accounts and role assignments."
        breadcrumbs={[{ label: 'Admin Users' }]}
        actions={
          <Link
            to="/admin/users/add"
            className="inline-flex items-center gap-1.5 rounded-sm bg-[#B93627] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
          >
            <Plus className="h-4 w-4" />
            Create Admin
          </Link>
        }
      />
      <ApiBoundaryBanner endpoint="/api/admin/users" unavailable={unavailable} />
      <DataTable columns={columns} data={users} loading={loading} emptyTitle="No admin users returned" />
    </div>
  );
}
