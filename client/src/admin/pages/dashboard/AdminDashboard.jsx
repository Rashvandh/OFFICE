import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  IndianRupee,
  ShoppingCart,
  Clock,
  CheckCircle2,
  Users,
  Package,
  AlertTriangle,
  Building2,
} from 'lucide-react';
import {
  PageHeader,
  StatCard,
  ChartCard,
  ApiBoundaryBanner,
  StatusBadge,
  AdminEmptyState,
} from '../../components/common/AdminUIComponents.jsx';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatCurrency } from '../../../utils/formatters.js';

export default function AdminDashboard() {
  const { can, roleLabel } = useAdminAuth();
  const [period, setPeriod] = useState('monthly');
  const [dashboardData, setDashboardData] = useState(null);
  const [products, setProducts] = useState([]);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      adminApi.getDashboard({ period }),
      adminApi.getProducts(),
    ]).then(([dashRes, prodRes]) => {
      if (!mounted) return;
      if (dashRes.ok && dashRes.data) {
        setDashboardData(dashRes.data);
        setUnavailable(false);
      } else {
        setDashboardData(null);
        setUnavailable(dashRes.unavailable);
      }
      setProducts(prodRes.data || []);
    });
    return () => {
      mounted = false;
    };
  }, [period]);

  const metrics = dashboardData?.metrics || {};
  const revenueSeries = dashboardData?.revenueTrend || [];
  const ordersByStatus = dashboardData?.ordersOverview || [];
  const recentOrders = dashboardData?.recentOrders || [];
  const lowStockProducts =
    dashboardData?.lowStockProducts ||
    products.filter((p) => typeof p.stock === 'number' && p.stock <= 10);

  return (
    <div>
      <PageHeader
        title="Dashboard Overview"
        description={`Welcome to the GRAMIYAM Admin Portal (${roleLabel}). Metrics reflect live backend data only.`}
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <ApiBoundaryBanner endpoint="/api/admin/dashboard" unavailable={unavailable} />

      {/* Role-Aware Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {can('orders.view') && (
          <>
            <StatCard
              label="Total Revenue"
              value={metrics.totalRevenue != null ? formatCurrency(metrics.totalRevenue) : '—'}
              sublabel="Verified paid orders"
              icon={IndianRupee}
            />
            <StatCard
              label="Total Orders"
              value={metrics.totalOrders ?? '—'}
              sublabel="All order records"
              icon={ShoppingCart}
            />
            <StatCard
              label="Pending Orders"
              value={metrics.pendingOrders ?? '—'}
              sublabel="Awaiting fulfilment"
              icon={Clock}
            />
            <StatCard
              label="Completed Orders"
              value={metrics.completedOrders ?? '—'}
              sublabel="Delivered orders"
              icon={CheckCircle2}
            />
          </>
        )}

        {can('customers.view') && (
          <StatCard
            label="Total Customers"
            value={metrics.totalCustomers ?? '—'}
            sublabel="Registered accounts"
            icon={Users}
          />
        )}

        {(can('products.view') || can('inventory.view')) && (
          <>
            <StatCard
              label="Total Products"
              value={metrics.totalProducts ?? products.length}
              sublabel="Active catalogue records"
              icon={Package}
            />
            <StatCard
              label="Low Stock Products"
              value={metrics.lowStockCount ?? lowStockProducts.length}
              sublabel="Threshold ≤ 10 units"
              icon={AlertTriangle}
            />
          </>
        )}

        {can('franchise.view') && (
          <StatCard
            label="Total Enquiries"
            value={metrics.totalEnquiries ?? '—'}
            sublabel="Franchise & support"
            icon={Building2}
          />
        )}
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ChartCard
            title="Revenue Overview"
            subtitle="Live revenue series from /api/admin/dashboard"
            actions={
              <div className="flex gap-1 rounded-sm border border-[#E9E1D5] bg-[#FFF9F1] p-1">
                {['daily', 'weekly', 'monthly', 'yearly'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`rounded-sm px-2.5 py-1 text-[11px] font-semibold capitalize transition ${
                      period === p
                        ? 'bg-[#B93627] text-white'
                        : 'text-[#77736B] hover:text-[#34332C]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            }
          >
            {revenueSeries.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-xs text-[#77736B]">
                No revenue time-series data returned from the backend yet.
              </div>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E9E1D5" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#77736B' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#77736B' }} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#B93627"
                      fill="#E9D8C5"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </ChartCard>
        </div>

        <div className="lg:col-span-5">
          <ChartCard
            title="Orders Overview"
            subtitle="Breakdown by fulfilment status"
          >
            {ordersByStatus.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-xs text-[#77736B]">
                No order status breakdown returned from the backend yet.
              </div>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ordersByStatus}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E9E1D5" />
                    <XAxis dataKey="status" tick={{ fontSize: 11, fill: '#77736B' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#77736B' }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#B93627" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </ChartCard>
        </div>
      </div>

      {/* Dashboard Tables */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {can('orders.view') && (
          <div className="rounded-md border border-[#E9E1D5] bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-xl font-semibold text-[#34332C]">
                Recent Orders
              </h3>
              <Link
                to="/admin/orders"
                className="text-xs font-semibold text-[#B93627] hover:underline"
              >
                View All
              </Link>
            </div>
            {recentOrders.length === 0 ? (
              <AdminEmptyState
                title="No recent orders"
                description="Orders will appear here once /api/admin/dashboard or /api/admin/orders returns records."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#E9E1D5] text-[#77736B]">
                    <tr>
                      <th className="py-2">Order ID</th>
                      <th className="py-2">Customer</th>
                      <th className="py-2">Amount</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9E1D5]">
                    {recentOrders.map((o) => (
                      <tr key={o._id}>
                        <td className="py-2.5 font-medium">#{o._id}</td>
                        <td className="py-2.5">{o.customer?.name || '—'}</td>
                        <td className="py-2.5">{formatCurrency(o.amount)}</td>
                        <td className="py-2.5">
                          <StatusBadge status={o.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {(can('products.view') || can('inventory.view')) && (
          <div className="rounded-md border border-[#E9E1D5] bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-xl font-semibold text-[#34332C]">
                Low Stock Products
              </h3>
              <Link
                to="/admin/inventory"
                className="text-xs font-semibold text-[#B93627] hover:underline"
              >
                Manage Inventory
              </Link>
            </div>
            {lowStockProducts.length === 0 ? (
              <AdminEmptyState
                title="No low-stock alerts"
                description="Products with stock ≤ 10 units will be highlighted here."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#E9E1D5] text-[#77736B]">
                    <tr>
                      <th className="py-2">Product</th>
                      <th className="py-2">Category</th>
                      <th className="py-2">Stock</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9E1D5]">
                    {lowStockProducts.map((p) => (
                      <tr key={p._id}>
                        <td className="py-2.5 font-medium">{p.name}</td>
                        <td className="py-2.5">{p.category}</td>
                        <td className="py-2.5 font-semibold text-[#B93627]">
                          {p.stock ?? 0}
                        </td>
                        <td className="py-2.5">
                          <Link
                            to={`/admin/products/${p._id}/edit`}
                            className="text-[#B93627] hover:underline"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
