import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import {
  PageHeader,
  ApiBoundaryBanner,
  StatusBadge,
  ConfirmDialog,
  PermissionGuard,
  ImageUploader,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminCategories() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [images, setImages] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const load = () => {
    setLoading(true);
    adminApi.getCategories().then((res) => {
      setCategories(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const openModal = (cat = null) => {
    setEditing(cat);
    reset(
      cat || { name: '', description: '', parentCategory: '', displayOrder: 0, isActive: true }
    );
    setImages(cat?.image ? [cat.image] : []);
    setModalOpen(true);
  };

  const onSubmit = async (values) => {
    const res = await adminApi.saveCategory(editing?._id, {
      ...values,
      displayOrder: Number(values.displayOrder || 0),
      image: images[0]?.url || images[0] || '',
    });
    showToast(res.message, res.ok ? 'success' : 'info');
    setModalOpen(false);
    if (res.ok) load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await adminApi.deleteCategory(deleteTarget._id);
    showToast(res.message, res.ok ? 'success' : 'info');
    setDeleteTarget(null);
    if (res.ok) load();
  };

  const columns = [
    { key: 'name', label: 'Category Name', sortable: true },
    { key: 'parentCategory', label: 'Parent Category' },
    { key: 'displayOrder', label: 'Order', sortable: true },
    {
      key: 'isActive',
      label: 'Status',
      render: (r) => <StatusBadge status={r.isActive !== false ? 'active' : 'inactive'} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <PermissionGuard permission="categories.manage">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openModal(r)}
              className="rounded p-1.5 text-[#77736B] hover:bg-[#FFF9F1] hover:text-[#B93627]"
              aria-label={`Edit ${r.name}`}
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeleteTarget(r)}
              className="rounded p-1.5 text-[#77736B] hover:bg-red-50 hover:text-[#B93627]"
              aria-label={`Delete ${r.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </PermissionGuard>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Product Categories"
        description="Organize GRAMIYAM herbal product categories, display order, and visibility."
        breadcrumbs={[{ label: 'Categories' }]}
        actions={
          <PermissionGuard permission="categories.manage">
            <button
              type="button"
              onClick={() => openModal()}
              className="inline-flex items-center gap-1.5 rounded-sm bg-[#B93627] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
            >
              <Plus className="h-4 w-4" />
              Add Category
            </button>
          </PermissionGuard>
        }
      />

      <ApiBoundaryBanner endpoint="/api/admin/categories" unavailable={unavailable} />

      <DataTable
        columns={columns}
        data={categories}
        loading={loading}
        emptyTitle="No categories returned"
        emptyDescription="Category records will populate here once /api/admin/categories is connected."
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-md border border-[#E9E1D5] bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-[#34332C]">
                {editing ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded p-1 text-[#77736B] hover:text-[#B93627]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Category Name *
                </span>
                <input
                  type="text"
                  required
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2 text-sm focus:border-[#B93627] focus:outline-none"
                  {...register('name', { required: true })}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Description
                </span>
                <textarea
                  rows={2}
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2 text-sm focus:border-[#B93627] focus:outline-none"
                  {...register('description')}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                    Parent Category
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2 text-sm focus:border-[#B93627] focus:outline-none"
                    {...register('parentCategory')}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                    Display Order
                  </span>
                  <input
                    type="number"
                    className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2 text-sm focus:border-[#B93627] focus:outline-none"
                    {...register('displayOrder')}
                  />
                </label>
              </div>
              <ImageUploader label="Category Image" images={images} onChange={setImages} />
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="accent-[#B93627]" {...register('isActive')} />
                <span>Active</span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-sm border border-[#E9E1D5] px-4 py-2 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-sm bg-[#B93627] px-5 py-2 text-xs font-semibold text-white hover:bg-[#8F2A1D]"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Category"
        message={`Delete category "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
