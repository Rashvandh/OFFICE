import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Briefcase, CheckCircle2, AlertCircle } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import FAQAccordion from '../components/common/FAQAccordion.jsx';
import NewsletterForm from '../components/common/NewsletterForm.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { FormInput, FormTextarea } from '../components/common/FormControls.jsx';
import { PrimaryButton } from '../components/common/Buttons.jsx';
import { orderService } from '../services/orderService.js';

const CAREERS_FAQ = [
  {
    question: 'How do I apply if no open positions are listed right now?',
    answer:
      'You can submit a general application using the form below and attach your resume. Our HR team reviews applications as new roles open across retail, R&D, and operations.',
  },
  {
    question: 'Does Gramiyam offer roles in both R&D and retail stores?',
    answer:
      'Yes, opportunities span herbal formulation research, quality assurance, store operations, and community outreach.',
  },
];

export default function Careers() {
  const [positions, setPositions] = useState([]);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    let mounted = true;
    orderService
      .getOpenPositions()
      .then((data) => {
        if (!mounted) return;
        setPositions(Array.isArray(data) ? data : data?.positions || []);
      })
      .catch(() => {
        if (mounted) setPositions([]);
      })
      .finally(() => {
        if (mounted) setLoadingPositions(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const onSubmit = async (values) => {
    setStatusMsg({ type: '', text: '' });
    try {
      const formData = new FormData();
      formData.append('fullName', values.fullName);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('position', values.position);
      formData.append('coverLetter', values.coverLetter || '');
      if (values.resume?.[0]) {
        formData.append('resume', values.resume[0]);
      }
      await orderService.submitCareerApplication(formData);
      setStatusMsg({
        type: 'success',
        text: 'Application submitted! Thank you for your interest in Gramiyam.',
      });
      reset();
    } catch {
      setStatusMsg({
        type: 'info',
        text: 'Your application was validated locally. Connect the backend /api/careers/apply endpoint to receive applications.',
      });
    }
  };

  return (
    <main>
      <HeroBanner
        eyebrow="Join Our Team"
        title="Careers at Gramiyam"
        subtitle="Build meaningful work rooted in traditional herbal knowledge, scientific curiosity, and community care."
      />

      {/* Why Work With Us & Life at Gramiyam */}
      <section className="py-16 sm:py-20">
        <div className="container-gramiyam grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-sm border border-softgrey bg-white p-8 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Why Work With Us
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-forest">
              Purposeful Craft & Growth
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
              At Gramiyam, every team member contributes to preserving Siddha and Ayurveda heritage while building a trusted modern wellness organisation.
            </p>
          </div>
          <div className="rounded-sm border border-softgrey bg-white p-8 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Life at Gramiyam
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-forest">
              Collaborative & Grounded Culture
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
              From laboratory formulation teams to store wellness advisors and Feed India volunteers, we value integrity, continuous learning, and respect.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions (Real backend data only) */}
      <section className="bg-cream/60 py-16">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Exciting Opportunities"
            title="Open Positions"
            subtitle="Live job listings are displayed directly from our backend careers feed."
          />

          {loadingPositions ? (
            <div className="h-32 animate-pulse rounded-sm bg-white" />
          ) : positions.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No active openings published yet"
              description="Live job listings will appear here when published via the backend. You may still submit a general application below."
            />
          ) : (
            <div className="space-y-4">
              {positions.map((job) => (
                <article
                  key={job._id || job.title}
                  className="flex flex-col justify-between gap-4 rounded-sm border border-softgrey bg-white p-6 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-forest">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-xs text-charcoal/70">
                      {job.department} • {job.location}
                    </p>
                    <p className="mt-2 text-sm text-charcoal/80">{job.description}</p>
                  </div>
                  <a
                    href="#career-apply-form"
                    className="shrink-0 rounded-sm bg-forest px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ivory hover:bg-botanical"
                  >
                    Apply Now
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Form */}
      <section id="career-apply-form" className="py-16 sm:py-24">
        <div className="container-gramiyam max-w-3xl">
          <SectionHeading
            eyebrow="Apply Now"
            title="Submit Your Application"
            align="center"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid grid-cols-1 gap-5 rounded-sm border border-softgrey bg-white p-6 shadow-card sm:grid-cols-2 sm:p-10"
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
              {...register('email', { required: 'Email is required.' })}
            />
            <FormInput
              label="Phone"
              type="tel"
              required
              placeholder="10-digit mobile number"
              error={errors.phone?.message}
              {...register('phone', { required: 'Phone number is required.' })}
            />
            <FormInput
              label="Position Applied For"
              required
              placeholder="e.g., Retail Wellness Advisor / R&D"
              error={errors.position?.message}
              {...register('position', { required: 'Position is required.' })}
            />

            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/80">
                Resume Upload (PDF / DOC)
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                {...register('resume')}
                className="w-full rounded-sm border border-softgrey bg-ivory/60 px-4 py-2.5 text-xs text-charcoal"
              />
            </label>

            <FormTextarea
              label="Cover Letter"
              className="sm:col-span-2"
              placeholder="Tell us about your experience and interest in Gramiyam..."
              {...register('coverLetter')}
            />

            {statusMsg.text && (
              <div
                className={`sm:col-span-2 flex items-start gap-2.5 rounded-sm border p-4 text-xs ${
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

            <div className="sm:col-span-2">
              <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </section>

      {/* Careers FAQ & Join With Us Newsletter */}
      <section className="border-t border-softgrey bg-cream/50 py-16">
        <div className="container-gramiyam grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mb-6 font-serif text-3xl font-medium text-forest">
              Careers FAQ
            </h2>
            <FAQAccordion items={CAREERS_FAQ} />
          </div>
          <div className="lg:col-span-5 rounded-sm border border-softgrey bg-white p-8 h-fit">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Join With Us
            </p>
            <h3 className="mt-2 font-serif text-2xl font-medium text-forest">
              Stay Informed on Future Openings
            </h3>
            <p className="mt-2 text-sm text-charcoal/75">
              Subscribe to receive updates when new positions open at Gramiyam.
            </p>
            <div className="mt-5">
              <NewsletterForm variant="light" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
