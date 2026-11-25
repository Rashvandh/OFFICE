import { useEffect, useMemo, useState } from 'react';
import { Check, X as XIcon, EyeOff } from 'lucide-react';
import {
  PageHeader,
  SearchInput,
  FilterDropdown,
  StatusBadge,
  ApiBoundaryBanner,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatDate } from '../../../utils/formatters.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminReviews() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const load = () => {
    setLoading(true);
    adminApi.getReviews().then((res) => {
      setReviews(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return reviews.filter((r) => {
      const matchSearch =
        !q ||
        r.customerName?.toLowerCase().includes(q) ||
        r.productName?.toLowerCase().includes(q) ||
        r.comment?.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [reviews, search, statusFilter]);

  const handleModerate = async (id, status) => {
    const res = await adminApi.moderateReview(id, status);
    showToast(res.message, res.ok ? 'success' : 'info');
    if (res.ok) load();
  };

  const columns = [
    { key: 'customerName', label: 'Customer' },
    { key: 'productName', label: 'Product' },
    { key: 'rating', label: 'Rating', render: (r) => `${r.rating || 0} / 5` },
    {
      key: 'comment',
      label: 'Review',
      render: (r) => <span className="max-w-xs truncate block">{r.comment}</span>,
    },
    { key: 'createdAt', label: 'Date', render: (r) => formatDate(r.createdAt) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status || 'pending'} /> },
    {
      key: 'actions',
      label: 'Moderation',
      render: (r) => (
        <PermissionGuard permission="reviews.moderate">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleModerate(r._id, 'approved')}
              title="Approve"
              className="rounded p-1.5 text-emerald-700 hover:bg-emerald-50"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleModerate(r._id, 'rejected')}
              title="Reject"
              className="rounded p-1.5 text-[#B93627] hover:bg-red-50"
            >
              <XIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleModerate(r._id, 'hidden')}
              title="Hide"
              className="rounded p-1.5 text-[#77736B] hover:bg-stone-100"
            >
              <EyeOff className="h-4 w-4" />
            </button>
          </div>
        </PermissionGuard>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Customer Reviews"
        description="Moderate verified customer reviews. Reviews are never fabricated."
        breadcrumbs={[{ label: 'Reviews' }]}
      />
      <ApiBoundaryBanner endpoint="/api/admin/reviews" unavailable={unavailable} />
      <div className="mb-5 flex flex-wrap gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search customer or product..." className="w-full sm:w-72" />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: 'All Statuses' },
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
            { value: 'hidden', label: 'Hidden' },
          ]}
        />
      </div>
      <DataTable columns={columns} data={filtered} loading={loading} emptyTitle="No customer reviews" />
    </div>
  );
}
