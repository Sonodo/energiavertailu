'use client';

import { useState } from 'react';
import { Building2, Building, Home, Flame, HelpCircle, MapPin } from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils';
import { regions } from '@/data/regions';
import ConsumptionEstimator from './ConsumptionEstimator';

export type HousingType = 'kerrostalo' | 'rivitalo' | 'omakotitalo' | 'omakotitalo-sahko';
export type ConsumptionInputMode = 'housing' | 'manual';

interface ConsumptionStepProps {
  housingType: HousingType;
  consumption: number;
  region: string;
  onHousingTypeChange: (type: HousingType) => void;
  onConsumptionChange: (kwh: number) => void;
  onRegionChange: (regionId: string) => void;
  onNext: () => void;
}

const housingOptions = [
  {
    id: 'kerrostalo' as HousingType,
    label: 'Kerrostalo',
    description: 'Yksiö, kaksio tai suurempi',
    icon: Building2,
    defaultKwh: 2000,
  },
  {
    id: 'rivitalo' as HousingType,
    label: 'Rivitalo',
    description: 'Rivi- tai paritalo',
    icon: Building,
    defaultKwh: 5000,
  },
  {
    id: 'omakotitalo' as HousingType,
    label: 'Omakotitalo',
    description: 'Ei sähkölämmitystä',
    icon: Home,
    defaultKwh: 7000,
  },
  {
    id: 'omakotitalo-sahko' as HousingType,
    label: 'Omakotitalo',
    description: 'Sähkölämmitys',
    icon: Flame,
    defaultKwh: 18000,
  },
] as const;

