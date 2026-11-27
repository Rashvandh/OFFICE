import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CollectionNavigation({
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
}) {
  return (
    <div className="flex items-center gap-3" role="group" aria-label="Collection navigation">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous collections"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C02B0B]/35 bg-transparent text-[#000000] transition-colors duration-200 hover:border-[#C02B0B] hover:text-[#C02B0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next collections"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C02B0B] text-white shadow-sm transition-colors duration-200 hover:bg-[#9E2208] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C02B0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEFBEA] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </div>
  );
}
