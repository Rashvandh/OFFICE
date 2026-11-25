import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Star, ArrowRight } from 'lucide-react';
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
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-softgrey bg-white shadow-card transition-shadow hover:shadow-soft"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-ivory p-2">
        <Link to={`/products/${product.slug}`} className="block h-full w-full">
          <img
            src={imageSrc}
            alt={`${product.name} — GRAMIYAM ${product.category}`}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.tag && (
            <span className="rounded-sm bg-ivory/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-charcoal shadow-sm border border-softgrey">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist & Quick View */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
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
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-softgrey bg-white/95 text-charcoal transition hover:border-forest hover:text-forest"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forest">
            {product.category}
          </span>
          {typeof product.rating === 'number' && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-charcoal/80">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              {product.rating}
            </span>
          )}
        </div>

        <Link to={`/products/${product.slug}`} className="mt-1.5 block">
          <h3 className="font-serif text-xl font-medium text-charcoal transition group-hover:text-forest">
            {product.name}
          </h3>
        </Link>

        {(product.shortDescription || product.description) && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-charcoal/70">
            {product.shortDescription || product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          {hasApprovedPrice ? (
            <div>
              <span className="text-sm font-bold text-forest sm:text-base">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-xs text-charcoal/45 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs font-medium text-charcoal/65">
              Catalogue Pending
            </span>
          )}

          {hasApprovedPrice ? (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.inStock === false}
              className="inline-flex items-center gap-1.5 rounded-sm bg-forest px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-ivory transition hover:bg-botanical disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>{product.inStock === false ? 'Out' : 'Add'}</span>
            </button>
          ) : (
            <Link
              to={`/products/${product.slug}`}
              className="inline-flex items-center gap-1 rounded-sm border border-forest/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-forest transition hover:bg-forest hover:text-ivory"
            >
              <span>View Product</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
