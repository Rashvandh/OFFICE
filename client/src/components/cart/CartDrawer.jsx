import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import QuantitySelector from '../common/QuantitySelector.jsx';
import { PrimaryButton, SecondaryButton } from '../common/Buttons.jsx';

export default function CartDrawer() {
  const { items, subtotal, isDrawerOpen, closeDrawer, updateQuantity, removeItem } =
    useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-forest-dark/60 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-softgrey px-6 py-5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-forest" />
                <h2 className="font-serif text-xl font-medium text-forest">
                  Your Bag
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close shopping bag"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-softgrey bg-white text-forest"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-forest">
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <p className="font-serif text-2xl font-medium text-forest">
                  Your bag is empty
                </p>
                <p className="mt-2 max-w-xs text-sm text-charcoal/70">
                  Explore our Siddha & Ayurveda herbal formulations to begin your wellness ritual.
                </p>
                <div className="mt-6">
                  <PrimaryButton to="/products" onClick={closeDrawer}>
                    Explore Products
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map((item) => (
                    <div
                      key={item.itemKey}
                      className="flex gap-4 rounded-sm border border-softgrey bg-white p-3.5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-sm object-cover bg-cream"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              to={`/products/${item.slug}`}
                              onClick={closeDrawer}
                              className="font-serif text-base font-medium text-forest hover:text-gold-dark"
                            >
                              {item.name}
                            </Link>
                            <p className="text-[11px] text-charcoal/60">
                              {item.variant}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.itemKey)}
                            aria-label={`Remove ${item.name}`}
                            className="text-charcoal/45 transition hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <QuantitySelector
                            size="sm"
                            quantity={item.quantity}
                            onDecrease={() =>
                              updateQuantity(item.itemKey, item.quantity - 1)
                            }
                            onIncrease={() =>
                              updateQuantity(item.itemKey, item.quantity + 1)
                            }
                          />
                          <span className="text-sm font-semibold text-forest">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-softgrey bg-white p-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/75">Subtotal</span>
                    <span className="font-serif text-xl font-semibold text-forest">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-charcoal/60">
                    Shipping & taxes calculated at checkout.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <SecondaryButton to="/cart" onClick={closeDrawer}>
                      View Cart
                    </SecondaryButton>
                    <PrimaryButton to="/checkout" onClick={closeDrawer}>
                      Checkout
                      <ArrowRight className="h-3.5 w-3.5" />
                    </PrimaryButton>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
