import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Modal from '../common/Modal.jsx';
import QuantitySelector from '../common/QuantitySelector.jsx';
import WishlistButton from '../common/WishlistButton.jsx';
import { PrimaryButton } from '../common/Buttons.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { formatCurrency } from '../../utils/formatters.js';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedVariant(product.variants?.[0]?.label || 'Standard');
    }
  }, [product]);

  if (!product) return null;

  const activePrice =
    product.variants?.find((v) => v.label === selectedVariant)?.price ?? product.price;
  const hasApprovedPrice = typeof activePrice === 'number' && !Number.isNaN(activePrice);

  const handleAdd = () => {
    if (!hasApprovedPrice) return;
    addItem(product, quantity, selectedVariant);
    showToast(`${product.name} added to your bag.`);
    onClose();
    openDrawer();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick View" maxWidth="max-w-3xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="aspect-[4/3] overflow-hidden rounded-sm border border-softgrey bg-ivory p-2">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
            {product.category}
          </span>
          <h4 className="mt-1 font-serif text-3xl font-medium text-forest">
            {product.name}
          </h4>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-xl font-bold text-forest">
              {formatCurrency(activePrice)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-charcoal/45 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          {product.isPlaceholder && (
            <p className="mt-2 rounded-sm bg-cream px-3 py-1.5 text-[11px] text-charcoal/75">
              Illustrative placeholder price & metadata — awaiting official catalogue approval.
            </p>
          )}

          <p className="mt-4 text-sm leading-relaxed text-charcoal/80">
            {product.shortDescription}
          </p>

          {product.variants?.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                Select Pack
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setSelectedVariant(v.label)}
                    className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition ${
                      selectedVariant === v.label
                        ? 'border-forest bg-forest text-ivory'
                        : 'border-softgrey bg-white text-charcoal hover:border-forest'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {hasApprovedPrice ? (
              <>
                <QuantitySelector
                  quantity={quantity}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                  onIncrease={() => setQuantity((q) => q + 1)}
                />
                <PrimaryButton onClick={handleAdd} className="flex-1">
                  <ShoppingBag className="h-4 w-4" />
                  Add to Bag
                </PrimaryButton>
              </>
            ) : (
              <PrimaryButton to={`/products/${product.slug}`} onClick={onClose} className="flex-1">
                View Product Specification
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            )}
            <WishlistButton product={product} />
          </div>

          <Link
            to={`/products/${product.slug}`}
            onClick={onClose}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold-dark"
          >
            View Full Product Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
