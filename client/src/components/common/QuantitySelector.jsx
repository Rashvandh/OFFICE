import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
  size = 'md',
}) {
  const btnSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const textSize = size === 'sm' ? 'w-8 text-xs' : 'w-10 text-sm';

  return (
    <div className="inline-flex items-center rounded-sm border border-softgrey bg-white">
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className={`inline-flex items-center justify-center text-forest transition hover:bg-cream ${btnSize}`}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span
        className={`inline-flex items-center justify-center font-semibold text-charcoal ${textSize}`}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className={`inline-flex items-center justify-center text-forest transition hover:bg-cream ${btnSize}`}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
