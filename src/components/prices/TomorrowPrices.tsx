'use client';

import { useMemo } from 'react';
import {
  Clock,
  ArrowDown,
  ArrowUp,
  TrendingDown,
  TrendingUp,
  Zap,
  WashingMachine,
  Car,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import HourlyPriceChart from './HourlyPriceChart';
import type { HourlyPrice } from '@/types';

interface TomorrowPricesProps {
  tomorrowPrices: HourlyPrice[] | null;
  todayPrices?: HourlyPrice[];
  todayAvgPrice: number;
}

function formatPriceFi(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

interface PeriodStats {
  label: string;
  hourRange: string;
  avg: number;
  todayAvg: number;
}

function computePeriodAvg(prices: HourlyPrice[], startHour: number, endHour: number): number {
  const periodPrices = prices.filter((p) =>
    startHour < endHour
      ? p.hour >= startHour && p.hour < endHour
      : p.hour >= startHour || p.hour < endHour
  );
  if (periodPrices.length === 0) return 0;
  return periodPrices.reduce((sum, p) => sum + p.price, 0) / periodPrices.length;
}

/**
 * Find the cheapest consecutive block of `blockSize` hours
 */
function findCheapestBlock(
  prices: HourlyPrice[],
  blockSize: number
): { startHour: number; endHour: number; avgPrice: number } | null {
  if (prices.length < blockSize) return null;

  const sorted = [...prices].sort((a, b) => a.hour - b.hour);
  let bestStart = 0;
  let bestAvg = Infinity;

  for (let i = 0; i <= sorted.length - blockSize; i++) {
    const block = sorted.slice(i, i + blockSize);
    // Check consecutive
    const isConsecutive = block.every(
      (p, idx) => idx === 0 || p.hour === block[idx - 1].hour + 1
    );
    if (!isConsecutive) continue;

    const avg = block.reduce((sum, p) => sum + p.price, 0) / blockSize;
    if (avg < bestAvg) {
      bestAvg = avg;
      bestStart = block[0].hour;
    }
  }

  if (bestAvg === Infinity) return null;

  return {
    startHour: bestStart,
    endHour: bestStart + blockSize,
    avgPrice: Math.round(bestAvg * 100) / 100,
  };
}

export default function TomorrowPrices({
  tomorrowPrices,
  todayPrices,
  todayAvgPrice,
}: TomorrowPricesProps) {
  // Period breakdown
  const periods = useMemo((): PeriodStats[] => {
    if (!tomorrowPrices || tomorrowPrices.length === 0) return [];

    const defs = [
      { label: 'Aamu', startHour: 6, endHour: 9, hourRange: '06–09' },
      { label: 'Päivä', startHour: 9, endHour: 17, hourRange: '09–17' },
      { label: 'Ilta', startHour: 17, endHour: 22, hourRange: '17–22' },
      { label: 'Yö', startHour: 22, endHour: 6, hourRange: '22–06' },
    ];

    return defs.map((d) => ({
      label: d.label,
      hourRange: d.hourRange,
      avg: computePeriodAvg(tomorrowPrices, d.startHour, d.endHour),
      todayAvg: todayPrices
        ? computePeriodAvg(todayPrices, d.startHour, d.endHour)
        : 0,
    }));
  }, [tomorrowPrices, todayPrices]);

  // Best 3h window
  const bestWindow = useMemo(
    () => (tomorrowPrices ? findCheapestBlock(tomorrowPrices, 3) : null),
    [tomorrowPrices]
  );

  // Best EV charging block (3 consecutive hours)
  const evBlock = useMemo(
    () => (tomorrowPrices ? findCheapestBlock(tomorrowPrices, 3) : null),
    [tomorrowPrices]
  );

  // Best single hours for appliances
  const applianceHours = useMemo(() => {
    if (!tomorrowPrices || tomorrowPrices.length === 0) return [];
    return [...tomorrowPrices].sort((a, b) => a.price - b.price).slice(0, 3);
  }, [tomorrowPrices]);

  if (!tomorrowPrices || tomorrowPrices.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Huomisen hinnat</h3>
        <div className="flex flex-col items-center justify-center py-8">
          <Clock className="h-10 w-10 text-slate-300" />
          <p className="mt-3 text-center text-sm text-slate-500">
            Huomisen hinnat julkaistaan noin klo 14:00 (CET).
          </p>
          <p className="mt-1 text-center text-xs text-slate-400">
            Nord Pool julkaisee seuraavan päivän hinnat päivittäin iltapäivällä.
          </p>
        </div>
      </div>
    );
  }

  const tomorrowAvg =
    tomorrowPrices.reduce((sum, p) => sum + p.price, 0) / tomorrowPrices.length;
  const tomorrowMin = Math.min(...tomorrowPrices.map((p) => p.price));
  const tomorrowMax = Math.max(...tomorrowPrices.map((p) => p.price));
  const minEntry = tomorrowPrices.find((p) => p.price === tomorrowMin);
  const maxEntry = tomorrowPrices.find((p) => p.price === tomorrowMax);

  const priceDiffPercent =
    todayAvgPrice > 0
      ? ((tomorrowAvg - todayAvgPrice) / todayAvgPrice) * 100
      : 0;
  const isCheaper = priceDiffPercent < -1;
  const isMoreExpensive = priceDiffPercent > 1;

  // Find max price for period comparison bar scaling
  const maxPeriodPrice = Math.max(...periods.map((p) => Math.max(p.avg, p.todayAvg)), 1);

  return (
    <div className="space-y-4">
      {/* Comparison banner */}
      <div
        className={cn(
          'rounded-xl border px-5 py-3',
          isCheaper
            ? 'border-emerald-200 bg-emerald-50'
            : isMoreExpensive
              ? 'border-red-200 bg-red-50'
              : 'border-slate-200 bg-slate-50'
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {isCheaper ? (
              <TrendingDown className="h-5 w-5 text-emerald-600" />
            ) : isMoreExpensive ? (
              <TrendingUp className="h-5 w-5 text-red-600" />
            ) : null}
            <span className="text-sm font-medium text-slate-700">
              Huomenna keskihinta on{' '}
              <span
                className={
                  isCheaper
                    ? 'font-bold text-emerald-700'
                    : isMoreExpensive
                      ? 'font-bold text-red-700'
                      : 'font-bold text-slate-700'
                }
              >
                {Math.abs(priceDiffPercent).toFixed(0)} %{' '}
                {isCheaper
                  ? 'halvempi'
                  : isMoreExpensive
                    ? 'kalliimpi'
                    : 'samalla tasolla'}
              </span>{' '}
              kuin tänään
            </span>
          </div>
          <div className="flex flex-col gap-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:gap-4">
            <span className="flex items-center gap-1">
              <ArrowDown className="h-3 w-3 text-emerald-500" />
              {formatPriceFi(tomorrowMin)} c/kWh (klo{' '}
              {String(minEntry?.hour ?? 0).padStart(2, '0')}:00)
            </span>
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3 text-red-500" />
              {formatPriceFi(tomorrowMax)} c/kWh (klo{' '}
              {String(maxEntry?.hour ?? 0).padStart(2, '0')}:00)
            </span>
          </div>
        </div>
      </div>

      {/* Period breakdown */}
      {periods.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h4 className="mb-4 text-base font-semibold text-slate-900">
            Vuorokauden jakauminen
          </h4>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            {periods.map((period) => {
              const diff =
                period.todayAvg > 0
                  ? ((period.avg - period.todayAvg) / period.todayAvg) * 100
                  : 0;
              const barWidth = Math.max(8, (period.avg / maxPeriodPrice) * 100);
              const todayBarWidth =
                period.todayAvg > 0
                  ? Math.max(8, (period.todayAvg / maxPeriodPrice) * 100)
                  : 0;

              return (
                <div key={period.label} className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {period.label}
                    </span>
                    <span className="text-xs text-slate-400">{period.hourRange}</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {formatPriceFi(period.avg)}
                    <span className="ml-1 text-xs font-normal text-slate-500">
                      c/kWh
                    </span>
                  </div>
                  {/* Comparison bars */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-xs text-slate-400">Huomenna</span>
                      <div className="h-3 rounded-full bg-[#0066FF]/80" style={{ width: `${barWidth}%` }} />
                    </div>
                    {todayBarWidth > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="w-12 text-xs text-slate-400">Tänään</span>
                        <div className="h-3 rounded-full bg-slate-300" style={{ width: `${todayBarWidth}%` }} />
                      </div>
                    )}
                  </div>
                  {diff !== 0 && (
                    <span
                      className={cn(
                        'text-xs font-medium',
                        diff < -1
                          ? 'text-emerald-600'
                          : diff > 1
                            ? 'text-red-600'
                            : 'text-slate-500'
                      )}
                    >
                      {diff > 0 ? '+' : ''}
                      {diff.toFixed(0)} %
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Best 3-hour window highlight */}
      {bestWindow && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-800">
              Paras aika huomenna
            </span>
          </div>
          <p className="mt-1 text-sm text-emerald-700">
            Halvin 3 tunnin jakso:{' '}
            <span className="font-bold">
              klo {String(bestWindow.startHour).padStart(2, '0')}:00–
              {String(bestWindow.endHour).padStart(2, '0')}:00
            </span>{' '}
            (keskihinta {formatPriceFi(bestWindow.avgPrice)} c/kWh)
          </p>
        </div>
      )}

      {/* Smart scheduling suggestions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* EV Charging */}
        {evBlock && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                <Car className="h-5 w-5 text-[#0066FF]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Latausaikataulu
                </h4>
                <p className="text-xs text-slate-500">Sähköauton lataus</p>
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2.5">
              <p className="text-sm font-medium text-[#0066FF]">
                klo {String(evBlock.startHour).padStart(2, '0')}:00–
                {String(evBlock.endHour).padStart(2, '0')}:00
              </p>
              <p className="mt-0.5 text-xs text-slate-600">
                Halvin 3h jakso — keskihinta{' '}
                {formatPriceFi(evBlock.avgPrice)} c/kWh
              </p>
            </div>
          </div>
        )}

        {/* Appliance scheduling */}
        {applianceHours.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100">
                <WashingMachine className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Kodinkoneiden ajoitus
                </h4>
                <p className="text-xs text-slate-500">Pyykin- ja astianpesukone</p>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {applianceHours.map((p, idx) => (
                <div
                  key={p.hour}
                  className="flex items-center justify-between rounded-lg bg-purple-50 px-3 py-2"
                >
                  <span className="text-sm text-slate-700">
                    <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-200 text-xs font-bold text-purple-700">
                      {idx + 1}
                    </span>
                    klo {String(p.hour).padStart(2, '0')}:00–
                    {String(p.hour + 1).padStart(2, '0')}:00
                  </span>
                  <span className="text-sm font-semibold text-purple-700">
                    {formatPriceFi(p.price)} c/kWh
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tomorrow's chart */}
      <HourlyPriceChart
        prices={tomorrowPrices}
        title="Huomisen tuntihinnat"
        highlightCurrentHour={false}
      />
    </div>
  );
}
