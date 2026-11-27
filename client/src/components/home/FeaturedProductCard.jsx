import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function FeaturedProductCard({ product }) {
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();

  const item = product || {
    _id: 'ashwagandha-plus',
    slug: 'ashwagandha-plus',
    name: 'Ashwagandha Plus',
    image: '/images/gramiyam/ashwagandha-plus.jpg',
    shortDescription:
      '60 Tablets (650 mg) — classical Ashwagandha formulation supporting everyday balance and resilience.',
  };

  const description =
    item.shortDescription && !item.shortDescription.startsWith('Development placeholder')
      ? item.shortDescription
      : '60 Tablets (650 mg) — classical Ashwagandha formulation supporting everyday balance and resilience.';

  const handleBuyNow = () => {
    addItem(item, 1);
    showToast(`${item.name} added to your bag.`);
    openDrawer();
  };

  return (
    <div className="mt-7 rounded-2xl border border-[var(--color-gold-soft)] bg-[var(--color-cream-surface)] p-4 text-[var(--color-ink)] shadow-lift sm:p-5">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
        {/* Left: Badge + Official Product Visual */}
        <div className="flex w-full shrink-0 flex-col items-center sm:w-[42%]">
          <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-[var(--color-gold-soft)] bg-white px-2.5 py-1 text-[11px] font-semibold text-[var(--color-ink)]">
            <Star className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
            <span>Featured Product</span>
          </span>

          <div className="mt-2.5 flex w-full flex-1 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-cream)]">
            <img
              src={item.image || '/images/gramiyam/ashwagandha-plus.jpg'}
              alt={item.name}
              width="280"
              height="200"
              className="h-36 w-full object-cover object-bottom transition-transform duration-500 hover:scale-105 sm:h-40"
            />
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="flex flex-1 flex-col justify-between text-center sm:text-left">
          <div>
            <h2 className="font-sans text-xl font-bold tracking-tight text-[var(--color-ink)]">
              {item.name}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
              {description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
            <Link
              to={`/products/${item.slug}`}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--color-herbal)]/35 bg-[var(--color-cream)] px-4 py-2 text-xs font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-herbal)] hover:text-[var(--color-herbal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              <span>Product Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleBuyNow}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[var(--color-herbal)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--color-herbal-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              <span>Buy Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
