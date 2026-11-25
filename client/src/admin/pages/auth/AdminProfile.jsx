import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';
import { PageHeader } from '../../components/common/AdminUIComponents.jsx';

export default function AdminProfile() {
  const { admin, roleLabel, updateAdminProfile } = useAdminAuth();
  const [profileMsg, setProfileMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: admin?.name || '',
      email: admin?.email || '',
      phone: admin?.phone || '',
    },
  });

  const {
    register: regPw,
    handleSubmit: handlePwSubmit,
    reset: resetPw,
  } = useForm();

  const onSaveProfile = async (values) => {
    const res = await updateAdminProfile(values);
    setProfileMsg(res.message || 'Profile updated.');
  };

  const onChangePassword = async () => {
    setPasswordMsg(
      'Password change validated. Connect /api/admin/auth/change-password on the backend to persist.'
    );
    resetPw();
  };

  return (
    <div>
      <PageHeader
        title="Admin Profile"
        description="Manage your administrator account details and credentials."
        breadcrumbs={[{ label: 'Profile' }]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card lg:col-span-4 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#B93627] font-serif text-3xl font-semibold text-white">
              {(admin?.name || 'A')[0]}
            </div>
            <h2 className="mt-4 font-serif text-2xl font-semibold text-[#34332C]">
              {admin?.name}
            </h2>
            <p className="mt-1 rounded-sm border border-[#E9D8C5] bg-[#FFF9F1] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#B93627]">
              {roleLabel}
            </p>
            <p className="mt-3 text-xs text-[#77736B]">{admin?.email}</p>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-8">
          <form
            onSubmit={handleSubmit(onSaveProfile)}
            className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4"
          >
            <h3 className="font-serif text-2xl font-semibold text-[#34332C]">
              Profile Details
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Full Name
                </span>
                <input
                  type="text"
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                  {...register('name', { required: true })}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Email
                </span>
                <input
                  type="email"
                  disabled
                  className="w-full rounded-sm border border-[#E9E1D5] bg-[#FFF9F1] px-3.5 py-2.5 text-sm text-[#77736B]"
                  {...register('email')}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Contact Number
                </span>
                <input
                  type="tel"
                  placeholder="Optional contact number"
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                  {...register('phone')}
                />
              </label>
            </div>
            {profileMsg && (
              <p className="flex items-center gap-1.5 text-xs text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                {profileMsg}
              </p>
            )}
            <button
              type="submit"
              className="rounded-sm bg-[#B93627] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
            >
              Update Profile
            </button>
          </form>

          <form
            onSubmit={handlePwSubmit(onChangePassword)}
            className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4"
          >
            <h3 className="font-serif text-2xl font-semibold text-[#34332C]">
              Change Password
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  Current Password
                </span>
                <input
                  type="password"
                  required
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                  {...regPw('currentPassword', { required: true })}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
                  New Password
                </span>
                <input
                  type="password"
                  required
                  minLength={8}
                  className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
                  {...regPw('newPassword', { required: true, minLength: 8 })}
                />
              </label>
            </div>
            {passwordMsg && (
              <p className="flex items-center gap-1.5 text-xs text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                {passwordMsg}
              </p>
            )}
            <button
              type="submit"
              className="rounded-sm border border-[#B93627] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#B93627] hover:bg-[#B93627] hover:text-white transition"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
