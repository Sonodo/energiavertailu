'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Sun,
  MapPin,
  Ruler,
  Compass,
  Zap,
  TrendingUp,
  Leaf,
  Share2,
  Info,
  Battery,
  DollarSign,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { formatNumber, formatEuros } from '@/lib/utils';

// --- Types ---

type Orientation = 'S' | 'SW' | 'SE' | 'W' | 'E';
type CityKey = 'helsinki' | 'turku' | 'tampere' | 'oulu' | 'kuopio' | 'jyvaskyla' | 'rovaniemi' | 'vaasa';

interface FormState {
  city: CityKey;
  roofArea: number;
  orientation: Orientation;
  roofAngle: number;
  annualConsumption: number;
  electricityPrice: number; // c/kWh
  feedInPrice: number; // c/kWh sell-back price
  batteryEnabled: boolean;
  batteryCapacity: number; // kWh
}

// --- Constants ---

const CITIES: { value: CityKey; label: string; solarKwhPerKwp: number }[] = [
  { value: 'turku', label: 'Turku', solarKwhPerKwp: 920 },
  { value: 'helsinki', label: 'Helsinki', solarKwhPerKwp: 900 },
  { value: 'vaasa', label: 'Vaasa', solarKwhPerKwp: 890 },
  { value: 'tampere', label: 'Tampere', solarKwhPerKwp: 880 },
  { value: 'jyvaskyla', label: 'Jyväskylä', solarKwhPerKwp: 870 },
  { value: 'kuopio', label: 'Kuopio', solarKwhPerKwp: 860 },
  { value: 'oulu', label: 'Oulu', solarKwhPerKwp: 850 },
  { value: 'rovaniemi', label: 'Rovaniemi', solarKwhPerKwp: 800 },
];

const ORIENTATIONS: { value: Orientation; label: string; factor: number }[] = [
  { value: 'S', label: 'Etelä (S)', factor: 1.0 },
  { value: 'SW', label: 'Lounas (SW)', factor: 0.95 },
  { value: 'SE', label: 'Kaakko (SE)', factor: 0.95 },
  { value: 'W', label: 'Länsi (W)', factor: 0.85 },
  { value: 'E', label: 'Itä (E)', factor: 0.85 },
];

const BATTERY_OPTIONS = [5, 10, 15, 20]; // kWh
const BATTERY_COST_PER_KWH = 800; // €/kWh installed price

// Average panel: ~400 Wp, ~1.8 m² per panel
const WP_PER_PANEL = 400;
const M2_PER_PANEL = 1.8;
const COST_PER_KWP = 1400; // €/kWp installed (average Finnish market price 2024-2025)
const PANEL_DEGRADATION = 0.005; // 0.5% per year
const CO2_PER_KWH = 0.072; // kg CO2/kWh (Finnish grid average)
const ELECTRICITY_PRICE_INCREASE = 0.02; // 2% annual increase assumption

function getAngleFactor(angle: number): number {
  // Optimal angle for Finland is ~40°. Deviation reduces output.
  const optimal = 40;
  const diff = Math.abs(angle - optimal);
  if (diff <= 10) return 1.0;
  if (diff <= 20) return 0.95;
  if (diff <= 30) return 0.88;
  return 0.80;
}

// Battery self-consumption improvement model
// A battery shifts surplus daytime production to evening/night use
function getBatterySelfConsumptionBoost(
  batteryKwh: number,
  annualProduction: number,
  annualConsumption: number,
  baseSelfConsumptionPercent: number
): number {
  // Estimate daily surplus that battery can capture
  const dailyProduction = annualProduction / 365;
  const dailySurplus = dailyProduction * (1 - baseSelfConsumptionPercent);
  // Battery can store up to its capacity per day (one cycle)
  const dailyCaptured = Math.min(dailySurplus, batteryKwh);
  // But can only use it if there's evening/night demand
  const dailyConsumption = annualConsumption / 365;
  const eveningDemand = dailyConsumption * 0.5; // ~50% of demand is evening/night
  const actualUsed = Math.min(dailyCaptured, eveningDemand);
  // Convert to annual improvement
  const annualCaptured = actualUsed * 365;
  const newSelfConsumed = annualProduction * baseSelfConsumptionPercent + annualCaptured;
  return Math.min(0.95, newSelfConsumed / Math.max(1, annualProduction)); // Cap at 95%
}

