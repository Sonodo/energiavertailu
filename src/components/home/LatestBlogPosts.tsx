import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts, BLOG_CATEGORIES } from '@/data/blog-posts';

const latestPosts = [...blogPosts]
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 3);

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${parseInt(day)}.${parseInt(month)}.${year}`;
}

function getCategoryLabel(categoryId: string): string {
  const cat = BLOG_CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.label : categoryId;
}

export default function LatestBlogPosts() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="section-title">
              Ajankohtaista
            </h2>
            <p className="section-subtitle">
              Uusimmat artikkelit sähkömarkkinoilta ja säästövinkit.
            </p>
          </div>
          <Link
            href="/blogi"
            className="hidden items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700 sm:flex"
          >
            Kaikki artikkelit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogi/${post.slug}`}
              className="card-hover group flex flex-col overflow-hidden !p-0"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-navy to-navy-light">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm" />
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  {getCategoryLabel(post.category)}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-accent-600">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {post.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime} min
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile link to all posts */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blogi"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
          >
            Kaikki artikkelit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
