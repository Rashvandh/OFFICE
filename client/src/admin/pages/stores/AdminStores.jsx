import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  PageHeader,
  SearchInput,
  StatusBadge,
  ApiBoundaryBanner,
  ConfirmDialog,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminStores() {
  const { showToast } = useToast();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    adminApi.getStores().then((res) => {
      setStores(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return stores.filter(
      (s) =>
        !q ||
        s.name?.toLowerCase().includes(q) ||
        s.district?.toLowerCase().includes(q) ||
        s.state?.toLowerCase().includes(q)
    );
  }, [stores, search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await adminApi.deleteStore(deleteTarget._id);
    showToast(res.message, res.ok ? 'success' : 'info');
    setDeleteTarget(null);
    if (res.ok) load();
  };

  const columns = [
    { key: 'name', label: 'Store Name', sortable: true },
    { key: 'city', label: 'City' },
    { key: 'district', label: 'District' },
    { key: 'state', label: 'State' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'isActive',
      label: 'Status',
      render: (r) => <StatusBadge status={r.isActive !== false ? 'active' : 'inactive'} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <PermissionGuard permission="stores.manage">
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/stores/${r._id}/edit`}
              className="rounded p-1.5 text-[#77736B] hover:bg-[#FFF9F1] hover:text-[#B93627]"
              aria-label={`Edit ${r.name}`}
            >
              <Edit className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setDeleteTarget(r)}
              className="rounded p-1.5 text-[#77736B] hover:bg-red-50 hover:text-[#B93627]"
              aria-label={`Delete ${r.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </PermissionGuard>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Store Locator"
        description="Manage verified GRAMIYAM retail store locations and timings."
        breadcrumbs={[{ label: 'Store Locator' }]}
        actions={
          <PermissionGuard permission="stores.manage">
            <Link
              to="/admin/stores/add"
              className="inline-flex items-center gap-1.5 rounded-sm bg-[#B93627] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
            >
              <Plus className="h-4 w-4" />
              Add Store
            </Link>
          </PermissionGuard>
        }
      />

      <ApiBoundaryBanner endpoint="/api/admin/stores" unavailable={unavailable} />

      <div className="mb-5">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search store name, district, or state..."
          className="w-full sm:w-72"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyTitle="No stores in database"
        emptyDescription="Verified store locations will appear here once /api/admin/stores is connected."
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Store"
        message={`Remove "${deleteTarget?.name}" from the store locator?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
