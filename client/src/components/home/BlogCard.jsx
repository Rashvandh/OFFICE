import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-softgrey bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
      <Link to={`/blogs/${post.slug}`} className="aspect-[16/10] overflow-hidden bg-cream">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
          <span>{post.category}</span>
          <span className="text-charcoal/50">{post.readTime}</span>
        </div>
        <Link to={`/blogs/${post.slug}`} className="mt-2 block">
          <h3 className="font-serif text-xl font-medium leading-snug text-forest group-hover:text-botanical">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-charcoal/75">
          {post.excerpt}
        </p>
        <Link
          to={`/blogs/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold-dark"
        >
          Read More
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
