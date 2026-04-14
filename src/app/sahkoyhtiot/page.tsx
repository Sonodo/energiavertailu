import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Leaf,
  Building2,
  FileText,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { providers } from '@/data/providers';
import { providerDetails } from '@/data/provider-details';
import SahkoyhtiotListClient, {
  type SahkoyhtiotListProvider,
} from './SahkoyhtiotListClient';

export const metadata: Metadata = {
  title: 'Sähköyhtiöt Suomessa — kattava hakemisto | Valitse Sähkö',
  description:
    'Kattava hakemisto suomalaisista sähköyhtiöistä. Vertaile sähkönmyyjiä, tarkista vastapuoliriski ja löydä luotettava sähköyhtiö.',
  openGraph: {
    title: 'Sähköyhtiöt Suomessa — kattava hakemisto',
    description:
      'Kattava hakemisto suomalaisista sähköyhtiöistä. Vertaile sähkönmyyjiä, tarkista vastapuoliriski ja löydä luotettava sähköyhtiö.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://valitsesahko.fi/sahkoyhtiot',
  },
};

function getProviderType(id: string): 'national' | 'regional' | 'challenger' {
  return providerDetails[id]?.type ?? 'national';
}

function getCheapestPrice(contracts: { pricePerKwh: number; type: string }[]): number {
  const spotContracts = contracts.filter((c) => c.type === 'spot');
  const fixedContracts = contracts.filter((c) => c.type === 'fixed');
  if (fixedContracts.length > 0) {
    return Math.min(...fixedContracts.map((c) => c.pricePerKwh));
  }
  if (spotContracts.length > 0) {
    return Math.min(...spotContracts.map((c) => c.pricePerKwh));
  }
  return Math.min(...contracts.map((c) => c.pricePerKwh));
}

export default function SahkoyhtiotPage() {
  // Precompute all derived provider data on the server so the client
  // component only handles interactivity — SSR/SEO stays intact.
  const listProviders: SahkoyhtiotListProvider[] = providers.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    headquarters: p.headquarters,
    customerCount: p.customerCount,
    counterpartyRisk: p.counterpartyRisk,
    greenOptions: p.greenOptions,
    type: getProviderType(p.id),
    contractCount: p.contracts.length,
    hasGreenContract: p.contracts.some((c) => c.greenEnergy),
    hasFixedContract: p.contracts.some((c) => c.type === 'fixed'),
    cheapestPrice: getCheapestPrice(p.contracts),
  }));

  const providerCount = providers.length;
  const contractCount = providers.reduce((sum, p) => sum + p.contracts.length, 0);
  const greenCount = providers.filter((p) => p.greenOptions).length;

  return (
    <>
      {/* Hero — rendered server-side for SEO */}
      <section className="bg-gradient-to-b from-[#0A1628] to-[#162540] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Etusivu
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">Sähköyhtiöt</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Sähköyhtiöt Suomessa
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Kattava hakemisto suomalaisista sähköyhtiöistä. Vertaile sähkönmyyjiä, tarkista vastapuoliriski ja
            löydä luotettava sähköyhtiö juuri sinun tarpeisiisi.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-accent" />
              <span>{providerCount} sähköyhtiötä</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" />
              <span>{contractCount} sähkösopimusta</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-emerald-400" />
              <span>{greenCount} vihreä vaihtoehto</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              <span>Vastapuoliriski arvioitu</span>
            </div>
          </div>
        </div>
      </section>

      <SahkoyhtiotListClient providers={listProviders} />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#0A1628] to-[#162540] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Vertaile sähkösopimuksia helposti
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Syötä kulutustietosi ja löydä sinulle sopiva sähkösopimus kaikkien yhtiöiden
            tarjonnasta. Vastapuoliriski näytetään jokaiselle yhtiölle.
          </p>
          <Link
            href="/vertailu"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-accent-700"
          >
            Vertaile sopimuksia
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
