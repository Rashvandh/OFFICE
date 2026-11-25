import { Link } from 'react-router-dom';
import HeroBanner from '../components/common/HeroBanner.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import { DOSHAS } from '../data/siteData.js';
import { FlaskConical, Leaf, Microscope, ArrowRight } from 'lucide-react';

const PEOPLES_FAVOURITES = [
  { name: 'Kuppaimeni Soap', slug: 'kuppaimeni-soap', note: 'Traditional botanical bathing care.' },
  { name: 'Bogar 60', slug: 'bogar-60', note: 'Inspired by classical Siddha lineage.' },
  { name: 'Aloe Vera Gel', slug: 'aloe-vera-gel', note: 'Cooling daily skin & body hydration.' },
  { name: 'Black Hair Dye', slug: 'black-hair-dye', note: 'Botanical hair colouring tradition.' },
  { name: 'Manmatharas', slug: 'manmatharas', note: 'Classical herbal wellness formulation.' },
  { name: 'RGO Slim', slug: 'rgo-slim', note: 'Herbal lifestyle formulation.' },
];

const DOCTORS_PURE_HERBS = [
  { name: 'Ashwagandha', slug: 'ashwagandha-plus', note: 'Classical adaptogenic root heritage.' },
  { name: 'Triphala', slug: 'triphala', note: 'Three-fruit traditional botanical blend.' },
  { name: 'Moringa', slug: 'moringa', note: 'Nutrient-dense traditional green leaf.' },
];

const DOCTORS_PHARMA = [
  { name: 'Juroforte', slug: 'juroforte', note: 'Practitioner-oriented formulation.' },
  { name: 'Vadaved', slug: 'products?category=Pharmaceuticals', note: 'Gramiyam pharmaceutical range.' },
  { name: 'Dytoxin', slug: 'products?category=Pharmaceuticals', note: 'Gramiyam pharmaceutical range.' },
  { name: 'Breatherb', slug: 'products?category=Pharmaceuticals', note: 'Gramiyam pharmaceutical range.' },
];

const DISCOVERY_STEPS = [
  { step: '01', title: 'Classical Literature Review', desc: 'Studying traditional Siddha and Ayurveda texts for authentic botanical context.' },
  { step: '02', title: 'Botanical Sourcing & Identification', desc: 'Selecting raw herbs with attention to origin, maturity, and cleanliness.' },
  { step: '03', title: 'Formulation & Stability Checks', desc: 'Structured preparation and laboratory evaluation for consistency.' },
  { step: '04', title: 'Quality Packaging & Traceability', desc: 'Prepared to reach households and practitioners reliably.' },
];

