import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import UserAuthLayout from '../components/auth/UserAuthLayout.jsx';
import api from '../services/api.js';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onLogin = async (values) => {
    setAuthError('');
    const result = await login(values);
    if (result.success) {
      navigate('/account');
    } else {
      setAuthError(result.message);
    }
  };

  const onForgot = async (values) => {
    setAuthError('');
    setResetMessage('');
    try {
      await api.post('/auth/forgot-password', { email: values.email });
      setResetMessage(
        'If an account exists for that email, password reset instructions have been sent.'
      );
    } catch {
      setResetMessage(
        'Password reset endpoint (/api/auth/forgot-password) is not yet connected on the server.'
      );
    }
  };

  const busy = loading || isSubmitting;

  return (
    <UserAuthLayout
      footerLeft={
        <span>
          New to GRAMIYAM?{' '}
          <Link to="/register" className="font-semibold text-[#B93627] underline underline-offset-4">
            Sign up
          </Link>
        </span>
      }
    >
      <div className="mb-7 text-center">
        <h1 className="font-serif text-3xl font-semibold text-[#34332C]">
          {forgotMode ? 'Reset password' : 'Sign in to your account'}
        </h1>
        <p className="mt-1.5 text-xs text-[#77736B]">
          {forgotMode
            ? 'Enter your registered email to receive reset instructions'
            : 'Welcome back to GRAMIYAM — Tradition Renown'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(forgotMode ? onForgot : onLogin)}
        className="space-y-4"
        noValidate
      >
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-[#77736B]">
            Email
          </span>
          <input
            type="email"
            autoComplete="email"
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
            <span className="mt-1 block px-2 text-xs text-[#B93627]">
              {errors.email.message}
            </span>
          )}
        </label>

        {!forgotMode && (
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[#77736B]">
              Password
            </span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full rounded-full border border-[#E9D8C5] bg-white py-3 pl-5 pr-12 text-sm text-[#34332C] placeholder:text-[#77736B]/60 focus:border-[#B93627] focus:outline-none"
                {...register('password', { required: 'Password is required.' })}
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
            {errors.password && (
              <span className="mt-1 block px-2 text-xs text-[#B93627]">
                {errors.password.message}
              </span>
            )}
          </label>
        )}

        <div className="flex justify-end px-1 text-xs">
          <button
            type="button"
            onClick={() => {
              setForgotMode((m) => !m);
              setAuthError('');
              setResetMessage('');
            }}
            className="font-medium text-[#B93627] hover:text-[#8F2A1D] hover:underline"
          >
            {forgotMode ? 'Back to Sign In' : 'Forgot password?'}
          </button>
        </div>

        {authError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-2xl border border-[#B93627]/30 bg-red-50 p-3 text-xs text-[#8F2A1D]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B93627]" />
            <span>{authError}</span>
          </div>
        )}

        {resetMessage && (
          <div className="flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{resetMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#B93627] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8F2A1D] disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{busy ? 'Please wait...' : forgotMode ? 'Send Reset Link' : 'Submit'}</span>
        </button>
      </form>
    </UserAuthLayout>
  );
}
