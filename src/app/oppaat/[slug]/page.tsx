import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Clock,
  Calendar,
  Tag,
  BookOpen,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { guides } from '@/data/guides';
import { SITE_URL } from '@/lib/constants';
import InternalLinks from '@/components/InternalLinks';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) {
    return { title: 'Opas ei löytynyt' };
  }

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: `${guide.title} | Valitse Sähkö`,
      description: guide.description,
      url: `${SITE_URL}/oppaat/${slug}`,
      type: 'article',
    },
    alternates: {
      canonical: `${SITE_URL}/oppaat/${slug}`,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Perustiedot: 'bg-blue-100 text-blue-700',
  'Käytännön oppaat': 'bg-emerald-100 text-emerald-700',
  Säästäminen: 'bg-amber-100 text-amber-700',
  Pörssisähkö: 'bg-purple-100 text-purple-700',
  'Uusiutuva energia': 'bg-green-100 text-green-700',
};

// Simple markdown-to-JSX renderer for our guide content
function renderGuideContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let currentTable: string[][] = [];
  let inTable = false;
  let tableHeaderDone = false;

  function flushList() {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="mb-6 space-y-2 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  }

  function flushTable() {
    if (currentTable.length > 0) {
      const headers = currentTable[0];
      const rows = currentTable.slice(1);
      elements.push(
        <div key={`table-${elements.length}`} className="mb-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200">
                {headers.map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold text-slate-900 whitespace-nowrap">
                    {h.replace(/\*\*/g, '')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-slate-100">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3 py-2 text-slate-600 whitespace-nowrap">
                      <span dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = [];
      inTable = false;
      tableHeaderDone = false;
    }
  }

  function formatInline(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (trimmed === '') {
      flushList();
      if (inTable) flushTable();
      continue;
    }

    // Table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      // Check if it's the separator row
      if (trimmed.match(/^\|[\s-|]+\|$/)) {
        tableHeaderDone = true;
        continue;
      }
      inTable = true;
      const cells = trimmed
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());
      currentTable.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList();
      const text = trimmed.replace('### ', '').replace(/\{#[\w-]+\}/, '').trim();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="mb-3 mt-8 text-lg font-bold text-slate-900">
          {text}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      const text = trimmed.replace('## ', '').replace(/\{#[\w-]+\}/, '').trim();
      const id = trimmed.match(/\{#([\w-]+)\}/)?.[1] || text.toLowerCase().replace(/\s+/g, '-').replace(/[^\wäöå-]/g, '');
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          id={id}
          className="mb-4 mt-10 text-2xl font-bold text-slate-900 scroll-mt-24"
        >
          {text}
        </h2>
      );
      continue;
    }

    // List items
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.slice(2));
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      flushList();
      const text = trimmed.replace(/^\d+\.\s/, '');
      currentList.push(text);
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p
        key={`p-${elements.length}`}
        className="mb-4 text-slate-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
      />
    );
  }

  flushList();
  if (inTable) flushTable();

  return elements;
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Opasta ei löytynyt</h1>
          <Link href="/oppaat" className="mt-4 inline-block text-accent hover:underline">
            Takaisin oppaisiin
          </Link>
        </div>
      </div>
    );
  }

  const relatedGuideObjects = guide.relatedGuides
    .map((slug) => guides.find((g) => g.slug === slug))
    .filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: {
      '@type': 'Organization',
      name: guide.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Valitse Sähkö',
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/oppaat/${guide.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1628] to-[#162540] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Etusivu
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/oppaat" className="hover:text-white/80 transition-colors">
              Oppaat
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80 line-clamp-1">{guide.title.split(' — ')[0]}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                CATEGORY_COLORS[guide.category] || 'bg-slate-100 text-slate-700'
              }`}
            >
              {guide.category}
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{guide.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {guide.readTime} min lukuaika
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Päivitetty {new Date(guide.updatedAt).toLocaleDateString('fi-FI')}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Table of Contents sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Sisällysluettelo
              </h2>
              <nav className="space-y-1">
                {guide.tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-100 hover:text-accent ${
                      item.level === 3 ? 'pl-6 text-slate-400' : 'font-medium text-slate-600'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              {/* Compare CTA in sidebar */}
              <div className="mt-8 rounded-xl bg-gradient-to-br from-accent to-accent-700 p-5 text-white">
                <Zap className="h-6 w-6 mb-2 text-white/80" />
                <h3 className="text-sm font-bold">Vertaa sopimuksia</h3>
                <p className="mt-1 text-xs text-white/70">
                  Löydä halvin sähkösopimus sinun tarpeisiisi.
                </p>
                <Link
                  href="/vertailu"
                  className="mt-3 inline-flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-accent"
                >
                  Vertaile
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article className="lg:col-span-3">
            {/* Mobile TOC */}
            <div className="mb-8 lg:hidden">
              <details className="rounded-xl border border-slate-200 bg-white">
                <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-700">
                  Sisällysluettelo
                </summary>
                <nav className="border-t border-slate-100 px-4 py-3 space-y-1">
                  {guide.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block rounded-md px-2 py-1.5 text-sm ${
                        item.level === 3 ? 'pl-5 text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </details>
            </div>

            {/* Rendered content */}
            <div className="prose-wrapper">{renderGuideContent(guide.content)}</div>

            {/* Tags */}
            <div className="mt-12 border-t border-slate-200 pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-slate-400" />
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related guides */}
            {relatedGuideObjects.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-6 text-xl font-bold text-slate-900">Aiheeseen liittyvät oppaat</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedGuideObjects.map((related) =>
                    related ? (
                      <Link
                        key={related.slug}
                        href={`/oppaat/${related.slug}`}
                        className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-accent/30 hover:shadow-md"
                      >
                        <span
                          className={`mb-2 self-start rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                            CATEGORY_COLORS[related.category] || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {related.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-accent transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="mt-1 flex-1 text-xs text-slate-500 line-clamp-2">
                          {related.description}
                        </p>
                        <span className="mt-3 flex items-center gap-1 text-xs font-medium text-accent">
                          Lue opas
                          <ChevronRight className="h-3 w-3" />
                        </span>
                      </Link>
                    ) : null
                  )}
                </div>
              </section>
            )}

            {/* Internal links */}
            <InternalLinks
              currentPath={`/oppaat/${guide.slug}`}
              tags={guide.tags}
              category={guide.category}
            />

            {/* Bottom CTA */}
            <section className="mt-12">
              <div className="rounded-2xl bg-gradient-to-r from-[#0A1628] to-[#162540] p-8 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-accent/60 mb-3" />
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Löydä sopiva sähkösopimus
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
                  Nyt kun olet oppinut aiheesta lisää, hyödynnä tietoa ja vertaa sähkösopimuksia.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/vertailu"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
                  >
                    Vertaa sopimuksia
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/oppaat"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5"
                  >
                    Kaikki oppaat
                  </Link>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