export default function Research() {
  return (
    <main>
      <HeroBanner
        eyebrow="Research & Development"
        title="Where Ancient Wisdom Meets Disciplined Science"
        subtitle="Exploring Siddha, Ayurveda, the Three Doshas, and the craftsmanship behind Gramiyam’s herbal and pharmaceutical formulations."
        image="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=80"
      />

      {/* Siddha & Ayurveda + Science Behind Holistic Wellness */}
      <section className="py-16 sm:py-24">
        <div className="container-gramiyam grid grid-cols-1 gap-8 lg:grid-cols-2">
          <article className="rounded-sm border border-softgrey bg-white p-8 shadow-card">
            <Leaf className="h-6 w-6 text-gold-dark" />
            <h2 className="mt-4 font-serif text-3xl font-medium text-forest">
              Siddha & Ayurveda
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
              India’s classical medical traditions—Siddha and Ayurveda—view human wellbeing as a dynamic relationship between body, mind, environment, and seasonal rhythm. Botanicals are thoughtfully combined to support natural balance rather than relying on harsh, isolated shortcuts.
            </p>
          </article>

          <article className="rounded-sm border border-softgrey bg-white p-8 shadow-card">
            <Microscope className="h-6 w-6 text-gold-dark" />
            <h2 className="mt-4 font-serif text-3xl font-medium text-forest">
              Science Behind Holistic Wellness
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
              Our R&D approach honours traditional preparation methods while applying modern quality discipline, standardized handling, and clean formulation practices. (Gramiyam avoids unverified clinical or disease-treatment claims.)
            </p>
          </article>
        </div>
      </section>

      {/* The Three Doshas */}
      <section className="bg-cream/65 py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Foundational Principles"
            title="The Three Doshas"
            subtitle="Understanding Vata, Pitta, and Kapha in traditional holistic philosophy."
            align="center"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {DOSHAS.map((dosha) => (
              <div
                key={dosha.name}
                className={`rounded-sm border p-7 ${dosha.accent}`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {dosha.elements}
                </p>
                <h3 className="mt-2 font-serif text-3xl font-medium text-forest">
                  {dosha.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-charcoal/65">
                  Qualities: {dosha.qualities}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/80">
                  {dosha.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovering a Drug & Our Laboratory */}
      <section className="py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Process & Infrastructure"
            title="Discovering a Formulation & Our Laboratory"
            subtitle="A disciplined journey from classical reference to finished product."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DISCOVERY_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-sm border border-softgrey bg-white p-6 shadow-card"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-gold-dark">
                  STEP {item.step}
                </span>
                <h3 className="mt-3 font-serif text-xl font-medium text-forest">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 items-center gap-8 rounded-sm bg-forest p-8 text-ivory lg:grid-cols-12 lg:p-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                <FlaskConical className="h-4 w-4" />
                Our Laboratory
              </div>
              <h3 className="mt-2 font-serif text-3xl font-medium text-ivory">
                Quality Control & Botanical Evaluation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/80">
                Our laboratory workflow focuses on raw-material verification, batch consistency, and hygienic processing. Official accreditation and certification details will be published here once approved by the company.
              </p>
            </div>
            <div className="lg:col-span-5">
              <img
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80"
                alt="Botanical research laboratory"
                loading="lazy"
                className="aspect-[16/10] w-full rounded-sm object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Journey of People's Favourite Products */}
      <section className="bg-cream/55 py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Community Favourites"
            title="Journey of People’s Favourite Products"
            subtitle="Household staples crafted with traditional botanical care."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PEOPLES_FAVOURITES.map((item) => (
              <Link
                key={item.name}
                to={`/products/${item.slug}`}
                className="group rounded-sm border border-softgrey bg-white p-6 transition hover:border-forest hover:shadow-soft"
              >
                <h3 className="font-serif text-2xl font-medium text-forest group-hover:text-botanical">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-charcoal/75">{item.note}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                  View Product
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Journey of Doctor's Favourite Products */}
      <section className="py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Practitioner Range"
            title="Journey of Doctor’s Favourite Products"
            subtitle="Pure Herbs and Pharmaceutical formulations trusted by practitioners."
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 font-serif text-2xl font-medium text-forest">
                Pure Herbs
              </h3>
              <div className="space-y-4">
                {DOCTORS_PURE_HERBS.map((item) => (
                  <Link
                    key={item.name}
                    to={`/products/${item.slug}`}
                    className="flex items-center justify-between rounded-sm border border-softgrey bg-white p-5 transition hover:border-forest"
                  >
                    <div>
                      <h4 className="font-serif text-xl font-medium text-forest">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-xs text-charcoal/75">{item.note}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gold-dark" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-serif text-2xl font-medium text-forest">
                Pharmaceuticals
              </h3>
              <div className="space-y-4">
                {DOCTORS_PHARMA.map((item) => (
                  <Link
                    key={item.name}
                    to={item.slug.startsWith('products?') ? `/${item.slug}` : `/products/${item.slug}`}
                    className="flex items-center justify-between rounded-sm border border-softgrey bg-white p-5 transition hover:border-forest"
                  >
                    <div>
                      <h4 className="font-serif text-xl font-medium text-forest">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-xs text-charcoal/75">{item.note}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gold-dark" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
