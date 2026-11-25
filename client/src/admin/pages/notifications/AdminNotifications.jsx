import { useEffect, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import {
  PageHeader,
  FilterDropdown,
  ApiBoundaryBanner,
  AdminEmptyState,
  AdminLoadingSkeleton,
} from '../../components/common/AdminUIComponents.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatDate } from '../../../utils/formatters.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminNotifications() {
  const { showToast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');

  const load = () => {
    setLoading(true);
    adminApi.getNotifications().then((res) => {
      setItems(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = items.filter(
    (n) => typeFilter === 'all' || n.type === typeFilter
  );

  const handleMarkAll = async () => {
    const res = await adminApi.markAllNotificationsRead();
    showToast(res.message, res.ok ? 'success' : 'info');
    if (res.ok) load();
  };

  return (
    <div>
      <PageHeader
        title="Notification Centre"
        description="System alerts for new orders, low stock, franchise enquiries, and reviews."
        breadcrumbs={[{ label: 'Notifications' }]}
        actions={
          <button
            type="button"
            onClick={handleMarkAll}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[#E9E1D5] bg-white px-4 py-2 text-xs font-semibold text-[#34332C] hover:border-[#B93627]"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark All as Read
          </button>
        }
      />

      <ApiBoundaryBanner endpoint="/api/admin/notifications" unavailable={unavailable} />

      <div className="mb-5">
        <FilterDropdown
          label="Type"
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { value: 'all', label: 'All Notifications' },
            { value: 'order', label: 'New Orders' },
            { value: 'low_stock', label: 'Low Stock' },
            { value: 'franchise', label: 'Franchise Enquiries' },
            { value: 'career', label: 'Career Applications' },
            { value: 'review', label: 'Customer Reviews' },
          ]}
        />
      </div>

      {loading ? (
        <AdminLoadingSkeleton rows={4} />
      ) : filtered.length === 0 ? (
        <AdminEmptyState
          icon={Bell}
          title="No notifications"
          description="Live operational notifications will appear here once /api/admin/notifications is connected."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <div
              key={n._id}
              className={`flex items-center justify-between gap-4 rounded-md border p-4 ${
                n.read ? 'border-[#E9E1D5] bg-white' : 'border-[#B93627]/40 bg-[#FFF9F1]'
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-[#34332C]">{n.title}</p>
                <p className="text-xs text-[#77736B]">{n.message}</p>
                <p className="mt-1 text-[10px] text-[#77736B]">{formatDate(n.createdAt)}</p>
              </div>
              {!n.read && (
                <button
                  type="button"
                  onClick={() => adminApi.markNotificationRead(n._id).then(load)}
                  className="text-xs font-semibold text-[#B93627] hover:underline"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
