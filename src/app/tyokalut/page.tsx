import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  Sun,
  Car,
  Flame,
  ArrowRight,
  Calculator,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sähkötyökalut — Laske, vertaa ja optimoi',
  description:
    'Ilmaiset sähkötyökalut: kulutus­laskuri, aurinkopaneelilaskuri, sähköauton latauslaskuri ja lämmityskustannuslaskuri. Laske ja optimoi sähkönkulutuksesi.',
  keywords: [
    'sähkölaskuri',
    'kulutus­laskuri',
    'aurinkopaneelit laskuri',
    'sähköauto lataus hinta',
    'lämmityskustannus vertailu',
    'sähkönkulutus arvio',
  ],
};

const tools = [
  {
    href: '/tyokalut/kulutus',
    icon: Zap,
    title: 'Sähkönkulutuslaskuri',
    description:
      'Arvioi vuotuinen sähkönkulutuksesi asumismuodon, pinta-alan, asukasmäärän ja lämmitystavan perusteella.',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    href: '/tyokalut/aurinkopaneelit',
    icon: Sun,
    title: 'Aurinkopaneelilaskuri',
    description:
      'Laske aurinkopaneeli-investoinnin kannattavuus, takaisinmaksuaika ja vuotuiset säästöt.',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    href: '/tyokalut/sahkoauto',
    icon: Car,
    title: 'Sähköauton latauslaskuri',
    description:
      'Laske sähköauton lataus­kustannukset kotona ja julkisissa lataus­pisteissä. Vertaa bensiiniautoon.',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    href: '/tyokalut/lammitys',
    icon: Flame,
    title: 'Lämmityskustannuslaskuri',
    description:
      'Vertaa eri lämmitysmuotojen kustannuksia: sähkö, lämpöpumput, kaukolämpö, öljy ja pelletti.',
    color: 'bg-rose-500',
    lightColor: 'bg-rose-50',
    textColor: 'text-rose-600',
  },
  {
    href: '/tyokalut/hintaseuranta',
    icon: TrendingUp,
    title: 'Hintaseuranta',
    description:
      'Seuraa sähköyhtiöiden hintojen kehitystä ja vertaa kiinteän ja pörssisähkön historiaa.',
    color: 'bg-violet-500',
    lightColor: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
];

export default function TyokalutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0066FF]/10">
          <Calculator className="h-7 w-7 text-[#0066FF]" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
          Sähkötyökalut
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Laske, vertaa ja optimoi — ilmaiset laskurit auttavat sinua tekemään parempia päätöksiä
          sähkönkulutuksesta ja energiainvestoinneista.
        </p>
      </div>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100"
            >
              {/* Icon */}
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${tool.lightColor}`}
              >
                <Icon className={`h-6 w-6 ${tool.textColor}`} />
              </div>

              {/* Content */}
              <h2 className="text-xl font-bold text-slate-900">{tool.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              {/* CTA */}
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] transition-colors group-hover:text-[#0052CC]">
                Avaa työkalu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="mt-10 text-center text-sm text-slate-500">
        Kaikki laskurit ovat ilmaisia eikä niiden käyttö vaadi rekisteröitymistä.
        Arviot ovat suuntaa-antavia ja perustuvat yleisiin keskiarvoihin.
      </p>
    </div>
  );
}
