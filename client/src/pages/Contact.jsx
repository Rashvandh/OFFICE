import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner.jsx';
import { FormInput, FormTextarea } from '../components/common/FormControls.jsx';
import { PrimaryButton } from '../components/common/Buttons.jsx';
import { orderService } from '../services/orderService.js';

export default function Contact() {
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
      await orderService.submitContactForm(values);
      setStatusMsg({
        type: 'success',
        text: 'Thank you for contacting Gramiyam. Our team will respond shortly.',
      });
      reset();
    } catch {
      setStatusMsg({
        type: 'info',
        text: 'Your message was validated locally. Connect the backend /api/contact endpoint to deliver messages.',
      });
    }
  };

  return (
    <main>
      <HeroBanner
        compact
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="We welcome questions about Gramiyam formulations, orders, store locations, and collaborations."
      />

      <section className="py-12 sm:py-16">
        <div className="container-gramiyam grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Contact Details (Approved info only / clearly marked placeholders) */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-sm border border-softgrey bg-white p-7 shadow-card">
              <h2 className="font-serif text-2xl font-medium text-forest">
                Gramiyam Customer Care
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Use the enquiry form to reach our team regarding formulations, orders, or store partnerships. Official direct contact numbers and street address will be published upon confirmation.
              </p>

              <div className="mt-6 space-y-4 text-sm text-charcoal/85">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  <div>
                    <p className="font-semibold text-charcoal">Region</p>
                    <p className="text-xs text-charcoal/75">
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  <div>
                    <p className="font-semibold text-charcoal">Support Portal</p>
                    <p className="text-xs text-charcoal/75">
                      Online enquiries accepted 24/7 via this form
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4 rounded-sm border border-softgrey bg-white p-6 shadow-card sm:p-8"
            >
              <h2 className="font-serif text-2xl font-medium text-forest">
                Send a Message
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                  label="Full Name"
                  required
                  placeholder="Your name"
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
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormInput
                  label="Phone"
                  type="tel"
                  placeholder="Optional"
                  {...register('phone')}
                />
                <FormInput
                  label="Subject"
                  required
                  placeholder="How can we help?"
                  error={errors.subject?.message}
                  {...register('subject', { required: 'Subject is required.' })}
                />
              </div>
              <FormTextarea
                label="Message"
                required
                placeholder="Write your message here..."
                error={errors.message?.message}
                {...register('message', { required: 'Message is required.' })}
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

              <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </PrimaryButton>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
