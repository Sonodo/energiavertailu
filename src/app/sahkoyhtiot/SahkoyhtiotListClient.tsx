'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Leaf,
  FileText,
  ChevronRight,
  SlidersHorizontal,
  MapPin,
  Users,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ProviderLogo from '@/components/ui/ProviderLogo';

type ProviderType = 'all' | 'national' | 'regional' | 'challenger';

export interface SahkoyhtiotListProvider {
  id: string;
  name: string;
  slug: string;
  description: string;
  headquarters?: string;
  customerCount?: string;
  counterpartyRisk: number;
  greenOptions: boolean;
  type: 'national' | 'regional' | 'challenger';
  contractCount: number;
  hasGreenContract: boolean;
  hasFixedContract: boolean;
  cheapestPrice: number;
}

const TYPE_LABELS: Record<string, string> = {
  national: 'Valtakunnallinen',
  regional: 'Alueellinen',
  challenger: 'Haastaja',
};

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

interface SahkoyhtiotListClientProps {
  providers: SahkoyhtiotListProvider[];
}

export default function SahkoyhtiotListClient({ providers }: SahkoyhtiotListClientProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ProviderType>('all');
  const [greenOnly, setGreenOnly] = useState(false);

  const filteredProviders = useMemo(() => {
    let result = [...providers];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.headquarters?.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== 'all') {
      result = result.filter((p) => p.type === typeFilter);
    }

    if (greenOnly) {
      result = result.filter((p) => p.greenOptions);
    }

    result.sort((a, b) => a.name.localeCompare(b.name, 'fi'));
    return result;
  }, [search, typeFilter, greenOnly, providers]);

  const letters = useMemo(() => {
    const letterSet = new Set(filteredProviders.map((p) => p.name[0].toUpperCase()));
    return Array.from(letterSet).sort((a, b) => a.localeCompare(b, 'fi'));
  }, [filteredProviders]);

  return (
    <>
      {/* Filters */}
      <section className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Hae sähköyhtiötä nimellä tai paikkakunnalla..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                {(['all', 'national', 'regional', 'challenger'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                      typeFilter === type
                        ? 'bg-accent text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    {type === 'all' ? 'Kaikki' : TYPE_LABELS[type]}
                  </button>
                ))}
              </div>

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

      {letters.length > 1 && (
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-600 hover:bg-accent hover:text-white transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      )}

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
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
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
                      const isHighRisk = provider.counterpartyRisk >= 76;
                      return (
                        <Link
                          key={provider.id}
                          href={`/sahkoyhtiot/${provider.slug}`}
                          className={cn(
                            'group relative rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg',
                            isHighRisk
                              ? 'border-red-200'
                              : 'border-slate-200'
                          )}
                        >
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span
                              className={cn(
                                'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                                provider.type === 'national'
                                  ? 'bg-blue-100 text-blue-700'
                                  : provider.type === 'challenger'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-amber-100 text-amber-700'
                              )}
                            >
                              {TYPE_LABELS[provider.type]}
                            </span>
                            {provider.hasGreenContract && (
                              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                <Leaf className="h-3 w-3" />
                                Vihreä
                              </span>
                            )}
                            <RiskBadge risk={provider.counterpartyRisk} />
                          </div>

                          <div className="flex items-center gap-3">
                            <ProviderLogo name={provider.name} slug={provider.slug} size="md" />
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-accent transition-colors">
                              {provider.name}
                            </h3>
                          </div>

                          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                            {provider.description}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5" />
                              {provider.contractCount} sopimusta
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

                          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                            <div className="text-xs text-slate-400">
                              {provider.hasFixedContract ? 'Kiinteä alk.' : 'Marginaali alk.'}
                            </div>
                            <div className="text-lg font-bold text-accent">
                              {provider.cheapestPrice.toFixed(2)} c/kWh
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
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
    </>
  );
}
