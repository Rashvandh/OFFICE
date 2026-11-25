import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, ArrowLeft, FileText } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import NewsCard from '../components/home/NewsCard.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { NEWS_ITEMS } from '../data/siteData.js';
import { formatDate } from '../utils/formatters.js';

export default function News() {
  const { slug } = useParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  if (slug) {
    const article = NEWS_ITEMS.find((n) => n.slug === slug);
    if (!article) {
      return (
        <main className="container-gramiyam py-16">
          <EmptyState
            title="Article Not Found"
            description="The requested news article could not be located."
            actionLabel="Back to News"
            actionTo="/news"
          />
        </main>
      );
    }

    return (
      <main className="py-12 sm:py-16">
        <article className="container-gramiyam max-w-3xl">
          <Breadcrumb
            items={[
              { label: 'News', to: '/news' },
              { label: article.title },
            ]}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
            {article.category} • {formatDate(article.date)}
          </p>
          <h1 className="mt-2 font-serif text-4xl font-medium leading-tight text-forest sm:text-5xl">
            {article.title}
          </h1>
          <div className="my-8 overflow-hidden rounded-sm border border-softgrey">
            <img
              src={article.image}
              alt={article.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-charcoal/85">
            {article.body.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          <div className="mt-10 border-t border-softgrey pt-6">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold-dark"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to All News
            </Link>
          </div>
        </article>
      </main>
    );
  }

  const categories = ['All', 'Press Release', 'Community'];
  const filtered = useMemo(
    () =>
      NEWS_ITEMS.filter((item) => {
        const matchesCat = category === 'All' || item.category === category;
        const matchesQuery =
          !query.trim() ||
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase());
        const matchesDate = !dateFilter || item.date.startsWith(dateFilter);
        return matchesCat && matchesQuery && matchesDate;
      }),
    [query, category, dateFilter]
  );

  return (
    <main>
      <HeroBanner
        compact
        eyebrow="Media & Press"
        title="Gramiyam in the News"
        subtitle="Official announcements, community updates, press releases, and media resources."
      />

      <section className="py-12 sm:py-16">
        <div className="container-gramiyam">
          {/* Search and Filter */}
          <div className="mb-10 grid grid-cols-1 gap-4 rounded-sm border border-softgrey bg-white p-5 md:grid-cols-12">
            <div className="flex items-center rounded-sm border border-softgrey bg-ivory/60 px-3 md:col-span-5">
              <Search className="h-4 w-4 text-charcoal/45" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news articles..."
                className="w-full bg-transparent py-2.5 pl-2 text-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 md:col-span-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-sm px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    category === cat
                      ? 'bg-forest text-ivory'
                      : 'border border-softgrey bg-white text-charcoal hover:border-forest'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="md:col-span-3">
              <input
                type="month"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                aria-label="Filter by month"
                className="w-full rounded-sm border border-softgrey bg-ivory/60 px-3 py-2 text-xs focus:border-forest focus:outline-none"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No news items match your filter"
              description="Try clearing the search query or date filter."
              actionLabel="Reset Filters"
              onAction={() => {
                setQuery('');
                setCategory('All');
                setDateFilter('');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          {/* Press Releases & Media Library */}
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-softgrey pt-12 lg:grid-cols-2">
            <div className="rounded-sm border border-softgrey bg-white p-7">
              <SectionHeading
                eyebrow="Official Statements"
                title="Press Releases"
                subtitle="Downloadable press documents will appear here when published."
              />
              <div className="flex items-center gap-3 rounded-sm bg-cream/70 p-4 text-xs text-charcoal/80">
                <FileText className="h-5 w-5 shrink-0 text-gold-dark" />
                <span>Press kit PDFs are pending official upload by the Gramiyam communications team.</span>
              </div>
            </div>

            <div className="rounded-sm border border-softgrey bg-white p-7">
              <SectionHeading
                eyebrow="Press Assets"
                title="Media Library"
                subtitle="Approved brand logos, media partner features, and photography."
              />
              <p className="text-sm text-charcoal/75">
                Media partner logos and press coverage clippings will be listed here once approved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
