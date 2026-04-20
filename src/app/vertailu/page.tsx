import type { Metadata } from 'next';
import { Suspense } from 'react';
import DirectResults from '@/components/calculator/DirectResults';

export const metadata: Metadata = {
  title: 'Vertaile sähkösopimuksia — Tulokset | Valitse Sähkö',
  description:
    'Vertaile yli 90 sähkösopimusta 38 sähköyhtiöltä. Näet heti hinnat omalla kulutuksellasi — säätö yhdellä klikkauksella.',
  openGraph: {
    title: 'Vertaile sähkösopimuksia — Tulokset | Valitse Sähkö',
    description:
      'Vertaile yli 90 sähkösopimusta 38 sähköyhtiöltä. Näet heti hinnat omalla kulutuksellasi — säätö yhdellä klikkauksella.',
  },
  alternates: {
    canonical: 'https://valitsesahko.fi/vertailu',
  },
};

function ResultsFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-accent" />
          <p className="text-sm text-slate-500">Ladataan vertailua...</p>
        </div>
      </div>
    </div>
  );
}

export default function VertailuPage() {
  return (
    <Suspense fallback={<ResultsFallback />}>
      <DirectResults />
    </Suspense>
  );
}
