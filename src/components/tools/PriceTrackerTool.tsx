'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Info,
  BarChart3,
  Zap,
  ArrowRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  ReferenceLine,
} from 'recharts';
import { formatEuros } from '@/lib/utils';
import {
  PRICE_HISTORY,
  TRACKED_PROVIDERS,
  getMonthLabel,
} from '@/data/price-tracker-data';

// --- Types ---

type ViewMode = 'providers' | 'comparison';

// --- Custom Tooltip ---

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
    name: string;
  }>;
  label?: string;
}

function PriceTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-sm font-medium text-slate-900">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm" style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value.toFixed(2)} c/kWh</span>
        </p>
      ))}
    </div>
  );
}

function ComparisonTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-sm font-medium text-slate-900">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm" style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{formatEuros(p.value, 0)}</span>
        </p>
      ))}
    </div>
  );
}

// --- Main Component ---

export default function PriceTrackerTool() {
  const [viewMode, setViewMode] = useState<ViewMode>('providers');
  const [selectedProvider, setSelectedProvider] = useState('fortum');
  const [fixedPrice, setFixedPrice] = useState(8.0); // c/kWh for comparison
  const [monthlyConsumption, setMonthlyConsumption] = useState(500); // kWh/month

  // Provider fixed contract history chart data
  const providerFixedData = useMemo(() => {
    return PRICE_HISTORY.map((m) => {
      const entry: Record<string, string | number> = {
        month: getMonthLabel(m.month),
      };
      for (const provider of TRACKED_PROVIDERS) {
        const pData = m.providers[provider.slug];
        if (pData) {
          entry[provider.slug] = pData.fixed12;
        }
      }
      entry['spot'] = m.avgSpot;
      return entry;
    });
  }, []);

  // Single provider detail data
  const singleProviderData = useMemo(() => {
    const provider = TRACKED_PROVIDERS.find((p) => p.slug === selectedProvider);
    if (!provider) return [];
    return PRICE_HISTORY.map((m) => {
      const pData = m.providers[provider.slug];
      return {
        month: getMonthLabel(m.month),
        fixed12: pData?.fixed12 ?? 0,
        spotTotal: m.avgSpot + (pData?.spot ?? 0),
        avgSpot: m.avgSpot,
      };
    });
  }, [selectedProvider]);

  // Fixed vs Spot comparison data
  const comparisonData = useMemo(() => {
    return PRICE_HISTORY.map((m) => {
      const spotCost = (m.avgSpot * monthlyConsumption) / 100;
      const fixedCost = (fixedPrice * monthlyConsumption) / 100;
      return {
        month: getMonthLabel(m.month),
        spot: Math.round(spotCost * 100) / 100,
        fixed: Math.round(fixedCost * 100) / 100,
      };
    });
  }, [fixedPrice, monthlyConsumption]);

  // Totals for comparison
  const comparisonTotals = useMemo(() => {
    const totalSpot = comparisonData.reduce((acc, d) => acc + d.spot, 0);
    const totalFixed = comparisonData.reduce((acc, d) => acc + d.fixed, 0);
    return {
      totalSpot: Math.round(totalSpot * 100) / 100,
      totalFixed: Math.round(totalFixed * 100) / 100,
      difference: Math.round((totalFixed - totalSpot) * 100) / 100,
      spotWins: totalSpot < totalFixed,
    };
  }, [comparisonData]);

  // Market trends
  const trends = useMemo(() => {
    const last3 = PRICE_HISTORY.slice(-3);
    const first3 = PRICE_HISTORY.slice(0, 3);
    const avgSpotRecent = last3.reduce((a, b) => a + b.avgSpot, 0) / 3;
    const avgSpotOld = first3.reduce((a, b) => a + b.avgSpot, 0) / 3;
    const spotTrend = avgSpotRecent > avgSpotOld ? 'up' : 'down';

    const avgFixedRecent =
      last3.reduce((a, b) => a + (b.providers.fortum?.fixed12 ?? 0), 0) / 3;
    const avgFixedOld =
      first3.reduce((a, b) => a + (b.providers.fortum?.fixed12 ?? 0), 0) / 3;
    const fixedTrend = avgFixedRecent > avgFixedOld ? 'up' : 'down';

    const currentSpot = PRICE_HISTORY[PRICE_HISTORY.length - 1].avgSpot;
    const currentFixed =
      PRICE_HISTORY[PRICE_HISTORY.length - 1].providers.fortum?.fixed12 ?? 0;

    // Recommendation: if spot has been lower than fixed consistently, spot is better
    const monthsSpotWins = PRICE_HISTORY.filter((m) => {
      const bestFixed = Math.min(
        ...Object.values(m.providers).map((p) => p.fixed12)
      );
      return m.avgSpot < bestFixed;
    }).length;

    return {
      avgSpotRecent: Math.round(avgSpotRecent * 100) / 100,
      spotTrend,
      avgFixedRecent: Math.round(avgFixedRecent * 100) / 100,
      fixedTrend,
      currentSpot,
      currentFixed,
      monthsSpotWins,
      totalMonths: PRICE_HISTORY.length,
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4 text-sm text-slate-500">
          <Link href="/tyokalut" className="hover:text-accent">
            Työkalut
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Hintaseuranta</span>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
            <TrendingUp className="h-5 w-5 text-violet-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Sähkön hintaseuranta
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-slate-600">
          Seuraa sähköyhtiöiden sopimushintojen kehitystä, vertaa kiinteän ja pörssisähkön
          historiaa ja katso kannattaako kiinteä sopimus juuri nyt.
        </p>
      </div>

      {/* View mode toggle */}
      <div className="mb-8 flex gap-2">
        <button
          onClick={() => setViewMode('providers')}
          className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
            viewMode === 'providers'
              ? 'border-accent bg-accent/5 text-accent'
              : 'border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          Yhtiöiden hintahistoria
        </button>
        <button
          onClick={() => setViewMode('comparison')}
          className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
            viewMode === 'comparison'
              ? 'border-accent bg-accent/5 text-accent'
              : 'border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          Kiinteä vs. pörssi
        </button>
      </div>

      {viewMode === 'providers' ? (
        <div className="space-y-8">
          {/* All providers fixed price chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-bold text-slate-900">
              Kiinteän sähkön hintakehitys (12 kk sopimus)
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              Suurimpien sähköyhtiöiden 12 kuukauden kiinteähintaisen sopimuksen
              hintakehitys sekä pörssisähkön keskihinta
            </p>
            <div className="h-80 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={providerFixedData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${v} c`}
                    width={45}
                    domain={[0, 'auto']}
                  />
                  <Tooltip content={<PriceTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={50}
                    formatter={(value: string) => (
                      <span className="text-xs text-slate-600">{value}</span>
                    )}
                  />
                  {TRACKED_PROVIDERS.map((provider) => (
                    <Line
                      key={provider.slug}
                      type="monotone"
                      dataKey={provider.slug}
                      name={provider.name}
                      stroke={provider.color}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  ))}
                  <Line
                    type="monotone"
                    dataKey="spot"
                    name="Pörssisähkö (ka.)"
                    stroke="#94A3B8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Single provider detail */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Yksittäisen yhtiön hintahistoria
            </h3>
            <div className="mb-4 flex flex-wrap gap-2">
              {TRACKED_PROVIDERS.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => setSelectedProvider(p.slug)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    selectedProvider === p.slug
                      ? 'border-accent bg-accent/5 text-accent'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={singleProviderData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${v} c`}
                    width={45}
                    domain={[0, 'auto']}
                  />
                  <Tooltip content={<PriceTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value: string) => (
                      <span className="text-xs text-slate-600">{value}</span>
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="fixed12"
                    name="Kiinteä 12 kk"
                    stroke={
                      TRACKED_PROVIDERS.find((p) => p.slug === selectedProvider)
                        ?.color ?? '#0066FF'
                    }
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="spotTotal"
                    name="Pörssi + marginaali"
                    stroke="#94A3B8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgSpot"
                    name="Pörssi (ilman marg.)"
                    stroke="#CBD5E1"
                    strokeWidth={1.5}
                    strokeDasharray="2 2"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Price table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Nykyiset hinnat</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 pr-4 text-left font-semibold text-slate-700">
                      Yhtiö
                    </th>
                    <th className="pb-3 pr-4 text-right font-semibold text-slate-700">
                      Kiinteä 12 kk
                    </th>
                    <th className="pb-3 pr-4 text-right font-semibold text-slate-700">
                      Pörssimarginaali
                    </th>
                    <th className="pb-3 text-right font-semibold text-slate-700">
                      Muutos 6 kk
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TRACKED_PROVIDERS.map((provider) => {
                    const current = PRICE_HISTORY[PRICE_HISTORY.length - 1].providers[provider.slug];
                    const sixMonthsAgo = PRICE_HISTORY[Math.max(0, PRICE_HISTORY.length - 7)]?.providers[provider.slug];
                    const change = current && sixMonthsAgo ? current.fixed12 - sixMonthsAgo.fixed12 : 0;
                    return (
                      <tr key={provider.slug} className="border-b border-slate-100 last:border-0">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block h-3 w-3 rounded-sm"
                              style={{ backgroundColor: provider.color }}
                            />
                            <span className="font-medium text-slate-800">
                              {provider.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-right font-semibold text-slate-900">
                          {current?.fixed12.toFixed(2)} c/kWh
                        </td>
                        <td className="py-3 pr-4 text-right text-slate-600">
                          {current?.spot.toFixed(2)} c/kWh
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`font-medium ${
                              change < 0
                                ? 'text-emerald-600'
                                : change > 0
                                ? 'text-red-600'
                                : 'text-slate-500'
                            }`}
                          >
                            {change > 0 ? '+' : ''}
                            {change.toFixed(2)} c
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Comparison controls */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-800">
                  Kiinteä hinta: {fixedPrice.toFixed(1)} c/kWh
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={15}
                step={0.1}
                value={fixedPrice}
                onChange={(e) => setFixedPrice(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>4 c/kWh</span>
                <span>15 c/kWh</span>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-800">
                  Kuukausikulutus: {monthlyConsumption} kWh
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={3000}
                step={50}
                value={monthlyConsumption}
                onChange={(e) => setMonthlyConsumption(Number(e.target.value))}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>100 kWh</span>
                <span>3 000 kWh</span>
              </div>
            </div>
          </div>

          {/* Comparison result summary */}
          <div
            className={`rounded-2xl border p-6 shadow-sm ${
              comparisonTotals.spotWins
                ? 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50'
                : 'border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50'
            }`}
          >
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              12 kuukauden vertailu
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-500">Pörssisähkö yhteensä</p>
                <p className="mt-1 text-lg font-bold text-slate-700">
                  {formatEuros(comparisonTotals.totalSpot, 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">
                  Kiinteä ({fixedPrice.toFixed(1)} c) yhteensä
                </p>
                <p className="mt-1 text-lg font-bold text-slate-700">
                  {formatEuros(comparisonTotals.totalFixed, 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Ero</p>
                <p
                  className={`mt-1 text-lg font-bold ${
                    comparisonTotals.spotWins
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                  }`}
                >
                  {comparisonTotals.spotWins ? 'Pörssi edullisempi' : 'Kiinteä edullisempi'}
                </p>
                <p className="text-xs text-slate-600">
                  {formatEuros(Math.abs(comparisonTotals.difference), 0)} eroa
                </p>
              </div>
            </div>
          </div>

          {/* Monthly comparison chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              Kuukausittainen kustannusvertailu
            </h3>
            <p className="mb-4 text-sm text-slate-500">
              Pörssisähkö vs. kiinteä sopimus ({fixedPrice.toFixed(1)} c/kWh), kulutus{' '}
              {monthlyConsumption} kWh/kk
            </p>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${v} €`}
                    width={45}
                  />
                  <Tooltip content={<ComparisonTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value: string) => (
                      <span className="text-xs text-slate-600">{value}</span>
                    )}
                  />
                  <Bar
                    dataKey="spot"
                    name="Pörssisähkö"
                    fill="#94A3B8"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                  <Bar
                    dataKey="fixed"
                    name={`Kiinteä ${fixedPrice.toFixed(1)} c`}
                    fill="#0066FF"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Market trends summary (always visible) */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-violet-500" />
          <h3 className="text-lg font-bold text-slate-900">
            Markkinakatsaus
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Pörssihinnan trendi (3 kk ka.)</p>
            <div className="mt-1 flex items-center gap-2">
              {trends.spotTrend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-emerald-500" />
              )}
              <p className="text-lg font-bold text-slate-900">
                {trends.avgSpotRecent} c/kWh
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {trends.spotTrend === 'up' ? 'Nouseva trendi' : 'Laskeva trendi'}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Kiinteän hinnan trendi (3 kk ka.)</p>
            <div className="mt-1 flex items-center gap-2">
              {trends.fixedTrend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-emerald-500" />
              )}
              <p className="text-lg font-bold text-slate-900">
                {trends.avgFixedRecent} c/kWh
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {trends.fixedTrend === 'up' ? 'Nouseva trendi' : 'Laskeva trendi'}
            </p>
          </div>
          <div className="rounded-xl bg-violet-50 p-4">
            <p className="text-xs text-slate-500">Kannattaako kiinnittää nyt?</p>
            <p className="mt-1 text-lg font-bold text-violet-700">
              {trends.monthsSpotWins >= trends.totalMonths * 0.7
                ? 'Pörssi kannattanut'
                : trends.monthsSpotWins >= trends.totalMonths * 0.4
                ? 'Tasainen tilanne'
                : 'Kiinteä kannattanut'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Pörssi edullisempi {trends.monthsSpotWins}/{trends.totalMonths} kuukaudessa
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Yhteenveto:</span>{' '}
            {trends.monthsSpotWins >= trends.totalMonths * 0.7
              ? 'Pörssisähkö on ollut selkeästi edullisempi viimeisen 12 kuukauden aikana. Jos siedät hintavaihtelua, pörssisähkö on todennäköisesti edelleen edullisin vaihtoehto.'
              : trends.monthsSpotWins >= trends.totalMonths * 0.4
              ? 'Tilanne pörssin ja kiinteän välillä on ollut tasainen. Kiinteä sopimus tuo ennustettavuutta, mutta pörssissä on säästöpotentiaalia optimoidulla kulutuksella.'
              : 'Kiinteä sopimus on ollut edullisempi viime kuukausina korkeiden talvihintojen vuoksi. Jos et halua riskiä hintapiikeistä, kiinteä on turvallinen valinta.'}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8">
        <Link
          href="/vertailu"
          className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-700"
        >
          Vertaa nykyisiä sähkösopimuksia
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
        <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <p>
          Hintatiedot ovat suuntaa-antavia ja perustuvat julkisesti saatavilla oleviin
          tietoihin. Todellinen hinta voi poiketa sopimuksen ehdoista ja ajankohdasta
          riippuen. Pörssisähkön hinnat sisältävät ALV:n 25,5 %. Tarkista aina
          ajantasaiset hinnat suoraan sähköyhtiöltä.
        </p>
      </div>
    </div>
  );
}
