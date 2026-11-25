import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import AdminAuthLayout from '../../components/auth/AdminAuthLayout.jsx';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';

const REMEMBERED_EMAIL_KEY = 'gramiyam_admin_remembered_email';

export default function AdminLogin() {
  const { login, isAuthenticated, loading } = useAdminAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const rememberedEmail = (() => {
    try {
      return localStorage.getItem(REMEMBERED_EMAIL_KEY) || '';
    } catch {
      return '';
    }
  })();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: rememberedEmail,
      rememberMe: Boolean(rememberedEmail),
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values) => {
    setErrorMsg('');
    try {
      if (values.rememberMe) {
        localStorage.setItem(REMEMBERED_EMAIL_KEY, values.email);
      } else {
        localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }
    } catch {
      // Ignore storage errors
    }

    const res = await login(values);
    if (res.success) {
      showToast('Signed in to GRAMIYAM Admin Portal.');
      navigate('/admin/dashboard', { replace: true });
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <AdminAuthLayout>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B93627]">
          Administrator Access
        </p>
        <h2 className="mt-1 font-serif text-3xl font-semibold text-[#34332C]">
          Welcome Back
        </h2>
        <p className="mt-1 text-sm text-[#77736B]">
          Sign in to your GRAMIYAM Admin account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
            Email Address
          </span>
          <input
            type="email"
            autoComplete="email"
            placeholder="admin@gramiyam.com"
            className={`w-full rounded-sm border bg-[#FFF9F1]/40 px-4 py-2.5 text-sm text-[#34332C] transition focus:border-[#B93627] focus:bg-white focus:outline-none ${
              errors.email ? 'border-[#B93627]' : 'border-[#E9E1D5]'
            }`}
            {...register('email', {
              required: 'Email address is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address.',
              },
            })}
          />
          {errors.email && (
            <span className="mt-1 block text-xs text-[#B93627]">
              {errors.email.message}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
            Password
          </span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              className={`w-full rounded-sm border bg-[#FFF9F1]/40 py-2.5 pl-4 pr-10 text-sm text-[#34332C] transition focus:border-[#B93627] focus:bg-white focus:outline-none ${
                errors.password ? 'border-[#B93627]' : 'border-[#E9E1D5]'
              }`}
              {...register('password', {
                required: 'Password is required.',
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77736B] hover:text-[#B93627]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <span className="mt-1 block text-xs text-[#B93627]">
              {errors.password.message}
            </span>
          )}
        </label>

        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex cursor-pointer items-center gap-2 text-[#77736B]">
            <input type="checkbox" className="accent-[#B93627]" {...register('rememberMe')} />
            <span>Remember email</span>
          </label>
          <Link
            to="/admin/forgot-password"
            className="font-medium text-[#B93627] hover:text-[#8F2A1D] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-sm border border-[#B93627]/30 bg-red-50 p-3 text-xs text-[#8F2A1D]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B93627]" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#B93627] py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#8F2A1D] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{loading ? 'Signing In...' : 'Sign In'}</span>
        </button>
      </form>

      <div className="mt-6 border-t border-[#E9E1D5] pt-4 text-center text-xs text-[#77736B]">
        <p>
          Admin accounts are created by invitation only.{' '}
          <Link
            to="/admin/signup"
            className="font-semibold text-[#B93627] hover:text-[#8F2A1D] hover:underline"
          >
            Have an invitation?
          </Link>
        </p>
      </div>
    </AdminAuthLayout>
  );
}
