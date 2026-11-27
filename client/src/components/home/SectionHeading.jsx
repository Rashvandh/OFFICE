export default function SectionHeading() {
  return (
    <div className="mb-10 text-center sm:mb-12">
      {/* Small Botanical Symbol */}
      <div className="mb-2 flex justify-center">
        <svg
          viewBox="0 0 32 24"
          className="h-5 w-7 text-[#C02B0B]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 20 C16 12, 10 6, 4 6 C4 12, 8 18, 16 20 Z" />
          <path d="M16 20 C16 11, 22 4, 28 4 C28 11, 24 18, 16 20 Z" />
          <path d="M16 20 L16 23" />
        </svg>
      </div>

      {/* Eyebrow with Flanking Lines */}
      <div className="inline-flex items-center gap-4">
        <span className="h-[1px] w-12 bg-[#C02B0B]/40 sm:w-20" aria-hidden="true" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#C02B0B]">
          FEATURED FORMULATIONS
        </span>
        <span className="h-[1px] w-12 bg-[#C02B0B]/40 sm:w-20" aria-hidden="true" />
      </div>

      {/* Main Editorial Serif Heading */}
      <h2
        id="featured-formulations-heading"
        className="mx-auto mt-3 max-w-4xl font-serif text-3xl font-semibold leading-tight tracking-tight text-[#000000] sm:text-4xl lg:text-[42px]"
      >
        Explore Selected Products from the{' '}
        <span className="font-bold text-[#C02B0B]">GRAMIYAM</span> Catalogue.
      </h2>
    </div>
  );
}
