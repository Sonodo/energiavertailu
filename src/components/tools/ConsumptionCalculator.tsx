'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Zap,
  Home,
  Users,
  Thermometer,
  Flame,
  Car,
  Lightbulb,
  ArrowRight,
  Share2,
  Info,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { formatNumber, formatEuros } from '@/lib/utils';

// --- Types ---

type HousingType = 'apartment' | 'rowhouse' | 'detached';
type HeatingType = 'electric' | 'heatpump' | 'district' | 'oil' | 'wood';
type ApplianceAge = 'new' | 'average' | 'old';

interface FormState {
  housingType: HousingType;
  squareMeters: number;
  residents: number;
  heatingType: HeatingType;
  hasSauna: boolean;
  saunaFrequency: number; // times per week
  hasEV: boolean;
  evAnnualKm: number;
  applianceAge: ApplianceAge;
  hasFloorHeating: boolean;
}

interface ConsumptionBreakdown {
  lammitys: number;
  laminVesi: number;
  kodinkoneet: number;
  valaistus: number;
  sauna: number;
  sahkoauto: number;
  muu: number;
}

// --- Constants ---

const HOUSING_TYPES: { value: HousingType; label: string }[] = [
  { value: 'apartment', label: 'Kerrostalo' },
  { value: 'rowhouse', label: 'Rivitalo' },
  { value: 'detached', label: 'Omakotitalo' },
];

const HEATING_TYPES: { value: HeatingType; label: string }[] = [
  { value: 'electric', label: 'Suora sähkölämmitys' },
  { value: 'heatpump', label: 'Ilmalämpöpumppu' },
  { value: 'district', label: 'Kaukolämpö' },
  { value: 'oil', label: 'Öljylämmitys' },
  { value: 'wood', label: 'Puulämmitys' },
];

const APPLIANCE_AGES: { value: ApplianceAge; label: string }[] = [
  { value: 'new', label: 'Uudet (0-5 v)' },
  { value: 'average', label: 'Keskimääräiset (5-15 v)' },
  { value: 'old', label: 'Vanhat (15+ v)' },
];

const PIE_COLORS = [
  '#0066FF', // Lämmitys - blue
  '#00D4AA', // Lämmin vesi - teal
  '#FF6B35', // Kodinkoneet - orange
  '#FFB800', // Valaistus - yellow
  '#8B5CF6', // Sauna - purple
  '#10B981', // Sähköauto - green
  '#94A3B8', // Muu - gray
];

// Reference prices for cost estimation
const CHEAPEST_SPOT_PRICE = 5.5; // c/kWh all-in cheapest spot
const CHEAPEST_FIXED_PRICE = 7.0; // c/kWh cheapest fixed
const CURRENT_AVG_PRICE = 10; // c/kWh average all-in price

// Finnish average annual consumption per housing type (kWh)
const AVERAGE_CONSUMPTION: Record<HousingType, number> = {
  apartment: 2500,
  rowhouse: 5500,
  detached: 12000,
};

// Monthly consumption distribution factors (seasonal variation)
// Jan=0, Feb=1, ..., Dec=11
const MONTHLY_FACTORS = [
  0.12, // Jan - peak winter
  0.11, // Feb
  0.10, // Mar
  0.08, // Apr
  0.06, // May
  0.05, // Jun
  0.04, // Jul
  0.05, // Aug
  0.06, // Sep
  0.08, // Oct
  0.11, // Nov
  0.14, // Dec - Christmas peak
];

const MONTH_NAMES = ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'];

