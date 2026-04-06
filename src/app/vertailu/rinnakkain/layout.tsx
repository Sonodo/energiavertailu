import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vertaa sopimuksia rinnakkain | Valitse Sähkö',
  description:
    'Vertaa sähkösopimuksia rinnakkain yksityiskohtaisesti. Valitse 2-3 sopimusta ja näe kaikki tiedot vierekkäin — hinnat, perusmaksut, vuosikustannukset ja muut ominaisuudet.',
  openGraph: {
    title: 'Vertaa sopimuksia rinnakkain | Valitse Sähkö',
    description:
      'Vertaa sähkösopimuksia rinnakkain yksityiskohtaisesti. Valitse 2-3 sopimusta ja näe kaikki tiedot vierekkäin.',
  },
};

export default function RinnakkainLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
