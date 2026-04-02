'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  AlertTriangle,
  Clock,
  TrendingDown,
  TrendingUp,
  Zap,
  BatteryCharging,
  Ban,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HourlyPrice } from '@/types';
import {
  generateForecast,
  generateSampleHistoricalDays,
  type ForecastPoint,
  type ForecastResult,
} from '@/lib/forecast';

interface PriceForecastProps {
  todayPrices: HourlyPrice[];
  tomorrowPrices: HourlyPrice[] | null;
}

function formatPriceFi(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

function getConfidenceColor(confidence: 'low' | 'medium' | 'high'): string {
  switch (confidence) {
    case 'high':
      return '#0066FF';
    case 'medium':
      return '#66a3ff';
    case 'low':
      return '#b3d1ff';
  }
}

function getConfidenceOpacity(confidence: 'low' | 'medium' | 'high'): number {
  switch (confidence) {
    case 'high':
      return 1;
    case 'medium':
      return 0.7;
    case 'low':
      return 0.4;
  }
}

interface ChartDataItem {
  hour: number;
  label: string;
  predictedPrice: number;
  actualPrice?: number;
  confidence: 'low' | 'medium' | 'high';
  color: string;
}

interface TooltipPayloadItem {
  payload: ChartDataItem;
  name: string;
  color: string;
  value: number;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function ForecastTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload;
  const confidenceLabels = { high: 'Korkea', medium: 'Keskitaso', low: 'Matala' };

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-slate-900">
        klo {String(data.hour).padStart(2, '0')}:00 – {String(data.hour + 1).padStart(2, '0')}:00
      </p>
      <p className="mt-1 text-lg font-bold" style={{ color: data.color }}>
        {formatPriceFi(data.predictedPrice)} c/kWh
        <span className="ml-1 text-xs font-normal text-slate-400">(arvio)</span>
      </p>
      {data.actualPrice !== undefined && (
        <p className="mt-0.5 text-sm font-semibold text-emerald-600">
          {formatPriceFi(data.actualPrice)} c/kWh
          <span className="ml-1 text-xs font-normal text-slate-400">(toteutunut)</span>
        </p>
      )}
      <div className="mt-1.5 flex items-center gap-1.5">
        <span className="text-xs text-slate-500">Luottamus:</span>
        <div className="flex gap-0.5">
          {[1, 2, 3].map((level) => (
            <span
              key={level}
              className={cn(
                'inline-block h-1.5 w-3 rounded-full',
                level <= (data.confidence === 'high' ? 3 : data.confidence === 'medium' ? 2 : 1)
                  ? 'bg-[#0066FF]'
                  : 'bg-slate-200'
              )}
            />
          ))}
        </div>
        <span className="text-xs text-slate-500">{confidenceLabels[data.confidence]}</span>
      </div>
    </div>
  );
}

