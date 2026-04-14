'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Car,
  Fuel,
  Home,
  Zap,
  TrendingDown,
  Share2,
  Info,
  Clock,
  MapPin,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import { formatNumber, formatEuros } from '@/lib/utils';

// --- Types ---

interface CarPreset {
  id: string;
  name: string;
  batteryKwh: number;
  consumptionPer100km: number;
}

interface FormState {
  selectedCar: string;
  customBattery: number;
  customConsumption: number;
  annualKm: number;
  homeChargingPercent: number;
  homeElectricityPrice: number; // c/kWh
  publicACPrice: number; // c/kWh
  publicDCPrice: number; // c/kWh
  publicChargingSplit: number; // % of public that is DC fast charging
}

// --- Constants ---

const CAR_PRESETS: CarPreset[] = [
  { id: 'model3', name: 'Tesla Model 3', batteryKwh: 60, consumptionPer100km: 15 },
  { id: 'modely', name: 'Tesla Model Y', batteryKwh: 75, consumptionPer100km: 16 },
  { id: 'id4', name: 'VW ID.4', batteryKwh: 77, consumptionPer100km: 18 },
  { id: 'enyaq', name: 'Skoda Enyaq', batteryKwh: 77, consumptionPer100km: 17 },
  { id: 'ix3', name: 'BMW iX3', batteryKwh: 74, consumptionPer100km: 19 },
  { id: 'custom', name: 'Oma auto', batteryKwh: 60, consumptionPer100km: 16 },
];

const PETROL_PRICE_PER_LITER = 1.75; // €
const PETROL_CONSUMPTION_PER_100KM = 7; // liters

// Spot price simulation: cheapest 3h vs average
const AVG_SPOT_PRICE = 8; // c/kWh average
const CHEAPEST_3H_PRICE = 3.5; // c/kWh typical cheapest 3 hours

const BAR_COLORS = {
  home: '#0066FF',
  publicAC: '#FF6B35',
  publicDC: '#EF4444',
  petrol: '#94A3B8',
};

// --- Calculation ---

function calculateEVCosts(form: FormState) {
  const car = CAR_PRESETS.find((c) => c.id === form.selectedCar);
  const consumption = form.selectedCar === 'custom' ? form.customConsumption : (car?.consumptionPer100km ?? 16);
  const batterySize = form.selectedCar === 'custom' ? form.customBattery : (car?.batteryKwh ?? 60);

  const annualKwhTotal = (form.annualKm / 100) * consumption;
  const homeKwh = annualKwhTotal * (form.homeChargingPercent / 100);
  const publicKwh = annualKwhTotal - homeKwh;
  const publicACKwh = publicKwh * (1 - form.publicChargingSplit / 100);
  const publicDCKwh = publicKwh * (form.publicChargingSplit / 100);

  const homeCost = (homeKwh * form.homeElectricityPrice) / 100;
  const publicACCost = (publicACKwh * form.publicACPrice) / 100;
  const publicDCCost = (publicDCKwh * form.publicDCPrice) / 100;
  const totalChargingCost = homeCost + publicACCost + publicDCCost;

  const costPerKm = totalChargingCost / form.annualKm;

  // Petrol comparison
  const petrolLiters = (form.annualKm / 100) * PETROL_CONSUMPTION_PER_100KM;
  const petrolAnnualCost = petrolLiters * PETROL_PRICE_PER_LITER;
  const petrolCostPerKm = petrolAnnualCost / form.annualKm;

  const annualSavings = petrolAnnualCost - totalChargingCost;

  // Spot price optimization calculation
  // If charging at cheapest 3h instead of average spot price
  const avgSpotCostAnnual = (homeKwh * AVG_SPOT_PRICE) / 100;
  const cheapSpotCostAnnual = (homeKwh * CHEAPEST_3H_PRICE) / 100;
  const spotSavings = avgSpotCostAnnual - cheapSpotCostAnnual;

  // Monthly cost comparison: home vs public AC vs public DC
  const monthlyComparison = [
    {
      name: 'Kotilataus',
      kustannus: Math.round(homeCost / 12),
      fill: BAR_COLORS.home,
      priceLabel: `${form.homeElectricityPrice} c/kWh`,
    },
    {
      name: 'Julkinen AC',
      kustannus: Math.round(publicACCost / 12),
      fill: BAR_COLORS.publicAC,
      priceLabel: `${form.publicACPrice} c/kWh`,
    },
    {
      name: 'Julkinen DC',
      kustannus: Math.round(publicDCCost / 12),
      fill: BAR_COLORS.publicDC,
      priceLabel: `${form.publicDCPrice} c/kWh`,
    },
  ];

  // What-if: all home vs current split vs all public AC vs all public DC
  const scenarioData = [
    {
      name: '100% koti',
      value: Math.round((annualKwhTotal * form.homeElectricityPrice) / 100 / 12),
      fill: BAR_COLORS.home,
    },
    {
      name: 'Nykyinen jako',
      value: Math.round(totalChargingCost / 12),
      fill: '#0066FF',
    },
    {
      name: '100% julk. AC',
      value: Math.round((annualKwhTotal * form.publicACPrice) / 100 / 12),
      fill: BAR_COLORS.publicAC,
    },
    {
      name: '100% julk. DC',
      value: Math.round((annualKwhTotal * form.publicDCPrice) / 100 / 12),
      fill: BAR_COLORS.publicDC,
    },
    {
      name: 'Bensiiniauto',
      value: Math.round(petrolAnnualCost / 12),
      fill: BAR_COLORS.petrol,
    },
  ];

  return {
    annualKwhTotal: Math.round(annualKwhTotal),
    homeKwh: Math.round(homeKwh),
    publicACKwh: Math.round(publicACKwh),
    publicDCKwh: Math.round(publicDCKwh),
    homeCost,
    publicACCost,
    publicDCCost,
    totalChargingCost,
    costPerKm,
    petrolAnnualCost,
    petrolCostPerKm,
    annualSavings,
    spotSavings,
    consumption,
    batterySize,
    monthlyComparison,
    scenarioData,
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
  label?: string;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-1 text-sm font-medium text-slate-900">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm" style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{formatEuros(p.value, 0)}/kk</span>
        </p>
      ))}
    </div>
  );
}

