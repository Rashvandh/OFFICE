import { Link } from 'react-router-dom';

export function PrimaryButton({
  children,
  to,
  href,
  type = 'button',
  variant = 'terracotta',
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  const palette =
    variant === 'ivory'
      ? 'bg-ivory text-forest hover:bg-cream border border-ivory'
      : 'bg-forest text-ivory hover:bg-botanical';

  const base = `inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${palette} ${className}`;

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

export function SecondaryButton({
  children,
  to,
  href,
  type = 'button',
  variant = 'dark',
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  const styles =
    variant === 'light'
      ? 'border border-ivory/75 bg-transparent text-ivory hover:bg-ivory hover:text-forest'
      : 'border border-forest/40 bg-transparent text-forest hover:border-forest hover:bg-forest hover:text-ivory';

  const base = `inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`;

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
