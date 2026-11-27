import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import WishlistButton from '../common/WishlistButton.jsx';

export default function ProductCard({ product, onQuickView }) {
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();

  const hasApprovedPrice = typeof product.price === 'number' && !Number.isNaN(product.price);
  const imageSrc = product.image || product.images?.[0] || '';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasApprovedPrice) return;
    addItem(product, 1);
    showToast(`${product.name} added to your bag.`);
    openDrawer();
  };

  return (
    <article className="group flex h-full flex-col border border-[#E2D8C7] bg-[#FFFDF8] transition-colors hover:border-[#80664D]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F2E8] p-2">
        <Link to={`/products/${product.slug}`} className="block h-full w-full">
          <img
            src={imageSrc}
            alt={`${product.name} — GRAMIYAM ${product.category}`}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Wishlist & Quick View */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          <WishlistButton product={product} size="sm" />
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label={`Quick view ${product.name}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E2D8C7] bg-[#FFFDF8] text-[#292820] transition hover:border-[#292820]"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#777D59]">
          {product.category}
        </span>

        <Link to={`/products/${product.slug}`} className="mt-1 block">
          <h3 className="font-serif text-xl font-medium text-[#292820] transition group-hover:text-[#A94732]">
            {product.name}
          </h3>
        </Link>

        {(product.shortDescription || product.description) && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#777164]">
            {product.shortDescription || product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E2D8C7] pt-4">
          {hasApprovedPrice ? (
            <span className="text-sm font-semibold text-[#292820]">
              {formatCurrency(product.price)}
            </span>
          ) : (
            <span className="text-[11px] uppercase tracking-wider text-[#777164]">
              Catalogue Pending
            </span>
          )}

          {hasApprovedPrice ? (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.inStock === false}
              className="inline-flex items-center gap-1.5 bg-[#344B32] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFFDF8] transition hover:bg-[#253824] disabled:opacity-50"
            >
              <ShoppingBag className="h-3 w-3" />
              <span>{product.inStock === false ? 'Out' : 'Quick Add'}</span>
            </button>
          ) : (
            <Link
              to={`/products/${product.slug}`}
              className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A94732] hover:text-[#292820]"
            >
              <span>View Product</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
