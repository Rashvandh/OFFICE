import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Printer } from 'lucide-react';
import {
  PageHeader,
  StatusBadge,
  AdminLoadingSkeleton,
  AdminEmptyState,
  PermissionGuard,
  ApiBoundaryBanner,
} from '../../components/common/AdminUIComponents.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatCurrency, formatDate } from '../../../utils/formatters.js';
import { useToast } from '../../../context/ToastContext.jsx';

const FULFILMENT_STATES = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Returned',
];

export default function AdminOrderDetails() {
  const { id } = useParams();
  const { showToast } = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  const [status, setStatus] = useState('Processing');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [courier, setCourier] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  useEffect(() => {
    setLoading(true);
    adminApi.getOrder(id).then((res) => {
      setOrder(res.data);
      setUnavailable(res.unavailable);
      if (res.data) {
        setStatus(res.data.status || 'Pending');
        setTrackingNumber(res.data.trackingNumber || '');
        setCourier(res.data.courier || '');
        setInternalNotes(res.data.internalNotes || '');
      }
      setLoading(false);
    });
  }, [id]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    const res = await adminApi.updateOrderStatus(id, {
      status,
      trackingNumber,
      courier,
      internalNotes,
    });
    showToast(res.message, res.ok ? 'success' : 'info');
  };

  if (loading) return <AdminLoadingSkeleton rows={6} />;

  return (
    <div>
      <PageHeader
        title={`Order #${id}`}
        description="Fulfilment details, Razorpay reference, and invoice."
        breadcrumbs={[
          { label: 'Orders', to: '/admin/orders' },
          { label: `#${id}` },
        ]}
        actions={
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[#E9E1D5] bg-white px-4 py-2 text-xs font-semibold text-[#34332C] hover:border-[#B93627]"
          >
            <Printer className="h-3.5 w-3.5" />
            Print Invoice
          </button>
        }
      />

      <ApiBoundaryBanner endpoint={`/api/admin/orders/${id}`} unavailable={unavailable} />

      {!order ? (
        <AdminEmptyState
          title="Order record unavailable"
          description="Connect /api/admin/orders/:id on the backend to inspect live order details."
          action={
            <Link
              to="/admin/orders"
              className="rounded-sm bg-[#B93627] px-4 py-2 text-xs font-semibold text-white"
            >
              Back to Orders
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card">
              <div className="flex items-center justify-between border-b border-[#E9E1D5] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[#34332C]">
                    Items Ordered
                  </h2>
                  <p className="text-xs text-[#77736B]">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="mt-4 divide-y divide-[#E9E1D5] text-sm">
                {(order.items || []).map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-[#34332C]">{item.name}</p>
                      <p className="text-xs text-[#77736B]">
                        Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <span className="font-semibold">
                      {formatCurrency((item.unitPrice || 0) * (item.quantity || 1))}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-[#E9E1D5] pt-4 text-sm flex justify-between font-bold text-[#B93627]">
                <span>Final Amount</span>
                <span>{formatCurrency(order.amount)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-md border border-[#E9E1D5] bg-white p-5 shadow-card text-xs space-y-1.5">
                <h3 className="font-serif text-lg font-semibold text-[#34332C]">
                  Customer & Shipping
                </h3>
                <p className="font-semibold">{order.customer?.name}</p>
                <p className="text-[#77736B]">{order.customer?.email}</p>
                <p className="text-[#77736B]">{order.customer?.phone}</p>
                <p className="pt-2 text-[#34332C]">
                  {order.shippingAddress?.address}, {order.shippingAddress?.city} -{' '}
                  {order.shippingAddress?.pincode}
                </p>
              </div>

              <div className="rounded-md border border-[#E9E1D5] bg-white p-5 shadow-card text-xs space-y-1.5">
                <h3 className="font-serif text-lg font-semibold text-[#34332C]">
                  Razorpay Verification
                </h3>
                <p>
                  <span className="text-[#77736B]">Order ID: </span>
                  {order.razorpayOrderId || '—'}
                </p>
                <p>
                  <span className="text-[#77736B]">Payment ID: </span>
                  {order.razorpayPaymentId || 'Not verified'}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <PermissionGuard permission="orders.manage">
              <form
                onSubmit={handleUpdateStatus}
                className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4"
              >
                <h2 className="font-serif text-xl font-semibold text-[#34332C]">
                  Update Fulfilment
                </h2>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                    Fulfilment Status
                  </span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm"
                  >
                    {FULFILMENT_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                    Courier Partner
                  </span>
                  <input
                    type="text"
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                    Tracking Number
                  </span>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                    Internal Notes
                  </span>
                  <textarea
                    rows={3}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-sm bg-[#B93627] py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
                >
                  Save Status Update
                </button>
              </form>
            </PermissionGuard>
          </div>
        </div>
      )}
    </div>
  );
}
