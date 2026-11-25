export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  action,
  light = false,
}) {
  const centered = align === 'center';
  return (
    <div
      className={`mb-10 flex flex-col gap-4 ${
        centered
          ? 'items-center text-center'
          : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-xl'}>
        {eyebrow && (
          <p
            className={`mb-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] ${
              light ? 'text-gold-light' : 'text-gold-dark'
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-[42px] ${
            light ? 'text-ivory' : 'text-forest'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-3 text-sm leading-relaxed sm:text-base ${
              light ? 'text-ivory/80' : 'text-charcoal/75'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
