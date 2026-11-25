import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner.jsx';
import BlogCard from '../components/home/BlogCard.jsx';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import { BLOG_POSTS, sampleProducts } from '../data/siteData.js';
import { formatDate } from '../utils/formatters.js';

export default function Blog() {
  const { slug } = useParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  if (slug) {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) {
      return (
        <main className="container-gramiyam py-16">
          <EmptyState
            title="Article Not Found"
            description="The requested blog post could not be found."
            actionLabel="Back to Blogs"
            actionTo="/blogs"
          />
        </main>
      );
    }

    const related = sampleProducts.filter((p) =>
      post.relatedProducts?.includes(p.slug)
    );

    return (
      <main className="py-12 sm:py-16">
        <article className="container-gramiyam max-w-4xl">
          <Breadcrumb
            items={[
              { label: 'Blogs', to: '/blogs' },
              { label: post.title },
            ]}
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
            {post.category} • {formatDate(post.date)} • {post.readTime}
          </p>
          <h1 className="mt-2 font-serif text-4xl font-medium leading-tight text-forest sm:text-5xl">
            {post.title}
          </h1>

          <div className="my-8 overflow-hidden rounded-sm border border-softgrey">
            <img
              src={post.image}
              alt={post.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          <div className="space-y-5 text-base leading-relaxed text-charcoal/85">
            {post.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {related.length > 0 && (
            <section className="mt-14 border-t border-softgrey pt-10">
              <h2 className="mb-6 font-serif text-3xl font-medium text-forest">
                Related Formulations
              </h2>
              <ProductGrid products={related} columns={3} />
            </section>
          )}

          <div className="mt-10 border-t border-softgrey pt-6">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold-dark"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Ancient Wisdom Blog
            </Link>
          </div>
        </article>
      </main>
    );
  }

  const categories = ['All', 'Ancient Wisdom', 'How to Use', 'Natural Wellness'];
  const filtered = useMemo(
    () =>
      BLOG_POSTS.filter((p) => {
        const matchesCat = category === 'All' || p.category === category;
        const matchesQuery =
          !query.trim() ||
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(query.toLowerCase());
        return matchesCat && matchesQuery;
      }),
    [query, category]
  );

  return (
    <main>
      <HeroBanner
        compact
        eyebrow="Editorial Journal"
        title="Ancient Wisdom & Natural Wellness"
        subtitle="Explore how-to guides, botanical traditions, and mindful daily rituals."
      />

      <section className="py-12 sm:py-16">
        <div className="container-gramiyam">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    category === cat
                      ? 'bg-forest text-ivory'
                      : 'border border-softgrey bg-white text-charcoal hover:border-forest'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center rounded-sm border border-softgrey bg-white px-3 md:w-72">
              <Search className="h-4 w-4 text-charcoal/45" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-transparent py-2.5 pl-2 text-sm focus:outline-none"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No articles found"
              description="Try another search term or category."
              actionLabel="Show All Articles"
              onAction={() => {
                setQuery('');
                setCategory('All');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
