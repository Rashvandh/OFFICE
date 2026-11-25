import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PageHeader, ImageUploader } from '../../components/common/AdminUIComponents.jsx';
import { adminApi } from '../../services/adminApi.js';
import { productCategories } from '../../../data/siteData.js';
import { useToast } from '../../../context/ToastContext.jsx';
import { slugify } from '../../../utils/formatters.js';

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      category: 'Pure Herbs',
      status: 'draft',
      isFeatured: false,
      isBestseller: false,
      stock: 0,
    },
  });

  const nameValue = watch('name');

  useEffect(() => {
    if (!isEdit && nameValue) {
      setValue('slug', slugify(nameValue));
    }
  }, [nameValue, isEdit, setValue]);

  useEffect(() => {
    if (isEdit) {
      adminApi.getProduct(id).then((res) => {
        if (res.ok && res.data) {
          reset({
            ...res.data,
            status: res.data.isActive !== false ? 'published' : 'draft',
          });
          setImages(res.data.images || []);
        }
      });
    }
  }, [id, isEdit, reset]);

  const submitWithStatus = (targetStatus) =>
    handleSubmit(async (values) => {
      const payload = {
        ...values,
        price: Number(values.price),
        compareAtPrice: values.compareAtPrice ? Number(values.compareAtPrice) : undefined,
        stock: Number(values.stock || 0),
        isActive: targetStatus === 'published',
        images: images.map((i) => i.url || i),
      };
      const res = isEdit
        ? await adminApi.updateProduct(id, payload)
        : await adminApi.createProduct(payload);
      showToast(res.message, res.ok ? 'success' : 'info');
      if (res.ok) navigate('/admin/products');
    });

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Product' : 'Add Product'}
        description="Configure formulation details, pricing, stock, variants, and SEO metadata."
        breadcrumbs={[
          { label: 'Products', to: '/admin/products' },
          { label: isEdit ? 'Edit' : 'Add Product' },
        ]}
      />

      <form className="grid grid-cols-1 gap-6 lg:grid-cols-12" noValidate>
        <div className="space-y-6 lg:col-span-8">
          <section className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#34332C]">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Product Name *
                </span>
                <input
                  type="text"
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                  {...register('name', { required: 'Product name is required.' })}
                />
                {errors.name && (
                  <span className="mt-1 block text-xs text-[#B93627]">{errors.name.message}</span>
                )}
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Slug *
                </span>
                <input
                  type="text"
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                  {...register('slug', { required: 'Slug is required.' })}
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  SKU
                </span>
                <input
                  type="text"
                  placeholder="e.g., GRM-ASH-001"
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                  {...register('sku')}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                Short Description
              </span>
              <textarea
                rows={2}
                className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                {...register('shortDescription')}
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                Full Description
              </span>
              <textarea
                rows={5}
                className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                {...register('description')}
              />
            </label>
          </section>

          <section className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-[#34332C]">
              Product Media
            </h2>
            <ImageUploader label="Product Images" images={images} onChange={setImages} />
          </section>

          <section className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#34332C]">
              SEO Metadata
            </h2>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                SEO Title
              </span>
              <input
                type="text"
                className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                {...register('seoTitle')}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                SEO Description
              </span>
              <textarea
                rows={3}
                className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                {...register('seoDescription')}
              />
            </label>
          </section>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <section className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#34332C]">
              Pricing & Inventory
            </h2>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                Category *
              </span>
              <select
                className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                {...register('category', { required: true })}
              >
                {productCategories
                  .filter((c) => c !== 'All')
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                Selling Price (INR) *
              </span>
              <input
                type="number"
                min={0}
                className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                {...register('price', { required: 'Selling price is required.' })}
              />
              {errors.price && (
                <span className="mt-1 block text-xs text-[#B93627]">{errors.price.message}</span>
              )}
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                Original Price (INR)
              </span>
              <input
                type="number"
                min={0}
                className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                {...register('compareAtPrice')}
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Stock Qty
                </span>
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                  {...register('stock')}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Weight
                </span>
                <input
                  type="text"
                  placeholder="e.g., 100g"
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                  {...register('weight')}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                Variants (comma separated)
              </span>
              <input
                type="text"
                placeholder="60 Tabs, 120 Tabs"
                className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                {...register('variantsText')}
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                Tags (comma separated)
              </span>
              <input
                type="text"
                placeholder="herbal, siddha"
                className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                {...register('tagsText')}
              />
            </label>

            <div className="space-y-2 border-t border-[#E9E1D5] pt-3 text-xs">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#B93627]" {...register('isFeatured')} />
                <span>Featured Product</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#B93627]" {...register('isBestseller')} />
                <span>Bestseller</span>
              </label>
            </div>
          </section>

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={submitWithStatus('published')}
              className="w-full rounded-sm bg-[#B93627] py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
            >
              Publish Product
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={submitWithStatus('draft')}
              className="w-full rounded-sm border border-[#B93627] bg-white py-3 text-xs font-semibold uppercase tracking-wider text-[#B93627] hover:bg-[#FFF9F1]"
            >
              Save as Draft
            </button>
            <Link
              to="/admin/products"
              className="w-full rounded-sm border border-[#E9E1D5] bg-white py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#34332C] hover:bg-[#FFF9F1]"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
