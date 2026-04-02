'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Building2, Building, ArrowRight, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

const housingTypes = [
  {
    id: 'kerrostalo',
    label: 'Kerrostalo',
    icon: Building2,
    consumption: 2000,
    description: '~2 000 kWh/v',
  },
  {
    id: 'rivitalo',
    label: 'Rivitalo',
    icon: Building,
    consumption: 5000,
    description: '~5 000 kWh/v',
  },
  {
    id: 'omakotitalo',
    label: 'Omakotitalo',
    icon: Home,
    consumption: 18000,
    description: '~18 000 kWh/v',
  },
] as const;

export default function QuickComparison() {
  const [selected, setSelected] = useState<string>('kerrostalo');
  const router = useRouter();

  const selectedType = housingTypes.find((t) => t.id === selected)!;

  return (
    <section className="relative border-b border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-[#0066FF]">
            <Calculator className="h-4 w-4" />
            Pikahaku
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Vertaa sähkösopimuksia sekunneissa
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Valitse asumismuotosi ja löydä sinulle edullisin sähkösopimus.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          {/* Housing type selector */}
          <div className="grid grid-cols-3 gap-3">
            {housingTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selected === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelected(type.id)}
                  className={cn(
                    'group relative flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-5 transition-all',
                    isSelected
                      ? 'border-[#0066FF] bg-blue-50 shadow-md shadow-blue-100'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  )}
                  aria-pressed={isSelected}
                >
                  <Icon
                    className={cn(
                      'h-7 w-7 transition-colors',
                      isSelected ? 'text-[#0066FF]' : 'text-slate-400 group-hover:text-slate-600'
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-semibold transition-colors',
                      isSelected ? 'text-[#0066FF]' : 'text-slate-700'
                    )}
                  >
                    {type.label}
                  </span>
                  <span className="text-xs text-slate-500">{type.description}</span>
                </button>
              );
            })}
          </div>

          {/* Consumption display */}
          <div className="mt-6 rounded-xl bg-slate-50 px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Arvioitu kulutus</span>
              <span className="text-lg font-bold text-slate-900">
                {selectedType.consumption.toLocaleString('fi-FI')} kWh/vuosi
              </span>
            </div>
          </div>

          {/* CTA button */}
          <button
            onClick={() => router.push(`/vertailu?tyyppi=${selected}&kulutus=${selectedType.consumption}`)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-[#0052CC] hover:shadow-xl hover:shadow-blue-200 active:scale-[0.98]"
          >
            Vertaa hintoja
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
