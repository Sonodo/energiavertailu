'use client';

/**
 * DirectResults — Check24-style immediate-results page.
 *
 * The user lands here from the homepage "Vertaa sähkösopimukset" CTA and
 * sees ranked contracts instantly with sensible defaults (5000 kWh/v,
 * Uusimaa, kaikki sopimustyypit). Criteria live in a sticky bar at the
 * top and are editable in place — every change re-ranks client-side
 * and updates URL query params so the view is shareable.
 *
 * Ranking is objective:
 *   - default sort = cheapest 12-month cost (spot uses AVERAGE_SPOT_PRICE baseline)
 *   - "pisin sopimuskausi" → longest contract length first (36 kk beats 24 kk beats …)
 *   - "luotettavin" → lowest counterparty risk
 *
 * Commission is NEVER a ranking input (fair-ranking policy).
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Leaf,
  SlidersHorizontal,
} from 'lucide-react';
import { providers, AVERAGE_SPOT_PRICE } from '@/data/providers';
import { regions } from '@/data/regions';
import { ELECTRICITY_VAT, ELECTRICITY_TAX } from '@/lib/constants';
import { cn } from '@/lib/utils';
import ResultCard from './ResultCard';
import UpdateTimestamp from '@/components/ui/UpdateTimestamp';
import ComparisonFloatingBar from './ComparisonFloatingBar';
import type { ComparisonResult, CostBreakdown } from '@/types';
import { trackBeginCompare } from '@/lib/analytics';

/* ── Filter types ─────────────────────────────────────────────────── */

type ContractTypeFilter = 'all' | 'spot' | 'fixed' | 'open-ended';
type DurationOption = 'all' | '6' | '12' | '24' | '36';
type SortOption =
  | 'cheapest'      // cheapest total annual cost
  | 'monthly'       // cheapest monthly estimate
  | 'duration-desc' // longest contract first (pisin sopimuskausi)
  | 'risk';         // lowest counterparty risk

/* ── Parsing helpers ──────────────────────────────────────────────── */

function parseConsumption(v: string | null): number {
  if (!v) return 5000;
  const n = parseInt(v, 10);
  if (isNaN(n) || n < 1000 || n > 40000) return 5000;
  return n;
}

function parseContractType(v: string | null): ContractTypeFilter {
  if (v === 'spot' || v === 'fixed' || v === 'open-ended' || v === 'all') return v;
  // Legacy: 'kiintea' / 'yhdistelma' aliases from older homepage links
  if (v === 'kiintea') return 'fixed';
  return 'all';
}

function parseDuration(v: string | null): DurationOption {
  if (v === '6' || v === '12' || v === '24' || v === '36' || v === 'all') return v;
  return 'all';
}

function parseSort(v: string | null): SortOption {
  if (
    v === 'cheapest' ||
    v === 'monthly' ||
    v === 'duration-desc' ||
    v === 'risk'
  ) {
    return v;
  }
  return 'cheapest';
}

function parseRegion(v: string | null): string {
  if (v && regions.some((r) => r.id === v)) return v;
  return 'uusimaa';
}

/* ── Cost calculation (identical formula to legacy ResultsList) ──── */

function calculateCost(
  pricePerKwh: number,
  monthlyFee: number,
  annualKwh: number,
  contractType: string,
  transferPriceCentsPerKwh: number
): { annualCost: number; monthlyCost: number; breakdown: CostBreakdown } {
  let effectivePricePerKwh: number;
  if (contractType === 'spot') {
    effectivePricePerKwh = (AVERAGE_SPOT_PRICE + pricePerKwh) * (1 + ELECTRICITY_VAT);
  } else {
    effectivePricePerKwh = pricePerKwh * (1 + ELECTRICITY_VAT);
  }
  const monthlyFeeInclVAT = monthlyFee * (1 + ELECTRICITY_VAT);
  const annualEnergyCost = (effectivePricePerKwh / 100) * annualKwh + monthlyFeeInclVAT * 12;
  const annualTransmissionCost = (transferPriceCentsPerKwh / 100) * annualKwh;
  const taxPerKwhInclVAT = ELECTRICITY_TAX * (1 + ELECTRICITY_VAT);
  const annualTaxCost = (taxPerKwhInclVAT / 100) * annualKwh;
  const totalCost = annualEnergyCost + annualTransmissionCost + annualTaxCost;
  return {
    annualCost: totalCost,
    monthlyCost: totalCost / 12,
    breakdown: {
      energyCost: annualEnergyCost,
      transmissionCost: annualTransmissionCost,
      taxCost: annualTaxCost,
      totalCost,
    },
  };
}

