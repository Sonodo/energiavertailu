import type { Metadata } from 'next';
import EVChargingCalculator from '@/components/tools/EVChargingCalculator';

export const metadata: Metadata = {
  title: 'Sähköauton latauslaskuri — Laske latauskustannukset',
  description:
    'Laske sähköauton latauskustannukset kotona ja julkisissa latauspisteissä. Vertaa kustannuksia bensiiniautoon ja näe vuotuiset säästöt.',
  keywords: [
    'sähköauto lataus hinta',
    'sähköauton lataus kustannus',
    'sähköauto vai bensiini',
    'sähköauto kulutus',
    'kotilataus hinta',
    'sähköauto säästö',
  ],
};

export default function SahkoautoPage() {
  return <EVChargingCalculator />;
}
