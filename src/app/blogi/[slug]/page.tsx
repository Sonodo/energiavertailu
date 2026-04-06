import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost, getRelatedPosts } from '@/data/blog-posts';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import InternalLinks from '@/components/InternalLinks';

// Generate static paths for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate per-page metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Artikkelia ei löytynyt',
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${SITE_URL}/blogi/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blogi/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      siteName: SITE_NAME,
      locale: 'fi_FI',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // Article JSON-LD
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogi/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    inLanguage: 'fi',
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Etusivu',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blogi',
        item: `${SITE_URL}/blogi`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blogi/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#0066FF]">
                Etusivu
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li>
              <Link href="/blogi" className="hover:text-[#0066FF]">
                Blogi
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li className="text-slate-900 font-medium truncate max-w-[250px]">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Article header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#0066FF]">
              {post.category}
            </span>
            <span className="text-sm text-slate-400">
              {post.readTime} min lukuaika
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-slate-600">{post.description}</p>

          <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
            <span>{post.author}</span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('fi-FI', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            {post.updatedAt !== post.publishedAt && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>
                  Päivitetty{' '}
                  <time dateTime={post.updatedAt}>
                    {new Date(post.updatedAt).toLocaleDateString('fi-FI', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </span>
              </>
            )}
          </div>
        </header>

        {/* Separator */}
        <hr className="mb-8 border-slate-200" />

        {/* Article content */}
        <div
          className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-a:text-[#0066FF] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] p-8 text-white">
          <h2 className="text-2xl font-bold">Vertaa sähkösopimuksia nyt</h2>
          <p className="mt-2 text-blue-100">
            Löydä halvin sähkösopimus omalle kulutuksellesi. Vertailu on
            ilmaista ja puolueetonta.
          </p>
          <Link
            href="/vertailu"
            className="mt-4 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0066FF] shadow-sm transition-colors hover:bg-blue-50"
          >
            Aloita vertailu
          </Link>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Lue myös
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blogi/${related.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4AA]" />
                  <div className="p-5">
                    <span className="mb-2 inline-block text-xs font-medium text-[#0066FF]">
                      {related.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                      {related.description}
                    </p>
                    <span className="mt-3 inline-block text-xs font-medium text-[#0066FF]">
                      Lue lisää &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal links */}
        <InternalLinks
          currentPath={`/blogi/${post.slug}`}
          tags={post.tags}
          category={post.category}
        />
      </article>
    </>
  );
}
