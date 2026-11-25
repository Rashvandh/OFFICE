import { useEffect, useMemo, useState } from 'react';
import { CreditCard, CheckCircle2, Clock, XCircle, Download } from 'lucide-react';
import {
  PageHeader,
  StatCard,
  SearchInput,
  FilterDropdown,
  StatusBadge,
  ApiBoundaryBanner,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatCurrency, formatDate } from '../../../utils/formatters.js';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    adminApi.getPayments().then((res) => {
      setPayments(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return payments.filter((p) => {
      const matchSearch =
        !q ||
        p.razorpayPaymentId?.toLowerCase().includes(q) ||
        p.razorpayOrderId?.toLowerCase().includes(q) ||
        p.orderId?.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [payments, search, statusFilter]);

  const columns = [
    { key: 'transactionId', label: 'Transaction ID', render: (r) => r.razorpayPaymentId || r._id },
    { key: 'orderId', label: 'Order ID', render: (r) => `#${r.orderId || r._id}` },
    { key: 'customer', label: 'Customer', render: (r) => r.customer?.name || '—' },
    { key: 'method', label: 'Method', render: (r) => r.method || 'Razorpay' },
    { key: 'amount', label: 'Amount', render: (r) => formatCurrency(r.amount) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'createdAt', label: 'Date', render: (r) => formatDate(r.createdAt) },
  ];

  return (
    <div>
      <PageHeader
        title="Payments & Reconciliation"
        description="View verified Razorpay transactions and order payment references. Secret keys are never exposed."
        breadcrumbs={[{ label: 'Payments' }]}
        actions={
          <button
            type="button"
            onClick={() => {
              const csv = [['Transaction', 'Order', 'Amount', 'Status']]
                .concat(filtered.map((p) => [p.razorpayPaymentId || p._id, p.orderId, p.amount, p.status]))
                .map((r) => r.join(','))
                .join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'gramiyam-payments.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[#E9E1D5] bg-white px-4 py-2.5 text-xs font-semibold text-[#34332C] hover:border-[#B93627]"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        }
      />

      <ApiBoundaryBanner endpoint="/api/admin/payments" unavailable={unavailable} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Records" value={payments.length} icon={CreditCard} />
        <StatCard
          label="Successful"
          value={payments.filter((p) => p.status === 'paid').length}
          icon={CheckCircle2}
        />
        <StatCard
          label="Pending"
          value={payments.filter((p) => p.status === 'pending').length}
          icon={Clock}
        />
        <StatCard
          label="Failed"
          value={payments.filter((p) => p.status === 'failed').length}
          icon={XCircle}
        />
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search Razorpay Order or Payment ID..."
          className="w-full sm:w-72"
        />
        <FilterDropdown
          label="Payment Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: 'All Statuses' },
            { value: 'paid', label: 'Paid' },
            { value: 'pending', label: 'Pending' },
            { value: 'failed', label: 'Failed' },
          ]}
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyTitle="No payment records"
        emptyDescription="Verified Razorpay payment records will appear here once /api/admin/payments is connected."
      />
    </div>
  );
}
