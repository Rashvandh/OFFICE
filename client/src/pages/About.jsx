import HeroBanner from '../components/common/HeroBanner.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import { PrimaryButton, SecondaryButton } from '../components/common/Buttons.jsx';
import { ArrowRight, Leaf, ShieldCheck, Store, Heart } from 'lucide-react';

const TIMELINE_CHAPTERS = [
  {
    chapter: '01',
    title: 'Birth of Gramiyam',
    text: 'Born from a deep reverence for classical Indian herbal traditions, Gramiyam set out to preserve time-honoured Siddha and Ayurveda knowledge in a form trusted by modern households. [Official founding year & historical milestones awaiting company approval.]',
  },
  {
    chapter: '02',
    title: 'Tradition Everywhere',
    text: 'Our goal is to make authentic botanical wellness accessible across neighbourhoods—combining traditional preparation principles with clean, contemporary retail experiences.',
  },
  {
    chapter: '03',
    title: 'Renowned Medicines & Formulations',
    text: 'From single-herb essentials like Ashwagandha and Moringa to classical preparations such as Pathu Thalai Thailam and Sarva Lakshana, every line honours botanical integrity.',
  },
  {
    chapter: '04',
    title: 'Crafted with Love, Packed with Heritage',
    text: 'Every bottle, bar, and powder reflects careful sourcing, mindful processing, and respect for the communities that cultivate our herbs.',
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    icon: Leaf,
    title: 'Authentic Botanical Roots',
    desc: 'Grounded in classical Siddha & Ayurveda heritage without unnecessary shortcuts.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality-First Discipline',
    desc: 'Structured R&D oversight and transparent labelling standards.',
  },
  {
    icon: Store,
    title: 'Growing Retail Presence',
    desc: 'Connecting communities through Gramiyam outlets and franchise partnerships.',
  },
  {
    icon: Heart,
    title: 'Purpose Beyond Commerce',
    desc: 'Supporting communities through our Feed India meal-sharing initiative.',
  },
];

export default function About() {
  return (
    <main>
      <HeroBanner
        eyebrow="Our Story • Tradition Renown"
        title="Rooted in Heritage, Crafted for Today"
        subtitle="Discover how Gramiyam bridges traditional Indian herbal wisdom, Siddha and Ayurveda craftsmanship, and modern holistic wellness."
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=80"
      >
        <PrimaryButton to="/products" variant="ivory">
          Explore Products
        </PrimaryButton>
        <SecondaryButton to="/research" variant="light">
          Explore R&D
        </SecondaryButton>
      </HeroBanner>

      {/* Founder Introduction */}
      <section className="py-16 sm:py-24">
        <div className="container-gramiyam grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-sm border border-softgrey bg-cream">
              <img
                src="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=900&q=80"
                alt="Founder portrait placeholder"
                className="aspect-[4/4.5] w-full object-cover"
              />
            </div>
            <p className="mt-2 text-xs text-charcoal/60">
              [Founder photograph & verified biography pending official company submission]
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
              Founder Introduction
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium text-forest sm:text-4xl">
              Stewarding Traditional Herbal Wisdom
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/80 sm:text-base">
              [Official founder name and biography awaiting approval from Gramiyam leadership. No biographical details have been fabricated.]
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-softgrey bg-white p-5">
                <h3 className="font-serif text-xl font-medium text-forest">Our Vision</h3>
                <p className="mt-2 text-sm text-charcoal/75">
                  [Approved company vision statement to be inserted here upon final confirmation.]
                </p>
              </div>
              <div className="rounded-sm border border-softgrey bg-white p-5">
                <h3 className="font-serif text-xl font-medium text-forest">Our Mission</h3>
                <p className="mt-2 text-sm text-charcoal/75">
                  [Approved company mission statement to be inserted here upon final confirmation.]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Storytelling Timeline */}
      <section className="bg-cream/65 py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Heritage & Journey"
            title="The Story of Gramiyam"
            subtitle="From classical roots to modern households."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {TIMELINE_CHAPTERS.map((item) => (
              <article
                key={item.chapter}
                className="rounded-sm border border-softgrey bg-white p-7 shadow-card"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-gold-dark">
                  CHAPTER {item.chapter}
                </span>
                <h3 className="mt-2 font-serif text-2xl font-medium text-forest">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="The Gramiyam Standard"
            title="Why Choose Us?"
            align="center"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_ITEMS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-sm border border-softgrey bg-white p-6 text-center shadow-card"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-forest">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-forest">{title}</h3>
                <p className="mt-2 text-sm text-charcoal/75">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Brands & Our Stores */}
      <section className="bg-forest py-16 text-ivory sm:py-24">
        <div className="container-gramiyam grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-sm border border-white/15 bg-white/5 p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
              Our Brands
            </p>
            <h3 className="mt-2 font-serif text-3xl font-medium text-ivory">
              Herbal Wellness & Classical Care
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory/80">
              Our portfolio spans Pure Herbs, Hair Care, Body Care, Soap, Shampoo, Baby Care, Herbal Wellness, and Pharmaceuticals—each developed with respect for traditional knowledge.
            </p>
            <div className="mt-6">
              <SecondaryButton to="/products" variant="light">
                Browse Catalogue
              </SecondaryButton>
            </div>
          </div>

          <div className="rounded-sm border border-white/15 bg-white/5 p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
              Our Stores
            </p>
            <h3 className="mt-2 font-serif text-3xl font-medium text-ivory">
              Experience Gramiyam in Person
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory/80">
              Visit our retail outlets or explore franchise opportunities to bring Gramiyam’s traditional wellness experience to your district.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton to="/store-locator" variant="ivory">
                Store Locator
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <SecondaryButton to="/franchise" variant="light">
                Apply for Franchise
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Careers & Contact CTAs */}
      <section className="py-16">
        <div className="container-gramiyam flex flex-col items-start justify-between gap-6 rounded-sm border border-softgrey bg-white p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Connect With Us
            </p>
            <h3 className="mt-1 font-serif text-2xl font-medium text-forest sm:text-3xl">
              Explore Careers or Reach Our Team
            </h3>
            <p className="mt-2 text-sm text-charcoal/75">
              Interested in joining Gramiyam or have a general enquiry? We would love to hear from you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <SecondaryButton to="/careers">Careers</SecondaryButton>
            <PrimaryButton to="/contact">Contact Us</PrimaryButton>
          </div>
        </div>
      </section>
    </main>
  );
}
