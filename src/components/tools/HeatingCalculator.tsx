'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Flame,
  Home,
  MapPin,
  Thermometer,
  TrendingUp,
  Share2,
  Info,
  Award,
  Settings,
  DollarSign,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Cell,
  ReferenceLine,
} from 'recharts';
import { formatNumber, formatEuros } from '@/lib/utils';

// --- Types ---

type InsulationLevel = 'new' | 'average' | 'old';
type LocationKey = 'south' | 'central' | 'north';
type HeatingMethodKey = 'direct_electric' | 'air_air_pump' | 'air_water_pump' | 'ground_pump' | 'district' | 'oil' | 'pellet';

interface FormState {
  houseSize: number;
  location: LocationKey;
  insulationLevel: InsulationLevel;
  electricityPrice: number; // c/kWh
  customInvestments: boolean;
}

interface HeatingResult {
  key: HeatingMethodKey;
  label: string;
  annualCost: number;
  installationCost: number;
  annualConsumption: string;
  color: string;
  cop?: number;
  fifteenYearTotal: number;
}

// --- Constants ---

const LOCATIONS: { value: LocationKey; label: string; degreeDayFactor: number; climateLabel: string }[] = [
  { value: 'south', label: 'Etelä-Suomi', degreeDayFactor: 1.0, climateLabel: 'Vyöhyke I-II' },
  { value: 'central', label: 'Keski-Suomi', degreeDayFactor: 1.15, climateLabel: 'Vyöhyke III' },
  { value: 'north', label: 'Pohjois-Suomi / Lappi', degreeDayFactor: 1.35, climateLabel: 'Vyöhyke IV' },
];

const INSULATION_LEVELS: { value: InsulationLevel; label: string; factor: number }[] = [
  { value: 'new', label: 'Uusi / hyvä eristys', factor: 0.8 },
  { value: 'average', label: 'Keskimääräinen', factor: 1.0 },
  { value: 'old', label: 'Vanha / heikko eristys', factor: 1.3 },
];

// Base heating energy need: kWh per m² per year (for average insulation, south Finland)
const BASE_HEATING_KWH_PER_M2 = 110;

// Annual electricity price increase for 15-year projection
const ANNUAL_PRICE_INCREASE = 0.02;

// Heating method parameters
const HEATING_METHODS: {
  key: HeatingMethodKey;
  label: string;
  color: string;
  cop: number;
  copLabel?: string;
  // Energy price in c per unit (kWh, liter, kg)
  energyPrice: number;
  // Energy content per unit in kWh (for oil, pellet)
  energyContentKwh?: number;
  // Unit label
  unit: string;
  // Installation cost per m²
  installCostBase: number;
  installCostPerM2: number;
  // Annual maintenance
  annualMaintenance: number;
  // COP reduction in colder climates
  copColdPenalty: number;
}[] = [
  {
    key: 'direct_electric',
    label: 'Suora sähkölämmitys',
    color: '#EF4444',
    cop: 1.0,
    energyPrice: 10, // c/kWh
    unit: 'kWh',
    installCostBase: 0,
    installCostPerM2: 0,
    annualMaintenance: 50,
    copColdPenalty: 0,
  },
  {
    key: 'air_air_pump',
    label: 'Ilma-ilmalämpöpumppu',
    color: '#38BDF8',
    cop: 2.0,
    copLabel: 'COP 2.0',
    energyPrice: 10,
    unit: 'kWh',
    installCostBase: 2500,
    installCostPerM2: 0,
    annualMaintenance: 100,
    copColdPenalty: 0.3,
  },
  {
    key: 'air_water_pump',
    label: 'Ilma-vesilämpöpumppu',
    color: '#0066FF',
    cop: 2.5,
    copLabel: 'COP 2.5',
    energyPrice: 10,
    unit: 'kWh',
    installCostBase: 8000,
    installCostPerM2: 25,
    annualMaintenance: 150,
    copColdPenalty: 0.4,
  },
  {
    key: 'ground_pump',
    label: 'Maalämpöpumppu',
    color: '#10B981',
    cop: 3.5,
    copLabel: 'COP 3.5',
    energyPrice: 10,
    unit: 'kWh',
    installCostBase: 12000,
    installCostPerM2: 50,
    annualMaintenance: 150,
    copColdPenalty: 0.1,
  },
  {
    key: 'district',
    label: 'Kaukolämpö',
    color: '#F59E0B',
    cop: 1.0,
    energyPrice: 8.5, // c/kWh district heating average
    unit: 'kWh',
    installCostBase: 3000,
    installCostPerM2: 10,
    annualMaintenance: 200,
    copColdPenalty: 0,
  },
  {
    key: 'oil',
    label: 'Öljylämmitys',
    color: '#6B7280',
    cop: 0.85,
    energyPrice: 120, // c/liter
    energyContentKwh: 10, // 10 kWh per liter of oil
    unit: 'litraa',
    installCostBase: 5000,
    installCostPerM2: 15,
    annualMaintenance: 300,
    copColdPenalty: 0,
  },
  {
    key: 'pellet',
    label: 'Pelletti',
    color: '#8B5CF6',
    cop: 0.87,
    energyPrice: 30, // c/kg
    energyContentKwh: 4.7, // 4.7 kWh per kg pellet
    unit: 'kg',
    installCostBase: 8000,
    installCostPerM2: 20,
    annualMaintenance: 250,
    copColdPenalty: 0,
  },
];

