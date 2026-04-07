'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Leaf,
  Building2,
  FileText,
  ChevronRight,
  SlidersHorizontal,
  MapPin,
  Users,
  Shield,
} from 'lucide-react';
import { providers } from '@/data/providers';
import { providerDetails } from '@/data/provider-details';
import { cn } from '@/lib/utils';
import ProviderLogo from '@/components/ui/ProviderLogo';

type ProviderType = 'all' | 'national' | 'regional' | 'challenger';

function getProviderType(id: string): 'national' | 'regional' | 'challenger' {
  return providerDetails[id]?.type ?? 'national';
}

function getCheapestPrice(contracts: { pricePerKwh: number; type: string }[]): number {
  const spotContracts = contracts.filter((c) => c.type === 'spot');
  const fixedContracts = contracts.filter((c) => c.type === 'fixed');
  // Prefer showing cheapest fixed price; fall back to spot margin
  if (fixedContracts.length > 0) {
    return Math.min(...fixedContracts.map((c) => c.pricePerKwh));
  }
  if (spotContracts.length > 0) {
    return Math.min(...spotContracts.map((c) => c.pricePerKwh));
  }
  return Math.min(...contracts.map((c) => c.pricePerKwh));
}

function RiskBadge({ risk }: { risk: number }) {
  let colorClasses: string;
  let iconColor: string;

  if (risk <= 10) {
    colorClasses = 'bg-emerald-100 text-emerald-800';
    iconColor = 'text-emerald-600';
  } else if (risk <= 25) {
    colorClasses = 'bg-green-100 text-green-700';
    iconColor = 'text-green-500';
  } else if (risk <= 50) {
    colorClasses = 'bg-amber-100 text-amber-700';
    iconColor = 'text-amber-500';
  } else if (risk <= 75) {
    colorClasses = 'bg-orange-100 text-orange-700';
    iconColor = 'text-orange-500';
  } else {
    colorClasses = 'bg-red-200 text-red-800 border border-red-300';
    iconColor = 'text-red-600';
  }

  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold', colorClasses)}>
      <Shield className={cn('h-3 w-3', iconColor)} />
      {risk}%
    </span>
  );
}

const TYPE_LABELS: Record<string, string> = {
  national: 'Valtakunnallinen',
  regional: 'Alueellinen',
  challenger: 'Haastaja',
};

