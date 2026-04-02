import type { Metadata } from 'next';
import PriceTrackerTool from '@/components/tools/PriceTrackerTool';

export const metadata: Metadata = {
  title: 'Sähkön hintaseuranta — Sopimushintojen kehitys ja vertailu',
  description:
    'Seuraa sähköyhtiöiden sopimushintojen kehitystä viimeisen 12 kuukauden ajalta. Vertaa kiinteän ja pörssisähkön historiaa ja katso kannattaako kiinnittää nyt.',
  keywords: [
    'sähkön hinta historia',
    'sähkön hintakehitys',
    'kiinteä sähkösopimus hinta',
    'pörssisähkö historia',
    'sähkön hintavertailu',
    'kiinteä vai pörssisähkö',
    'sähkön hinnan seuranta',
  ],
};

export default function HintaseurantaPage() {
  return <PriceTrackerTool />;
}
