import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PageHeader, ImageUploader } from '../../components/common/AdminUIComponents.jsx';
import { adminApi } from '../../services/adminApi.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminStoreForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { country: 'India', isActive: true },
  });

  useEffect(() => {
    if (isEdit) {
      adminApi.getStore(id).then((res) => {
        if (res.ok && res.data) {
          reset(res.data);
          if (res.data.image) setImages([res.data.image]);
        }
      });
    }
  }, [id, isEdit, reset]);

  const onSubmit = async (values) => {
    const res = await adminApi.saveStore(id, {
      ...values,
      image: images[0]?.url || images[0] || '',
    });
    showToast(res.message, res.ok ? 'success' : 'info');
    if (res.ok) navigate('/admin/stores');
  };

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Store' : 'Add Store'}
        description="Configure retail outlet address, coordinates, and contact details."
        breadcrumbs={[
          { label: 'Store Locator', to: '/admin/stores' },
          { label: isEdit ? 'Edit Store' : 'Add Store' },
        ]}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
              Store Name *
            </span>
            <input
              type="text"
              className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
              {...register('name', { required: 'Store name is required.' })}
            />
            {errors.name && <span className="text-xs text-[#B93627]">{errors.name.message}</span>}
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
              Store Description
            </span>
            <textarea
              rows={2}
              className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm"
              {...register('description')}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Country *</span>
            <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('country', { required: true })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">State *</span>
            <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('state', { required: true })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">District *</span>
            <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('district', { required: true })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">City *</span>
            <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('city', { required: true })} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Address *</span>
            <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('address', { required: true })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Postal Code</span>
            <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('postalCode')} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Contact Number</span>
            <input type="tel" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('phone')} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Email</span>
            <input type="email" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('email')} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Store Timings</span>
            <input type="text" placeholder="10:00 AM – 8:30 PM" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('timings')} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Latitude</span>
            <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('latitude')} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Longitude</span>
            <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('longitude')} />
          </label>
        </div>

        <ImageUploader label="Store Image" images={images} onChange={setImages} />

        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" className="accent-[#B93627]" {...register('isActive')} />
          <span>Active Store</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-sm bg-[#B93627] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
          >
            Save Store
          </button>
          <Link
            to="/admin/stores"
            className="rounded-sm border border-[#E9E1D5] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#34332C]"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
