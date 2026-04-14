'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';
import { cn } from '@/lib/utils';

interface HistoryEntry {
  date: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  avgPriceNoTax?: number;
}

interface MonthlyEntry {
  month: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  totalConsumptionGWh?: number;
}

interface HistorySummary {
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  yearAgoAvg: number;
  yoyChangePercent: number;
}

type Period = '7d' | '30d' | '3m' | '6m' | '12m';

function formatPriceFi(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate()}.${d.getMonth() + 1}.`;
}

function formatMonthShort(monthStr: string): string {
  const months = [
    'tammi', 'helmi', 'maalis', 'huhti', 'touko',
    'kesä', 'heinä', 'elo', 'syys', 'loka',
    'marras', 'joulu',
  ];
  const [, m] = monthStr.split('-');
  const monthIdx = parseInt(m, 10) - 1;
  return months[monthIdx] || m;
}

function formatDateFull(dateStr: string): string {
  const d = new Date(dateStr);
  const months = [
    'tammikuuta', 'helmikuuta', 'maaliskuuta', 'huhtikuuta', 'toukokuuta',
    'kesäkuuta', 'heinäkuuta', 'elokuuta', 'syyskuuta', 'lokakuuta',
    'marraskuuta', 'joulukuuta',
  ];
  return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatMonthFull(monthStr: string): string {
  const months = [
    'tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu',
    'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu',
    'marraskuu', 'joulukuu',
  ];
  const [year, m] = monthStr.split('-');
  const monthIdx = parseInt(m, 10) - 1;
  return `${months[monthIdx]} ${year}`;
}

/**
 * Calculate simple moving average
 */
function calculateMA(data: { avgPrice: number }[], windowSize: number): (number | null)[] {
  return data.map((_, i) => {
    if (i < windowSize - 1) return null;
    const window = data.slice(i - windowSize + 1, i + 1);
    const sum = window.reduce((acc, d) => acc + d.avgPrice, 0);
    return Math.round((sum / windowSize) * 100) / 100;
  });
}

interface ChartDataItem {
  date: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  ma: number | null;
  dateLabel: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: { payload: ChartDataItem; name: string; color: string; value: number }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload;
  // Check if it looks like a month label (e.g. "tammi", "helmi") vs date
  const isMonthly = data.date.length === 7; // YYYY-MM format

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-slate-900">
        {isMonthly ? formatMonthFull(data.date) : formatDateFull(data.date)}
      </p>
      <div className="mt-1.5 space-y-1">
        <p className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-500">Keskihinta:</span>
          <span className="font-semibold text-accent">{formatPriceFi(data.avgPrice)} c/kWh</span>
        </p>
        <p className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-500">Halvin:</span>
          <span className="font-medium text-emerald-600">{formatPriceFi(data.minPrice)} c/kWh</span>
        </p>
        <p className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-500">Kallein:</span>
          <span className="font-medium text-red-500">{formatPriceFi(data.maxPrice)} c/kWh</span>
        </p>
        {data.ma !== null && (
          <p className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">Liukuva ka:</span>
            <span className="font-medium text-slate-700">{formatPriceFi(data.ma)} c/kWh</span>
          </p>
        )}
      </div>
    </div>
  );
}

function TrendIcon({ direction }: { direction: 'up' | 'down' | 'stable' }) {
  if (direction === 'up') {
    return (
      <svg className="inline h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l9.2-9.2M17 17V7H7" />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg className="inline h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-9.2 9.2M7 7v10h10" />
      </svg>
    );
  }
  return (
    <svg className="inline h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}

export default function PriceHistoryChart() {
  const [period, setPeriod] = useState<Period>('7d');
  const [data, setData] = useState<HistoryEntry[]>([]);
  const [monthly, setMonthly] = useState<MonthlyEntry[]>([]);
  const [summary, setSummary] = useState<HistorySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'live' | 'sample'>('sample');

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/prices/history?period=${period}`);
        const result = await response.json();
        if (result.success && result.data) {
          setData(result.data.daily || []);
          setMonthly(result.data.monthly || []);
          setSummary(result.data.summary || null);
          setDataSource(result.data.source || 'sample');
        }
      } catch (error) {
        console.error('Failed to fetch price history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [period]);

  // For 6m and 12m periods with monthly data, use monthly for the chart
  const useMonthlyChart = (period === '6m' || period === '12m') && monthly.length > 0;

  const maWindowSize = period === '7d' ? 3 : period === '30d' ? 7 : period === '3m' ? 14 : 30;

  const chartSource = useMonthlyChart
    ? monthly.map((m) => ({ date: m.month, avgPrice: m.avgPrice, minPrice: m.minPrice, maxPrice: m.maxPrice }))
    : data;

  const maValues = useMemo(
    () => calculateMA(chartSource, useMonthlyChart ? 3 : maWindowSize),
    [chartSource, useMonthlyChart, maWindowSize]
  );

  const chartData: ChartDataItem[] = useMemo(() => {
    return chartSource.map((entry, i) => ({
      ...entry,
      ma: maValues[i],
      dateLabel: useMonthlyChart
        ? formatMonthShort(entry.date)
        : formatDateShort(entry.date),
    }));
  }, [chartSource, maValues, useMonthlyChart]);

  const periods: { value: Period; label: string }[] = [
    { value: '7d', label: '7 pv' },
    { value: '30d', label: '30 pv' },
    { value: '3m', label: '3 kk' },
    { value: '6m', label: '6 kk' },
    { value: '12m', label: '12 kk' },
  ];

  // Determine tick interval based on data length
  const tickInterval = (() => {
    const len = chartData.length;
    if (len <= 7) return 0;
    if (len <= 31) return 4;
    if (len <= 100) return 13;
    if (len <= 200) return 25;
    return 29;
  })();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-900">Hintahistoria</h3>
          {dataSource === 'sample' && !loading && (
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
              Esimerkkidata
            </span>
          )}
        </div>
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-all',
                period === p.value
                  ? 'bg-white text-accent shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex h-72 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-sm text-slate-400">
          Hintahistoriaa ei ole saatavilla
        </div>
      ) : (
        <>
          <div className="h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="dateLabel"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  interval={tickInterval}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => formatPriceFi(v)}
                  width={50}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="avgPrice"
                  stroke="#0066FF"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                  dot={period === '7d'}
                  activeDot={{ r: 4, fill: '#0066FF' }}
                  name="Keskihinta"
                />
                <Line
                  type="monotone"
                  dataKey="ma"
                  stroke="#94a3b8"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                  connectNulls
                  name="Liukuva keskiarvo"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center justify-center gap-5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-4 rounded bg-accent" />
              <span>{useMonthlyChart ? 'Kuukauden keskihinta' : 'Päivän keskihinta'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-4 rounded border-b border-dashed border-slate-400" />
              <span>Liukuva keskiarvo ({useMonthlyChart ? '3 kk' : `${maWindowSize} pv`})</span>
            </div>
          </div>

          {/* Monthly summary stats */}
          {monthly.length > 0 && (period === '3m' || period === '6m' || period === '12m') && (
            <div className="mt-5 border-t border-slate-100 pt-4">
              <h4 className="mb-3 text-sm font-semibold text-slate-700">Kuukausittainen yhteenveto</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs text-slate-500">
                      <th className="pb-2 pr-4 font-medium">Kuukausi</th>
                      <th className="pb-2 pr-4 text-right font-medium">Keskihinta</th>
                      <th className="pb-2 pr-4 text-right font-medium">Halvin</th>
                      <th className="pb-2 text-right font-medium">Kallein</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthly.slice(-6).map((m) => (
                      <tr key={m.month} className="border-b border-slate-50">
                        <td className="py-1.5 pr-4 text-slate-700">{formatMonthFull(m.month)}</td>
                        <td className="py-1.5 pr-4 text-right font-medium text-accent">
                          {formatPriceFi(m.avgPrice)} c/kWh
                        </td>
                        <td className="py-1.5 pr-4 text-right text-emerald-600">
                          {formatPriceFi(m.minPrice)}
                        </td>
                        <td className="py-1.5 text-right text-red-500">
                          {formatPriceFi(m.maxPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary card */}
          {summary && (
            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <h4 className="mb-3 text-sm font-semibold text-slate-700">Yhteenveto</h4>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-xs text-slate-500">Keskihinta</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatPriceFi(summary.avgPrice)}
                    <span className="ml-1 text-xs font-normal text-slate-500">c/kWh</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Trendi</p>
                  <p className="flex items-center gap-1 text-lg font-semibold text-slate-900">
                    <TrendIcon direction={summary.trend} />
                    <span
                      className={cn(
                        'text-sm',
                        summary.trend === 'up' && 'text-red-500',
                        summary.trend === 'down' && 'text-emerald-500',
                        summary.trend === 'stable' && 'text-slate-500'
                      )}
                    >
                      {summary.trendPercent > 0 ? '+' : ''}
                      {summary.trendPercent.toFixed(1).replace('.', ',')} %
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Vuosi sitten</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatPriceFi(summary.yearAgoAvg)}
                    <span className="ml-1 text-xs font-normal text-slate-500">c/kWh</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Vuosimuutos</p>
                  <p
                    className={cn(
                      'text-lg font-semibold',
                      summary.yoyChangePercent < 0 ? 'text-emerald-600' : summary.yoyChangePercent > 0 ? 'text-red-500' : 'text-slate-900'
                    )}
                  >
                    {summary.yoyChangePercent > 0 ? '+' : ''}
                    {summary.yoyChangePercent.toFixed(1).replace('.', ',')} %
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
