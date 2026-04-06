import type { Metadata } from 'next';
import SpotDashboard from '@/components/prices/SpotDashboard';
import EducationalSection from '@/components/prices/EducationalSection';
import ErrorBoundary from '@/components/ErrorBoundary';
import { getTodayPrices, getTomorrowPrices, getCurrentPrice } from '@/lib/api/price-service';
import { computeStats } from '@/lib/price-utils';
import type { HourlyPrice } from '@/types';

export const metadata: Metadata = {
  title: 'Pörssisähkön hinta nyt — Reaaliaikainen sähkön hinta | Valitse Sähkö',
  description:
    'Seuraa pörssisähkön hintaa reaaliajassa. Tänään ja huomisen tuntihinnat, hintahistoria ja ennusteet. Löydä halvimmat tunnit sähkönkäytölle.',
  openGraph: {
    title: 'Pörssisähkön hinta nyt — Reaaliaikainen sähkön hinta',
    description:
      'Seuraa pörssisähkön hintaa reaaliajassa. Tänään ja huomisen tuntihinnat, hintahistoria ja ennusteet.',
    url: '/porssisahko',
    type: 'website',
  },
  alternates: {
    canonical: '/porssisahko',
  },
};

// Revalidate every 5 minutes for ISR
export const revalidate = 300;

export default async function PorssisahkoPage() {
  let todayPrices: HourlyPrice[] = [];
  let tomorrowPrices: HourlyPrice[] | null = null;
  let currentPrice: HourlyPrice | null = null;
  let isSampleData = false;

  try {
    const [todayResult, tomorrowResult, currentResult] = await Promise.all([
      getTodayPrices(),
      getTomorrowPrices(),
      getCurrentPrice(),
    ]);
    todayPrices = todayResult.data;
    tomorrowPrices = tomorrowResult.data;
    currentPrice = currentResult.data;
    // Detect sample data from source attribution instead of broken rank check
    isSampleData = todayResult.source === 'sample';
  } catch (error) {
    console.error('Server-side fetch failed:', error);
    isSampleData = true;
  }

  const stats = computeStats(todayPrices, currentPrice);

  const initialData =
    todayPrices.length > 0
      ? {
          today: todayPrices,
          tomorrow: tomorrowPrices,
          current: currentPrice,
          stats,
        }
      : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Pörssisähkön hinta tänään
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Seuraa Nord Pool -sähköpörssin hintaa reaaliajassa. Hinnat sisältävät ALV 25,5 %.
        </p>
      </div>

      {/* Interactive dashboard (client component) */}
      <ErrorBoundary section="Pörssisähkö">
        <SpotDashboard initialData={initialData} isSampleData={isSampleData} />
      </ErrorBoundary>

      {/* Educational content (server component, good for SEO) */}
      <div className="mt-12">
        <EducationalSection />
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Pörssisähkön hinta nyt',
            description:
              'Seuraa pörssisähkön hintaa reaaliajassa. Tänään ja huomisen tuntihinnat, hintahistoria ja ennusteet.',
            url: 'https://valitsesahko.fi/porssisahko',
            mainEntity: {
              '@type': 'Dataset',
              name: 'Sähkön spot-hinnat Suomessa',
              description: 'Reaaliaikaiset sähkön tuntihinnat Nord Pool -sähköpörssistä',
              temporalCoverage: new Date().toISOString().split('T')[0],
              license: 'https://creativecommons.org/licenses/by/4.0/',
            },
          }),
        }}
      />
    </div>
  );
}
