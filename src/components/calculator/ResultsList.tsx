'use client';

import { useMemo } from 'react';
import { ArrowLeft, SlidersHorizontal, Printer, SearchX, Leaf, RotateCcw, ExternalLink } from 'lucide-react';
import { providers, AVERAGE_SPOT_PRICE } from '@/data/providers';
import { regions } from '@/data/regions';
import { ELECTRICITY_VAT, ELECTRICITY_TAX } from '@/lib/constants';
import { formatEuros } from '@/lib/utils';
import { ComparisonResult, CostBreakdown } from '@/types';
import type { ContractTypeFilter, DurationOption, SortOption, AdvancedFilters } from './PreferencesStep';
import { defaultAdvancedFilters } from './PreferencesStep';
import ComparisonSummary from './ComparisonSummary';
import ResultCard from './ResultCard';
import ComparisonFloatingBar from './ComparisonFloatingBar';
import ShareButton from '@/components/ui/ShareButton';
import BookmarkedContracts from './BookmarkedContracts';
import UpdateTimestamp from '@/components/ui/UpdateTimestamp';

interface ResultsListProps {
  consumption: number;
  region: string;
  contractType: ContractTypeFilter;
  selectedDurations: DurationOption[];
  greenOnly: boolean;
  sortBy: SortOption;
  advancedFilters: AdvancedFilters;
  onBack: () => void;
  onReset: () => void;
}

function calculateCost(
  pricePerKwh: number,
  monthlyFee: number,
  annualKwh: number,
  contractType: string,
  transferPriceCentsPerKwh: number
): { annualCost: number; monthlyCost: number; breakdown: CostBreakdown } {
  // 1. Energy cost
  let effectivePricePerKwh: number;
  if (contractType === 'spot') {
    // Spot: average spot price + margin, then add VAT
    effectivePricePerKwh = (AVERAGE_SPOT_PRICE + pricePerKwh) * (1 + ELECTRICITY_VAT);
  } else {
    // Fixed/open-ended: stated price already in c/kWh, add VAT
    effectivePricePerKwh = pricePerKwh * (1 + ELECTRICITY_VAT);
  }
  const monthlyFeeInclVAT = monthlyFee * (1 + ELECTRICITY_VAT);
  const annualEnergyCost = (effectivePricePerKwh / 100) * annualKwh + monthlyFeeInclVAT * 12;

  // 2. Transmission cost (siirtomaksu) — transfer price is already incl. tax per the data comments
  const annualTransmissionCost = (transferPriceCentsPerKwh / 100) * annualKwh;

  // 3. Electricity tax (sähkövero) — ELECTRICITY_TAX is excl. VAT, so add VAT
  const taxPerKwhInclVAT = ELECTRICITY_TAX * (1 + ELECTRICITY_VAT);
  const annualTaxCost = (taxPerKwhInclVAT / 100) * annualKwh;

  // 4. Total
  const totalCost = annualEnergyCost + annualTransmissionCost + annualTaxCost;
  const monthlyCost = totalCost / 12;

  return {
    annualCost: totalCost,
    monthlyCost,
    breakdown: {
      energyCost: annualEnergyCost,
      transmissionCost: annualTransmissionCost,
      taxCost: annualTaxCost,
      totalCost,
    },
  };
}

// Build filter-specific relaxation suggestions
function getFilterSuggestions(
  greenOnly: boolean,
  contractType: ContractTypeFilter,
  selectedDurations: DurationOption[],
  advancedFilters: AdvancedFilters
): string[] {
  const suggestions: string[] = [];
  if (greenOnly) {
    suggestions.push("Kokeile poistaa \"Vain vihreä sähkö\" -suodatin");
  }
  if (contractType !== 'all') {
    suggestions.push("Kokeile valita \"Kaikki\" sopimustyypiksi");
  }
  if (!selectedDurations.includes('all') && selectedDurations.length > 0) {
    suggestions.push("Kokeile laajentaa sopimusajan valintaa");
  }
  if (
    advancedFilters.maxMonthlyFee < defaultAdvancedFilters.maxMonthlyFee ||
    advancedFilters.providerTypes.length > 0 ||
    advancedFilters.maxRisk < defaultAdvancedFilters.maxRisk ||
    advancedFilters.minRating > defaultAdvancedFilters.minRating
  ) {
    suggestions.push("Kokeile nollata lisäsuodattimet");
  }
  return suggestions;
}

