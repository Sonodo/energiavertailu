import type { Metadata } from 'next';
import SavedComparisonsList from '@/components/calculator/SavedComparisonsList';

export const metadata: Metadata = {
  title: 'Tallennetut vertailut | Valitse Sähkö',
  description:
    'Tallennetut sähkösopimusten vertailusi. Näe kun edullisempi sopimus tulee saataville.',
  alternates: {
    canonical: 'https://valitsesahko.fi/vertailut',
  },
  robots: { index: false, follow: false },
};

export default function VertailutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Tallennetut vertailut
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Tallennetut sähkösopimusten vertailusi. Näytämme, jos edullisempi sopimus on tullut saataville.
        </p>
      </div>
      <SavedComparisonsList />
    </div>
  );
}
