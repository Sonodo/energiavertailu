'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { X, Plus, Search, ChevronDown, Star, Shield, Leaf, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { providers, AVERAGE_SPOT_PRICE } from '@/data/providers';
import { ELECTRICITY_VAT, ELECTRICITY_TAX, AVG_TRANSFER_PRICE } from '@/lib/constants';
import { cn, formatEuros, formatPrice } from '@/lib/utils';
import type { ElectricityContract, ElectricityProvider } from '@/types';

// localStorage key shared with ResultCard
const LS_KEY = 'valitsesahko-rinnakkain';
// Legacy key from the pre-rename days — read once as a migration shim.
const LEGACY_LS_KEY = 'energiavertailu-rinnakkain';

interface FlatContract {
  contract: ElectricityContract;
  provider: ElectricityProvider;
}

function flattenContracts(): FlatContract[] {
  const flat: FlatContract[] = [];
  for (const provider of providers) {
    for (const contract of provider.contracts) {
      flat.push({ contract, provider });
    }
  }
  return flat;
}

function calculateAnnualCost(
  pricePerKwh: number,
  monthlyFee: number,
  annualKwh: number,
  contractType: string
): number {
  // Match the formula from ResultsList exactly
  let effectivePricePerKwh: number;
  if (contractType === 'spot') {
    effectivePricePerKwh = (AVERAGE_SPOT_PRICE + pricePerKwh) * (1 + ELECTRICITY_VAT);
  } else {
    effectivePricePerKwh = pricePerKwh * (1 + ELECTRICITY_VAT);
  }
  const monthlyFeeInclVAT = monthlyFee * (1 + ELECTRICITY_VAT);
  const annualEnergyCost = (effectivePricePerKwh / 100) * annualKwh + monthlyFeeInclVAT * 12;

  // Transmission cost (use national average)
  const annualTransmissionCost = (AVG_TRANSFER_PRICE / 100) * annualKwh;

  // Electricity tax
  const taxPerKwhInclVAT = ELECTRICITY_TAX * (1 + ELECTRICITY_VAT);
  const annualTaxCost = (taxPerKwhInclVAT / 100) * annualKwh;

  return annualEnergyCost + annualTransmissionCost + annualTaxCost;
}

function getTypeBadge(type: string) {
  switch (type) {
    case 'spot':
      return { label: 'Pörssi', color: 'bg-blue-100 text-blue-700' };
    case 'fixed':
      return { label: 'Kiinteä', color: 'bg-purple-100 text-purple-700' };
    case 'open-ended':
      return { label: 'Toistaiseksi', color: 'bg-amber-100 text-amber-700' };
    default:
      return { label: type, color: 'bg-slate-100 text-slate-700' };
  }
}

function getRiskBadge(risk: number) {
  if (risk <= 10) return { label: 'Erittäin vakaa', color: 'bg-emerald-100 text-emerald-800' };
  if (risk <= 25) return { label: 'Vakaa', color: 'bg-green-100 text-green-700' };
  if (risk <= 50) return { label: 'Kohtalainen', color: 'bg-amber-100 text-amber-700' };
  if (risk <= 75) return { label: 'Kohonnut riski', color: 'bg-orange-100 text-orange-700' };
  return { label: 'Korkea riski', color: 'bg-red-200 text-red-800' };
}

function getDurationLabel(months?: number): string {
  if (!months) return '-';
  return `${months} kk`;
}

// --- Searchable contract selector ---

