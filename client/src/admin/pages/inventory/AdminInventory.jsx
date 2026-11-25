import { useEffect, useMemo, useState } from 'react';
import { Boxes, CheckCircle2, AlertTriangle, XCircle, Download, Sliders, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  PageHeader,
  StatCard,
  SearchInput,
  StatusBadge,
  ApiBoundaryBanner,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminInventory() {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [search, setSearch] = useState('');
  const [threshold, setThreshold] = useState(10);
  const [adjustTarget, setAdjustTarget] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    setLoading(true);
    Promise.all([adminApi.getInventory(), adminApi.getProducts()]).then(
      ([invRes, prodRes]) => {
        if (invRes.ok && invRes.data?.length) {
          setProducts(invRes.data);
          setUnavailable(false);
        } else {
          setProducts(prodRes.data || []);
          setUnavailable(invRes.unavailable);
        }
        setLoading(false);
      }
    );
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q)
    );
  }, [products, search]);

  const inStockCount = products.filter((p) => (p.stock ?? 0) > threshold).length;
  const lowStockCount = products.filter(
    (p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= threshold
  ).length;
  const outStockCount = products.filter((p) => (p.stock ?? 0) <= 0).length;

  const openAdjust = (product) => {
    setAdjustTarget(product);
    reset({ adjustmentType: 'add', quantity: 1, reason: '' });
  };

  const onAdjustSubmit = async (values) => {
    const res = await adminApi.adjustStock({
      productId: adjustTarget._id,
      adjustmentType: values.adjustmentType,
      quantity: Number(values.quantity),
      reason: values.reason,
    });
    showToast(res.message, res.ok ? 'success' : 'info');
    setAdjustTarget(null);
  };

  const getStockStatus = (qty) => {
    if ((qty ?? 0) <= 0) return 'out_of_stock';
    if ((qty ?? 0) <= threshold) return 'low_stock';
    return 'in_stock';
  };

  const columns = [
    { key: 'name', label: 'Product', sortable: true },
    {
      key: 'sku',
      label: 'SKU',
      render: (r) => r.sku || r.slug || '—',
    },
    { key: 'category', label: 'Category' },
    {
      key: 'stock',
      label: 'Available Stock',
      sortable: true,
      render: (r) => <span className="font-semibold">{r.stock ?? 0}</span>,
    },
    {
      key: 'status',
      label: 'Indicator',
      render: (r) => <StatusBadge status={getStockStatus(r.stock)} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <PermissionGuard permission="inventory.manage">
          <button
            type="button"
            onClick={() => openAdjust(r)}
            className="inline-flex items-center gap-1 rounded-sm border border-[#E9E1D5] px-2.5 py-1 text-[11px] font-semibold text-[#34332C] hover:border-[#B93627] hover:text-[#B93627]"
          >
            <Sliders className="h-3 w-3" />
            Adjust
          </button>
        </PermissionGuard>
      ),
    },
  ];

  const handleExport = () => {
    const csv = [
      ['Product', 'SKU', 'Category', 'Stock'],
      ...filtered.map((p) => [p.name, p.sku || p.slug, p.category, p.stock ?? 0]),
    ]
      .map((r) => r.join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gramiyam-inventory.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        title="Inventory Management"
        description="Monitor stock levels, low-stock thresholds, and authorized stock adjustments."
        breadcrumbs={[{ label: 'Inventory' }]}
        actions={
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[#E9E1D5] bg-white px-4 py-2.5 text-xs font-semibold text-[#34332C] hover:border-[#B93627]"
          >
            <Download className="h-3.5 w-3.5" />
            Export Inventory
          </button>
        }
      />

      <ApiBoundaryBanner endpoint="/api/admin/inventory" unavailable={unavailable} />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total SKUs" value={products.length} icon={Boxes} />
        <StatCard label="In Stock" value={inStockCount} icon={CheckCircle2} />
        <StatCard label="Low Stock" value={lowStockCount} icon={AlertTriangle} />
        <StatCard label="Out of Stock" value={outStockCount} icon={XCircle} />
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by SKU or product name..."
          className="w-full sm:w-72"
        />
        <label className="flex items-center gap-2 text-xs text-[#77736B]">
          <span>Low-stock threshold:</span>
          <input
            type="number"
            min={1}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value) || 1)}
            className="w-16 rounded-sm border border-[#E9E1D5] bg-white px-2 py-1 text-xs text-[#34332C]"
          />
        </label>
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} />

      {adjustTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-md border border-[#E9E1D5] bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-[#34332C]">
                Stock Adjustment
              </h2>
              <button
                type="button"
                onClick={() => setAdjustTarget(null)}
                className="rounded p-1 text-[#77736B]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mb-4 text-xs text-[#77736B]">
              Product: <strong className="text-[#34332C]">{adjustTarget.name}</strong> (Current:{' '}
              {adjustTarget.stock ?? 0})
            </p>
            <form onSubmit={handleSubmit(onAdjustSubmit)} className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Adjustment Type
                </span>
                <select
                  className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm"
                  {...register('adjustmentType')}
                >
                  <option value="add">Add Stock (+)</option>
                  <option value="remove">Deduct Stock (-)</option>
                  <option value="set">Set Exact Quantity</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Quantity *
                </span>
                <input
                  type="number"
                  min={1}
                  required
                  className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm"
                  {...register('quantity', { required: true, min: 1 })}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Reason *
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g., New batch received / Damaged units"
                  className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm"
                  {...register('reason', { required: true })}
                />
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAdjustTarget(null)}
                  className="rounded-sm border border-[#E9E1D5] px-4 py-2 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-sm bg-[#B93627] px-5 py-2 text-xs font-semibold text-white hover:bg-[#8F2A1D]"
                >
                  Save Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
