import HeroBanner from '../components/common/HeroBanner.jsx';

export default function Returns({ mode = 'returns' }) {
  const heading =
    mode === 'refund'
      ? 'Refund Policy'
      : mode === 'shipping'
      ? 'Shipping Policy'
      : 'Return & Cancellation Policy';

  return (
    <main>
      <HeroBanner
        compact
        eyebrow="Customer Policies"
        title={heading}
        subtitle="Draft policy structure awaiting final business and legal approval by Gramiyam."
      />

      <section className="py-12 sm:py-16">
        <div className="container-gramiyam max-w-3xl space-y-6 rounded-sm border border-softgrey bg-white p-8 text-sm leading-relaxed text-charcoal/80">
          <p className="rounded-sm border-l-4 border-gold bg-cream px-4 py-3 text-xs text-charcoal">
            <strong>Policy Notice:</strong> Specific return windows, shipping rates, and refund timelines are awaiting final confirmation from Gramiyam operations and legal teams.
          </p>
          <div>
            <h2 className="font-serif text-2xl font-medium text-forest">
              1. Order Cancellations
            </h2>
            <p className="mt-2">
              Orders may be requested for cancellation prior to dispatch by contacting customer care with your Order ID.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-forest">
              2. Returns & Refunds
            </h2>
            <p className="mt-2">
              Eligibility for returns or replacements (such as damaged or incorrect items) and approved refund timelines will be published here once finalized.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-forest">
              3. Shipping & Delivery
            </h2>
            <p className="mt-2">
              Dispatch timelines, courier partners, and regional delivery estimates will be confirmed here and reflected during checkout.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
