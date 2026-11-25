import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import AdminAuthLayout from '../../components/auth/AdminAuthLayout.jsx';
import PasswordStrengthMeter, {
  evaluatePasswordStrength,
} from '../../components/auth/PasswordStrengthMeter.jsx';
import { adminApi } from '../../services/adminApi.js';

export default function AdminResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const passwordVal = watch('password', '');

  const onSubmit = async ({ password }) => {
    setSuccessMsg('');
    setErrorMsg('');
    if (!token) {
      setErrorMsg('A valid password reset token is required in the URL.');
      return;
    }
    try {
      await adminApi.client.post('/admin/auth/reset-password', { token, password });
      setSuccessMsg('Your password has been updated. You may now sign in.');
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          'Reset password endpoint (POST /api/admin/auth/reset-password) is not yet available on the backend.'
      );
    }
  };

  return (
    <AdminAuthLayout>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B93627]">
          Security Update
        </p>
        <h2 className="mt-1 font-serif text-3xl font-semibold text-[#34332C]">
          Reset Password
        </h2>
        <p className="mt-1 text-sm text-[#77736B]">
          Create a strong new password for your administrator account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
            New Password
          </span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full rounded-sm border border-[#E9E1D5] py-2.5 pl-4 pr-10 text-sm focus:border-[#B93627] focus:outline-none"
              {...register('password', {
                required: 'New password is required.',
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77736B]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <PasswordStrengthMeter password={passwordVal} />
          {errors.password && (
            <span className="mt-1 block text-xs text-[#B93627]">
              {errors.password.message}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
            Confirm New Password
          </span>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              className="w-full rounded-sm border border-[#E9E1D5] py-2.5 pl-4 pr-10 text-sm focus:border-[#B93627] focus:outline-none"
              {...register('confirmPassword', {
                required: 'Please confirm your password.',
                validate: (v) => v === passwordVal || 'Passwords do not match.',
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77736B]"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="mt-1 block text-xs text-[#B93627]">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>

        {successMsg && (
          <div className="flex items-start gap-2 rounded-sm border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-start gap-2 rounded-sm border border-[#B93627]/30 bg-red-50 p-3 text-xs text-[#8F2A1D]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B93627]" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#B93627] py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#8F2A1D] disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{isSubmitting ? 'Updating...' : 'Reset Password'}</span>
        </button>
      </form>

      <div className="mt-6 border-t border-[#E9E1D5] pt-4 text-center">
        <Link
          to="/admin/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B93627] hover:text-[#8F2A1D]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Return to Login
        </Link>
      </div>
    </AdminAuthLayout>
  );
}