const SAVING_TIPS: Record<string, string[]> = {
  lammitys: [
    'Laske huonelämpötilaa 1°C — säästä ~5 % lämmityskuluista',
    'Tiivistä ikkunat ja ovet, tarkista eristykset',
    'Harkitse ilmalämpöpumppua — voi puolittaa lämmityskustannuksen',
    'Käytä älytermostaatteja ja aikalämmitystä',
  ],
  laminVesi: [
    'Lyhennä suihkuaikaa 1-2 minuutilla',
    'Asenna vettä säästävä suihkupää',
    'Laske lämminvesivaraajan lämpötilaa 55-60°C:een',
  ],
  kodinkoneet: [
    'Pese täysiä koneellisia matalammilla lämpötiloilla',
    'Käytä energiatehokkaita kodinkoneita (A+++ luokka)',
    'Sammuta laitteet kokonaan standby-tilasta',
  ],
  valaistus: [
    'Vaihda kaikki lamput LED-valoihin',
    'Hyödynnä liiketunnistimia ja ajastimia',
    'Hyödynnä luonnonvaloa — avaa verhot päivällä',
  ],
  sauna: [
    'Lyhennä saunan esilämmitystä — moderni kiuas lämpenee 30 min',
    'Eristä saunan seinät ja katto hyvin',
    'Harkitse saunavuorojen yhdistämistä',
  ],
  sahkoauto: [
    'Lataa yöllä edullisen pörssisähkön aikana',
    'Hyödynnä ajastettu lataus älykkäällä laturilla',
    'Lataa kotona aina kun mahdollista — julkinen lataus on kalliimpaa',
  ],
};

// --- Calculation Logic ---

function calculateConsumption(form: FormState): ConsumptionBreakdown {
  const { housingType, squareMeters, residents, heatingType, hasSauna, saunaFrequency, hasEV, evAnnualKm, applianceAge, hasFloorHeating } = form;

  // Base heating factor (kWh/m²/year) depending on housing and heating type
  let heatingFactor = 0;
  if (heatingType === 'electric') {
    if (housingType === 'apartment') heatingFactor = 30;
    else if (housingType === 'rowhouse') heatingFactor = 80;
    else heatingFactor = 110;
  } else if (heatingType === 'heatpump') {
    if (housingType === 'apartment') heatingFactor = 15;
    else if (housingType === 'rowhouse') heatingFactor = 35;
    else heatingFactor = 50;
  } else {
    // District, oil, wood — minimal electricity for heating
    if (housingType === 'apartment') heatingFactor = 3;
    else if (housingType === 'rowhouse') heatingFactor = 5;
    else heatingFactor = 8;
  }

  if (hasFloorHeating && heatingType === 'electric') {
    heatingFactor *= 1.15;
  }

  const lammitys = Math.round(heatingFactor * squareMeters);

  // Hot water: ~800 kWh per person/year for electric, less if district/oil
  const hotWaterFactor = (heatingType === 'electric' || heatingType === 'heatpump') ? 800 : 200;
  const laminVesi = Math.round(hotWaterFactor * residents);

  // Appliances: base + per person
  const applianceBase = housingType === 'apartment' ? 600 : housingType === 'rowhouse' ? 800 : 1000;
  const appliancePerPerson = 400;
  const applianceMultiplier = applianceAge === 'new' ? 0.8 : applianceAge === 'old' ? 1.25 : 1.0;
  const kodinkoneet = Math.round((applianceBase + appliancePerPerson * residents) * applianceMultiplier);

  // Lighting: based on area
  const lightingBase = housingType === 'apartment' ? 300 : 500;
  const lightingPerSqm = 2;
  const lightingMultiplier = applianceAge === 'new' ? 0.6 : applianceAge === 'old' ? 1.3 : 1.0;
  const valaistus = Math.round((lightingBase + lightingPerSqm * squareMeters) * lightingMultiplier);

  // Sauna: ~3-6 kWh per session
  const saunaPerSession = 5; // kWh average
  const sauna = hasSauna ? Math.round(saunaPerSession * saunaFrequency * 52) : 0;

  // EV: ~15-18 kWh/100km
  const evConsumptionPer100km = 16;
  const sahkoauto = hasEV ? Math.round((evAnnualKm / 100) * evConsumptionPer100km) : 0;

  // Other: electronics, garage, outdoor lights etc.
  const otherBase = housingType === 'apartment' ? 200 : housingType === 'rowhouse' ? 400 : 600;
  const muu = Math.round(otherBase + residents * 100);

  return { lammitys, laminVesi, kodinkoneet, valaistus, sauna, sahkoauto, muu };
}

