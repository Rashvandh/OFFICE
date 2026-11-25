import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import AdminAuthLayout from '../../components/auth/AdminAuthLayout.jsx';
import { adminApi } from '../../services/adminApi.js';

export default function AdminForgotPassword() {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email }) => {
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await adminApi.client.post('/admin/auth/forgot-password', { email });
      setSuccessMsg(
        'If an administrator account matches that email, password reset instructions have been sent.'
      );
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          'Password reset endpoint (POST /api/admin/auth/forgot-password) is not yet available on the backend.'
      );
    }
  };

  return (
    <AdminAuthLayout>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B93627]">
          Account Recovery
        </p>
        <h2 className="mt-1 font-serif text-3xl font-semibold text-[#34332C]">
          Forgot Password
        </h2>
        <p className="mt-1 text-sm text-[#77736B]">
          Enter your registered administrator email to request a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
            Registered Email Address
          </span>
          <input
            type="email"
            placeholder="admin@gramiyam.com"
            className="w-full rounded-sm border border-[#E9E1D5] bg-[#FFF9F1]/40 px-4 py-2.5 text-sm focus:border-[#B93627] focus:bg-white focus:outline-none"
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
          <span>{isSubmitting ? 'Sending...' : 'Send Reset Link'}</span>
        </button>
      </form>

      <div className="mt-6 border-t border-[#E9E1D5] pt-4 text-center">
        <Link
          to="/admin/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B93627] hover:text-[#8F2A1D]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Login
        </Link>
      </div>
    </AdminAuthLayout>
  );
}
