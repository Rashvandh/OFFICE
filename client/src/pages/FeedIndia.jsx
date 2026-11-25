import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HeartHandshake, Utensils, MapPin, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import { FormInput, FormSelect, FormTextarea } from '../components/common/FormControls.jsx';
import { PrimaryButton } from '../components/common/Buttons.jsx';
import { orderService } from '../services/orderService.js';

const IMPACT_COUNTERS = [
  { icon: Utensils, label: 'Meals Served', value: 'Awaiting Verified Count' },
  { icon: MapPin, label: 'Places Visited', value: 'Awaiting Verified Count' },
  { icon: HeartHandshake, label: 'Donations Made', value: 'Awaiting Verified Count' },
];

const COLLABORATIONS = [
  {
    name: 'Vaithiyar Poova Foundation',
    description:
      'Partnering on community outreach and grassroots meal-sharing initiatives.',
  },
  {
    name: 'The Rotary Foundation',
    description:
      'Collaborating to extend nourishment and local volunteer support to underserved neighbourhoods.',
  },
];

export default function FeedIndia() {
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setStatusMsg({ type: '', text: '' });
    try {
      await orderService.submitDonationInterest(values);
      setStatusMsg({
        type: 'success',
        text: 'Thank you for reaching out to support Feed India! Our coordination team will contact you.',
      });
      reset();
    } catch {
      setStatusMsg({
        type: 'info',
        text: 'Your support pledge was validated locally. Connect the backend /api/donations/pledge endpoint to record submissions.',
      });
    }
  };

  return (
    <main>
      <HeroBanner
        eyebrow="Social Impact • Feed India"
        title="The World Needs More Meals"
        subtitle="Serving happiness worldwide through community meal-sharing, volunteer participation, and foundation partnerships."
        image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=80"
      >
        <PrimaryButton href="#support-feed-india" variant="ivory">
          Support & Volunteer
        </PrimaryButton>
      </HeroBanner>

      {/* Verified Impact Counters (no fabricated totals) */}
      <section className="py-16">
        <div className="container-gramiyam">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {IMPACT_COUNTERS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-sm border border-softgrey bg-white p-7 text-center shadow-card"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-forest">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-serif text-2xl font-medium text-forest">{value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-charcoal/60">
            Note: Verified impact figures are published only upon official audit confirmation.
          </p>
        </div>
      </section>

      {/* Our Campaigns & Serving Happiness */}
      <section className="bg-cream/65 py-16 sm:py-24">
        <div className="container-gramiyam grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
              Our Campaigns
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-forest sm:text-4xl">
              Serving Happiness Worldwide
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/80 sm:text-base">
              Feed India brings together local volunteers, community kitchens, and partner foundations to share warm meals with dignity and care.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-softgrey bg-white p-5">
                <h3 className="font-serif text-xl font-medium text-forest">
                  How to Support Us
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/75">
                  Contribute through verified donation channels, sponsor a community meal drive, or volunteer your time locally.
                </p>
              </div>
              <div className="rounded-sm border border-softgrey bg-white p-5">
                <h3 className="font-serif text-xl font-medium text-forest">
                  Volunteering Scheme
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/75">
                  Join weekend meal-distribution drives and help coordinate logistics with our regional teams.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=700&q=80"
              alt="Community volunteers preparing meals"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=700&q=80"
              alt="Sharing food and support"
              loading="lazy"
              className="mt-6 aspect-[4/5] w-full rounded-sm object-cover"
            />
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Collaborations"
            title="Working Together for Greater Reach"
            subtitle="We welcome foundations, civic groups, and volunteers to collaborate with Feed India."
            align="center"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {COLLABORATIONS.map((partner) => (
              <div
                key={partner.name}
                className="rounded-sm border border-softgrey bg-white p-8 shadow-card"
              >
                <Users className="h-6 w-6 text-gold-dark" />
                <h3 className="mt-4 font-serif text-2xl font-medium text-forest">
                  {partner.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us / Support Form */}
      <section id="support-feed-india" className="border-t border-softgrey bg-white py-16 sm:py-24">
        <div className="container-gramiyam max-w-2xl">
          <SectionHeading
            eyebrow="Join Us"
            title="Donate, Volunteer, or Collaborate"
            align="center"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4 rounded-sm border border-softgrey bg-ivory p-6 sm:p-10"
          >
            <FormInput
              label="Full Name"
              required
              placeholder="Your name or organization"
              error={errors.fullName?.message}
              {...register('fullName', { required: 'Full name is required.' })}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                label="Email"
                type="email"
                required
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email', { required: 'Email is required.' })}
              />
              <FormInput
                label="Phone"
                type="tel"
                required
                placeholder="10-digit mobile number"
                error={errors.phone?.message}
                {...register('phone', { required: 'Phone is required.' })}
              />
            </div>
            <FormSelect
              label="How Would You Like to Support?"
              required
              options={[
                'Volunteer for Meal Drives',
                'Foundation / Institutional Collaboration',
                'Donation Enquiry',
              ]}
              error={errors.supportType?.message}
              {...register('supportType', { required: 'Please select an option.' })}
            />
            <FormTextarea
              label="Message"
              placeholder="Share your city or how you would like to participate..."
              {...register('message')}
            />

            {statusMsg.text && (
              <div
                className={`flex items-start gap-2.5 rounded-sm border p-4 text-xs ${
                  statusMsg.type === 'success'
                    ? 'border-botanical/30 bg-sage/20 text-forest'
                    : 'border-gold/40 bg-cream text-charcoal'
                }`}
              >
                {statusMsg.type === 'success' ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-botanical" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                )}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Submit Interest'}
            </PrimaryButton>
          </form>
        </div>
      </section>
    </main>
  );
}