// --- Calculation ---

function calculateHeating(form: FormState) {
  const locationData = LOCATIONS.find((l) => l.value === form.location)!;
  const insulationData = INSULATION_LEVELS.find((i) => i.value === form.insulationLevel)!;

  // Total heating energy need
  const heatingNeedKwh = Math.round(
    BASE_HEATING_KWH_PER_M2 * form.houseSize * locationData.degreeDayFactor * insulationData.factor
  );

  const results: HeatingResult[] = HEATING_METHODS.map((method) => {
    let annualCost: number;
    let annualConsumption: string;

    // Adjust COP for climate zone (cold penalty for air-source pumps)
    const coldPenalty = form.location === 'north' ? method.copColdPenalty : form.location === 'central' ? method.copColdPenalty * 0.5 : 0;
    const effectiveCop = Math.max(1, method.cop - coldPenalty);

    const price = method.key === 'direct_electric' || method.key === 'air_air_pump' || method.key === 'air_water_pump' || method.key === 'ground_pump'
      ? form.electricityPrice
      : method.energyPrice;

    if (!method.energyContentKwh) {
      // Electric-based heating (direct, heat pumps, district)
      const electricityNeeded = heatingNeedKwh / effectiveCop;
      annualCost = (electricityNeeded * price) / 100 + method.annualMaintenance;
      annualConsumption = `${formatNumber(Math.round(electricityNeeded))} ${method.unit}`;
    } else {
      // Fuel-based (oil, pellet)
      const fuelNeeded = heatingNeedKwh / (method.energyContentKwh * effectiveCop);
      annualCost = (fuelNeeded * method.energyPrice) / 100 + method.annualMaintenance;
      annualConsumption = `${formatNumber(Math.round(fuelNeeded))} ${method.unit}`;
    }

    const installationCost = method.installCostBase + method.installCostPerM2 * form.houseSize;

    // 15-year total cost
    let fifteenYearTotal = installationCost;
    for (let y = 1; y <= 15; y++) {
      const priceMultiplier = Math.pow(1 + ANNUAL_PRICE_INCREASE, y);
      const yearCost = (annualCost - method.annualMaintenance) * priceMultiplier + method.annualMaintenance;
      fifteenYearTotal += yearCost;
    }

    return {
      key: method.key,
      label: method.label,
      annualCost: Math.round(annualCost),
      installationCost,
      annualConsumption,
      color: method.color,
      cop: effectiveCop,
      fifteenYearTotal: Math.round(fifteenYearTotal),
    };
  });

  // 15-year total cost data for line chart
  const fifteenYearData: Array<Record<string, number | string>> = [];
  for (let y = 0; y <= 15; y++) {
    const entry: Record<string, number | string> = { year: y };
    for (const r of results) {
      const method = HEATING_METHODS.find((m) => m.key === r.key)!;
      let cumCost = r.installationCost;
      for (let yr = 1; yr <= y; yr++) {
        const priceMultiplier = Math.pow(1 + ANNUAL_PRICE_INCREASE, yr);
        const yearCost = (r.annualCost - method.annualMaintenance) * priceMultiplier + method.annualMaintenance;
        cumCost += yearCost;
      }
      entry[r.key] = Math.round(cumCost);
    }
    fifteenYearData.push(entry);
  }

  // Find cheapest at year 1 and year 15
  const sortedByAnnual = [...results].sort((a, b) => a.annualCost - b.annualCost);
  const sortedByTotal15 = [...results].sort((a, b) => a.fifteenYearTotal - b.fifteenYearTotal);

  // Break-even calculations vs direct electric
  const directElectric = results.find((r) => r.key === 'direct_electric')!;
  const breakEvenData: { key: HeatingMethodKey; label: string; years: number; color: string }[] = [];
  for (const r of results) {
    if (r.key === 'direct_electric') continue;
    const annualSaving = directElectric.annualCost - r.annualCost;
    if (annualSaving > 0) {
      const breakEven = r.installationCost / annualSaving;
      breakEvenData.push({ key: r.key, label: r.label, years: breakEven, color: r.color });
    }
  }
  breakEvenData.sort((a, b) => a.years - b.years);

  return {
    heatingNeedKwh,
    results,
    fifteenYearData,
    sortedByAnnual,
    sortedByTotal15,
    breakEvenData,
  };
}

