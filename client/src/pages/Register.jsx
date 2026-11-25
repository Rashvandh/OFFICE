import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import UserAuthLayout from '../components/auth/UserAuthLayout.jsx';
import PasswordStrengthMeter, {
  evaluatePasswordStrength,
} from '../admin/components/auth/PasswordStrengthMeter.jsx';

export default function Register() {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const passwordValue = watch('password', '');

  const onSubmit = async (values) => {
    setErrorMsg('');
    const result = await registerUser({
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    });
    if (result.success) {
      navigate('/account');
    } else {
      setErrorMsg(result.message);
    }
  };

  const busy = loading || isSubmitting;

  return (
    <UserAuthLayout
      footerLeft={
        <span>
          Have an account?{' '}
          <Link to="/login" className="font-semibold text-[#B93627] underline underline-offset-4">
            Sign in
          </Link>
        </span>
      }
    >
      <div className="mb-6 text-center">
        <h1 className="font-serif text-3xl font-semibold text-[#34332C]">
          Create an account
        </h1>
        <p className="mt-1.5 text-xs text-[#77736B]">
          Join GRAMIYAM for Siddha & Ayurveda wellness
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[#77736B]">
            Full name
          </span>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full rounded-full border border-[#E9D8C5] bg-white px-5 py-3 text-sm text-[#34332C] placeholder:text-[#77736B]/60 focus:border-[#B93627] focus:outline-none"
            {...register('name', { required: 'Full name is required.' })}
          />
          {errors.name && (
            <span className="mt-1 block px-2 text-xs text-[#B93627]">{errors.name.message}</span>
          )}
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[#77736B]">
            Email
          </span>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-full border border-[#E9D8C5] bg-white px-5 py-3 text-sm text-[#34332C] placeholder:text-[#77736B]/60 focus:border-[#B93627] focus:outline-none"
            {...register('email', {
              required: 'Email address is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address.',
              },
            })}
          />
          {errors.email && (
            <span className="mt-1 block px-2 text-xs text-[#B93627]">{errors.email.message}</span>
          )}
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[#77736B]">
            Phone number
          </span>
          <input
            type="tel"
            placeholder="10-digit mobile number"
            className="w-full rounded-full border border-[#E9D8C5] bg-white px-5 py-3 text-sm text-[#34332C] placeholder:text-[#77736B]/60 focus:border-[#B93627] focus:outline-none"
            {...register('phone', {
              required: 'Phone number is required.',
              minLength: { value: 10, message: 'Enter a valid phone number.' },
            })}
          />
          {errors.phone && (
            <span className="mt-1 block px-2 text-xs text-[#B93627]">{errors.phone.message}</span>
          )}
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[#77736B]">
            Password
          </span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              className="w-full rounded-full border border-[#E9D8C5] bg-white py-3 pl-5 pr-12 text-sm text-[#34332C] placeholder:text-[#77736B]/60 focus:border-[#B93627] focus:outline-none"
              {...register('password', {
                required: 'Password is required.',
                validate: (val) => {
                  const { checks } = evaluatePasswordStrength(val);
                  return (
                    (checks.length && checks.upper && checks.lower && checks.number) ||
                    'Use 8+ chars with uppercase, lowercase, and a number.'
                  );
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#77736B] hover:text-[#B93627]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div className="px-2">
            <PasswordStrengthMeter password={passwordValue} />
          </div>
          {errors.password && (
            <span className="mt-1 block px-2 text-xs text-[#B93627]">{errors.password.message}</span>
          )}
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[#77736B]">
            Confirm password
          </span>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="••••••••••••"
              className="w-full rounded-full border border-[#E9D8C5] bg-white py-3 pl-5 pr-12 text-sm text-[#34332C] placeholder:text-[#77736B]/60 focus:border-[#B93627] focus:outline-none"
              {...register('confirmPassword', {
                required: 'Please confirm your password.',
                validate: (val) => val === passwordValue || 'Passwords do not match.',
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#77736B] hover:text-[#B93627]"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="mt-1 block px-2 text-xs text-[#B93627]">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>

        {errorMsg && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-2xl border border-[#B93627]/30 bg-red-50 p-3 text-xs text-[#8F2A1D]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B93627]" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#B93627] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8F2A1D] disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{busy ? 'Creating Account...' : 'Submit'}</span>
        </button>
      </form>
    </UserAuthLayout>
  );
}