// --- Calculation ---

function calculateSolar(form: FormState) {
  const cityData = CITIES.find((c) => c.value === form.city)!;
  const orientationData = ORIENTATIONS.find((o) => o.value === form.orientation)!;
  const angleFactor = getAngleFactor(form.roofAngle);

  // Number of panels that fit
  const maxPanels = Math.floor(form.roofArea / M2_PER_PANEL);
  const systemSizeKwp = (maxPanels * WP_PER_PANEL) / 1000;

  // Annual production
  const rawProduction = systemSizeKwp * cityData.solarKwhPerKwp;
  const annualProduction = Math.round(rawProduction * orientationData.factor * angleFactor);

  // Self-consumption: higher ratio when consumption >> production
  const productionRatio = annualProduction / Math.max(form.annualConsumption, 1);
  let baseSelfConsumptionPercent: number;
  if (productionRatio <= 0.3) baseSelfConsumptionPercent = 0.85;
  else if (productionRatio <= 0.5) baseSelfConsumptionPercent = 0.70;
  else if (productionRatio <= 0.8) baseSelfConsumptionPercent = 0.55;
  else if (productionRatio <= 1.0) baseSelfConsumptionPercent = 0.40;
  else baseSelfConsumptionPercent = 0.30;

  // Battery self-consumption improvement
  let selfConsumptionWithBattery = baseSelfConsumptionPercent;
  let batteryCost = 0;
  if (form.batteryEnabled) {
    selfConsumptionWithBattery = getBatterySelfConsumptionBoost(
      form.batteryCapacity,
      annualProduction,
      form.annualConsumption,
      baseSelfConsumptionPercent
    );
    batteryCost = form.batteryCapacity * BATTERY_COST_PER_KWH;
  }

  const activeSelfConsumption = form.batteryEnabled ? selfConsumptionWithBattery : baseSelfConsumptionPercent;
  const selfConsumedKwh = Math.round(annualProduction * activeSelfConsumption);
  const surplusKwh = annualProduction - selfConsumedKwh;

  // Savings
  const annualSavingsFromSelfConsumption = (selfConsumedKwh * form.electricityPrice) / 100;
  const feedInRevenue = (surplusKwh * form.feedInPrice) / 100;
  const annualSavings = annualSavingsFromSelfConsumption + feedInRevenue;

  const systemCost = Math.round(systemSizeKwp * COST_PER_KWP);
  const totalInvestment = systemCost + batteryCost;

  // Payback period
  const paybackYears = annualSavings > 0 ? totalInvestment / annualSavings : 99;

  // CO2 savings
  const co2Reduction = Math.round(annualProduction * CO2_PER_KWH);

  // 20-year annual savings breakdown for chart
  const annualSavingsData: { year: number; savings: number }[] = [];
  const roiData: { year: number; cumulativeSavings: number; cost: number }[] = [];
  let cumSavings = 0;
  for (let y = 0; y <= 25; y++) {
    const degradation = Math.pow(1 - PANEL_DEGRADATION, y);
    const priceIncrease = Math.pow(1 + ELECTRICITY_PRICE_INCREASE, y);
    const yearProduction = annualProduction * degradation;
    const yearSelfConsumed = yearProduction * activeSelfConsumption;
    const yearSurplus = yearProduction - yearSelfConsumed;
    const yearSavings =
      (yearSelfConsumed * form.electricityPrice * priceIncrease) / 100 +
      (yearSurplus * form.feedInPrice) / 100;
    cumSavings += y === 0 ? 0 : yearSavings;
    roiData.push({
      year: y,
      cumulativeSavings: Math.round(cumSavings),
      cost: totalInvestment,
    });
    if (y >= 1 && y <= 20) {
      annualSavingsData.push({
        year: y,
        savings: Math.round(yearSavings),
      });
    }
  }

  // 20-year total return
  const twentyYearReturn = roiData.find((r) => r.year === 20)?.cumulativeSavings ?? 0;
  const twentyYearProfit = twentyYearReturn - totalInvestment;

  return {
    systemSizeKwp,
    maxPanels,
    annualProduction,
    baseSelfConsumptionPercent,
    selfConsumptionWithBattery,
    activeSelfConsumption,
    selfConsumedKwh,
    surplusKwh,
    annualSavings,
    annualSavingsFromSelfConsumption,
    feedInRevenue,
    systemCost,
    batteryCost,
    totalInvestment,
    paybackYears,
    co2Reduction,
    roiData,
    annualSavingsData,
    twentyYearReturn,
    twentyYearProfit,
  };
}