// Get 3 popular contracts as suggestions
function getPopularContracts(consumption: number, transferPrice: number) {
  // Pick recognizable providers — first spot, first fixed, first green
  const popularIds = ['fortum-tarkka', 'helen-kiintea-12', 'vattenfall-sahko-12'];
  const results: { provider: string; contract: string; monthlyCost: string; type: string; url: string }[] = [];

  for (const provider of providers) {
    for (const contract of provider.contracts) {
      if (popularIds.includes(contract.id) || results.length < 3) {
        if (results.some(r => r.contract === contract.name)) continue;
        const { monthlyCost } = calculateCost(
          contract.pricePerKwh,
          contract.monthlyFee,
          consumption,
          contract.type,
          transferPrice
        );
        results.push({
          provider: provider.name,
          contract: contract.name,
          monthlyCost: formatEuros(monthlyCost),
          type: contract.type,
          url: contract.url,
        });
        if (results.length >= 3) break;
      }
    }
    if (results.length >= 3) break;
  }
  return results;
}

function EmptyState({
  greenOnly,
  contractType,
  selectedDurations,
  advancedFilters,
  consumption,
  transferPrice,
  onReset,
}: {
  greenOnly: boolean;
  contractType: ContractTypeFilter;
  selectedDurations: DurationOption[];
  advancedFilters: AdvancedFilters;
  consumption: number;
  transferPrice: number;
  onReset: () => void;
}) {
  const suggestions = getFilterSuggestions(greenOnly, contractType, selectedDurations, advancedFilters);
  const popularContracts = getPopularContracts(consumption, transferPrice);

  return (
    <div className="mt-8 space-y-6">
      {/* Main empty state */}
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center sm:px-12 sm:py-14">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
          <SearchX className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">
          Ei sopimuksia valituilla hakuehdoilla
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Valitsemillasi suodattimilla ei löytynyt yhtään sopimusta. Kokeile laajentaa hakuehtoja alla olevien vinkkien avulla.
        </p>

        {/* Filter-specific suggestions */}
        {suggestions.length > 0 && (
          <div className="mx-auto mt-6 max-w-md space-y-2">
            {suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-left text-sm text-slate-600 shadow-sm"
              >
                {suggestion.includes("vihreä") ? (
                  <Leaf className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <SlidersHorizontal className="h-4 w-4 shrink-0 text-slate-400" />
                )}
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}

        {/* Reset button */}
        <button
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-[#0052CC] hover:shadow-xl"
        >
          <RotateCcw className="h-4 w-4" />
          Vertaa kaikkia sopimuksia
        </button>
      </div>

      {/* Popular alternatives */}
      {popularContracts.length > 0 && (
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Suosittuja vaihtoehtoja
          </h4>
          <div className="grid gap-3 sm:grid-cols-3">
            {popularContracts.map((pc, i) => (
              <a
                key={i}
                href={pc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-[#0066FF]/30 hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-medium text-slate-500">{pc.provider}</p>
                  <p className="mt-0.5 font-semibold text-slate-900">{pc.contract}</p>
                  <span className="mt-1.5 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {pc.type === 'spot' ? 'Pörssi' : pc.type === 'fixed' ? 'Kiinteä' : 'Toistaiseksi'}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
                  <span className="text-lg font-bold text-[#0066FF]">{pc.monthlyCost}/kk</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0066FF]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsList({
  consumption,
  region,
  contractType,
  selectedDurations,
  greenOnly,
  sortBy,
  advancedFilters,
  onBack,
  onReset,
}: ResultsListProps) {
  const selectedRegion = regions.find((r) => r.id === region) ?? regions[0];

  // Check if 'all' durations selected
  const allDurations = selectedDurations.includes('all');
  const durationValues = allDurations
    ? []
    : selectedDurations.map((d) => parseInt(d, 10));

  const results = useMemo<ComparisonResult[]>(() => {
    const allResults: ComparisonResult[] = [];

    for (const provider of providers) {
      // Advanced filter: provider type
      if (advancedFilters.providerTypes.length > 0) {
        const providerType = provider.type ?? 'national';
        if (!advancedFilters.providerTypes.includes(providerType)) continue;
      }

      // Advanced filter: max counterparty risk
      if (advancedFilters.maxRisk < 100) {
        if (provider.counterpartyRisk > advancedFilters.maxRisk) continue;
      }

      for (const contract of provider.contracts) {
        // Filter by contract type
        if (contractType !== 'all' && contract.type !== contractType) continue;

        // Filter by duration (multi-select, only for fixed contracts)
        if (!allDurations && durationValues.length > 0) {
          if (contract.type === 'fixed' && !durationValues.includes(contract.contractLength ?? 0)) continue;
          // When contractType is 'fixed', enforce duration filter strictly
          if (contractType === 'fixed' && !durationValues.includes(contract.contractLength ?? 0)) continue;
        }

        // Filter green energy
        if (greenOnly && !contract.greenEnergy) continue;

        // Advanced filter: max monthly fee
        if (advancedFilters.maxMonthlyFee < 10) {
          if (contract.monthlyFee > advancedFilters.maxMonthlyFee) continue;
        }

        const { annualCost, monthlyCost, breakdown } = calculateCost(
          contract.pricePerKwh,
          contract.monthlyFee,
          consumption,
          contract.type,
          selectedRegion.transferPrice
        );

        allResults.push({
          contract,
          provider,
          annualCost,
          monthlyCost,
          savingsVsAverage: 0, // Calculated below
          breakdown,
        });
      }
    }

    // Sort
    if (sortBy === 'cheapest') {
      allResults.sort((a, b) => a.annualCost - b.annualCost);
    } else if (sortBy === 'monthly') {
      allResults.sort((a, b) => a.monthlyCost - b.monthlyCost);
    } else if (sortBy === 'risk') {
      allResults.sort((a, b) => a.provider.counterpartyRisk - b.provider.counterpartyRisk);
    }

    // Calculate savings vs average
    if (allResults.length > 0) {
      const avgCost = allResults.reduce((sum, r) => sum + r.annualCost, 0) / allResults.length;
      for (const r of allResults) {
        r.savingsVsAverage = avgCost - r.annualCost;
      }
    }

    // Calculate recommendation scores
    if (allResults.length > 0) {
      const costs = allResults.map(r => r.annualCost);
      const minCost = Math.min(...costs);
      const maxCost = Math.max(...costs);
      const costRange = maxCost - minCost || 1;

      let bestScore = -1;
      let bestIndex = 0;

      for (let i = 0; i < allResults.length; i++) {
        const r = allResults[i];

        const priceScore = Math.round(((maxCost - r.annualCost) / costRange) * 100);
        const riskScore = Math.round(100 - r.provider.counterpartyRisk);
        const ratingScore = 0; // Rating data removed

        const totalScore = Math.round(
          priceScore * 0.6 + riskScore * 0.4
        );

        r.recommendationScore = totalScore;
        r.scoreBreakdown = { priceScore, riskScore, ratingScore, totalScore };
        r.isRecommended = false;

        if (totalScore > bestScore) {
          bestScore = totalScore;
          bestIndex = i;
        }
      }

      allResults[bestIndex].isRecommended = true;
    }

    return allResults;
  }, [consumption, selectedRegion, contractType, allDurations, durationValues, greenOnly, sortBy, advancedFilters]);

  const mostExpensiveCost = results.length > 0 ? results[results.length - 1].annualCost : 0;
  const recommendedResult = results.find(r => r.isRecommended) ?? null;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            3. Tulokset
          </h2>
          <p className="mt-1 text-slate-600" role="status" aria-live="polite">
            {results.length > 0
              ? `Löytyi ${results.length} sopimusta kulutuksellasi.`
              : 'Ei sopimuksia valituilla kriteereillä.'}
          </p>
          {results.length > 0 && (
            <UpdateTimestamp className="mt-1" />
          )}
        </div>
        <div className="no-print flex gap-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Muokkaa
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Aloita alusta
          </button>
          <button
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            aria-label="Tulosta tulokset"
          >
            <Printer className="h-4 w-4" />
            Tulosta
          </button>
          <ShareButton
            title="Valitse Sähkö — Sähkösopimuksien vertailu"
            text="Katso sähkösopimuksien vertailutulokset"
          />
        </div>
      </div>

      {/* Summary */}
      <ComparisonSummary results={results} consumption={consumption} region={selectedRegion} recommendedResult={recommendedResult} />

      {/* Bookmarked contracts */}
      <BookmarkedContracts />

      {/* Results list */}
      {results.length > 0 ? (
        <div className="mt-6 space-y-4">
          {results.map((result, index) => (
            <div
              key={result.contract.id}
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s`, animationFillMode: 'forwards' }}
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
      ) : (
        <EmptyState
          greenOnly={greenOnly}
          contractType={contractType}
          selectedDurations={selectedDurations}
          advancedFilters={advancedFilters}
          consumption={consumption}
          transferPrice={selectedRegion.transferPrice}
          onReset={onReset}
        />
      )}

      {/* Floating comparison bar */}
      <ComparisonFloatingBar />
    </div>
  );
}
