import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  HERO_SLIDES,
  SHOP_BY_COLLECTION,
  BLOG_POSTS,
  sampleProducts,
} from '../data/siteData.js';
import { productService } from '../services/productService.js';
import SectionHeading from '../components/common/SectionHeading.jsx';
import { PrimaryButton, SecondaryButton } from '../components/common/Buttons.jsx';
import NewsletterForm from '../components/common/NewsletterForm.jsx';
import CategoryCard from '../components/home/CategoryCard.jsx';
import EditorialCollectionSection from '../components/home/EditorialCollectionSection.jsx';
import BlogCard from '../components/home/BlogCard.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import QuickViewModal from '../components/products/QuickViewModal.jsx';

const FEATURED_SLUGS = [
  'moringa',
  'ashwagandha-plus',
  'triphala',
  'manmatharas',
  'aloe-vera-soap',
  'five-in-one-hair-oil',
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [catalogueProducts, setCatalogueProducts] = useState(sampleProducts);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let mounted = true;
    productService.getProducts().then(({ products }) => {
      if (mounted && Array.isArray(products) && products.length > 0) {
        setCatalogueProducts(products);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const currentHero = HERO_SLIDES[heroIndex];

  const featuredProducts = FEATURED_SLUGS.map(
    (slug) =>
      catalogueProducts.find((p) => p.slug === slug || p._id === slug) ||
      sampleProducts.find((p) => p.slug === slug)
  ).filter(Boolean);

  return (
    <main className="bg-[#F5EBDD] text-[#29251F]">
      {/* EDITORIAL HERO SECTION (SOMNIA-INSPIRED COMPOSITION) */}
      <section className="relative overflow-hidden bg-[#FFF9F1] py-14 sm:py-20 lg:py-24 border-b border-[#E9D8C5]">
        {/* Subtle Decorative Botanical Rings */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full border border-[#455B3C]/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full border border-[#B93627]/10"
          aria-hidden="true"
        />

        <div className="container-gramiyam relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-5">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#455B3C]">
              GRAMIYAM • SIDDHA & AYURVEDA
            </p>
            <h1 className="font-serif text-5xl font-medium leading-[1.06] text-[#29251F] sm:text-6xl">
              Rooted in{' '}
              <span className="italic text-[#455B3C]">tradition.</span>
              <br />
              Elevated by{' '}
              <span className="italic text-[#B93627]">nature.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#29251F]/75 sm:text-base">
              Discover traditional Siddha and Ayurveda formulations, thoughtfully crafted for modern everyday living.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton to="/products">
                Discover Our Collections
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>

            {/* Minimal Carousel Controls */}
            <div className="mt-10 flex items-center justify-between border-t border-[#E9D8C5] pt-5">
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setHeroIndex(idx)}
                    aria-label={`Slide ${idx + 1}: ${slide.title}`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === heroIndex
                        ? 'w-7 bg-[#B93627]'
                        : 'w-2 bg-[#29251F]/20 hover:bg-[#B93627]/60'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setHeroIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                  }
                  aria-label="Previous slide"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E9D8C5] bg-white text-[#29251F] transition hover:border-[#B93627] hover:text-[#B93627]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)}
                  aria-label="Next slide"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E9D8C5] bg-white text-[#29251F] transition hover:border-[#B93627] hover:text-[#B93627]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Curated Product Photography Composition */}
          <div className="lg:col-span-7">
            <div className="relative">
              <Link
                to={currentHero.link}
                className="block overflow-hidden rounded-2xl border border-[#E9D8C5] bg-[#F5EBDD] shadow-soft"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentHero.id}
                    src={currentHero.image}
                    alt={currentHero.alt}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.4 }}
                    className="aspect-[16/9] w-full object-contain"
                  />
                </AnimatePresence>
              </Link>
              <p className="mt-3 text-right text-xs font-medium text-[#29251F]/65">
                {currentHero.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. SHOP BY COLLECTION (5 DISTINCT 4:3 CARDS IN ONE ROW ON DESKTOP) */}
      <section className="bg-[#F5EBDD] py-16 sm:py-20">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Curated Ranges"
            title="Shop by Collection"
            subtitle="Explore traditional Siddha & Ayurveda care across five botanical collections."
            action={
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B93627] hover:text-[#8F2A1D]"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
            {SHOP_BY_COLLECTION.map((item) => (
              <CategoryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 1B. EDITORIAL COLLECTION SECTION (SOMNIA-INSPIRED) */}
      <EditorialCollectionSection catalogueProducts={catalogueProducts} />

      {/* 2. FEATURED FORMULATIONS */}
      <section className="border-y border-[#E9D8C5] bg-[#FFF9F1] py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Signature Selection"
            title="Featured Formulations"
            subtitle="Pure Herbs, Hair Care, Skin Care, and Classical Formulations from the GRAMIYAM catalogue."
            action={
              <SecondaryButton to="/products">Browse Catalogue</SecondaryButton>
            }
          />
          <ProductGrid
            products={featuredProducts}
            columns={3}
            onQuickView={setQuickViewProduct}
          />
        </div>
      </section>

      {/* 3. THE GRAMIYAM HERITAGE STORY */}
      <section className="bg-[#F5EBDD] py-16 sm:py-24">
        <div className="container-gramiyam grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-[#E9D8C5] bg-[#FFF9F1] shadow-card">
              <img
                src="/images/gramiyam/product-collection-banner.jpg"
                alt="The GRAMIYAM Heritage Story"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#455B3C]">
              Tradition Renown
            </p>
            <h2 className="mt-2 font-serif text-4xl font-medium leading-tight text-[#29251F] sm:text-5xl">
              The GRAMIYAM Heritage Story
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#29251F]/75 sm:text-base">
              Inspired by centuries of Siddha and Ayurveda wisdom, GRAMIYAM crafts botanical formulations with respect for traditional knowledge and disciplined quality standards.
            </p>
            <div className="mt-7">
              <PrimaryButton to="/about">
                Discover Our Story
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HAIR & SKIN CARE */}
      <section className="border-y border-[#E9D8C5] bg-[#E9D8C5]/45 py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Daily Botanical Rituals"
            title="Hair & Skin Care"
            subtitle="Nourishing traditional hair oils and gentle botanical soaps."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Link
              to="/products/five-in-one-hair-oil"
              className="group overflow-hidden rounded-2xl border border-[#E9D8C5] bg-[#FFF9F1] shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#F5EBDD]">
                <img
                  src="/images/gramiyam/five-in-one-hair-oil.jpg"
                  alt="GRAMIYAM 5-in-1 Hair Oil"
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#455B3C]">
                  Hair Care
                </span>
                <h3 className="mt-1 font-serif text-2xl font-medium text-[#29251F]">
                  5-in-1 Hair Oil
                </h3>
              </div>
            </Link>

            <Link
              to="/products/aloe-vera-soap"
              className="group overflow-hidden rounded-2xl border border-[#E9D8C5] bg-[#FFF9F1] shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#F5EBDD]">
                <img
                  src="/images/gramiyam/aloe-vera-soap.jpg"
                  alt="GRAMIYAM Aloe Vera Soap"
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#455B3C]">
                  Skin Care
                </span>
                <h3 className="mt-1 font-serif text-2xl font-medium text-[#29251F]">
                  Aloe Vera Soap
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. AMMA'S CHOICE */}
      <section className="bg-[#FFF9F1] py-16 sm:py-24">
        <div className="container-gramiyam">
          <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E9D8C5] bg-[#F5EBDD]/60 p-8 sm:p-12 lg:grid-cols-12">
            <div className="flex justify-center lg:col-span-4">
              <div className="rounded-xl border border-[#E9D8C5] bg-white p-7 shadow-card">
                <img
                  src="/logo/gramiyam-logo.jpg"
                  alt="Amma's Choice by GRAMIYAM"
                  loading="lazy"
                  className="h-32 w-auto object-contain"
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#455B3C]">
                Amma’s Choice
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium text-[#29251F] sm:text-5xl">
                Care inspired by nature.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#29251F]/75 sm:text-base">
                Gentle personal care rooted in traditional Indian household wisdom, blending natural botanicals with warm everyday care.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/products?category=Body+Care"
                  className="inline-flex items-center gap-2 rounded-sm bg-[#455B3C] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#FFF9F1] transition hover:bg-[#293C28]"
                >
                  Explore Beauty Care
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESEARCH & DEVELOPMENT */}
      <section className="border-t border-[#E9D8C5] bg-[#F5EBDD] py-16 sm:py-24">
        <div className="container-gramiyam grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6 lg:order-2">
            <div className="overflow-hidden rounded-2xl border border-[#E9D8C5] bg-[#FFF9F1]">
              <img
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1000&q=80"
                alt="GRAMIYAM Research & Development"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#455B3C]">
              Research & Development
            </p>
            <h2 className="mt-2 font-serif text-4xl font-medium leading-tight text-[#29251F] sm:text-5xl">
              Where tradition meets research.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#29251F]/75 sm:text-base">
              Exploring Siddha, Ayurveda, the Three Doshas, and disciplined formulation practices to honour heritage with modern care.
            </p>
            <div className="mt-7">
              <PrimaryButton to="/research">
                Explore R&D
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FEED INDIA */}
      <section className="border-y border-[#E9D8C5] bg-[#E9D8C5]/50 py-16 sm:py-24">
        <div className="container-gramiyam grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-[#E9D8C5] bg-[#FFF9F1]">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80"
                alt="Feed India community meal-sharing"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B93627]">
              Social Responsibility • Feed India
            </p>
            <h2 className="mt-2 font-serif text-4xl font-medium leading-tight text-[#29251F] sm:text-5xl">
              Sharing nourishment. Creating impact.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#29251F]/75 sm:text-base">
              Collaborating with Vaithiyar Poova Foundation, The Rotary Foundation, and community volunteers to share warm meals with dignity.
            </p>
            <div className="mt-7">
              <PrimaryButton to="/feed-india">
                Explore Feed India
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* 8. JOURNAL & ARTICLES */}
      <section className="bg-[#FFF9F1] py-16 sm:py-24">
        <div className="container-gramiyam">
          <SectionHeading
            eyebrow="Journal & Articles"
            title="Stories from nature and tradition."
            subtitle="Reflections on Siddha, Ayurveda, and mindful daily rituals."
            action={<SecondaryButton to="/blogs">Read Journal</SecondaryButton>}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER */}
      <section className="border-t border-[#E9D8C5] bg-[#F5EBDD] py-16 sm:py-24">
        <div className="container-gramiyam max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#455B3C]">
            Newsletter
          </p>
          <h2 className="mt-2 font-serif text-3xl font-medium text-[#29251F] sm:text-4xl">
            Stay connected with GRAMIYAM.
          </h2>
          <p className="mt-3 text-sm text-[#29251F]/70">
            Receive seasonal herbal notes, new launches, and community stories.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <NewsletterForm variant="light" />
          </div>
          <p className="mt-4 text-[11px] text-[#29251F]/65">
            By subscribing, you agree to our{' '}
            <Link to="/privacy-policy" className="underline hover:text-[#B93627]">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  );
}
