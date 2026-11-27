// Signature recurring botanical motif — minimal hand-drawn Siddha herb & leaf pattern
export function BotanicalDivider({ tone = 'accent', className = '' }) {
  const strokeColor =
    tone === 'cream'
      ? 'text-[var(--color-gold-soft)]'
      : tone === 'herbal'
        ? 'text-[var(--color-herbal)]/45'
        : 'text-[var(--color-accent)]/60';

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className={`h-[1px] w-12 sm:w-20 bg-current opacity-40 ${strokeColor}`} />
      <svg
        viewBox="0 0 36 22"
        className={`h-5 w-8 ${strokeColor}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 19 C18 11, 11 5, 4 5 C4 12, 9 17, 18 19 Z" />
        <path d="M18 19 C18 10, 25 3, 32 3 C32 10, 27 17, 18 19 Z" />
        <path d="M18 19 L18 21" />
      </svg>
      <span className={`h-[1px] w-12 sm:w-20 bg-current opacity-40 ${strokeColor}`} />
    </div>
  );
}

export function BotanicalCornerPattern({ className = '' }) {
  return (
    <svg
      viewBox="0 0 180 140"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.05"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 12 C42 40, 74 68, 126 112" />
      <path d="M36 34 C16 48, 12 68, 28 80 C48 72, 54 50, 36 34 Z" />
      <path d="M68 60 C58 28, 76 12, 98 26 C98 48, 84 62, 68 60 Z" />
      <path d="M96 86 C76 98, 72 118, 90 128 C108 118, 112 98, 96 86 Z" />
    </svg>
  );
}