/* ── UI constants ─────────────────────────────────────────────────── */

const contractTypeTabs: { id: ContractTypeFilter; label: string }[] = [
  { id: 'all', label: 'Kaikki' },
  { id: 'spot', label: 'Pörssi' },
  { id: 'fixed', label: 'Kiinteä' },
  { id: 'open-ended', label: 'Toistaiseksi' },
];

const durationOptions: { id: DurationOption; label: string }[] = [
  { id: 'all', label: 'Kaikki' },
  { id: '12', label: '12 kk' },
  { id: '24', label: '24 kk' },
  { id: '36', label: '36 kk' },
];

const sortOptions: { id: SortOption; label: string }[] = [
  { id: 'cheapest', label: 'Halvin kokonaishinta' },
  { id: 'monthly', label: 'Halvin /kk' },
  { id: 'duration-desc', label: 'Pisin sopimuskausi' },
  { id: 'risk', label: 'Luotettavin ensin' },
];

const consumptionPresets = [
  { kwh: 2000, label: 'Kerrostalo' },
  { kwh: 5000, label: 'Rivitalo' },
  { kwh: 7000, label: 'Omakotitalo' },
  { kwh: 18000, label: 'Sähkölämmitys' },
];

/* ── Main component ───────────────────────────────────────────────── */