function ContractSelector({
  allContracts,
  selectedIds,
  onSelect,
}: {
  allContracts: FlatContract[];
  selectedIds: string[];
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return allContracts.filter((fc) => {
      if (selectedIds.includes(fc.contract.id)) return false;
      if (!q) return true;
      return (
        fc.provider.name.toLowerCase().includes(q) ||
        fc.contract.name.toLowerCase().includes(q)
      );
    });
  }, [query, allContracts, selectedIds]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm shadow-sm transition-colors hover:border-slate-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <Plus className="h-4 w-4 text-accent" />
        <span className="text-slate-500">Lisää sopimus vertailuun...</span>
        <ChevronDown className={cn('ml-auto h-4 w-4 text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          {/* Search input */}
          <div className="border-b border-slate-100 p-2">
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Hae yhtiön tai sopimuksen nimellä..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                autoFocus
              />
            </div>
          </div>
          {/* Options */}
          <div className="max-h-64 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-slate-400">
                Ei tuloksia
              </div>
            ) : (
              filtered.map((fc) => {
                const badge = getTypeBadge(fc.contract.type);
                return (
                  <button
                    key={fc.contract.id}
                    onClick={() => {
                      onSelect(fc.contract.id);
                      setOpen(false);
                      setQuery('');
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-50"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                      {fc.provider.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {fc.contract.name}
                      </p>
                      <p className="text-xs text-slate-500">{fc.provider.name}</p>
                    </div>
                    <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold', badge.color)}>
                      {badge.label}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Comparison row helper: highlight best value ---

interface RowDef {
  label: string;
  values: string[];
  rawValues?: number[];
  bestMode?: 'lowest' | 'highest' | 'none';
}

function ComparisonRow({ row, count }: { row: RowDef; count: number }) {
  let bestIdx = -1;
  if (row.rawValues && row.bestMode && row.bestMode !== 'none' && row.rawValues.length > 1) {
    if (row.bestMode === 'lowest') {
      let minVal = Infinity;
      row.rawValues.forEach((v, i) => {
        if (v < minVal) { minVal = v; bestIdx = i; }
      });
    } else if (row.bestMode === 'highest') {
      let maxVal = -Infinity;
      row.rawValues.forEach((v, i) => {
        if (v > maxVal) { maxVal = v; bestIdx = i; }
      });
    }
    // If all values are equal, don't highlight any
    const allEqual = row.rawValues.every((v) => v === row.rawValues![0]);
    if (allEqual) bestIdx = -1;
  }

  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-600">
        {row.label}
      </td>
      {row.values.map((val, i) => (
        <td
          key={i}
          className={cn(
            'px-4 py-3 text-sm font-medium text-slate-900',
            i === bestIdx && 'bg-emerald-50 text-emerald-700'
          )}
        >
          {val}
        </td>
      ))}
      {/* Pad empty columns if less than max */}
      {Array.from({ length: 3 - count }).map((_, i) => (
        <td key={`empty-${i}`} className="px-4 py-3" />
      ))}
    </tr>
  );
}

// --- Mobile card for a single contract ---

function MobileComparisonCard({
  fc,
  allFcs,
  onRemove,
}: {
  fc: FlatContract;
  allFcs: FlatContract[];
  onRemove: (id: string) => void;
}) {
  const { contract, provider } = fc;
  const badge = getTypeBadge(contract.type);
  const riskBadge = getRiskBadge(provider.counterpartyRisk);
  const consumptionLevels = [2000, 5000, 10000, 20000];

  // Find best cost at each level across all selected contracts
  const bestCosts = consumptionLevels.map((kwh) => {
    const costs = allFcs.map((f) =>
      calculateAnnualCost(f.contract.pricePerKwh, f.contract.monthlyFee, kwh, f.contract.type)
    );
    return Math.min(...costs);
  });

  const rows: { label: string; value: string; isBest?: boolean }[] = [
    { label: 'Yhtiö', value: provider.name },
    { label: 'Sopimus', value: contract.name },
    { label: 'Tyyppi', value: badge.label },
    {
      label: 'Energia',
      value: contract.type === 'spot'
        ? `spot + ${formatPrice(contract.pricePerKwh, 2)}`
        : formatPrice(contract.pricePerKwh, 2),
    },
    { label: 'Perusmaksu', value: `${formatEuros(contract.monthlyFee)}/kk` },
    { label: 'Sopimuksen kesto', value: getDurationLabel(contract.contractLength) },
    { label: 'Vihreä sähkö', value: contract.greenEnergy ? 'Kyllä' : 'Ei' },
    { label: 'Vastapuoliriski', value: `${riskBadge.label} (${provider.counterpartyRisk}%)` },
    ...consumptionLevels.map((kwh, i) => {
      const cost = calculateAnnualCost(contract.pricePerKwh, contract.monthlyFee, kwh, contract.type);
      return {
        label: `@ ${kwh.toLocaleString('fi-FI')} kWh/v`,
        value: formatEuros(cost, 0),
        isBest: allFcs.length > 1 && Math.abs(cost - bestCosts[i]) < 0.01,
      };
    }),
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
            {provider.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs text-slate-500">{provider.name}</p>
            <p className="text-sm font-bold text-slate-900">{contract.name}</p>
          </div>
        </div>
        <button
          onClick={() => onRemove(contract.id)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Poista vertailusta"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {/* Rows */}
      <div className="divide-y divide-slate-50">
        {rows.map((row) => (
          <div
            key={row.label}
            className={cn(
              'flex items-center justify-between px-4 py-2.5',
              row.isBest && 'bg-emerald-50'
            )}
          >
            <span className="text-xs text-slate-500">{row.label}</span>
            <span className={cn('text-sm font-medium', row.isBest ? 'text-emerald-700' : 'text-slate-900')}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main page component ---

export default function RinnakkainPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const allContracts = useMemo(() => flattenContracts(), []);

  // Hydrate from localStorage (with one-time migration from legacy key)
  useEffect(() => {
    try {
      let stored = localStorage.getItem(LS_KEY);
      if (!stored) {
        const legacy = localStorage.getItem(LEGACY_LS_KEY);
        if (legacy) {
          stored = legacy;
          localStorage.setItem(LS_KEY, legacy);
          localStorage.removeItem(LEGACY_LS_KEY);
        }
      }
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        // Validate that ids actually exist
        const validIds = ids.filter((id) => allContracts.some((fc) => fc.contract.id === id));
        setSelectedIds(validIds.slice(0, 3));
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [allContracts]);

  // Persist to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(LS_KEY, JSON.stringify(selectedIds));
    }
  }, [selectedIds, hydrated]);

  const selectedContracts: FlatContract[] = useMemo(() => {
    return selectedIds
      .map((id) => allContracts.find((fc) => fc.contract.id === id))
      .filter(Boolean) as FlatContract[];
  }, [selectedIds, allContracts]);

  function addContract(id: string) {
    if (selectedIds.length >= 3) return;
    if (selectedIds.includes(id)) return;
    setSelectedIds((prev) => [...prev, id]);
  }

  function removeContract(id: string) {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }

  // Consumption levels for cost comparison
  const consumptionLevels = [2000, 5000, 10000, 20000];

  // Build rows for desktop table
  const tableRows: RowDef[] = useMemo(() => {
    if (selectedContracts.length === 0) return [];

    const rows: RowDef[] = [
      {
        label: 'Yhtiö',
        values: selectedContracts.map((fc) => fc.provider.name),
        bestMode: 'none',
      },
      {
        label: 'Sopimus',
        values: selectedContracts.map((fc) => fc.contract.name),
        bestMode: 'none',
      },
      {
        label: 'Tyyppi',
        values: selectedContracts.map((fc) => getTypeBadge(fc.contract.type).label),
        bestMode: 'none',
      },
      {
        label: 'Energia',
        values: selectedContracts.map((fc) =>
          fc.contract.type === 'spot'
            ? `spot + ${formatPrice(fc.contract.pricePerKwh, 2)}`
            : formatPrice(fc.contract.pricePerKwh, 2)
        ),
        rawValues: selectedContracts.map((fc) =>
          fc.contract.type === 'spot'
            ? AVERAGE_SPOT_PRICE + fc.contract.pricePerKwh
            : fc.contract.pricePerKwh
        ),
        bestMode: 'lowest',
      },
      {
        label: 'Perusmaksu',
        values: selectedContracts.map((fc) => `${formatEuros(fc.contract.monthlyFee)}/kk`),
        rawValues: selectedContracts.map((fc) => fc.contract.monthlyFee),
        bestMode: 'lowest',
      },
      {
        label: 'Sopimuksen kesto',
        values: selectedContracts.map((fc) => getDurationLabel(fc.contract.contractLength)),
        bestMode: 'none',
      },
      {
        label: 'Vihreä sähkö',
        values: selectedContracts.map((fc) => (fc.contract.greenEnergy ? 'Kyllä' : 'Ei')),
        bestMode: 'none',
      },
      {
        label: 'Vastapuoliriski',
        values: selectedContracts.map((fc) => {
          const rb = getRiskBadge(fc.provider.counterpartyRisk);
          return `${rb.label} (${fc.provider.counterpartyRisk}%)`;
        }),
        rawValues: selectedContracts.map((fc) => fc.provider.counterpartyRisk),
        bestMode: 'lowest',
      },
      ...consumptionLevels.map((kwh) => ({
        label: `Vuosikustannus @ ${kwh.toLocaleString('fi-FI')} kWh`,
        values: selectedContracts.map((fc) =>
          formatEuros(
            calculateAnnualCost(fc.contract.pricePerKwh, fc.contract.monthlyFee, kwh, fc.contract.type),
            0
          )
        ),
        rawValues: selectedContracts.map((fc) =>
          calculateAnnualCost(fc.contract.pricePerKwh, fc.contract.monthlyFee, kwh, fc.contract.type)
        ),
        bestMode: 'lowest' as const,
      })),
    ];

    return rows;
  }, [selectedContracts]);

  // Don't render until hydrated from localStorage
  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex h-48 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-accent" />
            <p className="text-sm text-slate-500">Ladataan vertailua...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/vertailu"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Takaisin vertailuun
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Vertaa sopimuksia rinnakkain
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Valitse 2-3 sopimusta ja vertaa niitä yksityiskohtaisesti vierekkäin.
        </p>
      </div>

      {/* Contract selector */}
      {selectedIds.length < 3 && (
        <div className="mb-6 max-w-md">
          <ContractSelector
            allContracts={allContracts}
            selectedIds={selectedIds}
            onSelect={addContract}
          />
        </div>
      )}

      {/* Selected contract chips */}
      {selectedIds.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {selectedContracts.map((fc) => (
            <div
              key={fc.contract.id}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                {fc.provider.name.charAt(0)}
              </div>
              <span className="font-medium text-slate-700">
                {fc.provider.name} — {fc.contract.name}
              </span>
              <button
                onClick={() => removeContract(fc.contract.id)}
                className="rounded p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label={`Poista ${fc.contract.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {selectedIds.length < 3 && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <Plus className="h-3 w-3" />
              Voit lisätä vielä {3 - selectedIds.length} sopimust{selectedIds.length === 2 ? 'a' : 'a'}
            </span>
          )}
        </div>
      )}

      {/* Empty state */}
      {selectedContracts.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <p className="text-lg font-medium text-slate-500">
            Valitse sopimuksia vertailtavaksi
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Käytä yllä olevaa hakua lisätäksesi sopimuksia, tai lisää sopimuksia vertailuun sopimuslistalta.
          </p>
        </div>
      )}

      {/* Desktop comparison table */}
      {selectedContracts.length > 0 && (
        <>
          {/* Desktop: table layout */}
          <div className="hidden md:block">
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Ominaisuus
                    </th>
                    {selectedContracts.map((fc) => (
                      <th key={fc.contract.id} className="px-4 py-3 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-xs text-slate-500">{fc.provider.name}</p>
                            <p className="text-sm font-bold text-slate-900">{fc.contract.name}</p>
                          </div>
                          <button
                            onClick={() => removeContract(fc.contract.id)}
                            className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                            aria-label={`Poista ${fc.contract.name}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                    {/* Empty column headers for padding */}
                    {Array.from({ length: 3 - selectedContracts.length }).map((_, i) => (
                      <th key={`empty-${i}`} className="px-4 py-3" />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <ComparisonRow key={row.label} row={row} count={selectedContracts.length} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile: stacked cards */}
          <div className="space-y-4 md:hidden">
            {selectedContracts.map((fc) => (
              <MobileComparisonCard
                key={fc.contract.id}
                fc={fc}
                allFcs={selectedContracts}
                onRemove={removeContract}
              />
            ))}
          </div>
        </>
      )}

      {/* Spot price note */}
      {selectedContracts.length > 0 && (
        <div className="mt-6 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
          <strong>Huom:</strong> Pörssisähkön kustannusarviot perustuvat keskihintaan{' '}
          {AVERAGE_SPOT_PRICE.toFixed(1)} c/kWh (alv 0 %). Todellinen hinta vaihtelee tunneittain.
          Vuosikustannukset sisältävät energian, siirtomaksun (keskimäärin {AVG_TRANSFER_PRICE} c/kWh),
          sähköveron ja ALV {(ELECTRICITY_VAT * 100).toFixed(1)} %.
        </div>
      )}
    </div>
  );
}
