'use client';

import { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConsumptionEstimatorProps {
  onEstimate: (kwh: number) => void;
  onClose: () => void;
}

const heatingTypes = [
  { id: 'kaukolampo', label: 'Kaukolämpö', multiplier: 0 },
  { id: 'maalampo', label: 'Maalämpö', multiplier: 30 },
  { id: 'ilmalampo', label: 'Ilmalämpöpumppu', multiplier: 55 },
  { id: 'sahko', label: 'Suora sähkölämmitys', multiplier: 100 },
  { id: 'oljy', label: 'Öljylämmitys', multiplier: 5 },
  { id: 'puu', label: 'Puulämmitys', multiplier: 10 },
] as const;

export default function ConsumptionEstimator({ onEstimate, onClose }: ConsumptionEstimatorProps) {
  const [area, setArea] = useState(80);
  const [people, setPeople] = useState(2);
  const [heating, setHeating] = useState('kaukolampo');
  const [hasSauna, setHasSauna] = useState(false);
  const [hasEV, setHasEV] = useState(false);

  const heatingType = heatingTypes.find((h) => h.id === heating)!;

  // Estimation formula:
  // Base consumption: ~25 kWh/m²/year for appliances + lighting
  // Heating: multiplier × area (kWh/m²/year for electric heating portion)
  // People: +300 kWh per person (cooking, water heating share, devices)
  // Sauna: +1000 kWh/year
  // EV: +3000 kWh/year (~15,000 km at 20 kWh/100km)
  const estimate = Math.round(
    area * 25 +
    area * heatingType.multiplier +
    people * 300 +
    (hasSauna ? 1000 : 0) +
    (hasEV ? 3000 : 0)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Sulje"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#0066FF]">
            <Calculator className="h-4 w-4" />
            Kulutusarvio
          </div>
          <h3 className="text-xl font-bold text-slate-900">Arvioi sähkönkulutuksesi</h3>
          <p className="mt-1 text-sm text-slate-600">
            Vastaa muutamaan kysymykseen, niin arvioimme vuosikulutuksesi.
          </p>
        </div>

        <div className="space-y-5">
          {/* Area */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Asunnon pinta-ala
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={20}
                max={300}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#0066FF]"
              />
              <span className="w-16 text-right text-sm font-semibold text-slate-900">
                {area} m²
              </span>
            </div>
          </div>

          {/* People */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Asukkaiden määrä
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setPeople(n)}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-all',
                    people === n
                      ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  )}
                >
                  {n}{n === 5 ? '+' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Heating type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Lämmitysmuoto
            </label>
            <div className="grid grid-cols-2 gap-2">
              {heatingTypes.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setHeating(h.id)}
                  className={cn(
                    'rounded-lg border-2 px-3 py-2 text-left text-sm font-medium transition-all',
                    heating === h.id
                      ? 'border-[#0066FF] bg-blue-50 text-[#0066FF]'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  )}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={hasSauna}
                onChange={(e) => setHasSauna(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#0066FF] accent-[#0066FF]"
              />
              <span className="text-sm text-slate-700">Sähkösauna</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={hasEV}
                onChange={(e) => setHasEV(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#0066FF] accent-[#0066FF]"
              />
              <span className="text-sm text-slate-700">Sähköauto</span>
            </label>
          </div>
        </div>

        {/* Result */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Arvioitu vuosikulutus</span>
            <span className="text-xl font-bold text-slate-900">
              {estimate.toLocaleString('fi-FI')} kWh
            </span>
          </div>
        </div>

        <button
          onClick={() => onEstimate(estimate)}
          className="mt-4 w-full rounded-xl bg-[#0066FF] py-3 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-[#0052CC]"
        >
          Käytä tätä arviota
        </button>
      </div>
    </div>
  );
}
