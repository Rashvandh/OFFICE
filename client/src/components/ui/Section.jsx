const SURFACE_STYLES = {
  cream: 'bg-[var(--color-cream)] text-[var(--color-ink)]',
  sand: 'bg-[var(--color-cream-soft)] text-[var(--color-ink)]',
  herbal: 'bg-[var(--color-herbal)] text-[var(--color-cream)]',
  white: 'bg-[var(--color-cream-surface)] text-[var(--color-ink)]',
};

export default function Section({
  children,
  surface = 'cream',
  id,
  ariaLabelledBy,
  className = '',
}) {
  const palette = SURFACE_STYLES[surface] || SURFACE_STYLES.cream;
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`relative overflow-x-clip py-14 sm:py-20 lg:py-24 ${palette} ${className}`}
    >
      {children}
    </section>
  );
}
