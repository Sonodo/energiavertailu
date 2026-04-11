import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  ChevronRight,
  Clock,
  Tag,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { guides } from '@/data/guides';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sähköoppaat — Kattavat oppaat sähkön säästämiseen',
  description:
    'Ilmaiset oppaat sähkösopimuksen valintaan, sähkön kilpailuttamiseen, energiansäästöön ja pörssisähkön hyödyntämiseen. Selkeitä ja kattavia.',
  openGraph: {
    title: 'Sähköoppaat — Kattavat oppaat sähkön säästämiseen | Valitse Sähkö',
    description:
      'Ilmaiset oppaat sähkösopimuksen valintaan, sähkön kilpailuttamiseen, energiansäästöön ja pörssisähkön hyödyntämiseen.',
    url: `${SITE_URL}/oppaat`,
  },
  alternates: {
    canonical: `${SITE_URL}/oppaat`,
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Perustiedot: 'bg-blue-100 text-blue-700',
  'Käytännön oppaat': 'bg-emerald-100 text-emerald-700',
  Säästäminen: 'bg-amber-100 text-amber-700',
  Pörssisähkö: 'bg-purple-100 text-purple-700',
  'Uusiutuva energia': 'bg-green-100 text-green-700',
};

export default function OppaatPage() {
  // Group guides by category
  const categories = Array.from(new Set(guides.map((g) => g.category)));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Sähköoppaat — Valitse Sähkö',
    description:
      'Kattavat oppaat sähkösopimuksen valintaan, sähkön säästämiseen ja sähkömarkkinoiden ymmärtämiseen.',
    url: `${SITE_URL}/oppaat`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: guides.map((guide, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${SITE_URL}/oppaat/${guide.slug}`,
        name: guide.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1628] to-[#162540] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Etusivu
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">Oppaat</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0066FF]/20">
              <BookOpen className="h-5 w-5 text-[#0066FF]" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Sähköoppaat
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Kattavat oppaat sähkösopimuksen valintaan, sähkön säästämiseen ja
            sähkömarkkinoiden ymmärtämiseen. Kaikki oppaat ovat ilmaisia.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#0066FF]" />
              <span>{guides.length} opasta</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#0066FF]" />
              <span>
                Yhteensä {guides.reduce((sum, g) => sum + g.readTime, 0)} min lukuaikaa
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-[#0066FF]" />
              <span>{categories.length} kategoriaa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guide cards */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured guide */}
        <div className="mb-12">
          <Link
            href={`/oppaat/${guides[0].slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-[#0066FF]/30 hover:shadow-md"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-8 lg:p-10">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-[#0066FF]/10 px-3 py-1 text-xs font-semibold text-[#0066FF]">
                    Suosittu opas
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      CATEGORY_COLORS[guides[0].category] || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {guides[0].category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors sm:text-3xl">
                  {guides[0].title}
                </h2>
                <p className="mt-3 text-slate-500 leading-relaxed">{guides[0].description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {guides[0].readTime} min
                  </span>
                  <span>
                    Päivitetty{' '}
                    {new Date(guides[0].updatedAt).toLocaleDateString('fi-FI')}
                  </span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-[#0066FF] font-semibold">
                  Lue opas
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="hidden lg:flex lg:w-80 lg:items-center lg:justify-center bg-gradient-to-br from-[#0066FF]/5 to-[#0066FF]/10">
                <Zap className="h-24 w-24 text-[#0066FF]/20" />
              </div>
            </div>
          </Link>
        </div>

        {/* All guides grid */}
        <h2 className="mb-6 text-xl font-bold text-slate-900">Kaikki oppaat</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/oppaat/${guide.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0066FF]/30 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    CATEGORY_COLORS[guide.category] || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {guide.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                {guide.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-500 line-clamp-3">
                {guide.description}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {guide.readTime} min
                  </span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-[#0066FF] opacity-0 transition-opacity group-hover:opacity-100">
                  Lue
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#0A1628] to-[#162540] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Valmis löytämään parhaan sopimuksen?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Oppaiden lukemisen jälkeen vertaa sopimuksia ja löydä sinulle edullisin vaihtoehto.
          </p>
          <Link
            href="/vertailu"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#0052CC]"
          >
            Vertaa sopimuksia
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
