import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronRight, User, Heart, ShoppingBag } from 'lucide-react';
import { productCategories } from '../../data/siteData.js';
import BrandLogo from '../common/BrandLogo.jsx';

export default function MobileMenu({ isOpen, onClose, links = [] }) {
  const categories = productCategories.filter((c) => c !== 'All');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-forest-dark/60 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="relative z-10 flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-ivory p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between border-b border-softgrey pb-4">
              <BrandLogo size="sm" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-softgrey bg-white text-forest"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-sm px-3 py-2.5 text-sm font-medium text-charcoal transition hover:bg-cream hover:text-forest"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-charcoal/40" />
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-softgrey pt-5">
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Shop by Category
              </p>
              <div className="grid grid-cols-2 gap-1.5 px-2">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={onClose}
                    className="rounded-sm bg-white px-2.5 py-2 text-xs text-charcoal hover:bg-cream hover:text-forest"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 border-t border-softgrey pt-5">
              <Link
                to="/account"
                onClick={onClose}
                className="flex flex-col items-center gap-1 rounded-sm bg-white py-2.5 text-[11px] font-medium text-forest"
              >
                <User className="h-4 w-4" />
                Account
              </Link>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="flex flex-col items-center gap-1 rounded-sm bg-white py-2.5 text-[11px] font-medium text-forest"
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex flex-col items-center gap-1 rounded-sm bg-white py-2.5 text-[11px] font-medium text-forest"
              >
                <ShoppingBag className="h-4 w-4" />
                Bag
              </Link>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
