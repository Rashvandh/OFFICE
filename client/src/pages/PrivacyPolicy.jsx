import HeroBanner from '../components/common/HeroBanner.jsx';

export default function PrivacyPolicy() {
  return (
    <main>
      <HeroBanner
        compact
        eyebrow="Legal & Governance"
        title="Privacy Policy"
        subtitle="Draft policy structure awaiting final legal review by Gramiyam."
      />

      <section className="py-12 sm:py-16">
        <div className="container-gramiyam max-w-3xl space-y-6 rounded-sm border border-softgrey bg-white p-8 text-sm leading-relaxed text-charcoal/80">
          <p className="rounded-sm border-l-4 border-gold bg-cream px-4 py-3 text-xs text-charcoal">
            <strong>Legal Notice:</strong> This page is a structured draft placeholder. Final legal wording must be approved by the Gramiyam legal team before production launch.
          </p>
          <div>
            <h2 className="font-serif text-2xl font-medium text-forest">
              1. Information We Collect
            </h2>
            <p className="mt-2">
              When you browse, place an order, or submit an enquiry (such as franchise, career, or contact forms), we collect the contact and shipping details you voluntarily provide.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-forest">
              2. How Information Is Used
            </h2>
            <p className="mt-2">
              Submitted details are used solely to process orders, verify Razorpay payments server-side, respond to enquiries, and improve customer support.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-forest">
              3. Data Security
            </h2>
            <p className="mt-2">
              Payment credentials and secret keys are never stored in the browser. All payment transactions are handled via Razorpay’s encrypted checkout flow.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
