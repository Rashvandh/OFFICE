import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { productCategories } from '../../data/siteData.js';

const FEATURED_LINES = [
  {
    name: 'Ashwagandha Plus',
    desc: 'Pure Herbs daily balance',
    to: '/products/ashwagandha-plus',
  },
  {
    name: 'Pathu Thalai Thailam',
    desc: 'Traditional scalp & hair ritual',
    to: '/products/pathu-thalai-thailam',
  },
  {
    name: 'Kuppaimeni Soap',
    desc: 'Botanical cleansing bar',
    to: '/products/kuppaimeni-soap',
  },
];

export default function MegaMenu({ onClose }) {
  const categories = productCategories.filter((c) => c !== 'All');

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute left-0 right-0 top-full z-30 border-b border-softgrey bg-ivory shadow-xl"
    >
      <div className="container-gramiyam grid grid-cols-12 gap-8 py-8">
        <div className="col-span-7">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Product Categories
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                onClick={onClose}
                className="group flex items-center justify-between rounded-sm px-2.5 py-2 text-sm text-charcoal transition hover:bg-cream hover:text-forest"
              >
                <span className="font-medium">{cat}</span>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100 text-gold-dark" />
              </Link>
            ))}
          </div>
          <div className="mt-5 border-t border-softgrey pt-4">
            <Link
              to="/products"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold-dark"
            >
              View Full Product Catalogue
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="col-span-5 border-l border-softgrey pl-8">
          <p className="mb-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Formulations
          </p>
          <div className="space-y-3">
            {FEATURED_LINES.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={onClose}
                className="block rounded-sm border border-softgrey bg-white p-3.5 transition hover:border-forest"
              >
                <p className="font-serif text-base font-medium text-forest">
                  {item.name}
                </p>
                <p className="mt-0.5 text-xs text-charcoal/70">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
