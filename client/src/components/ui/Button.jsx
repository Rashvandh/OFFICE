import { Link } from 'react-router-dom';

const VARIANT_CLASSES = {
  primary:
    'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-sm',
  herbal:
    'bg-[var(--color-herbal)] text-[var(--color-cream)] hover:bg-[var(--color-herbal-dark)] shadow-sm',
  cream:
    'bg-[var(--color-cream)] text-[var(--color-herbal)] hover:bg-white shadow-sm',
  outlineDark:
    'border border-[var(--color-accent)]/50 bg-transparent text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white',
  outlineLight:
    'border border-[var(--color-cream)]/45 bg-transparent text-[var(--color-cream)] hover:border-[var(--color-cream)] hover:bg-white/10',
  gold:
    'bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[#b29150]',
};

export default function Button({
  children,
  to,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  const sizeClasses =
    size === 'sm'
      ? 'min-h-[40px] px-4 py-2 text-xs'
      : size === 'lg'
        ? 'min-h-[48px] px-7 py-3.5 text-sm'
        : 'min-h-[44px] px-5 py-2.5 text-[13px]';

  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${
    VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={base} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={base} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={base}
      {...props}
    >
      {children}
    </button>
  );
}
