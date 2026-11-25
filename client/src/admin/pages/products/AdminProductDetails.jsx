import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Edit } from 'lucide-react';
import {
  PageHeader,
  StatusBadge,
  AdminLoadingSkeleton,
  AdminEmptyState,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatCurrency } from '../../../utils/formatters.js';

export default function AdminProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    adminApi.getProduct(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <AdminLoadingSkeleton rows={6} />;
  if (!product) {
    return (
      <AdminEmptyState
        title="Product Not Found"
        description="The requested product record was not returned by /api/products."
        action={
          <Link
            to="/admin/products"
            className="rounded-sm bg-[#B93627] px-4 py-2 text-xs font-semibold text-white"
          >
            Back to Products
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title={product.name}
        description={`Slug: ${product.slug} • Category: ${product.category}`}
        breadcrumbs={[
          { label: 'Products', to: '/admin/products' },
          { label: product.name },
        ]}
        actions={
          <PermissionGuard permission="products.manage">
            <Link
              to={`/admin/products/${product._id || product.slug}/edit`}
              className="inline-flex items-center gap-1.5 rounded-sm bg-[#B93627] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
            >
              <Edit className="h-3.5 w-3.5" />
              Edit Product
            </Link>
          </PermissionGuard>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card lg:col-span-5">
          <h2 className="mb-4 font-serif text-xl font-semibold text-[#34332C]">
            Product Gallery
          </h2>
          {product.images?.length ? (
            <div className="grid grid-cols-2 gap-3">
              {product.images.map((img, i) => (
                <img
                  key={img + i}
                  src={img}
                  alt={product.name}
                  className="aspect-square w-full rounded-sm border border-[#E9E1D5] object-cover"
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#77736B]">No images uploaded.</p>
          )}
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-[#34332C]">
                Product Overview
              </h2>
              <StatusBadge status={product.isActive !== false ? 'published' : 'draft'} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#77736B]">
              {product.description || 'No description provided.'}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[#E9E1D5] pt-4 text-xs sm:grid-cols-3">
              <div>
                <dt className="text-[#77736B]">Selling Price</dt>
                <dd className="mt-1 text-base font-bold text-[#B93627]">
                  {formatCurrency(product.price)}
                </dd>
              </div>
              <div>
                <dt className="text-[#77736B]">Original Price</dt>
                <dd className="mt-1 font-semibold">
                  {product.compareAtPrice ? formatCurrency(product.compareAtPrice) : '—'}
                </dd>
              </div>
              <div>
                <dt className="text-[#77736B]">Available Stock</dt>
                <dd className="mt-1 font-semibold">{product.stock ?? 0}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
