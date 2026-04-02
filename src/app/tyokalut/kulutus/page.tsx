import type { Metadata } from 'next';
import ConsumptionCalculator from '@/components/tools/ConsumptionCalculator';

export const metadata: Metadata = {
  title: 'Sähkönkulutuslaskuri — Arvioi vuosikulutuksesi',
  description:
    'Laske arvio vuotuisesta sähkönkulutuksestasi asumismuodon, pinta-alan, asukasmäärän ja lämmitystavan perusteella. Ilmainen ja helppokäyttöinen laskuri.',
  keywords: [
    'sähkönkulutuslaskuri',
    'sähkönkulutus arvio',
    'kuinka paljon sähköä kulutan',
    'sähkönkulutus kerrostalo',
    'sähkönkulutus omakotitalo',
    'vuosikulutus sähkö',
  ],
};

export default function KulutusPage() {
  return <ConsumptionCalculator />;
}
