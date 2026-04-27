'use client';

import { useEffect, useState } from 'react';
import { Users, TrendingDown, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import type { HouseholdBenchmark as HouseholdBenchmarkData } from '@/types';
import type { HousingType } from './ConsumptionStep';

interface HouseholdBenchmarkProps {
  userKwhPerYear: number;
  housingType: HousingType;
}

interface ApiResponse {
  success: boolean;
  data: HouseholdBenchmarkData;
}

// Map calculator HousingType to API params.
function toApiParams(t: HousingType): { housingType: string; heating: string } {
  if (t === 'kerrostalo') return { housingType: 'kerrostalo', heating: 'other' };
  if (t === 'rivitalo') return { housingType: 'rivitalo', heating: 'other' };
  if (t === 'omakotitalo-sahko') return { housingType: 'omakotitalo', heating: 'sahko' };
  return { housingType: 'omakotitalo', heating: 'other' };
}

type Status =
  | { kind: 'loading' }
  | { kind: 'hidden' }
  | { kind: 'ready'; data: HouseholdBenchmarkData };

export default function HouseholdBenchmark({
  userKwhPerYear,
  housingType,
}: HouseholdBenchmarkProps) {
  const [status, setStatus] = useState<Status>({ kind: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    const { housingType: ht, heating } = toApiParams(housingType);
    const url = `/api/energy/household-benchmark?housingType=${ht}&heating=${heating}`;

    fetch(url, { signal: controller.signal })
      .then((r) => r.json() as Promise<ApiResponse>)
      .then((res) => {
        if (controller.signal.aborted) return;
        if (!res?.data || res.data.degraded || res.data.averageKwhPerYear <= 0) {
          setStatus({ kind: 'hidden' });
        } else {
          setStatus({ kind: 'ready', data: res.data });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus({ kind: 'hidden' });
      });

    return () => controller.abort();
  }, [housingType]);

  if (status.kind === 'hidden') return null;

  if (status.kind === 'loading') {
    return (
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="h-5 w-40 animate-pulse rounded bg-slate-100" />
        <div className="mt-4 h-16 animate-pulse rounded-lg bg-slate-100" />
      </div>
    );
  }

  const benchmark = status.data;
  const avg = benchmark.averageKwhPerYear;
  const diffPct = avg > 0 ? ((userKwhPerYear - avg) / avg) * 100 : 0;
  const absDiff = Math.abs(Math.round(diffPct));
  const userIsLower = diffPct < 0;
  const closeToAverage = absDiff < 5;

  // Bar widths — both anchored to the larger of the two values.
  const max = Math.max(userKwhPerYear, avg) || 1;
  const userPct = (userKwhPerYear / max) * 100;
  const avgPct = (avg / max) * 100;

  const dataDate = new Date(benchmark.dataAsOf);
  const dataDateLabel = isNaN(dataDate.getTime())
    ? null
    : dataDate.toLocaleDateString('fi-FI', { month: 'long', year: 'numeric' });

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <Users className="h-3.5 w-3.5" />
            Samankaltaiset taloudet
          </div>
          <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
            Vertailu samankaltaisiin Suomessa
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Suomessa samankaltaiset kotitaloudet ({benchmark.sampleGroup})
            kuluttavat keskimäärin{' '}
            <strong>{formatNumber(avg)} kWh</strong> sähköä vuodessa.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {/* Your household */}
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">Sinun taloutesi</span>
            <span className="font-semibold text-slate-900">
              {formatNumber(userKwhPerYear)} kWh / vuosi
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${userPct}%` }}
            />
          </div>
        </div>

        {/* Group average */}
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">
              Samankaltaisten talouksien keskiarvo
            </span>
            <span className="font-semibold text-slate-900">
              {formatNumber(avg)} kWh / vuosi
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-400 transition-all"
              style={{ width: `${avgPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Diff summary */}
      <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 p-3">
        {closeToAverage ? (
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
        ) : userIsLower ? (
          <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        ) : (
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
        )}
        <p className="text-sm text-slate-700">
          {closeToAverage ? (
            <>Kulutuksesi on lähellä samankaltaisten talouksien keskiarvoa.</>
          ) : userIsLower ? (
            <>
              Kulutuksesi on noin <strong>{absDiff} %</strong> pienempi kuin
              samankaltaisilla talouksilla.
            </>
          ) : (
            <>
              Kulutuksesi on noin <strong>{absDiff} %</strong> suurempi kuin
              samankaltaisilla talouksilla.
            </>
          )}
        </p>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Lähde: Fingrid Datahub (n ={' '}
        {formatNumber(benchmark.sampleSize)} käyttöpaikkaa
        {dataDateLabel ? `, päivitetty ${dataDateLabel}` : ''}).
      </p>
    </div>
  );
}
