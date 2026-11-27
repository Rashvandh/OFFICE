import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroIndicators from './HeroIndicators.jsx';

export default function HeroContent({ totalSlides, activeIndex, onSelectSlide }) {
  return (
    <div className="relative z-10">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-3">
        <span className="rounded-xs bg-[#F5E9C9]/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#000000]/80">
          SIDDHA &amp; AYURVEDA
        </span>
      </div>

      {/* Editorial Serif Headline */}
      <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.06] tracking-tight text-[#000000] sm:text-5xl lg:text-[60px]">
        Rooted in
        <br />
        Tradition.
        <br />
        <span className="font-semibold italic text-[#C02B0B]">
          Made for Today.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-[#000000]/80 sm:text-[15.5px]">
        Discover botanical care and traditional wellness inspired by India’s rich
        Siddha and Ayurveda heritage.
      </p>

      {/* Primary CTA */}
      <div className="mt-7">
        <Link
          to="/collections"
          className="inline-flex items-center gap-2.5 rounded-md bg-[#C02B0B] px-6 py-3.5 text-[13px] font-semibold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9E2208] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEFBEA]"
        >
          <span>Explore Our Collections</span>
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>

      {/* Three Carousel Indicators */}
      <HeroIndicators
        total={totalSlides}
        activeIndex={activeIndex}
        onSelect={onSelectSlide}
      />
    </div>
  );
}