export default function ConsumptionStep({
  housingType,
  consumption,
  region,
  onHousingTypeChange,
  onConsumptionChange,
  onRegionChange,
  onNext,
}: ConsumptionStepProps) {
  const [showEstimator, setShowEstimator] = useState(false);
  const [inputMode, setInputMode] = useState<ConsumptionInputMode>('housing');
  const [manualKwh, setManualKwh] = useState('');

  const handleHousingSelect = (type: HousingType) => {
    onHousingTypeChange(type);
    const option = housingOptions.find((o) => o.id === type);
    if (option) {
      onConsumptionChange(option.defaultKwh);
    }
  };

  const handleSliderChange = (value: number) => {
    onConsumptionChange(value);
  };

  const handleInputChange = (value: string) => {
    const num = parseInt(value.replace(/\s/g, ''), 10);
    if (!isNaN(num) && num >= 0 && num <= 50000) {
      onConsumptionChange(num);
    }
  };

  // Slider range depends on housing type
  const sliderMin = 500;
  const sliderMax = housingType.startsWith('omakotitalo') ? 40000 : 15000;

  const handleManualInput = (value: string) => {
    setManualKwh(value);
    const num = parseInt(value.replace(/\s/g, '').replace(/\./g, ''), 10);
    if (!isNaN(num) && num >= 0 && num <= 100000) {
      onConsumptionChange(num);
    }
  };

  const selectedRegion = regions.find((r) => r.id === region);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          1. Sähkönkulutuksesi
        </h2>
        <p className="mt-1 text-slate-600">
          Valitse asumismuotosi tai syötä kulutus suoraan sähkölaskustasi.
        </p>
      </div>

      {/* Input mode tabs */}
      <div className="mb-5 flex rounded-lg border border-slate-200 bg-slate-50 p-1">
        <button
          onClick={() => setInputMode('housing')}
          className={cn(
            'flex-1 rounded-md px-2 py-2.5 text-xs font-medium transition-all sm:px-4 sm:text-sm',
            inputMode === 'housing'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          )}
        >
          Valitse asuntotyyppi
        </button>
        <button
          onClick={() => setInputMode('manual')}
          className={cn(
            'flex-1 rounded-md px-2 py-2.5 text-xs font-medium transition-all sm:px-4 sm:text-sm',
            inputMode === 'manual'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          )}
        >
          Syötä kilowattitunnit
        </button>
      </div>

      {inputMode === 'housing' ? (
        <>
          {/* Housing type cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {housingOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = housingType === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleHousingSelect(option.id)}
                  className={cn(
                    'group relative flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-5 transition-all sm:px-4',
                    isSelected
                      ? 'border-accent bg-blue-50 shadow-md shadow-blue-100'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  )}
                  aria-pressed={isSelected}
                >
                  <Icon
                    className={cn(
                      'h-7 w-7 transition-colors',
                      isSelected ? 'text-accent' : 'text-slate-400 group-hover:text-slate-600'
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-semibold transition-colors',
                      isSelected ? 'text-accent' : 'text-slate-700'
                    )}
                  >
                    {option.label}
                  </span>
                  <span className="text-xs text-slate-500">{option.description}</span>
                  <span
                    className={cn(
                      'text-xs font-medium',
                      isSelected ? 'text-accent' : 'text-slate-400'
                    )}
                  >
                    ~{formatNumber(option.defaultKwh)} kWh/v
                  </span>
                </button>
              );
            })}
          </div>

          {/* Consumption slider + input */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <label htmlFor="consumption-slider" className="text-sm font-medium text-slate-700">
                Vuosikulutus (kWh)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formatNumber(consumption)}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-right text-sm font-semibold text-slate-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  inputMode="numeric"
                />
                <span className="text-sm text-slate-500">kWh</span>
              </div>
            </div>

            <input
              id="consumption-slider"
              type="range"
              min={sliderMin}
              max={sliderMax}
              step={100}
              value={Math.min(consumption, sliderMax)}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-accent"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>{formatNumber(sliderMin)} kWh</span>
              <span>{formatNumber(sliderMax)} kWh</span>
            </div>
          </div>

          {/* Estimation helper */}
          <button
            onClick={() => setShowEstimator(true)}
            className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-700"
          >
            <HelpCircle className="h-4 w-4" />
            En tiedä kulutustani — auta arvioimaan
          </button>
        </>
      ) : (
        /* Manual kWh input */
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <label htmlFor="manual-kwh" className="block text-sm font-medium text-slate-700">
            Syötä vuosikulutuksesi kilowattitunteina (kWh)
          </label>
          <p className="mt-1 text-xs text-slate-500">
            Löydät vuosikulutuksesi sähkölaskustasi tai sähköyhtiösi verkkopalvelusta.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <input
              id="manual-kwh"
              type="text"
              value={manualKwh}
              onChange={(e) => handleManualInput(e.target.value)}
              placeholder="esim. 5000"
              className="w-40 rounded-lg border border-slate-300 px-4 py-2.5 text-lg font-semibold text-slate-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              inputMode="numeric"
            />
            <span className="text-sm font-medium text-slate-500">kWh / vuosi</span>
          </div>
          {consumption > 0 && inputMode === 'manual' && (
            <p className="mt-3 text-sm text-slate-600">
              Vuosikulutuksesi: <span className="font-semibold text-slate-900">{formatNumber(consumption)} kWh</span>
            </p>
          )}
        </div>
      )}

      {/* Region selector */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-slate-500" />
          <label htmlFor="region-select" className="text-sm font-medium text-slate-700">
            Verkkoyhtiön alue (siirtomaksun laskentaa varten)
          </label>
        </div>
        <select
          id="region-select"
          value={region}
          onChange={(e) => onRegionChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:w-auto sm:min-w-[280px]"
        >
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} — {r.gridOperator} ({r.transferPrice.toFixed(1)} c/kWh)
            </option>
          ))}
        </select>
        {selectedRegion && (
          <p className="mt-2 text-xs text-slate-500">
            Siirtohinta: {selectedRegion.transferPrice.toFixed(2)} c/kWh (sis. ALV) — {selectedRegion.gridOperator}
          </p>
        )}
      </div>

      {/* Next button */}
      <div className="mt-8">
        <button
          onClick={onNext}
          className="w-full rounded-xl bg-accent py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-accent-700 hover:shadow-xl sm:w-auto sm:px-8"
        >
          Seuraava: Valitse mieltymykset
        </button>
      </div>

      {/* Estimator modal */}
      {showEstimator && (
        <ConsumptionEstimator
          onEstimate={(kwh) => {
            onConsumptionChange(kwh);
            setShowEstimator(false);
          }}
          onClose={() => setShowEstimator(false)}
        />
      )}
    </div>
  );
}
