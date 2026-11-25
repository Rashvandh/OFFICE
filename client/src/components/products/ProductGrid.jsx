import ProductCard from './ProductCard.jsx';
import LoadingSkeleton from '../common/LoadingSkeleton.jsx';
import EmptyState from '../common/EmptyState.jsx';

export default function ProductGrid({
  products = [],
  loading = false,
  onQuickView,
  columns = 4,
  emptyTitle = 'No formulations found',
  emptyDescription = 'Try clearing your active filters or browsing another category.',
  onResetFilters,
}) {
  if (loading) {
    return <LoadingSkeleton count={columns === 5 ? 5 : 4} />;
  }

  if (!products.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onResetFilters ? 'Reset Filters' : undefined}
        onAction={onResetFilters}
      />
    );
  }

  const gridCols =
    columns === 5
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
      : columns === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`grid gap-5 sm:gap-6 ${gridCols}`}>
      {products.map((product) => (
        <ProductCard
          key={product._id || product.slug}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
