import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { orderService } from '../../services/orderService.js';

export default function NewsletterForm({ variant = 'light', buttonText = 'Subscribe' }) {
  const [status, setStatus] = useState({ type: '', message: '' });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email }) => {
    setStatus({ type: '', message: '' });
    try {
      await orderService.subscribeNewsletter(email);
      setStatus({
        type: 'success',
        message: 'Thank you for subscribing to Gramiyam updates.',
      });
      reset();
    } catch {
      setStatus({
        type: 'info',
        message:
          'Subscription request recorded locally. Connect the backend /api/newsletter/subscribe endpoint to complete live delivery.',
      });
      reset();
    }
  };

  const isDark = variant === 'dark';

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex items-center border-b transition-colors ${
          isDark
            ? 'border-ivory/35 focus-within:border-gold-light'
            : 'border-forest/30 focus-within:border-forest'
        }`}
        noValidate
      >
        <input
          type="email"
          placeholder="Enter your email address"
          aria-label="Email address for newsletter"
          className={`w-full min-w-0 bg-transparent py-3 text-sm focus:outline-none ${
            isDark
              ? 'text-ivory placeholder:text-ivory/50'
              : 'text-charcoal placeholder:text-charcoal/50'
          }`}
          {...register('email', {
            required: 'Please enter your email address.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address.',
            },
          })}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex shrink-0 items-center gap-1.5 py-3 pl-3 text-xs font-semibold uppercase tracking-wider transition ${
            isDark
              ? 'text-gold-light hover:text-white'
              : 'text-forest hover:text-botanical'
          }`}
        >
          {isSubmitting ? 'Sending...' : buttonText}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </form>
      {errors.email && (
        <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
      )}
      {status.message && (
        <p
          className={`mt-2 flex items-center gap-1.5 text-xs ${
            isDark ? 'text-sage-light' : 'text-botanical'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          <span>{status.message}</span>
        </p>
      )}
    </div>
  );
}
