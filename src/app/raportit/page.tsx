import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { monthlyReports, getMonthNameFi, getMonthNameInessiveFi } from '@/data/monthly-reports';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sähkön hintaraportit — Kuukausittaiset markkinakatsaukset',
  description:
    'Seuraa sähkön hinnan kehitystä kuukausittaisilla raporteilla. Spot-hinnat, hintaennusteet, vertailutietoa sopimuksista ja kuluttajaneuvontaa.',
  openGraph: {
    title: `Sähkön hintaraportit | ${SITE_NAME}`,
    description:
      'Kuukausittaiset sähkön hintaraportit: spot-hinnat, trendit ja vertailutietoa.',
    url: `${SITE_URL}/raportit`,
  },
  alternates: {
    canonical: `${SITE_URL}/raportit`,
  },
};

const DIRECTION_CONFIG = {
  up: {
    icon: TrendingUp,
    label: 'Nousussa',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  down: {
    icon: TrendingDown,
    label: 'Laskussa',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  stable: {
    icon: Minus,
    label: 'Vakaa',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
};

export default function RaportitPage() {
  // Sort reports newest first
  const sortedReports = [...monthlyReports].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1628] to-[#162540] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Etusivu
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">Raportit</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-8 w-8 text-[#0066FF]" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Sähkön hintaraportit
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Kuukausittaiset katsaukset sähkön hintakehitykseen Suomessa. Spot-hinnat,
            hintavertailut ja kuluttajaneuvontaa.
          </p>
        </div>
      </section>

      {/* Reports list */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedReports.map((report) => {
            const direction = DIRECTION_CONFIG[report.priceDirection];
            const DirectionIcon = direction.icon;

            return (
              <Link
                key={report.slug}
                href={`/raportit/${report.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-[#0066FF]/30 hover:shadow-lg"
              >
                {/* Top color bar */}
                <div className="h-1.5 bg-gradient-to-r from-[#0066FF] to-[#00D4AA]" />

                <div className="flex flex-1 flex-col p-6">
                  {/* Month/Year header */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-500">
                        {getMonthNameFi(report.month).charAt(0).toUpperCase() +
                          getMonthNameFi(report.month).slice(1)}{' '}
                        {report.year}
                      </span>
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
                        direction.bg,
                        direction.color
                      )}
                    >
                      <DirectionIcon className="h-3 w-3" />
                      {direction.label}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                    Sähkön hinta{' '}
                    {getMonthNameInessiveFi(report.month)} {report.year}
                  </h2>

                  {/* Key stats */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                      <div className="text-xs text-slate-400">Keskihinta</div>
                      <div className="text-sm font-bold text-slate-900">
                        {report.avgSpotPrice.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400">c/kWh</div>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-2 text-center">
                      <div className="text-xs text-slate-400">Minimi</div>
                      <div className="text-sm font-bold text-emerald-700">
                        {report.minSpotPrice.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400">c/kWh</div>
                    </div>
                    <div className="rounded-lg bg-red-50 p-2 text-center">
                      <div className="text-xs text-slate-400">Maksimi</div>
                      <div className="text-sm font-bold text-red-700">
                        {report.maxSpotPrice.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400">c/kWh</div>
                    </div>
                  </div>

                  {/* Summary excerpt */}
                  <p className="mt-4 flex-1 text-sm text-slate-500 line-clamp-3">
                    {report.summary}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0066FF]">
                    Lue raportti
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Etsitkö edullisinta sähkösopimusta?</h2>
          <p className="mx-auto mt-2 max-w-lg text-blue-100">
            Vertaa 37 sähköyhtiön sopimuksia ja löydä halvin vaihtoehto omalle
            kulutuksellesi.
          </p>
          <Link
            href="/vertailu"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0066FF] transition-colors hover:bg-blue-50"
          >
            Vertaa sähkösopimuksia
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            ],
          }),
        }}
      />
    </>
  );
}
