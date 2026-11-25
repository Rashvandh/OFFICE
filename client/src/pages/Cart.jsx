import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatCurrency } from '../utils/formatters.js';
import QuantitySelector from '../components/common/QuantitySelector.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { PrimaryButton, SecondaryButton } from '../components/common/Buttons.jsx';

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const discount = 0; // Discounts calculated/verified on backend
  const shippingEstimate = subtotal > 0 ? 0 : 0; // Official shipping rates pending confirmation
  const grandTotal = Math.max(0, subtotal - discount + shippingEstimate);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim()) {
      setAppliedCoupon(coupon.trim().toUpperCase());
    }
  };

  return (
    <main className="py-12 sm:py-16">
      <div className="container-gramiyam">
        <div className="mb-8 border-b border-softgrey pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
            Shopping Bag
          </p>
          <h1 className="mt-1 font-serif text-4xl font-medium text-forest">
            Your Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your shopping bag is currently empty"
            description="Browse our Siddha and Ayurveda formulations to add Pure Herbs, Hair Care, or Body Care essentials."
            actionLabel="Continue Shopping"
            actionTo="/products"
          />
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <article
                  key={item.itemKey}
                  className="flex flex-col gap-4 rounded-sm border border-softgrey bg-white p-5 sm:flex-row sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 shrink-0 rounded-sm object-cover bg-cream"
                  />
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-dark">
                      {item.category}
                    </p>
                    <Link
                      to={`/products/${item.slug}`}
                      className="font-serif text-xl font-medium text-forest hover:text-botanical"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-charcoal/65">
                      Pack: {item.variant} • Unit Price: {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <QuantitySelector
                      quantity={item.quantity}
                      onDecrease={() =>
                        updateQuantity(item.itemKey, item.quantity - 1)
                      }
                      onIncrease={() =>
                        updateQuantity(item.itemKey, item.quantity + 1)
                      }
                    />
                    <span className="min-w-[80px] text-right font-semibold text-forest">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.itemKey)}
                      aria-label={`Remove ${item.name}`}
                      className="text-charcoal/45 transition hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}

              <div className="pt-2">
                <SecondaryButton to="/products">Continue Shopping</SecondaryButton>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-sm border border-softgrey bg-white p-6 shadow-card">
                <h2 className="font-serif text-2xl font-medium text-forest">
                  Order Summary
                </h2>

                <form onSubmit={handleApplyCoupon} className="mt-5 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/45" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code"
                      aria-label="Coupon code"
                      className="w-full rounded-sm border border-softgrey bg-ivory/60 py-2.5 pl-9 pr-3 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-sm border border-forest px-4 py-2 text-xs font-semibold uppercase tracking-wider text-forest transition hover:bg-forest hover:text-ivory"
                  >
                    Apply
                  </button>
                </form>
                {appliedCoupon && (
                  <p className="mt-2 text-xs text-botanical">
                    Coupon <strong>{appliedCoupon}</strong> will be validated by the server at checkout.
                  </p>
                )}

                <dl className="mt-6 space-y-3 border-t border-softgrey pt-5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-charcoal/75">Subtotal</dt>
                    <dd className="font-semibold text-forest">
                      {formatCurrency(subtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal/75">Discount</dt>
                    <dd className="text-charcoal/65">
                      {discount > 0 ? `-${formatCurrency(discount)}` : 'Calculated at checkout'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal/75">Shipping Estimate</dt>
                    <dd className="text-charcoal/65">Calculated at checkout</dd>
                  </div>
                  <div className="flex justify-between border-t border-softgrey pt-3 text-base font-bold text-forest">
                    <dt>Estimated Total</dt>
                    <dd>{formatCurrency(grandTotal)}</dd>
                  </div>
                </dl>

                <PrimaryButton to="/checkout" className="mt-6 w-full">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