// --- Custom Tooltip ---

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: number;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || !payload[0]) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-slate-900">Vuosi {label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-1 text-sm" style={{ color: p.color }}>
          {p.dataKey === 'cumulativeSavings' ? 'Kumulatiiviset säästöt' : p.dataKey === 'savings' ? 'Vuosisäästö' : 'Investointi'}:{' '}
          <span className="font-bold">{formatEuros(p.value, 0)}</span>
        </p>
      ))}
    </div>
  );
}

// --- Main Component ---

export default function SolarCalculator() {
  const [form, setForm] = useState<FormState>({
    city: 'helsinki',
    roofArea: 40,
    orientation: 'S',
    roofAngle: 30,
    annualConsumption: 10000,
    electricityPrice: 10,
    feedInPrice: 4,
    batteryEnabled: false,
    batteryCapacity: 10,
  });

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const result = useMemo(() => calculateSolar(form), [form]);

  const handleShare = useCallback(() => {
    const params = new URLSearchParams({
      city: form.city,
      area: String(form.roofArea),
      dir: form.orientation,
      angle: String(form.roofAngle),
      kwh: String(form.annualConsumption),
      price: String(form.electricityPrice),
      feed: String(form.feedInPrice),
      bat: form.batteryEnabled ? String(form.batteryCapacity) : '0',
    });
    const url = `${window.location.origin}/tyokalut/aurinkopaneelit?${params.toString()}`;
    navigator.clipboard.writeText(url);
  }, [form]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4 text-sm text-slate-500">
          <Link href="/tyokalut" className="hover:text-[#0066FF]">Työkalut</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Aurinkopaneelilaskuri</span>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
            <Sun className="h-5 w-5 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Aurinkopaneelilaskuri
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-slate-600">
          Laske aurinkopaneeli-investoinnin tuotto, takaisinmaksuaika ja vuotuiset säästöt
          oman tilanteesi mukaan. Huomioi myös akkuvarasto ja ylijäämäsähkön myynti.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* --- LEFT: Form --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* City */}
          <FieldGroup label="Sijainti" icon={MapPin}>
            <select
              value={form.city}
              onChange={(e) => update('city', e.target.value as CityKey)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
            >
              {CITIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label} ({c.solarKwhPerKwp} kWh/kWp)
                </option>
              ))}
            </select>
          </FieldGroup>

          {/* Roof area */}
          <FieldGroup label={`Kattopinta-ala: ${form.roofArea} m²`} icon={Ruler}>
            <input
              type="range"
              min={10}
              max={150}
              step={5}
              value={form.roofArea}
              onChange={(e) => update('roofArea', Number(e.target.value))}
              className="w-full accent-[#0066FF]"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>10 m²</span>
              <span>150 m²</span>
            </div>
          </FieldGroup>

          {/* Orientation */}
          <FieldGroup label="Katon suunta" icon={Compass}>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {ORIENTATIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => update('orientation', o.value)}
                  className={`rounded-lg border px-2 py-2.5 text-xs font-medium transition-all ${
                    form.orientation === o.value
                      ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Roof angle */}
          <FieldGroup label={`Katon kaltevuus: ${form.roofAngle}°`} icon={Ruler}>
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={form.roofAngle}
              onChange={(e) => update('roofAngle', Number(e.target.value))}
              className="w-full accent-[#0066FF]"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0° (tasainen)</span>
              <span>60° (jyrkkä)</span>
            </div>
          </FieldGroup>

          {/* Annual consumption */}
          <FieldGroup label={`Vuosikulutus: ${formatNumber(form.annualConsumption)} kWh`} icon={Zap}>
            <input
              type="range"
              min={2000}
              max={30000}
              step={500}
              value={form.annualConsumption}
              onChange={(e) => update('annualConsumption', Number(e.target.value))}
              className="w-full accent-[#0066FF]"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>2 000 kWh</span>
              <span>30 000 kWh</span>
            </div>
          </FieldGroup>

          {/* Electricity price */}
          <FieldGroup label={`Sähkön hinta: ${form.electricityPrice} c/kWh`} icon={TrendingUp}>
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

          {/* Feed-in price */}
          <FieldGroup label={`Ylijäämäsähkön myyntihinta: ${form.feedInPrice} c/kWh`} icon={DollarSign}>
            <input
              type="range"
              min={0}
              max={12}
              step={0.5}
              value={form.feedInPrice}
              onChange={(e) => update('feedInPrice', Number(e.target.value))}
              className="w-full accent-[#0066FF]"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0 c/kWh</span>
              <span>12 c/kWh</span>
            </div>
          </FieldGroup>

          {/* Battery section */}
          <FieldGroup label="Akkuvarasto" icon={Battery}>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => update('batteryEnabled', false)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    !form.batteryEnabled
                      ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Ei akkua
                </button>
                <button
                  onClick={() => update('batteryEnabled', true)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    form.batteryEnabled
                      ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  Akulla
                </button>
              </div>
              {form.batteryEnabled && (
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-600">
                    Akun kapasiteetti: {form.batteryCapacity} kWh
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {BATTERY_OPTIONS.map((cap) => (
                      <button
                        key={cap}
                        onClick={() => update('batteryCapacity', cap)}
                        className={`rounded-lg border px-2 py-2 text-xs font-medium transition-all ${
                          form.batteryCapacity === cap
                            ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {cap} kWh
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Akun hinta: {formatEuros(form.batteryCapacity * BATTERY_COST_PER_KWH, 0)}
                  </p>
                </div>
              )}
            </div>
          </FieldGroup>
        </div>

        {/* --- RIGHT: Results --- */}
        <div className="lg:col-span-3 space-y-6">
          {/* System overview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Järjestelmän kuvaus</h2>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                title="Kopioi linkki leikepöydälle"
              >
                <Share2 className="h-3.5 w-3.5" />
                Jaa
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <StatCard
                label="Järjestelmän teho"
                value={`${result.systemSizeKwp.toFixed(1)} kWp`}
                sub={`${result.maxPanels} paneelia`}
                color="bg-amber-50 text-amber-700"
              />
              <StatCard
                label="Vuosituotanto"
                value={`${formatNumber(result.annualProduction)} kWh`}
                sub={`${Math.round(result.activeSelfConsumption * 100)} % oma käyttö`}
                color="bg-blue-50 text-blue-700"
              />
              <StatCard
                label="Vuosisäästö"
                value={formatEuros(result.annualSavings, 0)}
                sub={`${formatEuros(result.annualSavings / 12, 0)}/kk`}
                color="bg-emerald-50 text-emerald-700"
              />
              <StatCard
                label="Kokonaisinvestointi"
                value={formatEuros(result.totalInvestment, 0)}
                sub={form.batteryEnabled ? `Paneelit ${formatEuros(result.systemCost, 0)} + akku ${formatEuros(result.batteryCost, 0)}` : `${formatEuros(COST_PER_KWP, 0)}/kWp`}
                color="bg-slate-50 text-slate-700"
              />
              <StatCard
                label="Takaisinmaksuaika"
                value={`${result.paybackYears.toFixed(1)} v`}
                sub={result.paybackYears <= 10 ? 'Erinomainen' : result.paybackYears <= 15 ? 'Hyvä' : 'Kohtalainen'}
                color="bg-violet-50 text-violet-700"
              />
              <StatCard
                label="CO₂-vähennys"
                value={`${formatNumber(result.co2Reduction)} kg/v`}
                sub={`${formatNumber(result.co2Reduction * 25 / 1000)} t / 25 v`}
                color="bg-green-50 text-green-700"
              />
            </div>
          </div>

          {/* Battery self-consumption comparison */}
          {form.batteryEnabled && (
            <div className="rounded-xl bg-indigo-50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Battery className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">Akun vaikutus omakulutukseen</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-3">
                  <p className="text-xs text-slate-500">Ilman akkua</p>
                  <p className="mt-1 text-xl font-bold text-slate-600">
                    {Math.round(result.baseSelfConsumptionPercent * 100)} %
                  </p>
                  <p className="text-xs text-slate-500">omakäyttö</p>
                </div>
                <div className="rounded-lg bg-white p-3">
                  <p className="text-xs text-slate-500">Akulla ({form.batteryCapacity} kWh)</p>
                  <p className="mt-1 text-xl font-bold text-indigo-700">
                    {Math.round(result.selfConsumptionWithBattery * 100)} %
                  </p>
                  <p className="text-xs text-indigo-600 font-medium">
                    +{Math.round((result.selfConsumptionWithBattery - result.baseSelfConsumptionPercent) * 100)} prosenttiyksikköä
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Feed-in and sell-back info */}
          <div className="rounded-xl bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Verkkoon myynti:</span>{' '}
              Arviolta {formatNumber(result.surplusKwh)} kWh/v myydään verkkoon hintaan{' '}
              {form.feedInPrice} c/kWh = <span className="font-bold">{formatEuros(result.feedInRevenue, 0)}/vuosi</span>.
            </p>
          </div>

          {/* 20-year return summary */}
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">20 vuoden tuotto</h3>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-500">Investointi</p>
                <p className="mt-1 text-lg font-bold text-slate-700">{formatEuros(result.totalInvestment, 0)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Kumulatiiviset säästöt</p>
                <p className="mt-1 text-lg font-bold text-emerald-700">{formatEuros(result.twentyYearReturn, 0)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Nettotuotto</p>
                <p className={`mt-1 text-lg font-bold ${result.twentyYearProfit >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {result.twentyYearProfit >= 0 ? '+' : ''}{formatEuros(result.twentyYearProfit, 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Annual savings bar chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">Vuosittaiset säästöt (20 vuotta)</h3>
            <p className="mb-4 text-sm text-slate-500">
              Säästöt vuosittain huomioiden paneelien ikääntyminen ja sähkön hinnan nousu
            </p>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={result.annualSavingsData}
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
                    tickFormatter={(v: number) => `${v} €`}
                    width={55}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="savings" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={24} name="Vuosisäästö" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 25-year ROI Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">25 vuoden tuottoarvio</h3>
            <p className="mb-4 text-sm text-slate-500">
              Kumulatiiviset säästöt vs. investoinnin hinta
            </p>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={result.roiData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Tooltip content={<ChartTooltip />} />
                  <ReferenceLine
                    y={result.totalInvestment}
                    stroke="#EF4444"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: `Investointi ${formatEuros(result.totalInvestment, 0)}`,
                      position: 'insideTopRight',
                      fill: '#EF4444',
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulativeSavings"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fill="url(#savingsGradient)"
                    name="Kumulatiiviset säästöt"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500" />
                <span>Kumulatiiviset säästöt</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-6 border-t-2 border-dashed border-red-500" />
                <span>Investoinnin hinta</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>
              Arviot ovat suuntaa-antavia. Todellinen tuotanto riippuu varjostuksesta, katon
              kunnosta, paneelityypistä ja sääolosuhteista. Akun todellinen hyöty riippuu
              kulutusprofiilista ja lataus/purkausjaksoista. Suosittelemme pyytämään tarjous
              aurinkopaneelien asentajalta.
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

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className={`rounded-xl p-4 ${color.split(' ')[0]}`}>
      <p className="text-xs text-slate-600">{label}</p>
      <p className={`mt-1 text-xl font-bold ${color.split(' ')[1]}`}>{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{sub}</p>
    </div>
  );
}
