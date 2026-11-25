import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';

export default function AdminUnauthorized() {
  const { roleLabel } = useAdminAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF9F1] px-4 py-12 text-[#34332C]">
      <div className="w-full max-w-md rounded-md border border-[#E9E1D5] bg-white p-8 text-center shadow-soft">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[#B93627]">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h1 className="font-serif text-3xl font-semibold text-[#34332C]">
          Access Denied
        </h1>
        <p className="mt-2 text-sm text-[#77736B]">
          Your current role (<strong className="text-[#34332C]">{roleLabel || 'Guest'}</strong>) does not have permission to view this section. Please contact your Super Admin if you require access.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/admin/dashboard"
            className="rounded-sm bg-[#B93627] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
          >
            Return to Dashboard
          </Link>
          <Link
            to="/admin/login"
            className="rounded-sm border border-[#E9E1D5] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#34332C] hover:bg-[#FFF9F1]"
          >
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}
