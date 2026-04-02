'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Atom,
  Droplets,
  Wind,
  Sun,
  Flame,
  ArrowRightLeft,
  Leaf,
  RefreshCw,
  Zap,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductionMix as ProductionMixType } from '@/lib/api/fingrid';

interface ProductionMixProps {
  initialData?: ProductionMixType | null;
}

const SOURCE_CONFIG = {
  nuclear: { label: 'Ydinvoima', color: '#8b5cf6', icon: Atom },
  hydro: { label: 'Vesivoima', color: '#3b82f6', icon: Droplets },
  wind: { label: 'Tuulivoima', color: '#06b6d4', icon: Wind },
  solar: { label: 'Aurinkovoima', color: '#f59e0b', icon: Sun },
  thermal: { label: 'Lauhde/CHP', color: '#ef4444', icon: Flame },
  imports: { label: 'Tuonti', color: '#94a3b8', icon: ArrowRightLeft },
} as const;

type SourceKey = keyof typeof SOURCE_CONFIG;

function formatMW(mw: number): string {
  if (Math.abs(mw) >= 1000) {
    return `${(mw / 1000).toFixed(1).replace('.', ',')} GW`;
  }
  return `${Math.round(mw)} MW`;
}

function formatPercent(value: number): string {
  return `${Math.round(value)} %`;
}

interface PieDataItem {
  name: string;
  value: number;
  mw: number;
  percent: number;
  color: string;
  sourceKey: SourceKey;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: PieDataItem }[];
}

function DonutTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload;
  const config = SOURCE_CONFIG[data.sourceKey];
  const Icon = config.icon;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" style={{ color: data.color }} />
        <p className="text-sm font-semibold text-slate-900">{data.name}</p>
      </div>
      <div className="mt-1.5 space-y-0.5">
        <p className="text-sm text-slate-600">
          <span className="font-medium">{formatMW(data.mw)}</span>
        </p>
        <p className="text-sm text-slate-600">
          <span className="font-medium">{formatPercent(data.percent)}</span> tuotannosta
        </p>
      </div>
    </div>
  );
}

/**
 * Custom label renderer for the donut chart
 */
function renderCustomLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) {
  if (cx == null || cy == null || midAngle == null || innerRadius == null || outerRadius == null || percent == null) return null;
  if (percent < 0.05) return null; // Don't label tiny slices

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

/**
 * Compute CO2 intensity rating based on production mix
 */
function getCO2Rating(data: ProductionMixType): {
  level: 'green' | 'yellow' | 'red';
  label: string;
  description: string;
} {
  const total = data.totalProduction + Math.max(0, data.imports);
  if (total === 0) {
    return { level: 'yellow', label: 'Ei dataa', description: '' };
  }

  const cleanMW = data.nuclear + data.hydro + data.wind + data.solar;
  const cleanPercent = (cleanMW / total) * 100;

  if (cleanPercent >= 80) {
    return {
      level: 'green',
      label: 'Erittäin puhdas',
      description: `${Math.round(cleanPercent)} % tuotannosta on päästötöntä (ydin + uusiutuvat).`,
    };
  }
  if (cleanPercent >= 50) {
    return {
      level: 'yellow',
      label: 'Kohtalainen',
      description: `${Math.round(cleanPercent)} % tuotannosta on päästötöntä. Fossiilista tuotantoa on merkittävästi.`,
    };
  }
  return {
    level: 'red',
    label: 'Korkeat päästöt',
    description: `Vain ${Math.round(cleanPercent)} % tuotannosta on päästötöntä. Fossiiliset polttoaineet dominoivat.`,
  };
}

export default function ProductionMix({ initialData }: ProductionMixProps) {
  const [data, setData] = useState<ProductionMixType | null>(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);
  const [isSample, setIsSample] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/energy/production');
      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
        setIsSample(result.source === 'sample');
        setLastUpdated(result.updatedAt);
      }
    } catch (error) {
      console.error('Failed to fetch production mix:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchData();
    }

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pieData: PieDataItem[] = useMemo(() => {
    if (!data) return [];

    const total = data.nuclear + data.hydro + data.wind + data.solar + data.thermal + Math.max(0, data.imports);
    if (total === 0) return [];

    const sources: { key: SourceKey; value: number }[] = [
      { key: 'nuclear', value: data.nuclear },
      { key: 'hydro', value: data.hydro },
      { key: 'wind', value: data.wind },
      { key: 'solar', value: data.solar },
      { key: 'thermal', value: data.thermal },
      { key: 'imports', value: Math.max(0, data.imports) },
    ];

    return sources
      .filter((s) => s.value > 0)
      .map((s) => ({
        name: SOURCE_CONFIG[s.key].label,
        value: s.value,
        mw: s.value,
        percent: (s.value / total) * 100,
        color: SOURCE_CONFIG[s.key].color,
        sourceKey: s.key,
      }));
  }, [data]);

  const co2Rating = useMemo(() => {
    if (!data) return null;
    return getCO2Rating(data);
  }, [data]);

  const selfSufficiency = useMemo(() => {
    if (!data || data.totalConsumption === 0) return 0;
    return Math.min(100, Math.round((data.totalProduction / data.totalConsumption) * 100));
  }, [data]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
          <div className="h-56 w-56 animate-pulse rounded-full bg-slate-100" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#0066FF]" />
          <h3 className="text-lg font-semibold text-slate-900">
            Sähkön tuotantomix — Suomi
          </h3>
        </div>
        <button
          onClick={fetchData}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          title="Päivitä"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {isSample && (
        <p className="mb-4 text-xs text-amber-600">
          Esimerkkidata — Fingrid API -avain puuttuu
        </p>
      )}

      {/* Key stats bar */}
      <div className="mb-5 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Tuotanto</p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            {formatMW(data.totalProduction)}
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Kulutus</p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            {formatMW(data.totalConsumption)}
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <p className="text-xs font-medium text-slate-500">Omavaraisuus</p>
          <p
            className={cn(
              'mt-1 text-lg font-bold',
              selfSufficiency >= 90
                ? 'text-emerald-600'
                : selfSufficiency >= 70
                  ? 'text-amber-600'
                  : 'text-red-600'
            )}
          >
            {selfSufficiency} %
          </p>
        </div>
      </div>

      {/* Main content: donut chart + source list */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* Donut chart */}
        <div className="relative h-56 w-56 flex-shrink-0 sm:h-64 sm:w-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<DonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-slate-500">Yhteensä</p>
            <p className="text-lg font-bold text-slate-900">
              {formatMW(data.totalProduction)}
            </p>
          </div>
        </div>

        {/* Source breakdown list */}
        <div className="flex-1 space-y-2">
          {pieData.map((source) => {
            const config = SOURCE_CONFIG[source.sourceKey];
            const Icon = config.icon;
            return (
              <div
                key={source.sourceKey}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-slate-50"
              >
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${source.color}15` }}
                >
                  <Icon className="h-4 w-4" style={{ color: source.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">
                      {source.name}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {formatMW(source.mw)}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, source.percent)}%`,
                        backgroundColor: source.color,
                      }}
                    />
                  </div>
                </div>
                <span className="ml-1 w-10 text-right text-xs font-medium text-slate-500">
                  {formatPercent(source.percent)}
                </span>
              </div>
            );
          })}

          {/* Show exports if negative imports */}
          {data.imports < 0 && (
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-slate-50">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                <ArrowRightLeft className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium text-emerald-700">
                  Vienti {formatMW(Math.abs(data.imports))}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CO2 indicator */}
      {co2Rating && (
        <div
          className={cn(
            'mt-5 flex items-start gap-2.5 rounded-lg border px-3 py-2.5',
            co2Rating.level === 'green'
              ? 'border-emerald-200 bg-emerald-50'
              : co2Rating.level === 'yellow'
                ? 'border-amber-200 bg-amber-50'
                : 'border-red-200 bg-red-50'
          )}
        >
          <Leaf
            className={cn(
              'mt-0.5 h-4 w-4 flex-shrink-0',
              co2Rating.level === 'green'
                ? 'text-emerald-600'
                : co2Rating.level === 'yellow'
                  ? 'text-amber-600'
                  : 'text-red-600'
            )}
          />
          <div>
            <p
              className={cn(
                'text-sm font-semibold',
                co2Rating.level === 'green'
                  ? 'text-emerald-800'
                  : co2Rating.level === 'yellow'
                    ? 'text-amber-800'
                    : 'text-red-800'
              )}
            >
              CO₂-intensiteetti: {co2Rating.label}
            </p>
            <p
              className={cn(
                'mt-0.5 text-xs',
                co2Rating.level === 'green'
                  ? 'text-emerald-700'
                  : co2Rating.level === 'yellow'
                    ? 'text-amber-700'
                    : 'text-red-700'
              )}
            >
              {co2Rating.description}
            </p>
          </div>
        </div>
      )}

      {/* Educational note */}
      <div className="mt-4 flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5">
        <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
        <div>
          <p className="text-sm font-medium text-blue-900">
            Tuotantomix vaikuttaa hintaan
          </p>
          <p className="mt-0.5 text-xs text-blue-700">
            Kun tuulivoimaa tuotetaan paljon, sähkön hinta tyypillisesti laskee. Ydinvoima
            tuottaa tasaisesti edullista perusvoimaa. Korkea kulutus ja vähäinen tuotanto
            nostavat hintoja, jolloin tuontisähkön ja lauhdetuotannon osuus kasvaa.
          </p>
        </div>
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <p className="mt-3 text-right text-xs text-slate-400">
          Päivitetty: {new Date(lastUpdated).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}
          {' · '}Seuraava päivitys 5 min
        </p>
      )}
    </div>
  );
}
