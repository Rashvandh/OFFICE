import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import {
  PageHeader,
  SearchInput,
  FilterDropdown,
  StatusBadge,
  ApiBoundaryBanner,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatCurrency, formatDate } from '../../../utils/formatters.js';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    adminApi.getCustomers().then((res) => {
      setCustomers(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return customers.filter((c) => {
      const matchSearch =
        !q ||
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [customers, search, statusFilter]);

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'createdAt', label: 'Registered', render: (r) => formatDate(r.createdAt) },
    { key: 'totalOrders', label: 'Orders', sortable: true },
    { key: 'totalSpent', label: 'Total Spent', render: (r) => formatCurrency(r.totalSpent) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status || 'active'} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <Link
          to={`/admin/customers/${r._id}`}
          className="inline-flex items-center gap-1 rounded-sm border border-[#E9E1D5] px-2.5 py-1 text-[11px] font-semibold hover:border-[#B93627] hover:text-[#B93627]"
        >
          <Eye className="h-3.5 w-3.5" />
          Profile
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Customers"
        description="View registered customer profiles, order counts, and support history."
        breadcrumbs={[{ label: 'Customers' }]}
      />

      <ApiBoundaryBanner endpoint="/api/admin/customers" unavailable={unavailable} />

      <div className="mb-5 flex flex-wrap gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search name, email, or phone..."
          className="w-full sm:w-72"
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: 'All Accounts' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyTitle="No customer records"
        emptyDescription="Registered customer accounts will appear here once /api/admin/customers is implemented."
      />
    </div>
  );
}
