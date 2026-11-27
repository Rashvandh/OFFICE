export default function BrandValues() {
  return (
    <div
      aria-label="GRAMIYAM Brand Values"
      className="mt-8 grid max-w-md grid-cols-3 divide-x divide-[#000000]/15 border-t border-[#000000]/10 pt-5"
    >
      {/* 1. Pure Botanicals */}
      <div className="flex flex-col items-center gap-1.5 pr-3 text-center">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-[#C02B0B]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19 C12 12, 7 7, 3 7 C3 12, 6 17, 12 19 Z" />
          <path d="M12 19 C12 11, 17 5, 21 5 C21 11, 18 17, 12 19 Z" />
        </svg>
        <span className="text-[11px] font-medium leading-tight text-[#000000]/80 sm:text-[11.5px]">
          Pure Botanicals
        </span>
      </div>

      {/* 2. Traditional Wisdom */}
      <div className="flex flex-col items-center gap-1.5 px-3 text-center">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-[#C02B0B]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 11h14a1 1 0 0 1 1 1 7 7 0 0 1-14 0 1 1 0 0 1 1-1Z" />
          <path d="M8 19h8" />
          <path d="m14 11 4-6" />
        </svg>
        <span className="text-[11px] font-medium leading-tight text-[#000000]/80 sm:text-[11.5px]">
          Traditional Wisdom
        </span>
      </div>

      {/* 3. Everyday Wellness */}
      <div className="flex flex-col items-center gap-1.5 pl-3 text-center">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-[#C02B0B]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 4c2.2 2.8 3.2 5.7 3 8.5-.2 2.1-1.3 3.9-3 5.5-1.7-1.6-2.8-3.4-3-5.5-.2-2.8.8-5.7 3-8.5Z" />
          <path d="M5 11c2.4.4 4.4 1.8 5.6 4.1" />
          <path d="M19 11c-2.4.4-4.4 1.8-5.6 4.1" />
          <path d="M7 18h10" />
        </svg>
        <span className="text-[11px] font-medium leading-tight text-[#000000]/80 sm:text-[11.5px]">
          Everyday Wellness
        </span>
      </div>
    </div>
  );
}
