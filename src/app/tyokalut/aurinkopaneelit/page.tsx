import type { Metadata } from 'next';
import SolarCalculator from '@/components/tools/SolarCalculator';

export const metadata: Metadata = {
  title: 'Aurinkopaneelilaskuri — Laske investoinnin kannattavuus',
  description:
    'Laske aurinkopaneeli-investoinnin kannattavuus, takaisinmaksuaika, vuotuinen tuotanto ja säästöt. Huomioi sijaintisi, katon suunnan ja sähkönkulutuksesi.',
  keywords: [
    'aurinkopaneeli laskuri',
    'aurinkopaneelit kannattavuus',
    'aurinkopaneelit hinta',
    'aurinkosähkö tuotanto',
    'takaisinmaksuaika aurinkopaneelit',
    'aurinkopaneelit omakotitalo',
  ],
};

export default function AurinkopaneeliPage() {
  return <SolarCalculator />;
}