// --- Tooltip ---

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
    name: string;
  }>;
  label?: string | number;
}

function AnnualTooltip({ active, payload, label }: ChartTooltipProps) {
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

function FifteenYearTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-sm font-medium text-slate-900">Vuosi {label}</p>
      {[...payload].sort((a, b) => a.value - b.value).map((p) => (
        <p key={p.dataKey} className="text-sm" style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{formatEuros(p.value, 0)}</span>
        </p>
      ))}
    </div>
  );
}

// --- Main Component ---

export default function HeatingCalculator() {
  const [form, setForm] = useState<FormState>({
    houseSize: 140,
    location: 'south',
    insulationLevel: 'average',
    electricityPrice: 10,
    customInvestments: false,
  });

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const result = useMemo(() => calculateHeating(form), [form]);

  const handleShare = useCallback(() => {
    const params = new URLSearchParams({
      m2: String(form.houseSize),
      loc: form.location,
      ins: form.insulationLevel,
      ep: String(form.electricityPrice),
    });
    const url = `${window.location.origin}/tyokalut/lammitys?${params.toString()}`;
    navigator.clipboard.writeText(url);
  }, [form]);

  // Bar chart data for annual costs
  const annualBarData = useMemo(
    () => result.results.map((r) => ({ name: r.label, value: r.annualCost, fill: r.color })),
    [result.results]
  );

  // Bar chart data for break-even
  const breakEvenBarData = useMemo(
    () => result.breakEvenData.map((b) => ({
      name: b.label,
      value: Math.round(b.years * 10) / 10,
      fill: b.color,
    })),
    [result.breakEvenData]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4 text-sm text-slate-500">
          <Link href="/tyokalut" className="hover:text-[#0066FF]">Työkalut</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Lämmityskustannuslaskuri</span>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50">
            <Flame className="h-5 w-5 text-rose-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Lämmityskustannuslaskuri
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-slate-600">
          Vertaa eri lämmitysmuotojen vuosikustannuksia ja 15 vuoden kokonaiskustannuksia
          asennuskuluineen. Huomioi ilmastovyöhyke ja lämpöpumppujen COP-arvot.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* --- LEFT: Form --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* House size */}
          <FieldGroup label={`Talon koko: ${form.houseSize} m²`} icon={Home}>
            <input
              type="range"
              min={50}
              max={300}
              step={10}
              value={form.houseSize}
              onChange={(e) => update('houseSize', Number(e.target.value))}
              className="w-full accent-[#0066FF]"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>50 m²</span>
              <span>300 m²</span>
            </div>
          </FieldGroup>

          {/* Location */}
          <FieldGroup label="Ilmastovyöhyke" icon={MapPin}>
            <div className="grid grid-cols-1 gap-2">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.value}
                  onClick={() => update('location', loc.value)}
                  className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all ${
                    form.location === loc.value
                      ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="block">{loc.label}</span>
                  <span className="block text-xs text-slate-500">{loc.climateLabel}</span>
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Insulation */}
          <FieldGroup label="Eristystaso" icon={Thermometer}>
            <div className="grid grid-cols-1 gap-2">
              {INSULATION_LEVELS.map((ins) => (
                <button
                  key={ins.value}
                  onClick={() => update('insulationLevel', ins.value)}
                  className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all ${
                    form.insulationLevel === ins.value
                      ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {ins.label}
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Electricity price */}
          <FieldGroup label={`Sähkön hinta: ${form.electricityPrice} c/kWh`} icon={DollarSign}>
            <input
              type="range"
              min={4}
              max={25}
              step={0.5}
              value={form.electricityPrice}
              onChange={(e) => update('electricityPrice', Number(e.target.value))}
              className="w-full accent-[#0066FF]"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>4 c/kWh</span>
              <span>25 c/kWh</span>
            </div>
          </FieldGroup>

          {/* Heating need info */}
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Arvioitu lämmitystarve:</span>{' '}
              {formatNumber(result.heatingNeedKwh)} kWh/vuosi
            </p>
            <p className="mt-1 text-xs text-blue-600">
              Perustuu {form.houseSize} m² taloon, {LOCATIONS.find((l) => l.value === form.location)?.label}, {INSULATION_LEVELS.find((i) => i.value === form.insulationLevel)?.label?.toLowerCase()} eristys
            </p>
          </div>

          {/* COP info card */}
          <div className="rounded-xl bg-emerald-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-800">Lämpöpumppujen COP-arvot</span>
            </div>
            <p className="text-xs text-emerald-700 mb-2">
              COP kertoo kuinka monta kWh lämpöenergiaa pumppu tuottaa yhdellä kWh sähköä.
              {form.location !== 'south' && ' Kylmässä ilmastossa ilmalämpöpumppujen COP laskee.'}
            </p>
            <div className="space-y-1">
              {result.results
                .filter((r) => r.cop && r.cop > 1 && r.key !== 'district')
                .map((r) => (
                  <div key={r.key} className="flex items-center justify-between text-xs">
                    <span className="text-emerald-700">{r.label}</span>
                    <span className="font-semibold text-emerald-800">COP {r.cop!.toFixed(1)}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT: Results --- */}
        <div className="lg:col-span-3 space-y-6">
          {/* Recommendation */}
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">Suositus</h2>
              <button
                onClick={handleShare}
                className="ml-auto flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                title="Kopioi linkki leikepöydälle"
              >
                <Share2 className="h-3.5 w-3.5" />
                Jaa
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-700">
              <span className="font-semibold">Edullisin vuosikustannus:</span>{' '}
              {result.sortedByAnnual[0].label} ({formatEuros(result.sortedByAnnual[0].annualCost, 0)}/v)
            </p>
            <p className="mt-1 text-sm text-slate-700">
              <span className="font-semibold">Edullisin 15 vuodessa:</span>{' '}
              {result.sortedByTotal15[0].label} (
              {formatEuros(result.sortedByTotal15[0].fifteenYearTotal, 0)}
              )
            </p>
            {result.breakEvenData.length > 0 && (
              <p className="mt-1 text-sm text-slate-700">
                <span className="font-semibold">Nopein takaisinmaksu:</span>{' '}
                {result.breakEvenData[0].label} ({result.breakEvenData[0].years.toFixed(1)} v vs. suora sähkö)
              </p>
            )}
          </div>

          {/* Annual cost comparison table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Vuosikustannusten vertailu
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 pr-4 text-left font-semibold text-slate-700">
                      Lämmitysmuoto
                    </th>
                    <th className="pb-3 pr-4 text-right font-semibold text-slate-700">
                      COP
                    </th>
                    <th className="pb-3 pr-4 text-right font-semibold text-slate-700">
                      Kulutus / v
                    </th>
                    <th className="pb-3 pr-4 text-right font-semibold text-slate-700">
                      Vuosikustannus
                    </th>
                    <th className="pb-3 pr-4 text-right font-semibold text-slate-700">
                      Asennus
                    </th>
                    <th className="pb-3 text-right font-semibold text-slate-700">
                      15 v yhteensä
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((r) => (
                    <tr key={r.key} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block h-3 w-3 rounded-sm"
                            style={{ backgroundColor: r.color }}
                          />
                          <span className="font-medium text-slate-800">{r.label}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-right text-slate-600">
                        {r.cop && r.cop > 1 ? r.cop.toFixed(1) : '—'}
                      </td>
                      <td className="py-3 pr-4 text-right text-slate-600">
                        {r.annualConsumption}
                      </td>
                      <td className="py-3 pr-4 text-right font-semibold text-slate-900">
                        {formatEuros(r.annualCost, 0)}
                      </td>
                      <td className="py-3 pr-4 text-right text-slate-600">
                        {r.installationCost > 0 ? formatEuros(r.installationCost, 0) : '—'}
                      </td>
                      <td className="py-3 text-right font-semibold text-slate-900">
                        {formatEuros(r.fifteenYearTotal, 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Annual cost bar chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              Vuosikustannukset
            </h3>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={annualBarData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(v: number) => `${v} €`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                    width={150}
                  />
                  <Tooltip content={<AnnualTooltip />} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={30} name="Vuosikustannus">
                    {annualBarData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Break-even chart */}
          {breakEvenBarData.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                Takaisinmaksuaika vs. suora sähkö
              </h3>
              <p className="mb-4 text-sm text-slate-500">
                Kuinka nopeasti lämpöpumppuinvestointi maksaa itsensä takaisin verrattuna suoraan sähkölämmitykseen
              </p>
              <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={breakEvenBarData}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickFormatter={(v: number) => `${v} v`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={false}
                      width={150}
                    />
                    <Tooltip
                      formatter={(value) => [`${Number(value).toFixed(1)} vuotta`, 'Takaisinmaksu']}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={30} name="Takaisinmaksu">
                      {breakEvenBarData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* 15-year total cost chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              15 vuoden kokonaiskustannus
            </h3>
            <p className="mb-4 text-sm text-slate-500">
              Sisältää asennuskustannuksen, vuotuiset käyttökustannukset ja 2 % vuotuisen hinnannousun
            </p>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={result.fifteenYearData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    label={{ value: 'Vuosi', position: 'insideBottomRight', offset: -5, fontSize: 11, fill: '#94a3b8' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                    width={45}
                  />
                  <Tooltip content={<FifteenYearTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={60}
                    formatter={(value: string) => (
                      <span className="text-xs text-slate-600">{value}</span>
                    )}
                  />
                  {HEATING_METHODS.map((method) => (
                    <Line
                      key={method.key}
                      type="monotone"
                      dataKey={method.key}
                      name={method.label}
                      stroke={method.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>
              Arviot ovat suuntaa-antavia ja perustuvat keskimääräisiin hintoihin vuonna 2025.
              COP-arvot ovat vuosikeskiarvoja ja vaihtelevat ulkolämpötilan mukaan.
              Todellisiin kustannuksiin vaikuttavat energian hintavaihtelut, talon kunto,
              lämmitysjärjestelmän tehokkuus ja monet muut tekijät. Pyydä tarjous
              lämmitysjärjestelmän toimittajalta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Subcomponents ---

function FieldGroup({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-500" />
        <span className="text-sm font-semibold text-slate-800">{label}</span>
      </div>
      {children}
    </div>
  );
}
