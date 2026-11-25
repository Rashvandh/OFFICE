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

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    adminApi.getOrders().then((res) => {
      setOrders(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matchSearch =
        !q ||
        o._id?.toLowerCase().includes(q) ||
        o.customer?.name?.toLowerCase().includes(q) ||
        o.customer?.email?.toLowerCase().includes(q);
      const matchStatus =
        statusFilter === 'all' ||
        String(o.status || '').toLowerCase() === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const columns = [
    { key: '_id', label: 'Order ID', render: (r) => `#${r._id}` },
    {
      key: 'customer',
      label: 'Customer',
      render: (r) => (
        <div>
          <p className="font-medium">{r.customer?.name || '—'}</p>
          <p className="text-[11px] text-[#77736B]">{r.customer?.email || ''}</p>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Order Date',
      sortable: true,
      render: (r) => formatDate(r.createdAt),
    },
    {
      key: 'amount',
      label: 'Total Amount',
      sortable: true,
      render: (r) => formatCurrency(r.amount),
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      render: (r) => (
        <StatusBadge
          status={r.razorpayPaymentId ? 'paid' : r.status === 'payment_failed' ? 'failed' : 'pending'}
        />
      ),
    },
    {
      key: 'status',
      label: 'Fulfilment',
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <Link
          to={`/admin/orders/${r._id}`}
          className="inline-flex items-center gap-1 rounded-sm border border-[#E9E1D5] px-2.5 py-1 text-[11px] font-semibold text-[#34332C] hover:border-[#B93627] hover:text-[#B93627]"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Track customer orders, Razorpay payment verification, and fulfilment transitions."
        breadcrumbs={[{ label: 'Orders' }]}
      />

      <ApiBoundaryBanner endpoint="/api/admin/orders" unavailable={unavailable} />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search Order ID or customer..."
          className="w-full sm:w-72"
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: 'All Statuses' },
            { value: 'created', label: 'Pending / Created' },
            { value: 'paid', label: 'Paid / Confirmed' },
            { value: 'processing', label: 'Processing' },
            { value: 'shipped', label: 'Shipped' },
            { value: 'delivered', label: 'Delivered' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyTitle="No orders found"
        emptyDescription="Live orders from MongoDB will appear here once /api/admin/orders is implemented."
      />
    </div>
  );
}