// --- Main Component ---

export default function EVChargingCalculator() {
  const [form, setForm] = useState<FormState>({
    selectedCar: 'model3',
    customBattery: 60,
    customConsumption: 16,
    annualKm: 15000,
    homeChargingPercent: 80,
    homeElectricityPrice: 10,
    publicACPrice: 35,
    publicDCPrice: 55,
    publicChargingSplit: 30,
  });

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const result = useMemo(() => calculateEVCosts(form), [form]);

  const handleShare = useCallback(() => {
    const params = new URLSearchParams({
      car: form.selectedCar,
      km: String(form.annualKm),
      home: String(form.homeChargingPercent),
      hp: String(form.homeElectricityPrice),
      ac: String(form.publicACPrice),
      dc: String(form.publicDCPrice),
      dcs: String(form.publicChargingSplit),
    });
    if (form.selectedCar === 'custom') {
      params.set('bat', String(form.customBattery));
      params.set('cons', String(form.customConsumption));
    }
    const url = `${window.location.origin}/tyokalut/sahkoauto?${params.toString()}`;
    navigator.clipboard.writeText(url);
  }, [form]);

  const selectedCar = CAR_PRESETS.find((c) => c.id === form.selectedCar);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4 text-sm text-slate-500">
          <Link href="/tyokalut" className="hover:text-accent">Työkalut</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Sähköauton latauslaskuri</span>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
            <Car className="h-5 w-5 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Sähköauton latauslaskuri
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-slate-600">
          Laske sähköauton latauskustannukset, vertaa koti-, julkista AC- ja DC-latausta,
          ja näe kuinka paljon säästät verrattuna bensiiniautoon.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* --- LEFT: Form --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Car selection */}
          <FieldGroup label="Automalli" icon={Car}>
            <div className="grid grid-cols-1 gap-2">
              {CAR_PRESETS.map((car) => (
                <button
                  key={car.id}
                  onClick={() => update('selectedCar', car.id)}
                  className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all ${
                    form.selectedCar === car.id
                      ? 'border-accent bg-accent/5 text-accent'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="block">{car.name}</span>
                  {car.id !== 'custom' && (
                    <span className="block text-xs text-slate-500">
                      {car.batteryKwh} kWh | {car.consumptionPer100km} kWh/100 km
                    </span>
                  )}
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Custom car fields */}
          {form.selectedCar === 'custom' && (
            <>
              <FieldGroup label={`Akun koko: ${form.customBattery} kWh`} icon={Zap}>
                <input
                  type="range"
                  min={20}
                  max={120}
                  step={1}
                  value={form.customBattery}
                  onChange={(e) => update('customBattery', Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>20 kWh</span>
                  <span>120 kWh</span>
                </div>
              </FieldGroup>

              <FieldGroup label={`Kulutus: ${form.customConsumption} kWh/100 km`} icon={Zap}>
                <input
                  type="range"
                  min={10}
                  max={30}
                  step={0.5}
                  value={form.customConsumption}
                  onChange={(e) => update('customConsumption', Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>10 kWh</span>
                  <span>30 kWh</span>
                </div>
              </FieldGroup>
            </>
          )}

          {/* Annual km */}
          <FieldGroup label={`Vuosiajo: ${formatNumber(form.annualKm)} km`} icon={Car}>
            <input
              type="range"
              min={5000}
              max={50000}
              step={1000}
              value={form.annualKm}
              onChange={(e) => update('annualKm', Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>5 000 km</span>
              <span>50 000 km</span>
            </div>
          </FieldGroup>

          {/* Home charging % */}
          <FieldGroup label={`Kotilataus: ${form.homeChargingPercent} %`} icon={Home}>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={form.homeChargingPercent}
              onChange={(e) => update('homeChargingPercent', Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0 % (vain julkinen)</span>
              <span>100 % (vain koti)</span>
            </div>
          </FieldGroup>

          {/* Home electricity price */}
          <FieldGroup label={`Kotisähkön hinta: ${form.homeElectricityPrice} c/kWh`} icon={Zap}>
            <input
              type="range"
              min={4}
              max={25}
              step={0.5}
              value={form.homeElectricityPrice}
              onChange={(e) => update('homeElectricityPrice', Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>4 c/kWh</span>
              <span>25 c/kWh</span>
            </div>
          </FieldGroup>

          {/* Public AC charging price */}
          <FieldGroup label={`Julkinen AC-lataus: ${form.publicACPrice} c/kWh`} icon={MapPin}>
            <input
              type="range"
              min={15}
              max={50}
              step={1}
              value={form.publicACPrice}
              onChange={(e) => update('publicACPrice', Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>15 c/kWh</span>
              <span>50 c/kWh</span>
            </div>
          </FieldGroup>

          {/* Public DC charging price */}
          <FieldGroup label={`Julkinen DC-pikalataus: ${form.publicDCPrice} c/kWh`} icon={Zap}>
            <input
              type="range"
              min={30}
              max={80}
              step={1}
              value={form.publicDCPrice}
              onChange={(e) => update('publicDCPrice', Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>30 c/kWh</span>
              <span>80 c/kWh</span>
            </div>
          </FieldGroup>

          {/* DC share of public */}
          <FieldGroup label={`Pikalatauksen osuus julkisesta: ${form.publicChargingSplit} %`} icon={BarChart3}>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={form.publicChargingSplit}
              onChange={(e) => update('publicChargingSplit', Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>0 % (vain AC)</span>
              <span>100 % (vain DC)</span>
            </div>
          </FieldGroup>
        </div>

        {/* --- RIGHT: Results --- */}
        <div className="lg:col-span-3 space-y-6">
          {/* Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Latauskustannukset
                {selectedCar && form.selectedCar !== 'custom' && (
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    ({selectedCar.name})
                  </span>
                )}
              </h2>
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
                label="Sähkön tarve vuodessa"
                value={`${formatNumber(result.annualKwhTotal)} kWh`}
                sub={`${result.consumption} kWh/100 km`}
                color="text-blue-700"
                bg="bg-blue-50"
              />
              <StatCard
                label="Kotilataus"
                value={formatEuros(result.homeCost, 0)}
                sub={`${formatNumber(result.homeKwh)} kWh`}
                color="text-accent"
                bg="bg-accent/5"
              />
              <StatCard
                label="Julkinen lataus (AC+DC)"
                value={formatEuros(result.publicACCost + result.publicDCCost, 0)}
                sub={`AC: ${formatNumber(result.publicACKwh)} + DC: ${formatNumber(result.publicDCKwh)} kWh`}
                color="text-orange-700"
                bg="bg-orange-50"
              />
              <StatCard
                label="Lataus yhteensä / vuosi"
                value={formatEuros(result.totalChargingCost, 0)}
                sub={`${formatEuros(result.totalChargingCost / 12, 0)}/kk`}
                color="text-slate-900"
                bg="bg-slate-50"
              />
              <StatCard
                label="Hinta / km"
                value={`${(result.costPerKm * 100).toFixed(1)} c/km`}
                sub={`vs. bensiini ${(result.petrolCostPerKm * 100).toFixed(1)} c/km`}
                color="text-violet-700"
                bg="bg-violet-50"
              />
              <StatCard
                label="Vuosisäästö vs. bensiini"
                value={formatEuros(result.annualSavings, 0)}
                sub={`${formatEuros(result.annualSavings / 12, 0)}/kk`}
                color="text-emerald-700"
                bg="bg-emerald-50"
              />
            </div>
          </div>

          {/* Spot price optimization */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Pörssisähkön optimointi</h3>
            </div>
            <p className="text-sm text-slate-700 mb-3">
              Lataamalla halvimpien 3 tunnin aikana (tyypillisesti yöllä klo 01-04) voit säästää merkittävästi.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs text-slate-500">Keskimääräinen pörssihinta</p>
                <p className="mt-1 text-lg font-bold text-slate-600">{AVG_SPOT_PRICE} c/kWh</p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs text-slate-500">Halvin 3h keskihinta</p>
                <p className="mt-1 text-lg font-bold text-blue-700">{CHEAPEST_3H_PRICE} c/kWh</p>
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-blue-800">
              Vuosisäästö optimoidulla latauksella: <span className="font-bold">{formatEuros(result.spotSavings, 0)}</span>
            </p>
          </div>

          {/* Home vs Public comparison */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">Koti vs. julkinen lataus</h3>
            <p className="mb-4 text-sm text-slate-500">
              Kuukausikustannukset lataustavasta riippuen
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mb-4">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-2 text-left font-semibold text-slate-700">Lataustyyppi</th>
                    <th className="pb-2 text-right font-semibold text-slate-700">Hinta</th>
                    <th className="pb-2 text-right font-semibold text-slate-700">kWh/kk</th>
                    <th className="pb-2 text-right font-semibold text-slate-700">Kustannus/kk</th>
                  </tr>
                </thead>
                <tbody>
                  {result.monthlyComparison.map((row) => (
                    <tr key={row.name} className="border-b border-slate-100 last:border-0">
                      <td className="py-2 flex items-center gap-2">
                        <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: row.fill }} />
                        <span className="text-slate-800 font-medium">{row.name}</span>
                      </td>
                      <td className="py-2 text-right text-slate-600">{row.priceLabel}</td>
                      <td className="py-2 text-right text-slate-600">
                        {row.name === 'Kotilataus'
                          ? formatNumber(Math.round(result.homeKwh / 12))
                          : row.name === 'Julkinen AC'
                          ? formatNumber(Math.round(result.publicACKwh / 12))
                          : formatNumber(Math.round(result.publicDCKwh / 12))}
                      </td>
                      <td className="py-2 text-right font-semibold text-slate-900">{formatEuros(row.kustannus, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Petrol comparison card */}
          <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 p-5">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-slate-900">Vuotuinen ajokustannus</h3>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-600">Bensiiniauto vuodessa</p>
                <p className="text-lg font-bold text-slate-600">
                  {formatEuros(result.petrolAnnualCost, 0)}
                </p>
                <p className="text-xs text-slate-500">
                  {PETROL_CONSUMPTION_PER_100KM} L/100 km @ {formatEuros(PETROL_PRICE_PER_LITER)}/L
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Sähköauto vuodessa</p>
                <p className="text-lg font-bold text-emerald-700">
                  {formatEuros(result.totalChargingCost, 0)}
                </p>
                <p className="text-xs text-emerald-600 font-medium">
                  Säästät {formatEuros(result.annualSavings, 0)}/v
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Vuosiajolla {formatNumber(form.annualKm)} km sähköauto säästää{' '}
              <span className="font-bold text-emerald-700">{formatEuros(result.annualSavings / 12, 0)}/kk</span> verrattuna bensiiniautoon.
            </p>
          </div>

          {/* Scenario comparison chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">Kuukausikustannusvertailu</h3>
            <p className="mb-4 text-sm text-slate-500">
              Eri latausskenaarioiden kuukausikustannukset
            </p>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={result.scenarioData}
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
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                    width={120}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={36} name="Kustannus">
                    {result.scenarioData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Optimal charging tips */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-bold text-slate-900">Optimaalinen lataus</h3>
            </div>
            <ul className="space-y-2">
              {[
                'Lataa pörssisähköllä yöllä klo 00-06, jolloin hinta on usein alhaisimmillaan',
                'Aseta laturin ajastin lataamaan edullisimpina tunteina',
                'Suosi kotilatäusta — se on lähes aina julkista edullisempaa',
                'Vältä pikalatausta (DC) päivittäisessä käytössä — hinta voi olla 50-60 c/kWh',
                'Harkitse pörssisähkösopimusta ja älylatainta automaattiseen optimointiin',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>
              Arviot ovat suuntaa-antavia. Todellinen kulutus vaihtelee ajotavan, lämpötilan,
              rengaspaineiden ja muiden tekijöiden mukaan. Bensiinin hinta {formatEuros(PETROL_PRICE_PER_LITER)}/L.
              Pörssisähkön hinnat vaihtelevat päivittäin.
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
  bg,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
  bg: string;
}) {
  return (
    <div className={`rounded-xl p-4 ${bg}`}>
      <p className="text-xs text-slate-600">{label}</p>
      <p className={`mt-1 text-xl font-bold ${color}`}>{value}</p>
      <p className="mt-0.5 text-xs text-slate-500">{sub}</p>
    </div>
  );
}
