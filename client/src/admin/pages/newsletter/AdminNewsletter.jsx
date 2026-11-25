import { useEffect, useMemo, useState } from 'react';
import { Mail, UserCheck, UserX, Download } from 'lucide-react';
import {
  PageHeader,
  StatCard,
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

export default function AdminNewsletter() {
  const { showToast } = useToast();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const load = () => {
    setLoading(true);
    adminApi.getNewsletterSubscribers().then((res) => {
      setSubscribers(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return subscribers.filter((s) => {
      const matchSearch = !q || s.email?.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [subscribers, search, statusFilter]);

  const handleUnsubscribe = async (id) => {
    const res = await adminApi.updateSubscriberStatus(id, 'unsubscribed');
    showToast(res.message, res.ok ? 'success' : 'info');
    if (res.ok) load();
  };

  const columns = [
    { key: 'email', label: 'Email Address', sortable: true },
    { key: 'createdAt', label: 'Subscribed Date', render: (r) => formatDate(r.createdAt) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status || 'active'} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <PermissionGuard permission="newsletter.manage">
          {r.status !== 'unsubscribed' && (
            <button
              type="button"
              onClick={() => handleUnsubscribe(r._id)}
              className="rounded-sm border border-[#E9E1D5] px-2.5 py-1 text-[11px] font-semibold text-[#77736B] hover:border-[#B93627] hover:text-[#B93627]"
            >
              Mark Unsubscribed
            </button>
          )}
        </PermissionGuard>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Newsletter Subscribers"
        description="Manage subscriber records and export lists. Marketing emails require explicit authorized integration."
        breadcrumbs={[{ label: 'Newsletter' }]}
        actions={
          <button
            type="button"
            onClick={() => {
              const csv = [['Email', 'Status', 'Date']]
                .concat(filtered.map((s) => [s.email, s.status || 'active', s.createdAt]))
                .map((r) => r.join(','))
                .join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'gramiyam-subscribers.csv';
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

      <ApiBoundaryBanner endpoint="/api/admin/newsletter" unavailable={unavailable} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Subscribers" value={subscribers.length} icon={Mail} />
        <StatCard
          label="Active"
          value={subscribers.filter((s) => s.status !== 'unsubscribed').length}
          icon={UserCheck}
        />
        <StatCard
          label="Unsubscribed"
          value={subscribers.filter((s) => s.status === 'unsubscribed').length}
          icon={UserX}
        />
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Search email..." className="w-full sm:w-72" />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: 'All Subscribers' },
            { value: 'active', label: 'Active' },
            { value: 'unsubscribed', label: 'Unsubscribed' },
          ]}
        />
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} emptyTitle="No subscribers yet" />
    </div>
  );
}
