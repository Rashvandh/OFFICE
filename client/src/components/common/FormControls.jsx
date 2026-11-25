import { forwardRef } from 'react';

export const FormInput = forwardRef(function FormInput(
  { label, error, className = '', required, ...props },
  ref
) {
  return (
    <label className={`block text-left ${className}`}>
      {label && (
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/80">
          {label}
          {required && <span className="ml-1 text-gold-dark">*</span>}
        </span>
      )}
      <input
        ref={ref}
        className={`w-full rounded-sm border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-forest focus:outline-none ${
          error ? 'border-red-600' : 'border-softgrey'
        }`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
});

export const FormSelect = forwardRef(function FormSelect(
  { label, error, options = [], placeholder = 'Select an option', className = '', required, ...props },
  ref
) {
  return (
    <label className={`block text-left ${className}`}>
      {label && (
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/80">
          {label}
          {required && <span className="ml-1 text-gold-dark">*</span>}
        </span>
      )}
      <select
        ref={ref}
        className={`w-full rounded-sm border bg-white px-4 py-3 text-sm text-charcoal transition-colors focus:border-forest focus:outline-none ${
          error ? 'border-red-600' : 'border-softgrey'
        }`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const value = typeof opt === 'string' ? opt : opt.value;
          const text = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
});

export const FormTextarea = forwardRef(function FormTextarea(
  { label, error, rows = 4, className = '', required, ...props },
  ref
) {
  return (
    <label className={`block text-left ${className}`}>
      {label && (
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/80">
          {label}
          {required && <span className="ml-1 text-gold-dark">*</span>}
        </span>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full rounded-sm border bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-forest focus:outline-none ${
          error ? 'border-red-600' : 'border-softgrey'
        }`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
});
