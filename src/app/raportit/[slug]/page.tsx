import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Zap,
  Clock,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Calendar,
  Scale,
} from 'lucide-react';
import {
  monthlyReports,
  getMonthlyReport,
  getMonthNameFi,
  getMonthNameInessiveFi,
} from '@/data/monthly-reports';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import FAQSchema from '@/components/seo/FAQSchema';
import InternalLinks from '@/components/InternalLinks';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return monthlyReports.map((report) => ({
    slug: report.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getMonthlyReport(slug);

  if (!report) {
    return { title: 'Raporttia ei löytynyt' };
  }

  const monthName = getMonthNameInessiveFi(report.month);
  const title = `Sähkön hinta ${monthName} ${report.year} — Kuukausiraportti`;
  const description = `Sähkön spot-hinnan kehitys ${monthName} ${report.year}. Keskihinta ${report.avgSpotPrice.toFixed(2)} c/kWh. Kattava analyysi hintakehityksestä, sopimustyyppien vertailu ja kuluttajaneuvontaa.`;

  return {
    title,
    description,
    keywords: [
      'sähkön hinta',
      getMonthNameFi(report.month),
      `${report.year}`,
      'spot-hinta',
      'pörssisähkö',
      'kuukausiraportti',
    ],
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/raportit/${slug}`,
      type: 'article',
      publishedTime: report.publishedAt,
      modifiedTime: report.updatedAt,
    },
    alternates: {
      canonical: `${SITE_URL}/raportit/${slug}`,
    },
  };
}

const DIRECTION_CONFIG = {
  up: {
    icon: TrendingUp,
    label: 'Nousussa edelliskuukaudesta',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
  },
  down: {
    icon: TrendingDown,
    label: 'Laskussa edelliskuukaudesta',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    borderColor: 'border-emerald-200',
  },
  stable: {
    icon: Minus,
    label: 'Vakaa edelliskuukaudesta',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-200',
  },
};

export default async function ReportDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getMonthlyReport(slug);

  if (!report) {
    notFound();
  }

  const direction = DIRECTION_CONFIG[report.priceDirection];
  const DirectionIcon = direction.icon;
  const monthNameCap =
    getMonthNameFi(report.month).charAt(0).toUpperCase() +
    getMonthNameFi(report.month).slice(1);
  const monthNameInessive = getMonthNameInessiveFi(report.month);

  // FAQ data for this report
  const reportFaqs = [
    {
      question: `Mikä oli sähkön keskihinta ${monthNameInessive} ${report.year}?`,
      answer: `Sähkön spot-hinnan keskiarvo ${monthNameInessive} ${report.year} oli ${report.avgSpotPrice.toFixed(2)} c/kWh (sis. ALV). Alin tuntihinta oli ${report.minSpotPrice.toFixed(2)} c/kWh ja korkein ${report.maxSpotPrice.toFixed(2)} c/kWh.`,
    },
    {
      question: `Mihin aikaan sähkö oli halvinta ${monthNameInessive} ${report.year}?`,
      answer: `Halvimmat tunnit olivat tyypillisesti yöaikaan klo ${report.cheapestHour}:00 tienoilla. Kalleimmat tunnit osuivat kulutushuippuun klo ${report.expensiveHour}:00 paikkeille.`,
    },
    {
      question: `Kannattiko pörssisähkö vai kiinteä sopimus ${monthNameInessive} ${report.year}?`,
      answer: report.comparisonNote,
    },
  ];

  // Navigate to previous/next report
  const sortedReports = [...monthlyReports].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });
  const currentIdx = sortedReports.findIndex((r) => r.slug === report.slug);
  const prevReport = currentIdx > 0 ? sortedReports[currentIdx - 1] : null;
  const nextReport =
    currentIdx < sortedReports.length - 1 ? sortedReports[currentIdx + 1] : null;

  // Breadcrumb schema
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
        name: 'Raportit',
        item: `${SITE_URL}/raportit`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${monthNameCap} ${report.year}`,
        item: `${SITE_URL}/raportit/${report.slug}`,
      },
    ],
  };

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Sähkön hinta ${monthNameInessive} ${report.year}`,
    description: report.summary,
    datePublished: report.publishedAt,
    dateModified: report.updatedAt,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/raportit/${report.slug}`,
    inLanguage: 'fi',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <FAQSchema faqs={reportFaqs} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1628] to-[#162540] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Etusivu
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/raportit" className="hover:text-white/80 transition-colors">
              Raportit
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">
              {monthNameCap} {report.year}
            </span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1">
              {/* Price direction badge */}
              <span
                className={cn(
                  'mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
                  report.priceDirection === 'up'
                    ? 'bg-red-500/20 text-red-300'
                    : report.priceDirection === 'down'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300'
                )}
              >
                <DirectionIcon className="h-3.5 w-3.5" />
                {direction.label}
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Sähkön hinta{' '}
                <span className="bg-gradient-to-r from-[#0066FF] to-[#3385FF] bg-clip-text text-transparent">
                  {monthNameInessive} {report.year}
                </span>
              </h1>
              <p className="mt-3 text-sm text-white/50">
                Kuukausiraportti — Julkaistu{' '}
                {new Date(report.publishedAt).toLocaleDateString('fi-FI', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>

            {/* Key stat highlight */}
            <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm text-center lg:min-w-[200px]">
              <div className="text-xs text-white/50 uppercase tracking-wider">Keskihinta</div>
              <div className="mt-1 text-3xl font-extrabold text-white">
                {report.avgSpotPrice.toFixed(2)}
              </div>
              <div className="text-sm text-white/50">c/kWh (sis. ALV)</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Key stats cards */}
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                Hintatilastot — {monthNameCap} {report.year}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <BarChart3 className="h-4 w-4" />
                    <span className="text-xs font-medium">Keskihinta</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">
                    {report.avgSpotPrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-400">c/kWh</div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-xs font-medium">Alin hinta</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-emerald-700">
                    {report.minSpotPrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-emerald-500">c/kWh</div>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center gap-2 text-red-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium">Ylin hinta</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-red-700">
                    {report.maxSpotPrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-red-500">c/kWh</div>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium">Halvimmat tunnit</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-blue-700">
                    klo {report.cheapestHour}–{report.cheapestHour + 2}
                  </div>
                  <div className="text-xs text-blue-500">yöaikaan</div>
                </div>
              </div>
            </section>

            {/* Summary */}
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Yhteenveto</h2>
              <p className="text-slate-600 leading-relaxed">{report.summary}</p>
            </section>

            {/* Key events */}
            <section className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                <Zap className="h-5 w-5 text-[#0066FF]" />
                Kuukauden kohokohdat
              </h2>
              <div className="space-y-3">
                {report.keyEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0066FF]" />
                    <p className="text-sm text-slate-700 leading-relaxed">{event}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Comparison section */}
            <section className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                <Scale className="h-5 w-5 text-[#0066FF]" />
                Miten sopimustyypit pärjäsivät
              </h2>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-600 leading-relaxed">{report.comparisonNote}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h3 className="text-sm font-bold text-blue-900">Kiinteä sopimus</h3>
                    <p className="mt-1 text-sm text-blue-700">
                      Tyypillinen hinta: 7,49–8,89 c/kWh
                    </p>
                    <p className="mt-1 text-xs text-blue-500">
                      Ennustettava, ei hintapiikkien riskiä
                    </p>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-4">
                    <h3 className="text-sm font-bold text-amber-900">Pörssisähkö (spot)</h3>
                    <p className="mt-1 text-sm text-amber-700">
                      Keskihinta: {report.avgSpotPrice.toFixed(2)} c/kWh
                    </p>
                    <p className="mt-1 text-xs text-amber-500">
                      Vaihteleva, mutta optimoinnilla säästöjä
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Consumer advice */}
            <section className="mb-10">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Neuvot kuluttajalle
              </h2>
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6">
                {report.consumerAdvice.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-3 text-slate-700 leading-relaxed last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* FAQ section */}
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                Usein kysytyt kysymykset
              </h2>
              <div className="space-y-4">
                {reportFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Previous/Next navigation */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              {prevReport ? (
                <Link
                  href={`/raportit/${prevReport.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  {getMonthNameFi(prevReport.month).charAt(0).toUpperCase() +
                    getMonthNameFi(prevReport.month).slice(1)}{' '}
                  {prevReport.year}
                </Link>
              ) : (
                <div />
              )}
              {nextReport && (
                <Link
                  href={`/raportit/${nextReport.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                >
                  {getMonthNameFi(nextReport.month).charAt(0).toUpperCase() +
                    getMonthNameFi(nextReport.month).slice(1)}{' '}
                  {nextReport.year}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {/* Internal links */}
            <InternalLinks
              currentPath={`/raportit/${report.slug}`}
              tags={['sähkön hinta', 'pörssisähkö', 'sähkösopimus', 'vertailu']}
              category="sahkon-hinta"
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* CTA */}
              <div className="rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold">Vertaa sopimuksia</h3>
                <p className="mt-2 text-sm text-white/80">
                  Löydä halvin sähkösopimus ja näe paljonko voit säästää.
                </p>
                <Link
                  href="/vertailu"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0066FF] transition-colors hover:bg-white/90"
                >
                  Vertaa sopimuksia
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Other reports */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Muut raportit
                </h3>
                <div className="space-y-3">
                  {monthlyReports
                    .filter((r) => r.slug !== report.slug)
                    .sort((a, b) => {
                      if (a.year !== b.year) return b.year - a.year;
                      return b.month - a.month;
                    })
                    .map((r) => (
                      <Link
                        key={r.slug}
                        href={`/raportit/${r.slug}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-50"
                      >
                        <span className="font-medium text-slate-700">
                          {getMonthNameFi(r.month).charAt(0).toUpperCase() +
                            getMonthNameFi(r.month).slice(1)}{' '}
                          {r.year}
                        </span>
                        <span className="text-xs text-slate-400">
                          {r.avgSpotPrice.toFixed(2)} c/kWh
                        </span>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Spot price link */}
              <Link
                href="/porssisahko"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Zap className="h-4 w-4 text-[#0066FF]" />
                Pörssisähkön hinta nyt
              </Link>

              {/* All reports */}
              <Link
                href="/raportit"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Calendar className="h-4 w-4" />
                Kaikki raportit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
