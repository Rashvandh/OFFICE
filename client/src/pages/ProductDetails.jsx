import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingBag, Star, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import QuantitySelector from '../components/common/QuantitySelector.jsx';
import WishlistButton from '../components/common/WishlistButton.jsx';
import { PrimaryButton, SecondaryButton } from '../components/common/Buttons.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import TestimonialCard from '../components/home/TestimonialCard.jsx';
import { productService } from '../services/productService.js';
import { sampleProducts, SAMPLE_REVIEWS } from '../data/siteData.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatCurrency } from '../utils/formatters.js';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    productService.getProductBySlug(slug).then(({ product: found }) => {
      if (!mounted) return;
      setProduct(found);
      if (found) {
        setActiveImage(found.images?.[0] || found.image);
        setSelectedVariant(found.variants?.[0]?.label || 'Standard');
      }
      setQuantity(1);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="container-gramiyam py-16">
        <div className="h-96 animate-pulse rounded-sm bg-cream" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container-gramiyam py-20 text-center">
        <h1 className="font-serif text-4xl font-medium text-forest">
          Product Not Found
        </h1>
        <p className="mt-3 text-sm text-charcoal/75">
          The requested formulation could not be found in our catalogue.
        </p>
        <div className="mt-6">
          <PrimaryButton to="/products">Browse All Products</PrimaryButton>
        </div>
      </main>
    );
  }

  const gallery = product.images?.length ? product.images : [product.image];
  const activePrice =
    product.variants?.find((v) => v.label === selectedVariant)?.price ?? product.price;
  const hasApprovedPrice = typeof activePrice === 'number' && !Number.isNaN(activePrice);
  const related = sampleProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    showToast(`${product.name} added to your bag.`);
    openDrawer();
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariant);
    navigate('/checkout');
  };

  return (
    <main className="pb-24 lg:pb-16">
      <div className="container-gramiyam py-8 sm:py-12">
        <Breadcrumb
          items={[
            { label: 'Products', to: '/products' },
            { label: product.category, to: `/products?category=${encodeURIComponent(product.category)}` },
            { label: product.name },
          ]}
        />

        {/* Two-column Product Overview */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-sm border border-softgrey bg-ivory p-3">
              <img
                src={activeImage}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {gallery.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-sm border-2 transition ${
                      activeImage === img ? 'border-forest' : 'border-softgrey'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info & Purchase Actions */}
          <div className="lg:col-span-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
              {product.category}
            </span>
            <h1 className="mt-2 font-serif text-4xl font-medium text-forest sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="text-2xl font-bold text-forest">
                {formatCurrency(activePrice)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-charcoal/45 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {product.rating && (
                <span className="inline-flex items-center gap-1 rounded-sm bg-cream px-2.5 py-1 text-xs font-medium text-forest">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                  {product.rating} ({product.reviewCount || 0} sample reviews)
                </span>
              )}
            </div>

            {product.isPlaceholder && (
              <p className="mt-4 rounded-sm border-l-2 border-gold bg-cream px-4 py-2.5 text-xs text-charcoal/80">
                Illustrative placeholder pricing, variants, and product details — awaiting official Gramiyam catalogue data.
              </p>
            )}

            <p className="mt-5 text-sm leading-relaxed text-charcoal/80 sm:text-base">
              {product.shortDescription}
            </p>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mt-6">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                  Available Sizes / Packs
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => setSelectedVariant(v.label)}
                      className={`rounded-sm border px-4 py-2 text-xs font-semibold transition ${
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

            {/* Quantity + Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {hasApprovedPrice ? (
                <>
                  <QuantitySelector
                    quantity={quantity}
                    onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                    onIncrease={() => setQuantity((q) => q + 1)}
                  />
                  <PrimaryButton onClick={handleAddToCart} className="flex-1 min-w-[160px]">
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </PrimaryButton>
                  <SecondaryButton onClick={handleBuyNow}>
                    Buy Now
                    <ArrowRight className="h-4 w-4" />
                  </SecondaryButton>
                </>
              ) : (
                <PrimaryButton to="/contact" className="flex-1 min-w-[200px]">
                  Enquire About This Formulation
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              )}
              <WishlistButton product={product} />
            </div>

            {/* Highlights */}
            {product.highlights?.length > 0 && (
              <div className="mt-8 border-t border-softgrey pt-6">
                <h2 className="font-serif text-xl font-medium text-forest">
                  Highlights
                </h2>
                <ul className="mt-3 space-y-2">
                  {product.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-charcoal/80"
                    >
                      <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-botanical" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Details Grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-softgrey pt-6 sm:grid-cols-2">
              <div className="rounded-sm border border-softgrey bg-white p-4">
                <h3 className="font-serif text-lg font-medium text-forest">
                  Ingredients
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-charcoal/75">
                  {product.ingredients}
                </p>
              </div>
              <div className="rounded-sm border border-softgrey bg-white p-4">
                <h3 className="font-serif text-lg font-medium text-forest">
                  Benefits
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-charcoal/75">
                  {product.benefits}
                </p>
              </div>
              <div className="rounded-sm border border-softgrey bg-white p-4">
                <h3 className="font-serif text-lg font-medium text-forest">
                  Directions for Use
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-charcoal/75">
                  {product.directions}
                </p>
              </div>
              <div className="rounded-sm border border-softgrey bg-white p-4">
                <h3 className="font-serif text-lg font-medium text-forest">
                  Specifications
                </h3>
                <dl className="mt-2 space-y-1 text-xs">
                  {Object.entries(product.specifications || {}).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt className="text-charcoal/60">{k}:</dt>
                      <dd className="font-medium text-forest">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-charcoal/65">
              <ShieldCheck className="h-4 w-4 text-botanical" />
              <span>Secure checkout powered by Razorpay when backend order API is connected.</span>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <section className="mt-16 border-t border-softgrey pt-12">
          <h2 className="font-serif text-3xl font-medium text-forest">
            Customer Reviews (Sample)
          </h2>
          <p className="mt-1 text-xs text-charcoal/65">
            Sample placeholder reviews displayed until verified product reviews are supplied.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {SAMPLE_REVIEWS.slice(0, 3).map((review) => (
              <TestimonialCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-16 border-t border-softgrey pt-12">
          <h2 className="mb-8 font-serif text-3xl font-medium text-forest">
            Related Formulations
          </h2>
          <ProductGrid products={related} columns={4} />
        </section>
      </div>

      {/* Sticky Mobile Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-3 border-t border-softgrey bg-ivory/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div>
          <p className="text-xs font-medium text-charcoal/70 truncate max-w-[160px]">
            {product.name}
          </p>
          <p className="text-sm font-bold text-forest">
            {hasApprovedPrice ? formatCurrency(activePrice) : 'Catalogue Pending'}
          </p>
        </div>
        {hasApprovedPrice ? (
          <PrimaryButton onClick={handleAddToCart} className="py-2.5 px-5">
            Add to Cart
          </PrimaryButton>
        ) : (
          <PrimaryButton to="/contact" className="py-2.5 px-5">
            Enquire
          </PrimaryButton>
        )}
      </div>
    </main>
  );
}
