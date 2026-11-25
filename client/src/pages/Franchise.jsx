import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, AlertCircle, Store, ShieldCheck, Leaf } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import { FormInput, FormSelect, FormTextarea } from '../components/common/FormControls.jsx';
import { PrimaryButton } from '../components/common/Buttons.jsx';
import { orderService } from '../services/orderService.js';

const BENEFITS = [
  {
    icon: Leaf,
    title: 'Trusted Herbal Portfolio',
    desc: 'Access Gramiyam’s range of Pure Herbs, Hair Care, Body Care, Soap, and Classical Formulations.',
  },
  {
    icon: Store,
    title: 'Brand & Retail Identity',
    desc: 'Consistent botanical store design guidance aligned with the Tradition Renown identity.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Collaboration',
    desc: 'Direct review of your proposed location and business background by our franchise team.',
  },
];

const STEPS = [
  'Submit the franchise enquiry form with your location and background.',
  'Initial review by the Gramiyam franchise coordination team.',
  'Discussion on territory availability, store format, and official terms.',
  'Onboarding and launch preparation upon mutual agreement.',
];

export default function Franchise() {
  const [submitState, setSubmitState] = useState({ type: '', text: '' });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setSubmitState({ type: '', text: '' });
    try {
      await orderService.submitFranchiseEnquiry(values);
      setSubmitState({
        type: 'success',
        text: 'Thank you! Your franchise enquiry has been submitted to our team.',
      });
      reset();
    } catch {
      setSubmitState({
        type: 'info',
        text: 'Your enquiry details were validated locally. Connect the backend /api/franchise/enquiries endpoint to persist submissions.',
      });
    }
  };

  return (
    <main>
      <HeroBanner
        eyebrow="Outlet Tour • Partner With Us"
        title="Franchise With Gramiyam"
        subtitle="Bring authentic Siddha, Ayurveda, and natural wellness to your community. Official commercial terms are shared directly during formal review."
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=80"
      />

      {/* Why Choose Gramiyam & Benefits */}
      <section className="py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Why Choose Gramiyam?"
            title="Franchise Opportunities & Benefits"
            subtitle="Built on heritage, botanical quality, and long-term community trust."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-sm border border-softgrey bg-white p-7 shadow-card"
              >
                <Icon className="h-6 w-6 text-gold-dark" />
                <h3 className="mt-4 font-serif text-2xl font-medium text-forest">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-charcoal/75">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* Application Process */}
          <div className="mt-14 rounded-sm bg-cream/70 p-8 sm:p-10">
            <h3 className="font-serif text-2xl font-medium text-forest sm:text-3xl">
              Application Process
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((text, idx) => (
                <div key={text} className="border-t border-gold/50 pt-4">
                  <span className="text-xs font-semibold tracking-[0.2em] text-gold-dark">
                    STEP 0{idx + 1}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Enquiry Form */}
      <section className="border-t border-softgrey bg-white py-16 sm:py-24">
        <div className="container-gramiyam max-w-3xl">
          <SectionHeading
            eyebrow="Franchise Enquiry"
            title="Submit Your Application"
            subtitle="Please share your details below. (No franchise fees or financial projections are published online; official details are provided directly by our team.)"
            align="center"
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid grid-cols-1 gap-5 rounded-sm border border-softgrey bg-ivory p-6 sm:grid-cols-2 sm:p-10"
          >
            <FormInput
              label="Full Name"
              required
              placeholder="Your full name"
              error={errors.fullName?.message}
              {...register('fullName', { required: 'Full name is required.' })}
            />
            <FormInput
              label="Email"
              type="email"
              required
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                },
              })}
            />
            <FormInput
              label="Phone"
              type="tel"
              required
              placeholder="10-digit mobile number"
              error={errors.phone?.message}
              {...register('phone', {
                required: 'Phone number is required.',
                minLength: { value: 10, message: 'Enter a valid phone number.' },
              })}
            />
            <FormInput
              label="Country"
              required
              defaultValue="India"
              error={errors.country?.message}
              {...register('country', { required: 'Country is required.' })}
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
              placeholder="e.g., Madurai"
              error={errors.district?.message}
              {...register('district', { required: 'District is required.' })}
            />
            <FormInput
              label="City"
              required
              placeholder="City or town"
              error={errors.city?.message}
              {...register('city', { required: 'City is required.' })}
            />
            <FormSelect
              label="Proposed Investment"
              required
              options={[
                'To be discussed with Franchise Team',
                'Small Retail Format (Discuss)',
                'Flagship Wellness Store (Discuss)',
              ]}
              error={errors.proposedInvestment?.message}
              {...register('proposedInvestment', {
                required: 'Please select an option.',
              })}
            />
            <FormInput
              label="Business Experience"
              required
              className="sm:col-span-2"
              placeholder="Briefly describe your retail or business background"
              error={errors.businessExperience?.message}
              {...register('businessExperience', {
                required: 'Business experience is required.',
              })}
            />
            <FormTextarea
              label="Message"
              className="sm:col-span-2"
              placeholder="Tell us about your proposed location or any questions..."
              {...register('message')}
            />

            {submitState.text && (
              <div
                className={`sm:col-span-2 flex items-start gap-2.5 rounded-sm border p-4 text-xs ${
                  submitState.type === 'success'
                    ? 'border-botanical/30 bg-sage/20 text-forest'
                    : 'border-gold/40 bg-cream text-charcoal'
                }`}
              >
                {submitState.type === 'success' ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-botanical" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                )}
                <span>{submitState.text}</span>
              </div>
            )}

            <div className="sm:col-span-2">
              <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Submit Franchise Enquiry'}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
