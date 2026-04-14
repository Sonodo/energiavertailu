'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { regions } from '@/data/regions';
import ConsumptionStep, { type HousingType } from './ConsumptionStep';
import PreferencesStep, {
  type ContractTypeFilter,
  type DurationOption,
  type SortOption,
  type AdvancedFilters,
  type ProviderTypeOption,
  defaultAdvancedFilters,
} from './PreferencesStep';
import ResultsList from './ResultsList';
import ErrorBoundary from '@/components/ErrorBoundary';

const steps = [
  { id: 1, label: 'Kulutus' },
  { id: 2, label: 'Mieltymykset' },
  { id: 3, label: 'Tulokset' },
];

function parseHousingType(value: string | null): HousingType {
  if (value === 'kerrostalo' || value === 'rivitalo' || value === 'omakotitalo' || value === 'omakotitalo-sahko') {
    return value;
  }
  return 'kerrostalo';
}

function parseConsumption(value: string | null): number {
  if (!value) return 5000;
  const num = parseInt(value, 10);
  if (isNaN(num) || num < 0 || num > 100000) return 5000;
  return num;
}

function parseContractType(value: string | null): ContractTypeFilter {
  if (value === 'all' || value === 'spot' || value === 'fixed' || value === 'open-ended') return value;
  return 'all';
}

function parseDurations(value: string | null): DurationOption[] {
  if (!value || value === 'all') return ['all'];
  const validOptions: DurationOption[] = ['6', '12', '24', '36'];
  const parts = value.split(',').filter((v) => validOptions.includes(v as DurationOption)) as DurationOption[];
  return parts.length > 0 ? parts : ['all'];
}

function parseSortBy(value: string | null): SortOption {
  if (value === 'cheapest' || value === 'monthly' || value === 'risk') return value;
  return 'cheapest';
}

function parseRegion(value: string | null): string {
  if (value && regions.some((r) => r.id === value)) return value;
  return 'uusimaa';
}

function parseFloat0(value: string | null, min: number, max: number, defaultVal: number): number {
  if (!value) return defaultVal;
  const num = parseFloat(value);
  if (isNaN(num) || num < min || num > max) return defaultVal;
  return num;
}

function parseProviderTypes(value: string | null): ProviderTypeOption[] {
  if (!value) return [];
  const valid: ProviderTypeOption[] = ['national', 'regional', 'challenger'];
  const parts = value.split(',').filter((v) => valid.includes(v as ProviderTypeOption)) as ProviderTypeOption[];
  return parts;
}

export default function ComparisonCalculator() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params
  const [step, setStep] = useState(() => {
    const s = parseInt(searchParams.get('step') ?? '1', 10);
    return s >= 1 && s <= 3 ? s : 1;
  });
  const [housingType, setHousingType] = useState<HousingType>(() =>
    parseHousingType(searchParams.get('tyyppi'))
  );
  const [consumption, setConsumption] = useState(() =>
    parseConsumption(searchParams.get('kulutus'))
  );
  const [contractType, setContractType] = useState<ContractTypeFilter>(() =>
    parseContractType(searchParams.get('sopimus'))
  );
  const [selectedDurations, setSelectedDurations] = useState<DurationOption[]>(() =>
    parseDurations(searchParams.get('kesto'))
  );
  const [greenOnly, setGreenOnly] = useState(() => searchParams.get('vihrea') === '1');
  const [sortBy, setSortBy] = useState<SortOption>(() =>
    parseSortBy(searchParams.get('jarjestys'))
  );
  const [region, setRegion] = useState(() =>
    parseRegion(searchParams.get('alue'))
  );

  // Advanced filters
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>(() => ({
    maxMonthlyFee: parseFloat0(searchParams.get('maxmaksu'), 0, 10, 10),
    providerTypes: parseProviderTypes(searchParams.get('yhtyyppi')),
    maxRisk: parseFloat0(searchParams.get('maxriski'), 0, 100, 100),
    minRating: parseFloat0(searchParams.get('minarvosana'), 1, 5, 1),
  }));

  // Serialize durations for URL
  const durationsParam = selectedDurations.includes('all')
    ? 'all'
    : selectedDurations.join(',');

  // Update URL when state changes
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    params.set('tyyppi', housingType);
    params.set('kulutus', String(consumption));
    params.set('alue', region);
    if (step > 1) {
      params.set('sopimus', contractType);
      params.set('kesto', durationsParam);
      if (greenOnly) params.set('vihrea', '1');
      params.set('jarjestys', sortBy);

      // Advanced filters — only include non-default values
      if (advancedFilters.maxMonthlyFee < 10) {
        params.set('maxmaksu', String(advancedFilters.maxMonthlyFee));
      }
      if (advancedFilters.providerTypes.length > 0) {
        params.set('yhtyyppi', advancedFilters.providerTypes.join(','));
      }
      if (advancedFilters.maxRisk < 100) {
        params.set('maxriski', String(advancedFilters.maxRisk));
      }
      if (advancedFilters.minRating > 1) {
        params.set('minarvosana', String(advancedFilters.minRating));
      }
    }
    params.set('step', String(step));
    router.replace(`/vertailu?${params.toString()}`, { scroll: false });
  }, [router, housingType, consumption, region, contractType, durationsParam, greenOnly, sortBy, step, advancedFilters]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const handleReset = () => {
    setStep(1);
    setHousingType('kerrostalo');
    setConsumption(5000);
    setRegion('uusimaa');
    setContractType('all');
    setSelectedDurations(['all']);
    setGreenOnly(false);
    setSortBy('cheapest');
    setAdvancedFilters({ ...defaultAdvancedFilters });
  };

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() => {
                  if (s.id < step) setStep(s.id);
                }}
                disabled={s.id > step}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                  s.id === step
                    ? 'bg-accent text-white shadow-md shadow-blue-200'
                    : s.id < step
                      ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-400'
                )}
              >
                {s.id < step ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                    {s.id}
                  </span>
                )}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 w-8 rounded sm:w-16',
                    s.id < step ? 'bg-emerald-300' : 'bg-slate-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
        {step === 1 && (
          <ConsumptionStep
            housingType={housingType}
            consumption={consumption}
            region={region}
            onHousingTypeChange={setHousingType}
            onConsumptionChange={setConsumption}
            onRegionChange={setRegion}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <PreferencesStep
            contractType={contractType}
            selectedDurations={selectedDurations}
            greenOnly={greenOnly}
            sortBy={sortBy}
            advancedFilters={advancedFilters}
            onContractTypeChange={setContractType}
            onDurationsChange={setSelectedDurations}
            onGreenOnlyChange={setGreenOnly}
            onSortByChange={setSortBy}
            onAdvancedFiltersChange={setAdvancedFilters}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <ErrorBoundary section="Tulokset">
            <ResultsList
              consumption={consumption}
              region={region}
              contractType={contractType}
              selectedDurations={selectedDurations}
              greenOnly={greenOnly}
              sortBy={sortBy}
              advancedFilters={advancedFilters}
              onBack={() => setStep(2)}
              onReset={handleReset}
            />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}