export default function PriceForecast({
  todayPrices,
  tomorrowPrices,
}: PriceForecastProps) {
  const [forecastResult, setForecastResult] = useState<ForecastResult | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    // Build historical days from available data
    // In production this would fetch 7 days of history; here we use sample data
    // supplemented by today's actual prices
    const historicalDays = generateSampleHistoricalDays();

    // Replace the most recent day with today's actual prices if available
    if (todayPrices.length > 0) {
      historicalDays[historicalDays.length - 1] = todayPrices;
    }

    const result = generateForecast(historicalDays);
    setForecastResult(result);
  }, [todayPrices]);

  // If tomorrow's actual prices are available, enable comparison
  useEffect(() => {
    if (tomorrowPrices && tomorrowPrices.length > 0) {
      setShowComparison(true);
    }
  }, [tomorrowPrices]);

  const chartData: ChartDataItem[] = useMemo(() => {
    if (!forecastResult) return [];

    return forecastResult.forecast.map((fp) => {
      const actual = tomorrowPrices?.find((p) => p.hour === fp.hour);
      return {
        hour: fp.hour,
        label: String(fp.hour).padStart(2, '0'),
        predictedPrice: fp.predictedPrice,
        actualPrice: actual?.price,
        confidence: fp.confidence,
        color: getConfidenceColor(fp.confidence),
      };
    });
  }, [forecastResult, tomorrowPrices]);

  if (!forecastResult) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-72 animate-pulse rounded bg-slate-100" />
      </div>
    );
  }

  const { avgPredicted, cheapestHour, cheapestPrice, expensiveHour, expensivePrice, recommendedHours } =
    forecastResult;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <Clock className="h-5 w-5 text-[#0066FF]" />
        <h3 className="text-lg font-semibold text-slate-900">
          Hinta-arvio — Seuraavat 24 tuntia
        </h3>
      </div>

      {/* Disclaimer */}
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
        <p className="text-xs text-amber-800">
          Arvio perustuu historiallisiin hintoihin. Todellinen hinta voi poiketa
          merkittävästi mm. sään, tuotantohäiriöiden ja kysynnän muutosten vuoksi.
        </p>
      </div>

      {/* Key stats */}
      <div className="mb-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Arvioitu keskihinta</p>
          <p className="mt-1 text-xl font-bold text-slate-900">
            {formatPriceFi(avgPredicted)}
          </p>
          <p className="text-xs text-slate-400">c/kWh</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3 text-center">
          <p className="text-xs font-medium text-emerald-700">Halvin tunti</p>
          <p className="mt-1 text-xl font-bold text-emerald-700">
            klo {String(cheapestHour).padStart(2, '0')}
          </p>
          <p className="text-xs text-emerald-600">
            {formatPriceFi(cheapestPrice)} c/kWh
          </p>
        </div>
        <div className="rounded-lg bg-red-50 p-3 text-center">
          <p className="text-xs font-medium text-red-700">Kallein tunti</p>
          <p className="mt-1 text-xl font-bold text-red-700">
            klo {String(expensiveHour).padStart(2, '0')}
          </p>
          <p className="text-xs text-red-600">
            {formatPriceFi(expensivePrice)} c/kWh
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => formatPriceFi(v)}
              width={50}
            />
            <Tooltip content={<ForecastTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
            <ReferenceLine
              y={avgPredicted}
              stroke="#0066FF"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: `Ka. ${formatPriceFi(avgPredicted)}`,
                position: 'insideTopRight',
                fill: '#0066FF',
                fontSize: 11,
                fontWeight: 600,
              }}
            />
            <Bar dataKey="predictedPrice" radius={[4, 4, 0, 0]} maxBarSize={28} name="Arvio">
              {chartData.map((entry) => (
                <Cell
                  key={`cell-${entry.hour}`}
                  fill={entry.color}
                  opacity={getConfidenceOpacity(entry.confidence)}
                />
              ))}
            </Bar>
            {showComparison && (
              <Bar
                dataKey="actualPrice"
                radius={[4, 4, 0, 0]}
                maxBarSize={12}
                fill="#10b981"
                opacity={0.7}
                name="Toteutunut"
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#0066FF]" />
          <span>Korkea luottamus</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#66a3ff]" />
          <span>Keskitaso</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#b3d1ff]" />
          <span>Matala luottamus</span>
        </div>
        {showComparison && (
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500" />
            <span>Toteutunut hinta</span>
          </div>
        )}
      </div>

      {/* Recommended hours */}
      <div className="mt-6">
        <h4 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
          <Zap className="h-4 w-4 text-[#0066FF]" />
          Suositellut ajat
        </h4>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {recommendedHours.map((rec, i) => {
            const isAvoid = rec.label.includes('Vältä');
            return (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-3 rounded-lg border px-3 py-2.5',
                  isAvoid
                    ? 'border-red-200 bg-red-50'
                    : 'border-emerald-200 bg-emerald-50'
                )}
              >
                {isAvoid ? (
                  <Ban className="h-4 w-4 flex-shrink-0 text-red-500" />
                ) : rec.label.includes('lataus') ? (
                  <BatteryCharging className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                ) : rec.label.includes('Halvin') ? (
                  <TrendingDown className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                ) : (
                  <Clock className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                )}
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isAvoid ? 'text-red-800' : 'text-emerald-800'
                    )}
                  >
                    {rec.label}
                  </p>
                  <p
                    className={cn(
                      'text-xs',
                      isAvoid ? 'text-red-600' : 'text-emerald-600'
                    )}
                  >
                    ~{formatPriceFi(rec.price)} c/kWh
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison note if tomorrow's prices exist */}
      {showComparison && tomorrowPrices && (
        <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-blue-900">
            <TrendingUp className="h-4 w-4" />
            Arvio vs. toteutunut
          </h4>
          <p className="mt-1 text-xs text-blue-800">
            {(() => {
              const forecast = forecastResult.forecast;
              const diffs = tomorrowPrices
                .map((actual) => {
                  const pred = forecast.find((f) => f.hour === actual.hour);
                  return pred ? Math.abs(actual.price - pred.predictedPrice) : null;
                })
                .filter((d): d is number => d !== null);

              if (diffs.length === 0) return 'Vertailua ei voida laskea.';

              const avgDiff = diffs.reduce((s, v) => s + v, 0) / diffs.length;
              return `Arvion keskimääräinen poikkeama: ${formatPriceFi(avgDiff)} c/kWh (${tomorrowPrices.length} tuntia vertailtu).`;
            })()}
          </p>
        </div>
      )}
    </div>
  );
}