export default function DirectResults() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [consumption, setConsumption] = useState(() =>
    parseConsumption(searchParams.get('kulutus'))
  );
  const [region, setRegion] = useState(() => parseRegion(searchParams.get('alue')));
  const [contractType, setContractType] = useState<ContractTypeFilter>(() =>
    parseContractType(searchParams.get('sopimus') ?? searchParams.get('tyyppi'))
  );
  const [duration, setDuration] = useState<DurationOption>(() =>
    parseDuration(searchParams.get('kesto'))
  );
  const [greenOnly, setGreenOnly] = useState(() => searchParams.get('vihrea') === '1');
  const [showShortTerm, setShowShortTerm] = useState(() => searchParams.get('lyhyet') === '1');
  const [sortBy, setSortBy] = useState<SortOption>(() => parseSort(searchParams.get('jarjestys')));

  /* ── URL sync (state = URL query params) ──────────────────────── */

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    params.set('kulutus', String(consumption));
    params.set('alue', region);
    if (contractType !== 'all') params.set('sopimus', contractType);
    if (duration !== 'all') params.set('kesto', duration);
    if (greenOnly) params.set('vihrea', '1');
    if (showShortTerm) params.set('lyhyet', '1');
    if (sortBy !== 'cheapest') params.set('jarjestys', sortBy);
    router.replace(`/vertailu?${params.toString()}`, { scroll: false });
  }, [router, consumption, region, contractType, duration, greenOnly, showShortTerm, sortBy]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  // Fire analytics once on mount
  useEffect(() => {
    trackBeginCompare({
      housing_type: 'direct',
      consumption,
      region,
      contract_type: contractType,
      sort_by: sortBy,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Compute + rank results ───────────────────────────────────── */

  const selectedRegion = regions.find((r) => r.id === region) ?? regions[0];

  const results = useMemo<ComparisonResult[]>(() => {
    const all: ComparisonResult[] = [];

    for (const provider of providers) {
      for (const contract of provider.contracts) {
        if (contractType !== 'all' && contract.type !== contractType) continue;

        if (duration !== 'all') {
          const target = parseInt(duration, 10);
          // Only fixed-term contracts carry a length; non-fixed filtered out when a specific length requested
          if (contract.type !== 'fixed') continue;
          if ((contract.contractLength ?? 0) !== target) continue;
        }

        // 6 kk and 18 kk contracts are hidden unless explicitly opted in
        // via the "Näytä myös 6 kk ja 18 kk sopimukset" toggle. They also
        // never rank above longer contracts — enforced by a stable
        // secondary sort below.
        if (!showShortTerm) {
          if (contract.contractLength === 6 || contract.contractLength === 18) continue;
        }

        if (greenOnly && !contract.greenEnergy) continue;

        const { annualCost, monthlyCost, breakdown } = calculateCost(
          contract.pricePerKwh,
          contract.monthlyFee,
          consumption,
          contract.type,
          selectedRegion.transferPrice
        );

        all.push({
          contract,
          provider,
          annualCost,
          monthlyCost,
          savingsVsAverage: 0,
          breakdown,
        });
      }
    }

    // Sort — purely objective criteria, no commission weighting
    if (sortBy === 'cheapest') {
      all.sort((a, b) => a.annualCost - b.annualCost);
    } else if (sortBy === 'monthly') {
      all.sort((a, b) => a.monthlyCost - b.monthlyCost);
    } else if (sortBy === 'duration-desc') {
      // Longest contract length first; non-fixed treated as 0; ties broken by cheapest
      all.sort((a, b) => {
        const la = a.contract.type === 'fixed' ? a.contract.contractLength ?? 0 : 0;
        const lb = b.contract.type === 'fixed' ? b.contract.contractLength ?? 0 : 0;
        if (lb !== la) return lb - la;
        return a.annualCost - b.annualCost;
      });
    } else if (sortBy === 'risk') {
      all.sort((a, b) => {
        if (a.provider.counterpartyRisk !== b.provider.counterpartyRisk) {
          return a.provider.counterpartyRisk - b.provider.counterpartyRisk;
        }
        return a.annualCost - b.annualCost;
      });
    }

    // Stable secondary sort: 6 kk and 18 kk contracts always rank last,
    // regardless of the primary sort. Array.prototype.sort is stable in
    // modern V8, so contracts within each group preserve their primary
    // order. Applied after the sort above so e.g. a cheap 6 kk offer
    // never appears above a more expensive 12 kk offer.
    all.sort((a, b) => {
      const aShort = a.contract.contractLength === 6 || a.contract.contractLength === 18 ? 1 : 0;
      const bShort = b.contract.contractLength === 6 || b.contract.contractLength === 18 ? 1 : 0;
      if (aShort !== bShort) return aShort - bShort;
      return 0;
    });

    if (all.length > 0) {
      const avgCost = all.reduce((sum, r) => sum + r.annualCost, 0) / all.length;
      for (const r of all) r.savingsVsAverage = avgCost - r.annualCost;
    }

    return all;
  }, [consumption, selectedRegion, contractType, duration, greenOnly, showShortTerm, sortBy]);

  const mostExpensiveCost = results.length > 0 ? results[results.length - 1].annualCost : 0;

  /* ── Market fact panel ──
   * Neutral, fact-first summary of contract-length availability across
   * the entire provider dataset (not affected by filters). Reads as a
   * data snapshot — no brand names, no marketing copy, no CTAs. Users
   * still surface specific offers via the normal ranked list.
   */
  const contractLengthSummary = useMemo(() => {
    let openEnded = 0;
    const byLength = new Map<number, number>();
    for (const provider of providers) {
      for (const contract of provider.contracts) {
        if (contract.type === 'spot' || contract.type === 'open-ended') {
          openEnded += 1;
          continue;
        }
        if (contract.type === 'fixed') {
          const len = contract.contractLength ?? 0;
          if (!len) continue;
          byLength.set(len, (byLength.get(len) ?? 0) + 1);
        }
      }
    }
    // Sorted: open-ended first, then fixed by ascending length
    const fixedRows = Array.from(byLength.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([len, count]) => ({ label: `${len} kk`, count }));
    return {
      openEnded,
      fixedRows,
    };
  }, []);

  /* ── Render ───────────────────────────────────────────────────── */

  return (
    <div className="pb-16">
      {/* Page header */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
          Sähkösopimusten vertailu
        </h1>
        <p className="mt-2 text-slate-600">
          {results.length} sopimusta kulutuksellasi {consumption.toLocaleString('fi-FI')} kWh/v —{' '}
          <span className="font-medium text-slate-700">
            {selectedRegion.name}
          </span>
        </p>
        <UpdateTimestamp className="mt-1" />
      </div>

      {/* Sticky criteria bar ── edit in place, no reloads */}
      <div className="sticky top-0 z-30 mt-4 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end gap-4">
            {/* Consumption slider */}
            <div className="min-w-[200px] flex-1">
              <label htmlFor="kulutus" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Kulutus {consumption.toLocaleString('fi-FI')} kWh/v
              </label>
              <input
                id="kulutus"
                type="range"
                min={1000}
                max={40000}
                step={500}
                value={consumption}
                onChange={(e) => setConsumption(parseInt(e.target.value, 10))}
                className="mt-2 w-full accent-accent"
              />
              <div className="mt-1 flex gap-2">
                {consumptionPresets.map((p) => (
                  <button
                    key={p.kwh}
                    type="button"
                    onClick={() => setConsumption(p.kwh)}
                    className={cn(
                      'rounded-full border px-2 py-0.5 text-[11px] font-medium transition',
                      consumption === p.kwh
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-slate-200 text-slate-500 hover:border-accent/40 hover:text-slate-700'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Region */}
            <div className="min-w-[180px]">
              <label htmlFor="alue" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Alue
              </label>
              <select
                id="alue"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:border-accent focus:outline-none"
              >
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="min-w-[200px]">
              <label htmlFor="jarjestys" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Järjestys
              </label>
              <select
                id="jarjestys"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:border-accent focus:outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: contract type + duration + green */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              {contractTypeTabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setContractType(t.id)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-semibold transition',
                    contractType === t.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1">
              <span className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Kesto</span>
              {durationOptions.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDuration(d.id)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-semibold transition',
                    duration === d.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={greenOnly}
                onChange={(e) => setGreenOnly(e.target.checked)}
                className="h-4 w-4 accent-emerald-500"
              />
              <Leaf className="h-4 w-4 text-emerald-500" />
              <span className="font-medium">Vain vihreä sähkö</span>
            </label>

            <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={showShortTerm}
                onChange={(e) => setShowShortTerm(e.target.checked)}
                className="h-3.5 w-3.5 accent-slate-500"
              />
              <span>Näytä myös 6 kk ja 18 kk sopimukset</span>
            </label>

            {(contractType !== 'all' || duration !== 'all' || greenOnly || showShortTerm || sortBy !== 'cheapest') && (
              <button
                type="button"
                onClick={() => {
                  setContractType('all');
                  setDuration('all');
                  setGreenOnly(false);
                  setShowShortTerm(false);
                  setSortBy('cheapest');
                }}
                className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Nollaa suodattimet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Market fact panel — neutral snapshot of contract-length availability */}
      <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6 lg:px-8">
        <MarketFactPanel
          openEnded={contractLengthSummary.openEnded}
          fixedRows={contractLengthSummary.fixedRows}
        />
      </div>

      {/* Results list */}
      <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6 lg:px-8">
        {results.length === 0 ? (
          <EmptyState
            onReset={() => {
              setContractType('all');
              setDuration('all');
              setGreenOnly(false);
              setShowShortTerm(false);
            }}
          />
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={result.contract.id}
                className="animate-fade-in-up opacity-0"
                style={{
                  animationDelay: `${Math.min(index * 0.03, 0.3)}s`,
                  animationFillMode: 'forwards',
                }}
              >
                <ResultCard
                  result={result}
                  rank={index + 1}
                  savingsVsMostExpensive={mostExpensiveCost - result.annualCost}
                  consumption={consumption}
                  transferPrice={selectedRegion.transferPrice}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <ComparisonFloatingBar />
    </div>
  );
}

/* ── Market fact panel ───────────────────────────────────────────── */

function MarketFactPanel({
  openEnded,
  fixedRows,
}: {
  openEnded: number;
  fixedRows: { label: string; count: number }[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 sm:px-5 sm:py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Sopimuskaudet markkinoilla
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Kaikkien vertailussa olevien kiinteähintaisten määräaikaisten ja toistaiseksi voimassa olevien sopimusten lukumäärät.
          </p>
        </div>
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-slate-700 sm:grid-cols-3 md:grid-cols-5">
        <li className="flex items-baseline justify-between gap-2">
          <span className="text-slate-600">Toistaiseksi / pörssi</span>
          <span className="font-semibold text-slate-900 tabular-nums">{openEnded}</span>
        </li>
        {fixedRows.map((row) => (
          <li key={row.label} className="flex items-baseline justify-between gap-2">
            <span className="text-slate-600">{row.label}</span>
            <span className="font-semibold text-slate-900 tabular-nums">{row.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────────────── */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <h3 className="text-lg font-bold text-slate-700">
        Ei sopimuksia valituilla ehdoilla
      </h3>
      <p className="mt-2 text-sm text-slate-500">
        Kokeile laajentaa suodattimia — esimerkiksi vaihtaa kesto &laquo;kaikki&raquo; tai poistaa vihreän sähkön rajaus.
      </p>
      <button
        onClick={onReset}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-accent-700"
      >
        Näytä kaikki sopimukset
      </button>
    </div>
  );
}
