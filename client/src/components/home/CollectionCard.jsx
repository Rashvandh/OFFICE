import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function CategoryIcon({ iconKey }) {
  switch (iconKey) {
    case 'hair-care':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3c-2.5 3.5-5 6.5-5 10a5 5 0 0 0 10 0c0-3.5-2.5-6.5-5-10Z" />
          <path d="M12 8v9" />
        </svg>
      );
    case 'skin-care':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
          <path d="M2 21c0-3 1.8-5.4 5.1-6C9.5 14.5 12 13 13 12" />
        </svg>
      );
    case 'pure-herbs':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 11h14a1 1 0 0 1 1 1 7 7 0 0 1-14 0 1 1 0 0 1 1-1Z" />
          <path d="M8 19h8" />
          <path d="m14 11 4-6" />
        </svg>
      );
    case 'herbal-wellness':
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4c2.2 2.8 3.2 5.7 3 8.5-.2 2.1-1.3 3.9-3 5.5-1.7-1.6-2.8-3.4-3-5.5-.2-2.8.8-5.7 3-8.5Z" />
          <path d="M5 11c2.4.4 4.4 1.8 5.6 4.1" />
          <path d="M19 11c-2.4.4-4.4 1.8-5.6 4.1" />
          <path d="M7 18h10" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3c1.6 2.2 2.3 4.3 2 6.5-.2 1.6-1 2.9-2 4-1-1.1-1.8-2.4-2-4-.3-2.2.4-4.3 2-6.5Z" />
          <path d="M6 12c2.5-.2 4.6.8 6 3" />
          <path d="M18 12c-2.5-.2-4.6.8-6 3" />
          <path d="M12 15v5" />
        </svg>
      );
  }
}

export default function CollectionCard({ collection, isHighlighted = false }) {
  return (
    <Link
      to={collection.link}
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border bg-gradient-to-b from-[#FAF3DC] to-[#F5E9C9] shadow-[0_10px_28px_-12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-12px_rgba(192,43,11,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B] ${
        isHighlighted
          ? 'border-[#C02B0B]/60 ring-1 ring-[#C02B0B]/25'
          : 'border-[#E8DFC5]'
      }`}
    >
      {/* Top Photograph (~46% height) with Organic Curved Wave */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#EFE6CB] sm:h-52">
        <img
          src={collection.image}
          alt={collection.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <svg
          viewBox="0 0 300 42"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[1px] left-0 h-8 w-full text-[#FAF3DC]"
        >
          <path
            d="M0,18 C48,0 102,4 156,22 C210,40 258,38 300,14 L300,42 L0,42 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex flex-1 flex-col px-4 pb-5 pt-0">
        {/* Category Icon Positioned on the Wave Edge */}
        <div className="-mt-7 mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#C02B0B]/40 bg-[#FEFBEA] text-[#C02B0B] shadow-xs transition-transform duration-300 group-hover:scale-105">
          <CategoryIcon iconKey={collection.iconKey} />
        </div>

        <h3 className="font-serif text-[19px] font-bold leading-snug text-[#000000]">
          {collection.title}
        </h3>

        <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-[#000000]/75">
          {collection.description}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#C02B0B]">
          Explore
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  );
}
