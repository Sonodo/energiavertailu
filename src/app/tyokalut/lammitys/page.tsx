import type { Metadata } from 'next';
import HeatingCalculator from '@/components/tools/HeatingCalculator';

export const metadata: Metadata = {
  title: 'Lämmityskustannuslaskuri — Vertaa lämmitysmuotoja',
  description:
    'Vertaa eri lämmitysmuotojen kustannuksia: suora sähkölämmitys, ilmalämpöpumppu, maalämpö, kaukolämpö, öljy ja pelletti. Laske 10 vuoden kokonaiskustannukset.',
  keywords: [
    'lämmityskustannus laskuri',
    'lämmitysmuotojen vertailu',
    'maalämpö vai ilmalämpöpumppu',
    'lämmitys hinta vertailu',
    'kaukolämpö hinta',
    'lämpöpumppu takaisinmaksuaika',
  ],
};

export default function LammitysPage() {
  return <HeatingCalculator />;
}
