import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { sampleProducts, BLOG_POSTS } from '../../data/siteData.js';
import { formatCurrency } from '../../utils/formatters.js';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        products: sampleProducts.slice(0, 4),
        blogs: BLOG_POSTS.slice(0, 2),
      };
    }
    return {
      products: sampleProducts
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
        .slice(0, 6),
      blogs: BLOG_POSTS.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      ).slice(0, 3),
    };
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search Gramiyam">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-forest-dark/65 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 border-b border-softgrey bg-ivory py-8 shadow-2xl"
          >
            <div className="container-gramiyam">
              <div className="flex items-center gap-3 border-b-2 border-forest pb-3">
                <Search className="h-5 w-5 text-forest" />
                <input
                  type="search"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search herbs, formulations, categories, or articles..."
                  className="w-full bg-transparent text-base text-charcoal placeholder:text-charcoal/45 focus:outline-none sm:text-lg"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-softgrey bg-white text-forest"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-12">
                <div className="md:col-span-8">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    {query ? 'Matching Formulations' : 'Popular Formulations'}
                  </p>
                  {results.products.length === 0 ? (
                    <p className="text-sm text-charcoal/65">
                      No formulations matched "{query}".
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {results.products.map((product) => (
                        <Link
                          key={product._id}
                          to={`/products/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-sm border border-softgrey bg-white p-3 transition hover:border-forest"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-14 w-14 rounded-sm object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-serif text-base font-medium text-forest">
                              {product.name}
                            </p>
                            <p className="text-[11px] uppercase tracking-wider text-charcoal/60">
                              {product.category}
                            </p>
                            <p className="mt-0.5 text-xs font-semibold text-botanical">
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:col-span-4">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    Ancient Wisdom Journal
                  </p>
                  <div className="space-y-3">
                    {results.blogs.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blogs/${post.slug}`}
                        onClick={onClose}
                        className="block rounded-sm border border-softgrey bg-white p-3.5 transition hover:border-forest"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-dark">
                          {post.category}
                        </p>
                        <p className="mt-1 font-serif text-sm font-medium text-forest">
                          {post.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold-dark"
                  >
                    Browse All Products
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
