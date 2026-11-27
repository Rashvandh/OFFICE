export default function FeaturedSectionDivider({ label = 'FEATURED FORMULATIONS' }) {
  return (
    <div className="mt-12 flex items-center justify-center gap-4 px-4 sm:mt-14">
      <span className="h-[1px] w-14 bg-[#C02B0B]/40 sm:w-20" aria-hidden="true" />
      <span className="text-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[#C02B0B]">
        {label}
      </span>
      <span className="h-[1px] w-14 bg-[#C02B0B]/40 sm:w-20" aria-hidden="true" />
    </div>
  );
}
