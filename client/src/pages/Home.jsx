import { useEffect, useState } from 'react';
import { sampleProducts } from '../data/siteData.js';
import { productService } from '../services/productService.js';
import LifestyleHero from '../components/home/LifestyleHero.jsx';
import CollectionSection from '../components/home/CollectionSection.jsx';
import FeaturedFormulations from '../components/home/FeaturedFormulations.jsx';
import WhyGramiyamSection from '../components/home/WhyGramiyamSection.jsx';
import ProcessIngredientsSection from '../components/home/ProcessIngredientsSection.jsx';
import EditorialQuoteSection from '../components/home/EditorialQuoteSection.jsx';
import JournalSection from '../components/home/JournalSection.jsx';
import NewsletterSection from '../components/home/NewsletterSection.jsx';

export default function Home() {
  const [catalogueProducts, setCatalogueProducts] = useState(sampleProducts);

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

  return (
    <main className="bg-[var(--color-cream)] text-[var(--color-ink)]">
      {/* 1. Full-width Lifestyle & Heritage Hero */}
      <LifestyleHero catalogueProducts={catalogueProducts} />

      {/* 2. Shop by Collection (Swipeable Carousel on Mobile) */}
      <CollectionSection />

      {/* 3. Featured Formulations (Deep Herbal Green Band) */}
      <FeaturedFormulations catalogueProducts={catalogueProducts} />

      {/* 4. Why GRAMIYAM (Image-Led Split + 4 Heritage Pillars) */}
      <WhyGramiyamSection />

      {/* 5. Our Process & Key Botanicals */}
      <ProcessIngredientsSection />

      {/* 6. Editorial Quote & Sample Community Notes (Deep Green Band) */}
      <EditorialQuoteSection />

      {/* 7. The GRAMIYAM Journal Preview */}
      <JournalSection />

      {/* 8. Seasonal Newsletter Signup */}
      <NewsletterSection />
    </main>
  );
}
