'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Leaf, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

export type ContractTypeFilter = 'all' | 'spot' | 'fixed' | 'open-ended';
export type DurationOption = 'all' | '6' | '12' | '24' | '36';
export type SortOption = 'cheapest' | 'monthly' | 'rating' | 'risk';
export type ProviderTypeOption = 'national' | 'regional' | 'challenger';

export interface AdvancedFilters {
  maxMonthlyFee: number; // 0-10 €/kk, default 10
  providerTypes: ProviderTypeOption[]; // multi-select, empty = all
  maxRisk: number; // 0-100, default 100
  minRating: number; // 1-5, default 1
}

export const defaultAdvancedFilters: AdvancedFilters = {
  maxMonthlyFee: 10,
  providerTypes: [],
  maxRisk: 100,
  minRating: 1,
};

interface PreferencesStepProps {
  contractType: ContractTypeFilter;
  selectedDurations: DurationOption[];
  greenOnly: boolean;
  sortBy: SortOption;
  advancedFilters: AdvancedFilters;
  onContractTypeChange: (type: ContractTypeFilter) => void;
  onDurationsChange: (durations: DurationOption[]) => void;
  onGreenOnlyChange: (green: boolean) => void;
  onSortByChange: (sort: SortOption) => void;
  onAdvancedFiltersChange: (filters: AdvancedFilters) => void;
  onBack: () => void;
  onNext: () => void;
}

const contractTypes: { id: ContractTypeFilter; label: string }[] = [
  { id: 'all', label: 'Kaikki' },
  { id: 'spot', label: 'Pörssisähkö' },
  { id: 'fixed', label: 'Määräaikainen' },
  { id: 'open-ended', label: 'Toistaiseksi' },
];

const durationOptions: { id: DurationOption; label: string }[] = [
  { id: 'all', label: 'Kaikki' },
  { id: '6', label: '6 kk' },
  { id: '12', label: '12 kk' },
  { id: '24', label: '24 kk' },
  { id: '36', label: '36 kk' },
];

const sortOptions: { id: SortOption; label: string }[] = [
  { id: 'cheapest', label: 'Halvin ensin' },
  { id: 'monthly', label: 'Kuukausihinta' },
  { id: 'rating', label: 'Yhtiön arvosana' },
  { id: 'risk', label: 'Luotettavin ensin' },
];

const providerTypeOptions: { id: ProviderTypeOption; label: string }[] = [
  { id: 'national', label: 'Valtakunnallinen' },
  { id: 'regional', label: 'Alueellinen' },
  { id: 'challenger', label: 'Haastaja' },
];

function countActiveAdvancedFilters(filters: AdvancedFilters): number {
  let count = 0;
  if (filters.maxMonthlyFee < 10) count++;
  if (filters.providerTypes.length > 0) count++;
  if (filters.maxRisk < 100) count++;
  if (filters.minRating > 1) count++;
  return count;
}

