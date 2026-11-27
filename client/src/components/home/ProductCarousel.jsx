import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard.jsx';

export default function ProductCarousel({ products }) {
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);

  if (!products.length) return null;

  const rotatedProducts = products.map(
    (_, idx) => products[(idx + offset) % products.length]
  );

  const handlePrev = () => {
    setOffset((prev) => (prev - 1 + products.length) % products.length);
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setOffset((prev) => (prev + 1) % products.length);
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        {/* Desktop: Five Evenly Aligned Cards */}
        <div className="hidden flex-1 lg:grid lg:grid-cols-5 lg:gap-4">
          {rotatedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Tablet & Mobile: Horizontal Swipeable Carousel */}
        <div
          ref={trackRef}
          className="flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar lg:hidden"
        >
          {products.map((product) => (
            <div
              key={product.slug}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-[32%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Desktop Right-Side Stacked Circular Controls */}
        <div
          className="hidden shrink-0 flex-col gap-2.5 lg:flex"
          role="group"
          aria-label="Featured products navigation"
        >
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous featured products"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#000000]/25 bg-[#FEFBEA] text-[#000000] transition-colors duration-200 hover:border-[#C02B0B] hover:text-[#C02B0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next featured products"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C02B0B] text-white shadow-sm transition-colors duration-200 hover:bg-[#9E2208] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEFBEA]"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Tablet & Mobile Carousel Controls */}
      <div
        className="mt-5 flex items-center justify-center gap-3 lg:hidden"
        role="group"
        aria-label="Featured products mobile navigation"
      >
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous featured products"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#000000]/25 bg-[#FEFBEA] text-[#000000] transition-colors duration-200 hover:border-[#C02B0B] hover:text-[#C02B0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next featured products"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C02B0B] text-white shadow-sm transition-colors duration-200 hover:bg-[#9E2208] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B]"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
