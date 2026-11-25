import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ShieldCheck, AlertCircle, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { orderService } from '../services/orderService.js';
import { formatCurrency } from '../utils/formatters.js';
import { FormInput } from '../components/common/FormControls.jsx';
import { PrimaryButton } from '../components/common/Buttons.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [paymentMessage, setPaymentMessage] = useState({ type: '', text: '' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (items.length === 0) {
    return (
      <main className="container-gramiyam py-16">
        <EmptyState
          title="Your bag is empty"
          description="Add products to your bag before proceeding to checkout."
          actionLabel="Explore Products"
          actionTo="/products"
        />
      </main>
    );
  }

  const onSubmit = async (formValues) => {
    setPaymentMessage({ type: '', text: '' });

    try {
      // 1. Obtain real Razorpay order from backend (never trust client-only totals or simulate success)
      const orderResponse = await orderService.createPaymentOrder({
        customer: {
          fullName: formValues.fullName,
          email: formValues.email,
          phone: formValues.phone,
        },
        shippingAddress: {
          addressLine: formValues.addressLine,
          state: formValues.state,
          district: formValues.district,
          city: formValues.city,
          postalCode: formValues.postalCode,
        },
        couponCode: couponCode.trim() || undefined,
        items: items.map((i) => ({
          productId: i._id,
          variant: i.variant,
          quantity: i.quantity,
        })),
      });

      const razorpayOrder = orderResponse?.order || orderResponse;
      const keyId =
        orderResponse?.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayOrder?.id || !keyId) {
        setPaymentMessage({
          type: 'error',
          text: 'Backend did not return a valid Razorpay order ID or public key. Please configure the server Razorpay credentials.',
        });
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setPaymentMessage({
          type: 'error',
          text: 'Unable to load Razorpay Checkout SDK. Please check your internet connection.',
        });
        return;
      }

      const options = {
        key: keyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || 'INR',
        name: 'GRAMIYAM',
        description: 'Herbal Wellness Order',
        order_id: razorpayOrder.id,
        prefill: {
          name: formValues.fullName,
          email: formValues.email,
          contact: formValues.phone,
        },
        theme: { color: '#B93627' },
        handler: async (response) => {
          try {
            await orderService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            clearCart();
            setPaymentMessage({
              type: 'success',
              text: `Payment verified! Reference: ${response.razorpay_payment_id}`,
            });
          } catch (verifyErr) {
            setPaymentMessage({
              type: 'error',
              text:
                verifyErr.response?.data?.message ||
                'Payment verification failed on the server.',
            });
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setPaymentMessage({
        type: 'error',
        text:
          err.response?.data?.message ||
          'Unable to initiate Razorpay payment order. Ensure the backend /api/payments/create-order endpoint and Razorpay keys are configured.',
      });
    }
  };

  return (
    <main className="py-12 sm:py-16">
      <div className="container-gramiyam">
        <div className="mb-8 border-b border-softgrey pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
            Secure Checkout
          </p>
          <h1 className="mt-1 font-serif text-4xl font-medium text-forest">
            Checkout
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid grid-cols-1 gap-10 lg:grid-cols-12"
        >
          {/* Customer & Shipping Form */}
          <div className="space-y-8 lg:col-span-7">
            <section className="rounded-sm border border-softgrey bg-white p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-medium text-forest">
                Customer Information
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                  label="Full Name"
                  required
                  className="sm:col-span-2"
                  placeholder="Enter your full name"
                  error={errors.fullName?.message}
                  {...register('fullName', { required: 'Full name is required.' })}
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  required
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'Email address is required.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address.',
                    },
                  })}
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  error={errors.phone?.message}
                  {...register('phone', {
                    required: 'Phone number is required.',
                    minLength: { value: 10, message: 'Enter a valid phone number.' },
                  })}
                />
              </div>
            </section>

            <section className="rounded-sm border border-softgrey bg-white p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-medium text-forest">
                Shipping Address
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                  label="Street Address"
                  required
                  className="sm:col-span-2"
                  placeholder="House/Flat no., Street, Landmark"
                  error={errors.addressLine?.message}
                  {...register('addressLine', {
                    required: 'Shipping address is required.',
                  })}
                />
                <FormInput
                  label="State"
                  required
                  placeholder="e.g., Tamil Nadu"
                  error={errors.state?.message}
                  {...register('state', { required: 'State is required.' })}
                />
                <FormInput
                  label="District"
                  required
                  placeholder="e.g., Chennai"
                  error={errors.district?.message}
                  {...register('district', { required: 'District is required.' })}
                />
                <FormInput
                  label="City / Town"
                  required
                  placeholder="City"
                  error={errors.city?.message}
                  {...register('city', { required: 'City is required.' })}
                />
                <FormInput
                  label="Postal Code"
                  required
                  placeholder="6-digit PIN code"
                  error={errors.postalCode?.message}
                  {...register('postalCode', {
                    required: 'Postal code is required.',
                    pattern: {
                      value: /^[0-9]{5,6}$/,
                      message: 'Enter a valid postal code.',
                    },
                  })}
                />
              </div>
            </section>

            <section className="rounded-sm border border-softgrey bg-white p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-medium text-forest">
                Delivery & Payment Method
              </h2>
              <p className="mt-2 text-xs text-charcoal/70">
                Standard courier delivery timelines and shipping charges are confirmed by the server upon order creation.
              </p>
              <div className="mt-4 flex items-center justify-between rounded-sm border border-forest bg-ivory p-4">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-forest" />
                  <div>
                    <p className="text-sm font-semibold text-forest">
                      Razorpay Secure Checkout
                    </p>
                    <p className="text-xs text-charcoal/70">
                      UPI, Cards, NetBanking & Wallets — verified server-side.
                    </p>
                  </div>
                </div>
                <span className="rounded-sm bg-forest px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ivory">
                  Active
                </span>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-5">
            <div className="sticky top-24 rounded-sm border border-softgrey bg-white p-6 shadow-card sm:p-8">
              <h2 className="font-serif text-2xl font-medium text-forest">
                Order Summary
              </h2>

              <div className="mt-5 divide-y divide-softgrey">
                {items.map((item) => (
                  <div
                    key={item.itemKey}
                    className="flex items-center justify-between gap-3 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-forest">
                        {item.name} × {item.quantity}
                      </p>
                      <p className="text-xs text-charcoal/60">{item.variant}</p>
                    </div>
                    <span className="font-semibold text-forest">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/75">
                  Coupon Code (Optional)
                </label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="w-full rounded-sm border border-softgrey bg-ivory/60 px-4 py-2.5 text-sm focus:border-forest focus:outline-none"
                />
              </div>

              <dl className="mt-6 space-y-2.5 border-t border-softgrey pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-charcoal/75">Estimated Subtotal</dt>
                  <dd className="font-semibold text-forest">
                    {formatCurrency(subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between text-xs text-charcoal/65">
                  <dt>Final Total</dt>
                  <dd>Computed on server from verified Product records</dd>
                </div>
              </dl>

              {paymentMessage.text && (
                <div
                  className={`mt-5 flex items-start gap-2.5 rounded-sm border p-3.5 text-xs ${
                    paymentMessage.type === 'success'
                      ? 'border-botanical/30 bg-sage/20 text-forest'
                      : 'border-red-300 bg-red-50 text-red-900'
                  }`}
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{paymentMessage.text}</span>
                </div>
              )}

              <PrimaryButton
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full"
              >
                {isSubmitting ? 'Creating Payment Order...' : 'Place Order & Pay'}
              </PrimaryButton>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-charcoal/60">
                <ShieldCheck className="h-3.5 w-3.5 text-botanical" />
                No fake payment simulation — live Razorpay order verification required.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
