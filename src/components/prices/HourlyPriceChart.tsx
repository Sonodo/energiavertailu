'use client';

import { useMemo } from 'react';
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
import type { HourlyPrice } from '@/types';

interface HourlyPriceChartProps {
  prices: HourlyPrice[];
  title: string;
  highlightCurrentHour?: boolean;
}

function getBarColor(price: number): string {
  if (price < 5) return '#10b981'; // emerald-500
  if (price < 10) return '#f59e0b'; // amber-500
  if (price < 15) return '#f97316'; // orange-500
  return '#ef4444'; // red-500
}

function formatPriceFi(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

interface ChartDataItem {
  hour: number;
  label: string;
  price: number;
  color: string;
  isCurrent: boolean;
}

interface TooltipProps {
  active?: boolean;
  payload?: { payload: ChartDataItem }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-slate-900">
        klo {String(data.hour).padStart(2, '0')}:00 – {String(data.hour + 1).padStart(2, '0')}:00
      </p>
      <p className="mt-1 text-lg font-bold" style={{ color: data.color }}>
        {formatPriceFi(data.price)} c/kWh
      </p>
      {data.isCurrent && (
        <p className="mt-0.5 text-xs font-medium text-[#0066FF]">Nykyinen tunti</p>
      )}
    </div>
  );
}

export default function HourlyPriceChart({
  prices,
  title,
  highlightCurrentHour = false,
}: HourlyPriceChartProps) {
  const currentHour = new Date().getHours();

  const chartData: ChartDataItem[] = useMemo(() => {
    return prices.map((p) => ({
      hour: p.hour,
      label: String(p.hour).padStart(2, '0'),
      price: p.price,
      color: getBarColor(p.price),
      isCurrent: highlightCurrentHour && p.hour === currentHour,
    }));
  }, [prices, highlightCurrentHour, currentHour]);

  const avgPrice = useMemo(() => {
    if (prices.length === 0) return 0;
    return prices.reduce((sum, p) => sum + p.price, 0) / prices.length;
  }, [prices]);

  if (prices.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-4 text-base font-semibold text-slate-900 sm:text-lg">{title}</h3>

      <div className="h-60 sm:h-80">
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
            <ReferenceLine
              y={avgPrice}
              stroke="#0066FF"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: `Keskiarvo ${formatPriceFi(avgPrice)}`,
                position: 'insideTopRight',
                fill: '#0066FF',
                fontSize: 11,
                fontWeight: 600,
              }}
            />
            <Bar dataKey="price" radius={[4, 4, 0, 0]} maxBarSize={32}>
              {chartData.map((entry) => (
                <Cell
                  key={`cell-${entry.hour}`}
                  fill={entry.color}
                  stroke={entry.isCurrent ? '#0066FF' : 'transparent'}
                  strokeWidth={entry.isCurrent ? 2.5 : 0}
                  opacity={entry.isCurrent ? 1 : 0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500" />
          <span>&lt; 5 c/kWh</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-500" />
          <span>5–10 c/kWh</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-orange-500" />
          <span>10–15 c/kWh</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-red-500" />
          <span>&gt; 15 c/kWh</span>
        </div>
        {highlightCurrentHour && (
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm border-2 border-[#0066FF] bg-transparent" />
            <span>Nykyinen tunti</span>
          </div>
        )}
      </div>
    </div>
  );
}