// --- Custom Tooltip ---

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { name: string; value: number; fill: string };
  }>;
}

function PieTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload || !payload[0]) return null;
  const data = payload[0];
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-slate-900">{data.name}</p>
      <p className="mt-1 text-lg font-bold" style={{ color: data.payload.fill }}>
        {formatNumber(data.value)} kWh
      </p>
    </div>
  );
}

interface BarTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
    name: string;
  }>;
  label?: string;
}

function MonthlyTooltip({ active, payload, label }: BarTooltipProps) {
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

export default function ConsumptionCalculator() {
  const [form, setForm] = useState<FormState>({
    housingType: 'apartment',
    squareMeters: 65,
    residents: 2,
    heatingType: 'district',
    hasSauna: false,
    saunaFrequency: 2,
    hasEV: false,
    evAnnualKm: 15000,
    applianceAge: 'average',
    hasFloorHeating: false,
  });

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const breakdown = useMemo(() => calculateConsumption(form), [form]);

  const totalKwh = useMemo(
    () =>
      breakdown.lammitys +
      breakdown.laminVesi +
      breakdown.kodinkoneet +
      breakdown.valaistus +
      breakdown.sauna +
      breakdown.sahkoauto +
      breakdown.muu,
    [breakdown]
  );

  const annualCost = (totalKwh * CURRENT_AVG_PRICE) / 100;

  // Cost range: cheapest spot to average
  const cheapestSpotCost = (totalKwh * CHEAPEST_SPOT_PRICE) / 100;
  const cheapestFixedCost = (totalKwh * CHEAPEST_FIXED_PRICE) / 100;

  // Comparison to average
  const avgConsumption = AVERAGE_CONSUMPTION[form.housingType];
  const comparisonPercent = Math.round(((totalKwh - avgConsumption) / avgConsumption) * 100);

  // Monthly seasonal breakdown
  const monthlyData = useMemo(() => {
    return MONTH_NAMES.map((name, idx) => {
      const monthKwh = Math.round(totalKwh * MONTHLY_FACTORS[idx]);
      return {
        name,
        kustannus: Math.round((monthKwh * CURRENT_AVG_PRICE) / 100),
        kwhSpot: Math.round((monthKwh * CHEAPEST_SPOT_PRICE) / 100),
        kwhFixed: Math.round((monthKwh * CHEAPEST_FIXED_PRICE) / 100),
        kwh: monthKwh,
      };
    });
  }, [totalKwh]);

  const pieData = useMemo(() => {
    const items = [
      { name: 'Lämmitys', value: breakdown.lammitys },
      { name: 'Lämmin vesi', value: breakdown.laminVesi },
      { name: 'Kodinkoneet', value: breakdown.kodinkoneet },
      { name: 'Valaistus', value: breakdown.valaistus },
      { name: 'Sauna', value: breakdown.sauna },
      { name: 'Sähköauto', value: breakdown.sahkoauto },
      { name: 'Muu', value: breakdown.muu },
    ];
    return items.filter((i) => i.value > 0);
  }, [breakdown]);

  const handleShare = useCallback(() => {
    const params = new URLSearchParams({
      ht: form.housingType,
      m2: String(form.squareMeters),
      r: String(form.residents),
      heat: form.heatingType,
      sauna: form.hasSauna ? '1' : '0',
      sf: String(form.saunaFrequency),
      ev: form.hasEV ? '1' : '0',
      evkm: String(form.evAnnualKm),
      age: form.applianceAge,
      floor: form.hasFloorHeating ? '1' : '0',
    });
    const url = `${window.location.origin}/tyokalut/kulutus?${params.toString()}`;
    navigator.clipboard.writeText(url);
  }, [form]);

  // Find the largest consumption category for tips
  const topCategories = useMemo(() => {
    const cats: { key: string; value: number }[] = [
      { key: 'lammitys', value: breakdown.lammitys },
      { key: 'laminVesi', value: breakdown.laminVesi },
      { key: 'kodinkoneet', value: breakdown.kodinkoneet },
      { key: 'valaistus', value: breakdown.valaistus },
      { key: 'sauna', value: breakdown.sauna },
      { key: 'sahkoauto', value: breakdown.sahkoauto },
    ];
    return cats.filter((c) => c.value > 0).sort((a, b) => b.value - a.value).slice(0, 3);
  }, [breakdown]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4 text-sm text-slate-500">
          <Link href="/tyokalut" className="hover:text-[#0066FF]">Työkalut</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Sähkönkulutuslaskuri</span>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Zap className="h-5 w-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Sähkönkulutuslaskuri
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-slate-600">
          Arvioi vuotuinen sähkönkulutuksesi ja näe mistä sähkö kuluu. Näe kuinka paljon
          sähkö maksaisi eri sopimuksilla ja vertaa keskiarvoon.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* --- LEFT: Form --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Housing type */}
          <FieldGroup label="Asumismuoto" icon={Home}>
            <div className="grid grid-cols-3 gap-2">
              {HOUSING_TYPES.map((ht) => (
                <button
                  key={ht.value}
                  onClick={() => update('housingType', ht.value)}
                  className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                    form.housingType === ht.value
                      ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {ht.label}
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Square meters */}
          <FieldGroup label={`Pinta-ala: ${form.squareMeters} m²`} icon={Home}>
            <input
              type="range"
              min={20}
              max={300}
              step={5}
              value={form.squareMeters}
              onChange={(e) => update('squareMeters', Number(e.target.value))}
              className="w-full accent-[#0066FF]"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>20 m²</span>
              <span>300 m²</span>
            </div>
          </FieldGroup>

          {/* Residents */}
          <FieldGroup label={`Asukkaat: ${form.residents}`} icon={Users}>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  onClick={() => update('residents', n)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-all ${
                    form.residents === n
                      ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {n}{n === 6 ? '+' : ''}
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Heating */}
          <FieldGroup label="Lämmitystapa" icon={Thermometer}>
            <div className="grid grid-cols-1 gap-2">
              {HEATING_TYPES.map((ht) => (
                <button
                  key={ht.value}
                  onClick={() => update('heatingType', ht.value)}
                  className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all ${
                    form.heatingType === ht.value
                      ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {ht.label}
                </button>
              ))}
            </div>
          </FieldGroup>

          {/* Floor heating */}
          <FieldGroup label="Lattialämmitys" icon={Flame}>
            <ToggleButton
              active={form.hasFloorHeating}
              onToggle={(v) => update('hasFloorHeating', v)}
              labelOn="Kyllä"
              labelOff="Ei"
            />
          </FieldGroup>

          {/* Sauna */}
          <FieldGroup label="Sähkösauna" icon={Flame}>
            <ToggleButton
              active={form.hasSauna}
              onToggle={(v) => update('hasSauna', v)}
              labelOn="Kyllä"
              labelOff="Ei"
            />
            {form.hasSauna && (
              <div className="mt-3">
                <label className="text-xs font-medium text-slate-600">
                  Saunavuoroja viikossa: {form.saunaFrequency}
                </label>
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={form.saunaFrequency}
                  onChange={(e) => update('saunaFrequency', Number(e.target.value))}
                  className="mt-1 w-full accent-[#0066FF]"
                />
              </div>
            )}
          </FieldGroup>

          {/* EV */}
          <FieldGroup label="Sähköauto" icon={Car}>
            <ToggleButton
              active={form.hasEV}
              onToggle={(v) => update('hasEV', v)}
              labelOn="Kyllä"
              labelOff="Ei"
            />
            {form.hasEV && (
              <div className="mt-3">
                <label className="text-xs font-medium text-slate-600">
                  Vuosiajo: {formatNumber(form.evAnnualKm)} km
                </label>
                <input
                  type="range"
                  min={5000}
                  max={50000}
                  step={1000}
                  value={form.evAnnualKm}
                  onChange={(e) => update('evAnnualKm', Number(e.target.value))}
                  className="mt-1 w-full accent-[#0066FF]"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>5 000 km</span>
                  <span>50 000 km</span>
                </div>
              </div>
            )}
          </FieldGroup>

          {/* Appliance age */}
          <FieldGroup label="Kodinkoneiden ikä" icon={Lightbulb}>
            <div className="grid grid-cols-3 gap-2">
              {APPLIANCE_AGES.map((a) => (
                <button
                  key={a.value}
                  onClick={() => update('applianceAge', a.value)}
                  className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-all ${
                    form.applianceAge === a.value
                      ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </FieldGroup>
        </div>

        {/* --- RIGHT: Results --- */}
        <div className="lg:col-span-3 space-y-6">
          {/* Summary card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Arvioitu vuosikulutus</h2>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                title="Kopioi linkki leikepöydälle"
              >
                <Share2 className="h-3.5 w-3.5" />
                Jaa
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#0066FF]/5 p-4">
                <p className="text-sm text-slate-600">Vuosikulutus</p>
                <p className="mt-1 text-2xl font-bold text-[#0066FF]">
                  {formatNumber(totalKwh)} <span className="text-base font-medium">kWh</span>
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-sm text-slate-600">Arvioitu vuosikustannus</p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">
                  {formatEuros(annualCost, 0)}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  ({formatEuros(annualCost / 12, 0)}/kk)
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Keskihinnalla {CURRENT_AVG_PRICE} c/kWh (sis. siirto ja verot)
            </p>
          </div>

          {/* What will electricity cost section */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Paljonko sähkö maksaa tässä kodissa?</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs text-slate-500">Halvin pörssisähkö</p>
                <p className="mt-1 text-lg font-bold text-emerald-700">
                  {formatEuros(cheapestSpotCost / 12, 0)}/kk
                </p>
                <p className="text-xs text-slate-500">{CHEAPEST_SPOT_PRICE} c/kWh</p>
              </div>
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs text-slate-500">Halvin kiinteä</p>
                <p className="mt-1 text-lg font-bold text-blue-700">
                  {formatEuros(cheapestFixedCost / 12, 0)}/kk
                </p>
                <p className="text-xs text-slate-500">{CHEAPEST_FIXED_PRICE} c/kWh</p>
              </div>
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs text-slate-500">Keskihinta</p>
                <p className="mt-1 text-lg font-bold text-slate-700">
                  {formatEuros(annualCost / 12, 0)}/kk
                </p>
                <p className="text-xs text-slate-500">{CURRENT_AVG_PRICE} c/kWh</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-blue-800 font-medium">
              Sähkökustannus: <span className="font-bold">{formatEuros(cheapestSpotCost / 12, 0)}-{formatEuros(annualCost / 12, 0)} /kk</span>
            </p>
          </div>

          {/* Comparison to average */}
          <div className={`rounded-xl p-5 ${comparisonPercent > 0 ? 'bg-amber-50' : 'bg-emerald-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              {comparisonPercent > 0 ? (
                <TrendingUp className="h-5 w-5 text-amber-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-emerald-600" />
              )}
              <h3 className={`font-semibold ${comparisonPercent > 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
                Vertailu keskiarvoon
              </h3>
            </div>
            <p className={`text-sm ${comparisonPercent > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
              Kulutuksesi on{' '}
              <span className="font-bold">
                {Math.abs(comparisonPercent)} % keskimääräistä {comparisonPercent > 0 ? 'enemmän' : 'vähemmän'}
              </span>
              {' '}verrattuna vastaavaan asuntotyyppiin ({
                form.housingType === 'apartment' ? 'kerrostalo' : form.housingType === 'rowhouse' ? 'rivitalo' : 'omakotitalo'
              }, keskiarvo {formatNumber(avgConsumption)} kWh/v).
            </p>
          </div>

          {/* Seasonal monthly cost chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-slate-500" />
              <h3 className="text-lg font-bold text-slate-900">Kuukausittainen kustannusarvio</h3>
            </div>
            <p className="mb-4 text-sm text-slate-500">
              Arvioitu kuukausikustannus kausivaihtelun mukaan
            </p>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${v} €`}
                    width={50}
                  />
                  <Tooltip content={<MonthlyTooltip />} />
                  <Bar dataKey="kustannus" fill="#0066FF" radius={[4, 4, 0, 0]} maxBarSize={28} name="Kustannus" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-2 text-left text-slate-600">Kuukausi</th>
                    <th className="pb-2 text-right text-slate-600">kWh</th>
                    <th className="pb-2 text-right text-emerald-600">Pörssi</th>
                    <th className="pb-2 text-right text-blue-600">Kiinteä</th>
                    <th className="pb-2 text-right text-slate-600">Keskihinta</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((m) => (
                    <tr key={m.name} className="border-b border-slate-50 last:border-0">
                      <td className="py-1.5 text-slate-700 font-medium">{m.name}</td>
                      <td className="py-1.5 text-right text-slate-600">{formatNumber(m.kwh)}</td>
                      <td className="py-1.5 text-right text-emerald-700 font-medium">{formatEuros(m.kwhSpot, 0)}</td>
                      <td className="py-1.5 text-right text-blue-700 font-medium">{formatEuros(m.kwhFixed, 0)}</td>
                      <td className="py-1.5 text-right text-slate-900 font-medium">{formatEuros(m.kustannus, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pie chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-slate-900">Kulutuksen jakautuminen</h3>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="40%"
                    outerRadius="70%"
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    labelLine={true}
                  >
                    {pieData.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value: string) => (
                      <span className="text-xs text-slate-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown table */}
            <div className="mt-4 space-y-2">
              {pieData.map((item, idx) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-3 w-3 rounded-sm"
                      style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                    />
                    <span className="text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-900">
                    {formatNumber(item.value)} kWh
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/vertailu?kwh=${totalKwh}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#0052CC]"
          >
            Vertaa sopimuksia tällä kulutuksella
            <ArrowRight className="h-5 w-5" />
          </Link>

          {/* Saving tips */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-bold text-slate-900">Säästövinkit</h3>
            </div>
            <div className="space-y-4">
              {topCategories.map(({ key }) => {
                const tips = SAVING_TIPS[key];
                if (!tips) return null;
                const labels: Record<string, string> = {
                  lammitys: 'Lämmitys',
                  laminVesi: 'Lämmin vesi',
                  kodinkoneet: 'Kodinkoneet',
                  valaistus: 'Valaistus',
                  sauna: 'Sauna',
                  sahkoauto: 'Sähköauto',
                };
                return (
                  <div key={key}>
                    <h4 className="text-sm font-semibold text-slate-800">{labels[key]}</h4>
                    <ul className="mt-1 space-y-1">
                      {tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0066FF]" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>
              Arviot ovat suuntaa-antavia ja perustuvat suomalaisiin keskiarvoihin.
              Todellinen kulutus riippuu elintavoista, laitteista ja sääolosuhteista.
              Sopimushinnat voivat vaihdella — katso ajantasaiset hinnat vertailustamme.
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

function ToggleButton({
  active,
  onToggle,
  labelOn,
  labelOff,
}: {
  active: boolean;
  onToggle: (v: boolean) => void;
  labelOn: string;
  labelOff: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        onClick={() => onToggle(false)}
        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
          !active
            ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
            : 'border-slate-200 text-slate-700 hover:border-slate-300'
        }`}
      >
        {labelOff}
      </button>
      <button
        onClick={() => onToggle(true)}
        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
          active
            ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
            : 'border-slate-200 text-slate-700 hover:border-slate-300'
        }`}
      >
        {labelOn}
      </button>
    </div>
  );
}

