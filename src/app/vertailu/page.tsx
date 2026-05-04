import type { Metadata } from 'next';
import { Suspense } from 'react';
import ComparisonCalculator from '@/components/calculator/ComparisonCalculator';
import LoadingTimeout from '@/components/ui/LoadingTimeout';

export const metadata: Metadata = {
  title: 'Vertaile sähkösopimuksia — Löydä sinulle sopiva sopimus | Valitse Sähkö',
  description:
    'Vertaile yli 90 sähkösopimusta 37 sähköyhtiöltä. Syötä kulutuksesi ja löydä sinulle sopiva sähkösopimus. Ilmainen ja kattava vertailu.',
  openGraph: {
    title: 'Vertaile sähkösopimuksia — Löydä sinulle sopiva sopimus | Valitse Sähkö',
    description:
      'Vertaile yli 90 sähkösopimusta 37 sähköyhtiöltä. Syötä kulutuksesi ja löydä sinulle sopiva sähkösopimus.',
  },
  alternates: {
    canonical: 'https://valitsesahko.fi/vertailu',
  },
};

export default function VertailuPage() {
  return (
    <>
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Vertaa sähkösopimuksia
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
          Syötä sähkönkulutuksesi ja vertaa eri sähköyhtiöiden sopimuksia.
          Löydä sinulle edullisin vaihtoehto sekunneissa.
        </p>
      </div>

      <Suspense fallback={<LoadingTimeout fallbackHref="/sahkoyhtiot" fallbackLabel="Selaa sähköyhtiöitä" />}>
        <ComparisonCalculator />
      </Suspense>
    </div>
    </>
  );
}
