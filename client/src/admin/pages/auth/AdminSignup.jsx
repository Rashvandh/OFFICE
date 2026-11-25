import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import AdminAuthLayout from '../../components/auth/AdminAuthLayout.jsx';
import PasswordStrengthMeter, {
  evaluatePasswordStrength,
} from '../../components/auth/PasswordStrengthMeter.jsx';
import { adminApi } from '../../services/adminApi.js';
import { ROLE_LABELS } from '../../permissions/roles.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminSignup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const urlToken = searchParams.get('token') || '';
  const [inviteToken, setInviteToken] = useState(urlToken);
  const [verifying, setVerifying] = useState(Boolean(urlToken));
  const [invitation, setInvitation] = useState(null);
  const [tokenError, setTokenError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const passwordVal = watch('password', '');

  const verifyInvitation = async (tokenToCheck) => {
    const trimmed = String(tokenToCheck || '').trim();
    if (!trimmed) {
      setTokenError('A valid Super Admin invitation token is required.');
      return;
    }
    setVerifying(true);
    setTokenError('');
    setInvitation(null);
    try {
      const res = await adminApi.client.get('/admin/auth/invitations/verify', {
        params: { token: trimmed },
      });
      const data = res?.data?.data || res?.data;
      if (!data?.role) {
        setTokenError('Invitation could not be verified.');
        return;
      }
      setInvitation(data);
      if (data.email) setValue('email', data.email);
    } catch (err) {
      const status = err.response?.status;
      setTokenError(
        err.response?.data?.message ||
          (!status || status === 404
            ? 'Invitation verification endpoint (GET /api/admin/auth/invitations/verify) is not yet available on the backend.'
            : 'This invitation link is invalid, expired, or has already been used.')
      );
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (urlToken) {
      verifyInvitation(urlToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlToken]);

  const onSubmit = async (values) => {
    setSubmitError('');
    setSuccessMsg('');
    try {
      await adminApi.client.post('/admin/auth/signup', {
        token: inviteToken,
        name: values.fullName,
        email: values.email,
        phone: values.phone || undefined,
        password: values.password,
      });
      setSuccessMsg(
        'Your administrator account has been activated. Redirecting to login...'
      );
      showToast('Admin account created successfully.');
      setTimeout(() => navigate('/admin/login'), 1800);
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
          'Signup endpoint (POST /api/admin/auth/signup) is not yet available on the backend.'
      );
    }
  };

  return (
    <AdminAuthLayout>
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B93627]">
          Invitation-Only Onboarding
        </p>
        <h2 className="mt-1 font-serif text-3xl font-semibold text-[#34332C]">
          Complete Your Admin Account
        </h2>
        <p className="mt-1 text-xs text-[#77736B]">
          Public registration is disabled. Only Super Admin-invited administrators may activate an account.
        </p>
      </div>

      {/* Step 1: Verify Invitation Token if not yet verified */}
      {!invitation ? (
        <div className="space-y-4">
          <div className="rounded-sm border border-[#E9D8C5] bg-[#FFF9F1] p-4 text-xs text-[#34332C]">
            <p className="font-semibold">Invitation Token Required</p>
            <p className="mt-1 text-[#77736B]">
              Open the invitation link sent by your Super Admin, or paste your single-use invitation token below to verify.
            </p>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
              Invitation Token
            </span>
            <input
              type="text"
              value={inviteToken}
              onChange={(e) => setInviteToken(e.target.value)}
              placeholder="Paste single-use invitation token"
              className="w-full rounded-sm border border-[#E9E1D5] bg-[#FFF9F1]/40 px-4 py-2.5 text-sm focus:border-[#B93627] focus:bg-white focus:outline-none"
            />
          </label>

          {tokenError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-sm border border-[#B93627]/30 bg-red-50 p-3 text-xs text-[#8F2A1D]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B93627]" />
              <span>{tokenError}</span>
            </div>
          )}

          <button
            type="button"
            disabled={verifying}
            onClick={() => verifyInvitation(inviteToken)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#B93627] py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#8F2A1D] disabled:opacity-60"
          >
            {verifying && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>{verifying ? 'Verifying Invitation...' : 'Verify Invitation'}</span>
          </button>

          <div className="border-t border-[#E9E1D5] pt-4 text-center">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B93627] hover:text-[#8F2A1D]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Return to Login
            </Link>
          </div>
        </div>
      ) : (
        /* Step 2: Complete Account Form after valid backend invitation */
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div className="flex items-center justify-between rounded-sm border border-[#E9D8C5] bg-[#FFF9F1] px-4 py-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#77736B]">
              <ShieldCheck className="h-4 w-4 text-[#B93627]" />
              Assigned Role
            </span>
            <span className="rounded-sm bg-[#B93627] px-2.5 py-0.5 text-[11px] font-semibold text-white">
              {ROLE_LABELS[invitation.role] || invitation.role}
            </span>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
              Full Name *
            </span>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full rounded-sm border border-[#E9E1D5] px-4 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
              {...register('fullName', { required: 'Full name is required.' })}
            />
            {errors.fullName && (
              <span className="mt-1 block text-xs text-[#B93627]">
                {errors.fullName.message}
              </span>
            )}
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
              Work Email *
            </span>
            <input
              type="email"
              readOnly={Boolean(invitation.email)}
              className={`w-full rounded-sm border border-[#E9E1D5] px-4 py-2.5 text-sm focus:border-[#B93627] focus:outline-none ${
                invitation.email ? 'bg-[#FFF9F1] text-[#77736B]' : ''
              }`}
              {...register('email', {
                required: 'Work email is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                },
              })}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
              Contact Number (Optional)
            </span>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              className="w-full rounded-sm border border-[#E9E1D5] px-4 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
              {...register('phone')}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
              Password *
            </span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-sm border border-[#E9E1D5] py-2.5 pl-4 pr-10 text-sm focus:border-[#B93627] focus:outline-none"
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
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
              Confirm Password *
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

          {submitError && (
            <div className="flex items-start gap-2 rounded-sm border border-[#B93627]/30 bg-red-50 p-3 text-xs text-[#8F2A1D]">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B93627]" />
              <span>{submitError}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-start gap-2 rounded-sm border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#B93627] py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#8F2A1D] disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>{isSubmitting ? 'Creating Account...' : 'Create Admin Account'}</span>
          </button>

          <div className="border-t border-[#E9E1D5] pt-4 text-center">
            <Link
              to="/admin/login"
              className="text-xs font-semibold text-[#B93627] hover:underline"
            >
              Return to Login
            </Link>
          </div>
        </form>
      )}
    </AdminAuthLayout>
  );
}
