import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PackageCheck, AlertCircle } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner.jsx';
import { FormInput } from '../components/common/FormControls.jsx';
import { PrimaryButton } from '../components/common/Buttons.jsx';
import { orderService } from '../services/orderService.js';

const TRACKING_STAGES = [
  'Order Placed',
  'Confirmed',
  'Processing',
  'Dispatched',
  'Out for Delivery',
  'Delivered',
];

export default function TrackOrder() {
  const [trackingResult, setTrackingResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setErrorMsg('');
    setTrackingResult(null);
    try {
      const data = await orderService.trackOrder({
        orderId: values.orderId,
        verification: values.verification,
      });
      setTrackingResult(data);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          'Unable to retrieve live order status. Ensure the backend /api/orders/track endpoint is active and the Order ID is valid.'
      );
    }
  };

  const activeStageIndex = trackingResult?.stage
    ? TRACKING_STAGES.findIndex(
        (s) => s.toLowerCase() === String(trackingResult.stage).toLowerCase()
      )
    : -1;

  return (
    <main>
      <HeroBanner
        compact
        eyebrow="Order Support"
        title="Track Your Order"
        subtitle="Enter your Order ID and registered email, phone, or product name to view live fulfilment stages."
      />

      <section className="py-12 sm:py-16">
        <div className="container-gramiyam max-w-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4 rounded-sm border border-softgrey bg-white p-6 shadow-card sm:p-8"
          >
            <FormInput
              label="Order ID"
              required
              placeholder="e.g., GRM-10024"
              error={errors.orderId?.message}
              {...register('orderId', { required: 'Order ID is required.' })}
            />
            <FormInput
              label="Product Name, Email, or Phone"
              required
              placeholder="Verification detail used at checkout"
              error={errors.verification?.message}
              {...register('verification', {
                required: 'Please provide a verification detail.',
              })}
            />
            <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Checking Status...' : 'Track Order'}
            </PrimaryButton>
          </form>

          {errorMsg && (
            <div className="mt-6 flex items-start gap-2.5 rounded-sm border border-gold/40 bg-cream p-4 text-xs text-charcoal">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Order Stages Reference */}
          <div className="mt-10 rounded-sm border border-softgrey bg-white p-6 sm:p-8">
            <h2 className="flex items-center gap-2 font-serif text-2xl font-medium text-forest">
              <PackageCheck className="h-5 w-5 text-gold-dark" />
              Fulfilment Stages
            </h2>
            <ol className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {TRACKING_STAGES.map((stage, idx) => {
                const completed = activeStageIndex >= idx;
                return (
                  <li
                    key={stage}
                    className={`rounded-sm border p-3.5 text-xs ${
                      completed
                        ? 'border-forest bg-forest text-ivory'
                        : 'border-softgrey bg-ivory/60 text-charcoal/70'
                    }`}
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-wider opacity-75">
                      Stage 0{idx + 1}
                    </span>
                    <span className="mt-1 block font-semibold">{stage}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