export default function PreferencesStep({
  contractType,
  selectedDurations,
  greenOnly,
  sortBy,
  advancedFilters,
  onContractTypeChange,
  onDurationsChange,
  onGreenOnlyChange,
  onSortByChange,
  onAdvancedFiltersChange,
  onBack,
  onNext,
}: PreferencesStepProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const activeFilterCount = countActiveAdvancedFilters(advancedFilters);

  // Duration multi-select logic
  const handleDurationToggle = (id: DurationOption) => {
    if (id === 'all') {
      // Selecting 'all' clears individual selections
      onDurationsChange(['all']);
      return;
    }

    // Toggling an individual option
    const withoutAll = selectedDurations.filter((d) => d !== 'all');

    if (withoutAll.includes(id)) {
      // Deselect this option
      const remaining = withoutAll.filter((d) => d !== id);
      // If nothing left, revert to 'all'
      onDurationsChange(remaining.length > 0 ? remaining : ['all']);
    } else {
      // Select this option, remove 'all' if present
      const allIndividual: DurationOption[] = ['6', '12', '24', '36'];
      const newSelection: DurationOption[] = [...withoutAll, id];
      // If all individual options are selected, simplify to 'all'
      if (allIndividual.every((d) => newSelection.includes(d))) {
        onDurationsChange(['all']);
      } else {
        onDurationsChange(newSelection);
      }
    }
  };

  const isDurationSelected = (id: DurationOption) => {
    if (id === 'all') return selectedDurations.includes('all');
    return selectedDurations.includes(id);
  };

  // Provider type multi-select logic
  const handleProviderTypeToggle = (id: ProviderTypeOption) => {
    const current = advancedFilters.providerTypes;
    if (current.includes(id)) {
      onAdvancedFiltersChange({
        ...advancedFilters,
        providerTypes: current.filter((t) => t !== id),
      });
    } else {
      onAdvancedFiltersChange({
        ...advancedFilters,
        providerTypes: [...current, id],
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          2. Mieltymyksesi
        </h2>
        <p className="mt-1 text-slate-600">
          Rajaa hakutuloksia toiveidesi mukaan.
        </p>
      </div>

      <div className="space-y-6">
        {/* Contract type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Sopimustyyppi
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sopimustyyppi">
            {contractTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onContractTypeChange(type.id)}
                aria-pressed={contractType === type.id}
                className={cn(
                  'min-h-[44px] rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all',
                  contractType === type.id
                    ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration — multi-select, only show for fixed or all contracts */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: (contractType === 'all' || contractType === 'fixed') ? '200px' : '0px',
            opacity: (contractType === 'all' || contractType === 'fixed') ? 1 : 0,
          }}
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Sopimuksen kesto
              <span className="ml-1 text-xs font-normal text-slate-400">(voit valita useita)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {durationOptions.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDurationToggle(d.id)}
                  className={cn(
                    'rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all',
                    isDurationSelected(d.id)
                      ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Green energy toggle */}
        <div>
          <button
            onClick={() => onGreenOnlyChange(!greenOnly)}
            className={cn(
              'inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all',
              greenOnly
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            )}
          >
            <Leaf className={cn('h-4 w-4', greenOnly ? 'text-emerald-500' : 'text-slate-400')} />
            Vain vihreää sähköä
          </button>
        </div>

        {/* Sort by */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Järjestys
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Järjestys">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onSortByChange(option.id)}
                aria-pressed={sortBy === option.id}
                className={cn(
                  'min-h-[44px] rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all',
                  sortBy === option.id
                    ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced filters toggle */}
        <div className="border-t border-slate-200 pt-4">
          <button
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all',
              activeFilterCount > 0
                ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            )}
          >
            Lisäsuodattimet
            {activeFilterCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0066FF] px-1.5 text-xs font-bold text-white">
                {activeFilterCount}
              </span>
            )}
            {advancedOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {/* Advanced filters panel */}
          {advancedOpen && (
            <div className="mt-4 animate-fade-in-up space-y-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
              {/* Max monthly fee slider */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Enimmäiskuukausimaksu:{' '}
                  <span className="font-semibold text-[#0066FF]">
                    {advancedFilters.maxMonthlyFee < 10
                      ? `${advancedFilters.maxMonthlyFee.toFixed(1)} €/kk`
                      : 'Ei rajaa'}
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={advancedFilters.maxMonthlyFee}
                  onChange={(e) =>
                    onAdvancedFiltersChange({
                      ...advancedFilters,
                      maxMonthlyFee: parseFloat(e.target.value),
                    })
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#0066FF]"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>0 €/kk</span>
                  <span>10 €/kk</span>
                </div>
              </div>

              {/* Provider type filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Yhtiön tyyppi
                </label>
                <div className="flex flex-wrap gap-2">
                  {providerTypeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleProviderTypeToggle(opt.id)}
                      className={cn(
                        'rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all',
                        advancedFilters.providerTypes.includes(opt.id)
                          ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {advancedFilters.providerTypes.length === 0 && (
                  <p className="mt-1 text-xs text-slate-400">Ei rajausta - näytetään kaikki</p>
                )}
              </div>

              {/* Max risk slider */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Enimmäisvastapuoliriski:{' '}
                  <span className="font-semibold text-[#0066FF]">
                    {advancedFilters.maxRisk < 100
                      ? `${advancedFilters.maxRisk}`
                      : 'Ei rajaa'}
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={advancedFilters.maxRisk}
                  onChange={(e) =>
                    onAdvancedFiltersChange({
                      ...advancedFilters,
                      maxRisk: parseInt(e.target.value, 10),
                    })
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#0066FF]"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>0 (ei riskiä)</span>
                  <span>100 (korkea riski)</span>
                </div>
              </div>

              {/* Min rating slider */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Vähimmäisarvosana:{' '}
                  <span className="font-semibold text-[#0066FF]">
                    {advancedFilters.minRating > 1
                      ? `${advancedFilters.minRating.toFixed(1)}`
                      : 'Ei rajaa'}
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={0.5}
                  value={advancedFilters.minRating}
                  onChange={(e) =>
                    onAdvancedFiltersChange({
                      ...advancedFilters,
                      minRating: parseFloat(e.target.value),
                    })
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#0066FF]"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>

              {/* Reset advanced filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={() => onAdvancedFiltersChange({ ...defaultAdvancedFilters })}
                  className="text-sm font-medium text-slate-500 underline hover:text-slate-700"
                >
                  Nollaa lisäsuodattimet
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onBack}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Takaisin
        </button>
        <button
          onClick={onNext}
          className="min-h-[48px] rounded-xl bg-[#0066FF] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-[#0052CC] hover:shadow-xl active:scale-[0.98]"
        >
          Näytä tulokset
        </button>
      </div>
    </div>
  );
}
