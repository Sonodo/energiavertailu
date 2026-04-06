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
import type { QuarterHourPrice } from '@/types';

interface QuarterHourChartProps {
  prices: QuarterHourPrice[];
  title: string;
  highlightCurrentQuarter?: boolean;
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

function formatTimeSlot(hour: number, quarter: number): string {
  const startH = String(hour).padStart(2, '0');
  const startM = String(quarter * 15).padStart(2, '0');
  const endM = quarter === 3 ? '00' : String((quarter + 1) * 15).padStart(2, '0');
  const endH = quarter === 3 ? String(hour + 1).padStart(2, '0') : startH;
  return `${startH}:${startM}\u2013${endH}:${endM}`;
}

interface ChartDataItem {
  index: number;
  hour: number;
  quarter: number;
  label: string;
  fullLabel: string;
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
      <p className="text-sm font-medium text-slate-900">{data.fullLabel}</p>
      <p className="mt-1 text-lg font-bold" style={{ color: data.color }}>
        {formatPriceFi(data.price)} c/kWh
      </p>
      {data.isCurrent && (
        <p className="mt-0.5 text-xs font-medium text-[#0066FF]">Nykyinen varttitunti</p>
      )}
    </div>
  );
}

export default function QuarterHourChart({
  prices,
  title,
  highlightCurrentQuarter = false,
}: QuarterHourChartProps) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentQuarter = Math.floor(now.getMinutes() / 15);

  const chartData: ChartDataItem[] = useMemo(() => {
    return prices.map((p, idx) => ({
      index: idx,
      hour: p.hour,
      quarter: p.quarter,
      // Show hour label only on first quarter of each hour
      label: p.quarter === 0 ? String(p.hour).padStart(2, '0') : '',
      fullLabel: formatTimeSlot(p.hour, p.quarter),
      price: p.price,
      color: getBarColor(p.price),
      isCurrent:
        highlightCurrentQuarter &&
        p.hour === currentHour &&
        p.quarter === currentQuarter,
    }));
  }, [prices, highlightCurrentQuarter, currentHour, currentQuarter]);

  const avgPrice = useMemo(() => {
    if (prices.length === 0) return 0;
    return prices.reduce((sum, p) => sum + p.price, 0) / prices.length;
  }, [prices]);

  if (prices.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <span className="inline-flex items-center rounded-full bg-[#0066FF]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0066FF]">
          96 jaksoa
        </span>
      </div>

      {/* Scrollable chart container on mobile */}
      <div className="h-72 sm:h-80">
        <div className="h-full min-w-[600px] sm:min-w-0 overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => formatPriceFi(v)}
                width={50}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              />
              <ReferenceLine
                y={avgPrice}
                stroke="#0066FF"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: `Ka. ${formatPriceFi(avgPrice)}`,
                  position: 'insideTopRight',
                  fill: '#0066FF',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
              <Bar dataKey="price" radius={[2, 2, 0, 0]} maxBarSize={12}>
                {chartData.map((entry) => (
                  <Cell
                    key={`cell-${entry.index}`}
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
        {highlightCurrentQuarter && (
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm border-2 border-[#0066FF] bg-transparent" />
            <span>Nykyinen varttitunti</span>
          </div>
        )}
      </div>
    </div>
  );
}
