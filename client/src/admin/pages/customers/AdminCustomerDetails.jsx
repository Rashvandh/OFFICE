import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  PageHeader,
  AdminLoadingSkeleton,
  AdminEmptyState,
  ApiBoundaryBanner,
} from '../../components/common/AdminUIComponents.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatCurrency } from '../../../utils/formatters.js';

export default function AdminCustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    setLoading(true);
    adminApi.getCustomer(id).then((res) => {
      setCustomer(res.data);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <AdminLoadingSkeleton rows={5} />;

  return (
    <div>
      <PageHeader
        title={customer?.name || `Customer #${id}`}
        description="Personal profile, shipping addresses, order history, and support notes."
        breadcrumbs={[
          { label: 'Customers', to: '/admin/customers' },
          { label: customer?.name || id },
        ]}
      />

      <ApiBoundaryBanner endpoint={`/api/admin/customers/${id}`} unavailable={unavailable} />

      {!customer ? (
        <AdminEmptyState
          title="Customer record unavailable"
          description="Connect /api/admin/customers/:id on the backend to inspect customer profiles."
          action={
            <Link
              to="/admin/customers"
              className="rounded-sm bg-[#B93627] px-4 py-2 text-xs font-semibold text-white"
            >
              Back to Customers
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card text-sm space-y-2">
            <h2 className="font-serif text-xl font-semibold">Contact Details</h2>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone || '—'}</p>
            <p>Total Spent: {formatCurrency(customer.totalSpent)}</p>
          </div>
          <div className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card lg:col-span-2">
            <h2 className="font-serif text-xl font-semibold">Order History</h2>
            <p className="mt-2 text-xs text-[#77736B]">
              {(customer.orders || []).length} orders on record.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