export default function SahkoyhtiotPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ProviderType>('all');
  const [greenOnly, setGreenOnly] = useState(false);

  const filteredProviders = useMemo(() => {
    let result = [...providers];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.headquarters?.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter((p) => getProviderType(p.id) === typeFilter);
    }

    // Green filter
    if (greenOnly) {
      result = result.filter((p) => p.greenOptions);
    }

    // Sort alphabetically
    result.sort((a, b) => a.name.localeCompare(b.name, 'fi'));

    return result;
  }, [search, typeFilter, greenOnly]);

  // Letter anchors
  const letters = useMemo(() => {
    const letterSet = new Set(filteredProviders.map((p) => p.name[0].toUpperCase()));
    return Array.from(letterSet).sort((a, b) => a.localeCompare(b, 'fi'));
  }, [filteredProviders]);

  return (
    <>
      {/* Hero */}
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
            Kattava hakemisto suomalaisista sähköyhtiöistä. Vertaa sähkönmyyjiä, tarkista vastapuoliriski ja
            löydä luotettava sähköyhtiö juuri sinun tarpeisiisi.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#0066FF]" />
              <span>{providers.length} sähköyhtiötä</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#0066FF]" />
              <span>
                {providers.reduce((sum, p) => sum + p.contracts.length, 0)} sähkösopimusta
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-emerald-400" />
              <span>{providers.filter((p) => p.greenOptions).length} vihreä vaihtoehto</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#0066FF]" />
              <span>Vastapuoliriski arvioitu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Hae sähköyhtiötä nimellä tai paikkakunnalla..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Type filter */}
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                {(['all', 'national', 'regional', 'challenger'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                      typeFilter === type
                        ? 'bg-[#0066FF] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    {type === 'all'
                      ? 'Kaikki'
                      : TYPE_LABELS[type]}
                  </button>
                ))}
              </div>

              {/* Green toggle */}
              <button
                onClick={() => setGreenOnly(!greenOnly)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                  greenOnly
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                <Leaf className="h-3.5 w-3.5" />
                Vihreä sähkö
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Letter anchors */}
      {letters.length > 1 && (
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-600 hover:bg-[#0066FF] hover:text-white transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Provider grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredProviders.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center sm:px-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-lg font-bold text-slate-700">
              Hakuehdoilla ei löytynyt sähköyhtiöitä
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Kokeile muuttaa hakuehtoja, poistaa suodattimia tai hakea eri nimellä. Hakemistossamme on {providers.length} sähköyhtiötä.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => { setSearch(''); setTypeFilter('all'); setGreenOnly(false); }}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0052CC]"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Nollaa suodattimet
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-slate-500">
              {filteredProviders.length} sähköyhtiötä löytyi
            </p>
            {letters.map((letter) => {
              const letterProviders = filteredProviders.filter(
                (p) => p.name[0].toUpperCase() === letter
              );
              if (letterProviders.length === 0) return null;
              return (
                <div key={letter} id={`letter-${letter}`} className="mb-8">
                  <h2 className="mb-4 text-lg font-bold text-slate-300">{letter}</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {letterProviders.map((provider) => {
                      const cheapest = getCheapestPrice(provider.contracts);
                      const pType = getProviderType(provider.id);
                      const hasGreen = provider.contracts.some((c) => c.greenEnergy);
                      const isHighRisk = provider.counterpartyRisk >= 76;
                      return (
                        <Link
                          key={provider.id}
                          href={`/sahkoyhtiot/${provider.slug}`}
                          className={cn(
                            'group relative rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0066FF]/30 hover:shadow-lg',
                            isHighRisk
                              ? 'border-red-200'
                              : 'border-slate-200'
                          )}
                        >
                          {/* Badges */}
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span
                              className={cn(
                                'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                                pType === 'national'
                                  ? 'bg-blue-100 text-blue-700'
                                  : pType === 'challenger'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-amber-100 text-amber-700'
                              )}
                            >
                              {TYPE_LABELS[pType]}
                            </span>
                            {hasGreen && (
                              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                <Leaf className="h-3 w-3" />
                                Vihreä
                              </span>
                            )}
                            <RiskBadge risk={provider.counterpartyRisk} />
                          </div>

                          {/* Name with logo */}
                          <div className="flex items-center gap-3">
                            <ProviderLogo name={provider.name} slug={provider.slug} size="md" />
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                              {provider.name}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                            {provider.description}
                          </p>

                          {/* Stats */}
                          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              {provider.contracts.length} sopimusta
                            </div>
                            {provider.headquarters && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {provider.headquarters}
                              </div>
                            )}
                            {provider.customerCount && (
                              <div className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" />
                                {provider.customerCount}
                              </div>
                            )}
                          </div>

                          {/* Price */}
                          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                            <div className="text-xs text-slate-400">
                              {provider.contracts.some((c) => c.type === 'fixed')
                                ? 'Kiinteä alk.'
                                : 'Marginaali alk.'}
                            </div>
                            <div className="text-lg font-bold text-[#0066FF]">
                              {cheapest < 1
                                ? `${cheapest.toFixed(2)} c/kWh`
                                : `${cheapest.toFixed(2)} c/kWh`}
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-[#0066FF] opacity-0 transition-opacity group-hover:opacity-100">
                            Lue lisää
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#0A1628] to-[#162540] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Vertaa sähkösopimuksia helposti
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Syötä kulutustietosi ja löydä sinulle edullisin sähkösopimus kaikkien yhtiöiden
            tarjonnasta. Vastapuoliriski näytetään jokaiselle yhtiölle.
          </p>
          <Link
            href="/vertailu"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#0052CC]"
          >
            Vertaa sopimuksia
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
