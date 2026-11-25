import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Eye, Trash2, Download } from 'lucide-react';
import {
  PageHeader,
  SearchInput,
  FilterDropdown,
  StatusBadge,
  ConfirmDialog,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { productCategories } from '../../../data/siteData.js';
import { formatCurrency } from '../../../utils/formatters.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminProducts() {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadProducts = () => {
    setLoading(true);
    adminApi.getProducts().then((res) => {
      setProducts(res.data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q);
      const matchCat =
        categoryFilter === 'All' ||
        p.category?.toLowerCase() === categoryFilter.toLowerCase();
      const stock = p.stock ?? 0;
      const matchStock =
        stockFilter === 'all' ||
        (stockFilter === 'in' && stock > 10) ||
        (stockFilter === 'low' && stock > 0 && stock <= 10) ||
        (stockFilter === 'out' && stock <= 0);
      const activeStatus = p.isActive !== false ? 'published' : 'draft';
      const matchStatus = statusFilter === 'all' || activeStatus === statusFilter;
      return matchSearch && matchCat && matchStock && matchStatus;
    });
  }, [products, search, categoryFilter, stockFilter, statusFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await adminApi.deleteProduct(deleteTarget._id);
    showToast(res.message, res.ok ? 'success' : 'error');
    setDeleteTarget(null);
    if (res.ok) loadProducts();
  };

  const handleExportCsv = () => {
    const header = ['Name', 'SKU', 'Category', 'Price', 'Stock', 'Status'];
    const rows = filtered.map((p) => [
      p.name,
      p.sku || p.slug,
      p.category,
      p.price ?? '',
      p.stock ?? 0,
      p.isActive !== false ? 'Published' : 'Draft',
    ]);
    const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gramiyam-products.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      key: 'name',
      label: 'Product',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.images?.[0] ? (
            <img
              src={row.images[0]}
              alt={row.name}
              className="h-10 w-10 rounded-sm border border-[#E9E1D5] object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#FFF9F1] border border-[#E9E1D5] text-[10px] text-[#77736B]">
              IMG
            </div>
          )}
          <div>
            <p className="font-semibold text-[#34332C]">{row.name}</p>
            <p className="text-[11px] text-[#77736B]">{row.sku || row.slug}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', label: 'Category', sortable: true },
    {
      key: 'price',
      label: 'Selling Price',
      sortable: true,
      render: (r) => formatCurrency(r.price),
    },
    {
      key: 'compareAtPrice',
      label: 'Original Price',
      render: (r) => (r.compareAtPrice ? formatCurrency(r.compareAtPrice) : '—'),
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (r) => (
        <span className={(r.stock ?? 0) <= 10 ? 'font-semibold text-[#B93627]' : ''}>
          {r.stock ?? 0}
        </span>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (r) => <StatusBadge status={r.isActive !== false ? 'published' : 'draft'} />,
    },
    {
      key: 'isFeatured',
      label: 'Featured',
      render: (r) => (r.isFeatured ? 'Yes' : 'No'),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/products/${r._id || r.slug}`}
            aria-label={`View ${r.name}`}
            className="rounded p-1.5 text-[#77736B] hover:bg-[#FFF9F1] hover:text-[#B93627]"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <PermissionGuard permission="products.manage">
            <Link
              to={`/admin/products/${r._id || r.slug}/edit`}
              aria-label={`Edit ${r.name}`}
              className="rounded p-1.5 text-[#77736B] hover:bg-[#FFF9F1] hover:text-[#B93627]"
            >
              <Edit className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setDeleteTarget(r)}
              aria-label={`Delete ${r.name}`}
              className="rounded p-1.5 text-[#77736B] hover:bg-red-50 hover:text-[#B93627]"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </PermissionGuard>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage GRAMIYAM formulations from GET /api/products and admin CRUD endpoints."
        breadcrumbs={[{ label: 'Products' }]}
        actions={
          <>
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#E9E1D5] bg-white px-4 py-2.5 text-xs font-semibold text-[#34332C] hover:border-[#B93627]"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <PermissionGuard permission="products.manage">
              <Link
                to="/admin/products/add"
                className="inline-flex items-center gap-1.5 rounded-sm bg-[#B93627] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Link>
            </PermissionGuard>
          </>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name, SKU, or slug..."
          className="w-full sm:w-64"
        />
        <FilterDropdown
          label="Category"
          value={categoryFilter}
          onChange={setCategoryFilter}
          options={productCategories}
        />
        <FilterDropdown
          label="Stock"
          value={stockFilter}
          onChange={setStockFilter}
          options={[
            { value: 'all', label: 'All Stock' },
            { value: 'in', label: 'In Stock (>10)' },
            { value: 'low', label: 'Low Stock (1-10)' },
            { value: 'out', label: 'Out of Stock (0)' },
          ]}
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: 'All Statuses' },
            { value: 'published', label: 'Published' },
            { value: 'draft', label: 'Draft' },
          ]}
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        emptyTitle="No products in database"
        emptyDescription="GET /api/products returned 0 records. Add products once MongoDB and /api/admin/products are connected."
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
