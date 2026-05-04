import type { Metadata } from 'next';
import { Suspense } from 'react';
import ComparisonCalculator from '@/components/calculator/ComparisonCalculator';
import { SiteDisclosureBar } from '@/components/disclosure';

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

function CalculatorFallback() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex h-48 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-accent" />
          <p className="text-sm text-slate-500">Ladataan vertailulaskuria...</p>
        </div>
      </div>
    </div>
  );
}

export default function VertailuPage() {
  return (
    <>
    <SiteDisclosureBar />
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

      <Suspense fallback={<CalculatorFallback />}>
        <ComparisonCalculator />
      </Suspense>
    </div>
    </>
  );
}
