import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

export default function Wishlist() {
  const { items } = useWishlist();

  return (
    <main className="py-12 sm:py-16">
      <div className="container-gramiyam">
        <div className="mb-8 border-b border-softgrey pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
            Saved Formulations
          </p>
          <h1 className="mt-1 font-serif text-4xl font-medium text-forest">
            Your Wishlist ({items.length})
          </h1>
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save your favourite Gramiyam herbs, oils, and wellness formulations for easy access later."
            actionLabel="Browse Products"
            actionTo="/products"
          />
        ) : (
          <ProductGrid products={items} columns={4} />
        )}
      </div>
    </main>
  );
}
