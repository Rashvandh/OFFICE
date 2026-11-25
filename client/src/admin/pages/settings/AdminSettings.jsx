import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ShieldCheck } from 'lucide-react';
import {
  PageHeader,
  ApiBoundaryBanner,
} from '../../components/common/AdminUIComponents.jsx';
import { adminApi } from '../../services/adminApi.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminSettings() {
  const { showToast } = useToast();
  const [unavailable, setUnavailable] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      websiteName: 'GRAMIYAM',
      websiteUrl: 'https://www.gramiyam.com',
      primaryColor: '#B93627',
      secondaryColor: '#FFF9F1',
      razorpayMode: 'test',
      lowStockAlertThreshold: 10,
      orderEmailAlerts: true,
    },
  });

  useEffect(() => {
    adminApi.getSettings().then((res) => {
      setUnavailable(res.unavailable);
      if (res.data) reset(res.data);
    });
  }, [reset]);

  const onSubmit = async (values) => {
    const res = await adminApi.saveSettings(values);
    showToast(res.message, res.ok ? 'success' : 'info');
  };

  return (
    <div>
      <PageHeader
        title="System Settings"
        description="Super Admin configuration for general, brand, payment status, and security preferences."
        breadcrumbs={[{ label: 'Settings' }]}
      />

      <ApiBoundaryBanner endpoint="/api/admin/settings" unavailable={unavailable} />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-6">
        <section className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-[#34332C]">
            General & Brand Settings
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Website Name</span>
              <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('websiteName')} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Website URL</span>
              <input type="url" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('websiteUrl')} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Primary Colour</span>
              <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('primaryColor')} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Background Colour</span>
              <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('secondaryColor')} />
            </label>
          </div>
        </section>

        <section className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-[#34332C]">
            Payment & Security Status
          </h2>
          <div className="flex items-start gap-3 rounded-sm border border-[#E9D8C5] bg-[#FFF9F1] p-4 text-xs text-[#34332C]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#B93627]" />
            <span>
              Razorpay secret keys and webhook secrets are managed strictly via server environment variables and are never exposed in the admin frontend.
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Razorpay Mode</span>
              <select className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('razorpayMode')}>
                <option value="test">Test Mode</option>
                <option value="live">Live Mode</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Low-Stock Alert Threshold</span>
              <input type="number" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('lowStockAlertThreshold')} />
            </label>
          </div>
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" className="accent-[#B93627]" {...register('orderEmailAlerts')} />
            <span>Enable Order Notification Alerts</span>
          </label>
        </section>

        <button
          type="submit"
          className="rounded-sm bg-[#B93627] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
