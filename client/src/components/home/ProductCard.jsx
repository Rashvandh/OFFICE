import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Leaf } from 'lucide-react';
import WishlistButton from '../common/WishlistButton.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatCurrency } from '../../utils/formatters.js';

export default function ProductCard({ product }) {
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();
  const [imgFailed, setImgFailed] = useState(false);

  const productUrl = `/products/${product.slug}`;
  const hasPrice =
    typeof product.price === 'number' && !Number.isNaN(product.price) && product.price > 0;

  const handleAddToCart = () => {
    addItem(product, 1);
    showToast(`${product.name} added to your bag.`);
    openDrawer();
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[var(--color-cream)] p-3 text-[var(--color-ink)] shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      {/* Consistent Aspect-Ratio Image with Graceful Botanical Fallback */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-cream-soft)] to-[var(--color-gold-soft)]">
        <Link
          to={productUrl}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          {product.image && !imgFailed ? (
            <img
              src={product.image}
              alt={`${product.name} — GRAMIYAM ${product.category || 'Herbal Wellness'}`}
              width="400"
              height="300"
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[var(--color-herbal)]/10 to-[var(--color-gold)]/20 text-[var(--color-herbal)]">
              <Leaf className="h-8 w-8 opacity-75" />
              <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest opacity-70">
                GRAMIYAM
              </span>
            </div>
          )}
        </Link>

        <div className="absolute right-2.5 top-2.5 z-10">
          <WishlistButton product={product} size="sm" />
        </div>
      </div>

      {/* Product Copy & Actions */}
      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3.5 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-herbal)]">
          {product.category || 'Pure Herbs'}
        </span>

        <Link to={productUrl} className="mt-1 block">
          <h3 className="font-serif text-lg font-bold leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-[var(--color-muted)]">
          {product.cardDescription}
        </p>

        {hasPrice && (
          <p className="mt-2.5 text-sm font-bold text-[var(--color-ink)]">
            {formatCurrency(product.price)}
          </p>
        )}

        <div className="mt-3.5 flex flex-col gap-2">
          {hasPrice ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--color-accent-hover)]"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <Link
              to={productUrl}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--color-accent-hover)]"
            >
              <span>View Formula</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
