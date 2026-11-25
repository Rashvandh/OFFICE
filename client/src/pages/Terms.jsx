import HeroBanner from '../components/common/HeroBanner.jsx';

export default function Terms() {
  return (
    <main>
      <HeroBanner
        compact
        eyebrow="Legal & Governance"
        title="Terms of Use"
        subtitle="Draft terms structure awaiting final legal review by Gramiyam."
      />

      <section className="py-12 sm:py-16">
        <div className="container-gramiyam max-w-3xl space-y-6 rounded-sm border border-softgrey bg-white p-8 text-sm leading-relaxed text-charcoal/80">
          <p className="rounded-sm border-l-4 border-gold bg-cream px-4 py-3 text-xs text-charcoal">
            <strong>Legal Notice:</strong> This page is a structured draft placeholder. Final Terms of Use must be approved by Gramiyam prior to live commercial sales.
          </p>
          <div>
            <h2 className="font-serif text-2xl font-medium text-forest">
              1. Use of Website
            </h2>
            <p className="mt-2">
              By accessing www.gramiyam.com, you agree to use the platform lawfully and provide accurate information when placing orders or submitting enquiries.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-forest">
              2. Product & Wellness Information
            </h2>
            <p className="mt-2">
              Educational content, dosha overviews, and the wellness quiz on this site are informational only and do not constitute medical diagnosis or treatment advice.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-medium text-forest">
              3. Orders & Pricing
            </h2>
            <p className="mt-2">
              Final product prices, taxes, and shipping charges are confirmed at checkout by the Gramiyam server from verified catalogue records.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
