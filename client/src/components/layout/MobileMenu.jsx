import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ChevronRight, User, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { productCategories } from '../../data/siteData.js';
import BrandLogo from '../common/BrandLogo.jsx';

export default function MobileMenu({ isOpen, onClose, links = [] }) {
  const categories = productCategories.filter((c) => c !== 'All');
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[var(--color-herbal-dark)]/65 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              type: 'tween',
              duration: shouldReduceMotion ? 0.01 : 0.25,
            }}
            className="relative z-10 flex h-[100dvh] w-80 max-w-[88vw] flex-col overflow-y-auto bg-[var(--color-cream)] p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between border-b border-[var(--color-gold-soft)] pb-4">
              <BrandLogo size="sm" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold-soft)] bg-white text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Shop Now Primary Mobile Action */}
            <Link
              to="/products"
              onClick={onClose}
              className="mb-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-accent-hover)]"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <nav className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-[15px] font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-cream-soft)] hover:text-[var(--color-accent)]"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                </Link>
              ))}
            </nav>

            <div className="mt-5 border-t border-[var(--color-gold-soft)] pt-4">
              <p className="mb-2.5 px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold-dark)]">
                Shop by Category
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={onClose}
                    className="flex min-h-[44px] items-center rounded-lg border border-[var(--color-gold-soft)] bg-white px-3 py-2 text-xs font-medium text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 border-t border-[var(--color-gold-soft)] pt-4">
              <Link
                to="/account"
                onClick={onClose}
                className="flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl border border-[var(--color-gold-soft)] bg-white py-2 text-[11px] font-semibold text-[var(--color-ink)]"
              >
                <User className="h-4 w-4 text-[var(--color-accent)]" />
                Account
              </Link>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl border border-[var(--color-gold-soft)] bg-white py-2 text-[11px] font-semibold text-[var(--color-ink)]"
              >
                <Heart className="h-4 w-4 text-[var(--color-accent)]" />
                Wishlist
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl border border-[var(--color-gold-soft)] bg-white py-2 text-[11px] font-semibold text-[var(--color-ink)]"
              >
                <ShoppingBag className="h-4 w-4 text-[var(--color-accent)]" />
                Bag
              </Link>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
