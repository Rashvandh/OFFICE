export default function HeroIndicators({ total, activeIndex, onSelect }) {
  return (
    <div
      className="mt-7 flex items-center gap-2.5"
      role="tablist"
      aria-label="Hero showcase slides"
    >
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Show hero slide ${idx + 1}`}
            onClick={() => onSelect(idx)}
            className={`h-2.5 w-2.5 rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEFBEA] ${
              isActive
                ? 'border-[#C02B0B] bg-[#C02B0B]'
                : 'border-[#000000]/30 bg-transparent hover:border-[#C02B0B]'
            }`}
          />
        );
      })}
    </div>
  );
}
