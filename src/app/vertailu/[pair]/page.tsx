import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Star,
  Shield,
  Leaf,
  Zap,
  Trophy,
  ChevronRight,
  Building2,
  Calendar,
  Users,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Scale,
} from 'lucide-react';
import { providers, AVERAGE_SPOT_PRICE } from '@/data/providers';
import { providerDetails } from '@/data/provider-details';
import { providerComparisons } from '@/data/provider-comparisons';
import { SITE_URL, ELECTRICITY_VAT, ELECTRICITY_TAX, AVG_TRANSFER_PRICE } from '@/lib/constants';
import { cn, formatEuros } from '@/lib/utils';
import type { ElectricityProvider, ElectricityContract } from '@/types';

// --- Types ---

interface PageProps {
  params: Promise<{ pair: string }>;
}

// --- Cost calculation (matches ResultsList.tsx pattern) ---

function calculateAnnualCost(
  pricePerKwh: number,
  monthlyFee: number,
  annualKwh: number,
  contractType: string
): number {
  let effectivePricePerKwh: number;
  if (contractType === 'spot') {
    effectivePricePerKwh = (AVERAGE_SPOT_PRICE + pricePerKwh) * (1 + ELECTRICITY_VAT);
  } else {
    effectivePricePerKwh = pricePerKwh * (1 + ELECTRICITY_VAT);
  }
  const monthlyFeeInclVAT = monthlyFee * (1 + ELECTRICITY_VAT);
  const annualEnergyCost = (effectivePricePerKwh / 100) * annualKwh + monthlyFeeInclVAT * 12;
  const annualTransmissionCost = (AVG_TRANSFER_PRICE / 100) * annualKwh;
  const taxPerKwhInclVAT = ELECTRICITY_TAX * (1 + ELECTRICITY_VAT);
  const annualTaxCost = (taxPerKwhInclVAT / 100) * annualKwh;
  return annualEnergyCost + annualTransmissionCost + annualTaxCost;
}

function getCheapestContract(
  provider: ElectricityProvider,
  type: 'spot' | 'fixed' | 'open-ended'
): ElectricityContract | null {
  const matching = provider.contracts.filter((c) => c.type === type);
  if (matching.length === 0) return null;
  return matching.reduce((cheapest, c) => {
    const costA = calculateAnnualCost(cheapest.pricePerKwh, cheapest.monthlyFee, 5000, cheapest.type);
    const costB = calculateAnnualCost(c.pricePerKwh, c.monthlyFee, 5000, c.type);
    return costB < costA ? c : cheapest;
  });
}

function getCheapestOverall(provider: ElectricityProvider): ElectricityContract {
  return provider.contracts.reduce((cheapest, c) => {
    const costA = calculateAnnualCost(cheapest.pricePerKwh, cheapest.monthlyFee, 5000, cheapest.type);
    const costB = calculateAnnualCost(c.pricePerKwh, c.monthlyFee, 5000, c.type);
    return costB < costA ? c : cheapest;
  });
}

function getRiskLabel(risk: number): { label: string; color: string } {
  if (risk <= 5) return { label: 'Erittäin matala', color: 'text-green-600' };
  if (risk <= 15) return { label: 'Matala', color: 'text-green-500' };
  if (risk <= 30) return { label: 'Keskitaso', color: 'text-yellow-600' };
  if (risk <= 50) return { label: 'Kohonnut', color: 'text-orange-500' };
  return { label: 'Korkea', color: 'text-red-600' };
}

function getTypeLabel(type: string): string {
  switch (type) {
    case 'national':
      return 'Valtakunnallinen';
    case 'regional':
      return 'Alueellinen';
    case 'challenger':
      return 'Haastaja';
    default:
      return 'Sähköyhtiö';
  }
}

function getContractTypeLabel(type: string): string {
  switch (type) {
    case 'spot':
      return 'Pörssisähkö';
    case 'fixed':
      return 'Kiinteä';
    case 'open-ended':
      return 'Toistaiseksi voimassa';
    case 'hybrid':
      return 'Hybridi';
    default:
      return type;
  }
}

// --- Static params & metadata ---

export async function generateStaticParams() {
  return providerComparisons.map((c) => ({ pair: c.slugPair }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params;
  const comparison = providerComparisons.find((c) => c.slugPair === pair);
  if (!comparison) return { title: 'Vertailu ei löytynyt' };

  const p1 = providers.find((p) => p.slug === comparison.provider1Slug);
  const p2 = providers.find((p) => p.slug === comparison.provider2Slug);
  if (!p1 || !p2) return { title: 'Vertailu ei löytynyt' };

  const title = `${p1.name} vs ${p2.name} — Kumpi on parempi? Vertailu 2026`;
  const description = `Vertaa ${p1.name} ja ${p2.name} sähkösopimuksia: hinnat, arvostelut, luotettavuus ja sopimusvalikoima. Selvitä kumpi on sinulle parempi valinta vuonna 2026.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Energiavertailu`,
      description,
      url: `${SITE_URL}/vertailu/${pair}`,
    },
    alternates: {
      canonical: `${SITE_URL}/vertailu/${pair}`,
    },
  };
}

// --- Page component ---

export default async function ComparisonPairPage({ params }: PageProps) {
  const { pair } = await params;
  const comparison = providerComparisons.find((c) => c.slugPair === pair);
  if (!comparison) notFound();

  const p1 = providers.find((p) => p.slug === comparison.provider1Slug);
  const p2 = providers.find((p) => p.slug === comparison.provider2Slug);
  if (!p1 || !p2) notFound();

  const d1 = providerDetails[p1.id] ?? null;
  const d2 = providerDetails[p2.id] ?? null;

  const ANNUAL_KWH = 5000;

  // Get cheapest contracts
  const cheapestSpot1 = getCheapestContract(p1, 'spot');
  const cheapestSpot2 = getCheapestContract(p2, 'spot');
  const cheapestFixed1 = getCheapestContract(p1, 'fixed');
  const cheapestFixed2 = getCheapestContract(p2, 'fixed');
  const cheapestOverall1 = getCheapestOverall(p1);
  const cheapestOverall2 = getCheapestOverall(p2);

  const cost1 = calculateAnnualCost(
    cheapestOverall1.pricePerKwh,
    cheapestOverall1.monthlyFee,
    ANNUAL_KWH,
    cheapestOverall1.type
  );
  const cost2 = calculateAnnualCost(
    cheapestOverall2.pricePerKwh,
    cheapestOverall2.monthlyFee,
    ANNUAL_KWH,
    cheapestOverall2.type
  );

  const cheaperProvider = cost1 <= cost2 ? p1 : p2;
  const cheaperCost = Math.min(cost1, cost2);
  const pricierCost = Math.max(cost1, cost2);
  const savings = pricierCost - cheaperCost;

  const risk1 = getRiskLabel(p1.counterpartyRisk);
  const risk2 = getRiskLabel(p2.counterpartyRisk);

  // Determine overall winner (weighted: price 40%, rating 30%, risk 20%, variety 10%)
  const score1 =
    (cost2 / cost1) * 40 +
    ((p1.rating ?? 3) / 5) * 30 +
    ((100 - p1.counterpartyRisk) / 100) * 20 +
    (p1.contracts.length / 10) * 10;
  const score2 =
    (cost1 / cost2) * 40 +
    ((p2.rating ?? 3) / 5) * 30 +
    ((100 - p2.counterpartyRisk) / 100) * 20 +
    (p2.contracts.length / 10) * 10;

  const winner = score1 >= score2 ? p1 : p2;
  const loser = winner === p1 ? p2 : p1;

  // FAQ
  const faqItems = [
    {
      question: `Kumpi on halvempi, ${p1.name} vai ${p2.name}?`,
      answer: `Vuoden 2026 hinnoilla ${cheaperProvider.name} on edullisempi vaihtoehto. Tyypillisellä ${ANNUAL_KWH.toLocaleString('fi-FI')} kWh vuosikulutuksella säästö on noin ${formatEuros(savings)} vuodessa verrattuna ${cheaperProvider === p1 ? p2.name : p1.name} edullisimpaan sopimukseen. Todelliset kustannukset riippuvat kulutuksestasi ja valitsemastasi sopimustyypistä.`,
    },
    {
      question: `Kumpi on luotettavampi, ${p1.name} vai ${p2.name}?`,
      answer: `${p1.name} vastapuoliriski on ${risk1.label.toLowerCase()} (${p1.counterpartyRisk}/100) ja ${p2.name} vastapuoliriski on ${risk2.label.toLowerCase()} (${p2.counterpartyRisk}/100). ${p1.counterpartyRisk <= p2.counterpartyRisk ? p1.name : p2.name} on luotettavuudessa hieman edellä. Molemmat ovat vakavaraisia suomalaisia sähköyhtiöitä.`,
    },
    {
      question: `Onko ${p1.name} vai ${p2.name} parempi pörssisähköön?`,
      answer: cheapestSpot1 && cheapestSpot2
        ? `Pörssisähkön marginaalit ovat: ${p1.name} ${cheapestSpot1.pricePerKwh.toFixed(2)} c/kWh (+ ${cheapestSpot1.monthlyFee.toFixed(2)} €/kk) ja ${p2.name} ${cheapestSpot2.pricePerKwh.toFixed(2)} c/kWh (+ ${cheapestSpot2.monthlyFee.toFixed(2)} €/kk). ${cheapestSpot1.pricePerKwh + cheapestSpot1.monthlyFee * 12 / (ANNUAL_KWH / 100) <= cheapestSpot2.pricePerKwh + cheapestSpot2.monthlyFee * 12 / (ANNUAL_KWH / 100) ? p1.name : p2.name} on kokonaisuutena edullisempi pörssisähkössä.`
        : `Toinen yhtiöistä ei tarjoa pörssisähköä. Vertaa kiinteähintaisia sopimuksia.`,
    },
    {
      question: `Tarjoaako ${p1.name} tai ${p2.name} vihreää sähköä?`,
      answer: `${p1.greenOptions ? p1.name + ' tarjoaa vihreitä sähkösopimuksia alkuperätakuilla.' : p1.name + ' ei tarjoa vihreitä vaihtoehtoja.'} ${p2.greenOptions ? p2.name + ' tarjoaa vihreitä sähkösopimuksia alkuperätakuilla.' : p2.name + ' ei tarjoa vihreitä vaihtoehtoja.'}`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Etusivu', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Vertailu', item: `${SITE_URL}/vertailu` },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${p1.name} vs ${p2.name}`,
        item: `${SITE_URL}/vertailu/${pair}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/" className="hover:text-[#0066FF]">
          Etusivu
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/vertailu" className="hover:text-[#0066FF]">
          Vertailu
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-900">
          {p1.name} vs {p2.name}
        </span>
      </nav>

      {/* Hero: VS graphic */}
      <div className="mb-10 rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#1A2940] p-8 text-white sm:p-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
          {/* Provider 1 */}
          <div className="text-center sm:text-right">
            <div className="mb-2 text-sm font-medium uppercase tracking-wider text-slate-400">
              {getTypeLabel(d1?.type ?? p1.type ?? 'national')}
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">{p1.name}</h2>
            <div className="mt-2 flex items-center justify-center gap-2 sm:justify-end">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold">{p1.rating?.toFixed(1) ?? '—'}</span>
              <span className="text-sm text-slate-400">
                ({p1.reviewCount?.toLocaleString('fi-FI')} arvostelua)
              </span>
            </div>
          </div>

          {/* VS badge */}
          <div className="flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0066FF] text-2xl font-black shadow-lg shadow-blue-500/30 sm:h-20 sm:w-20 sm:text-3xl">
              VS
            </div>
          </div>

          {/* Provider 2 */}
          <div className="text-center sm:text-left">
            <div className="mb-2 text-sm font-medium uppercase tracking-wider text-slate-400">
              {getTypeLabel(d2?.type ?? p2.type ?? 'national')}
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">{p2.name}</h2>
            <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold">{p2.rating?.toFixed(1) ?? '—'}</span>
              <span className="text-sm text-slate-400">
                ({p2.reviewCount?.toLocaleString('fi-FI')} arvostelua)
              </span>
            </div>
          </div>
        </div>

        <h1 className="mt-8 text-center text-lg font-medium text-slate-300 sm:text-xl">
          {p1.name} vs {p2.name} — Kumpi on parempi sähköyhtiö vuonna 2026?
        </h1>
      </div>

      {/* Quick verdict banner */}
      <div className="mb-10 rounded-xl border border-green-200 bg-green-50 p-6">
        <div className="flex items-start gap-4">
          <Trophy className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-600" />
          <div>
            <h3 className="text-lg font-bold text-green-900">
              Suosituksemme: {winner.name}
            </h3>
            <p className="mt-1 text-green-800">
              Kokonaisvertailussa {winner.name} on parempi valinta huomioiden hinnan, luotettavuuden,
              asiakastyytyväisyyden ja sopimusvalikoiman. Ero on kuitenkin{' '}
              {Math.abs(score1 - score2) < 3 ? 'hyvin pieni' : 'selkeä'}, ja{' '}
              {loser.name} voi olla parempi valinta tietyissä tilanteissa.
            </p>
          </div>
        </div>
      </div>

      {/* === Comparison Table === */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          <Scale className="mr-2 inline h-6 w-6 text-[#0066FF]" />
          Yhtiöiden vertailu
        </h2>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50">
            <div className="p-4 text-sm font-medium text-slate-500">Ominaisuus</div>
            <div className="border-l border-slate-200 p-4 text-center text-sm font-bold text-slate-900">
              {p1.name}
            </div>
            <div className="border-l border-slate-200 p-4 text-center text-sm font-bold text-slate-900">
              {p2.name}
            </div>
          </div>

          {/* Company info rows */}
          <ComparisonRow
            label="Tyyppi"
            icon={<Building2 className="h-4 w-4" />}
            value1={getTypeLabel(d1?.type ?? p1.type ?? 'national')}
            value2={getTypeLabel(d2?.type ?? p2.type ?? 'national')}
          />
          <ComparisonRow
            label="Arvosana"
            icon={<Star className="h-4 w-4" />}
            value1={
              <span className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {p1.rating?.toFixed(1) ?? '—'}
              </span>
            }
            value2={
              <span className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {p2.rating?.toFixed(1) ?? '—'}
              </span>
            }
            highlight={
              (p1.rating ?? 0) !== (p2.rating ?? 0)
                ? (p1.rating ?? 0) > (p2.rating ?? 0)
                  ? 'left'
                  : 'right'
                : undefined
            }
          />
          <ComparisonRow
            label="Vastapuoliriski"
            icon={<Shield className="h-4 w-4" />}
            value1={<span className={risk1.color}>{risk1.label} ({p1.counterpartyRisk})</span>}
            value2={<span className={risk2.color}>{risk2.label} ({p2.counterpartyRisk})</span>}
            highlight={
              p1.counterpartyRisk !== p2.counterpartyRisk
                ? p1.counterpartyRisk < p2.counterpartyRisk
                  ? 'left'
                  : 'right'
                : undefined
            }
          />
          <ComparisonRow
            label="Perustettu"
            icon={<Calendar className="h-4 w-4" />}
            value1={p1.founded?.toString() ?? '—'}
            value2={p2.founded?.toString() ?? '—'}
          />
          <ComparisonRow
            label="Asiakkaita"
            icon={<Users className="h-4 w-4" />}
            value1={p1.customerCount ?? '—'}
            value2={p2.customerCount ?? '—'}
          />
          <ComparisonRow
            label="Vihreä sähkö"
            icon={<Leaf className="h-4 w-4" />}
            value1={
              p1.greenOptions ? (
                <span className="text-green-600">Kyllä</span>
              ) : (
                <span className="text-slate-400">Ei</span>
              )
            }
            value2={
              p2.greenOptions ? (
                <span className="text-green-600">Kyllä</span>
              ) : (
                <span className="text-slate-400">Ei</span>
              )
            }
          />
          <ComparisonRow
            label="Sopimusten määrä"
            icon={<Zap className="h-4 w-4" />}
            value1={`${p1.contracts.length} sopimusta`}
            value2={`${p2.contracts.length} sopimusta`}
            highlight={
              p1.contracts.length !== p2.contracts.length
                ? p1.contracts.length > p2.contracts.length
                  ? 'left'
                  : 'right'
                : undefined
            }
          />
        </div>
      </section>

      {/* === Contract Comparison === */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          <Zap className="mr-2 inline h-6 w-6 text-[#0066FF]" />
          Sopimusvertailu
        </h2>

        <div className="space-y-6">
          {/* Spot contracts */}
          {(cheapestSpot1 || cheapestSpot2) && (
            <ContractComparisonCard
              title="Pörssisähkö (halvin)"
              contract1={cheapestSpot1}
              contract2={cheapestSpot2}
              provider1={p1}
              provider2={p2}
              annualKwh={ANNUAL_KWH}
            />
          )}

          {/* Fixed contracts */}
          {(cheapestFixed1 || cheapestFixed2) && (
            <ContractComparisonCard
              title="Kiinteähintainen (halvin)"
              contract1={cheapestFixed1}
              contract2={cheapestFixed2}
              provider1={p1}
              provider2={p2}
              annualKwh={ANNUAL_KWH}
            />
          )}
        </div>
      </section>

      {/* === Price Comparison === */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Hintavertailu ({ANNUAL_KWH.toLocaleString('fi-FI')} kWh/vuosi)</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <PriceSummaryCard
            provider={p1}
            contract={cheapestOverall1}
            annualCost={cost1}
            isWinner={cost1 <= cost2}
          />
          <PriceSummaryCard
            provider={p2}
            contract={cheapestOverall2}
            annualCost={cost2}
            isWinner={cost2 <= cost1}
          />
        </div>

        {savings > 1 && (
          <div className="mt-4 rounded-lg bg-blue-50 p-4 text-center">
            <p className="text-blue-900">
              Valitsemalla <strong>{cheaperProvider.name}</strong> säästät arviolta{' '}
              <strong>{formatEuros(savings)}</strong> vuodessa ({ANNUAL_KWH.toLocaleString('fi-FI')} kWh
              kulutuksella).
            </p>
          </div>
        )}
      </section>

      {/* === Pros & Cons === */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Plussat ja miinukset</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <ProsConsCard provider={p1} details={d1} />
          <ProsConsCard provider={p2} details={d2} />
        </div>
      </section>

      {/* === Winner Section === */}
      <section className="mb-12">
        <div className="rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] p-8 text-white sm:p-10">
          <div className="flex items-start gap-4">
            <Trophy className="mt-1 h-8 w-8 flex-shrink-0 text-yellow-300" />
            <div>
              <h2 className="text-2xl font-bold">
                Voittaja: {winner.name}
              </h2>
              <div className="mt-4 space-y-3 text-blue-100">
                <p>
                  Kokonaisvertailumme perusteella <strong className="text-white">{winner.name}</strong> on
                  parempi valinta useimmille kuluttajille vuonna 2026.
                </p>
                {cost1 !== cost2 && (
                  <p>
                    <strong className="text-white">Hinta:</strong>{' '}
                    {cheaperProvider.name} on edullisempi — säästö noin {formatEuros(savings)}/vuosi
                    tyypillisellä {ANNUAL_KWH.toLocaleString('fi-FI')} kWh kulutuksella.
                  </p>
                )}
                <p>
                  <strong className="text-white">Luotettavuus:</strong>{' '}
                  {p1.counterpartyRisk <= p2.counterpartyRisk ? p1.name : p2.name} on vastapuoliriskiltään
                  matalampi.
                </p>
                <p>
                  <strong className="text-white">Asiakastyytyväisyys:</strong>{' '}
                  {(p1.rating ?? 0) >= (p2.rating ?? 0) ? p1.name : p2.name} saa paremmat arvosanat
                  asiakkailta ({Math.max(p1.rating ?? 0, p2.rating ?? 0).toFixed(1)}/5).
                </p>
                <p className="mt-4 text-sm text-blue-200">
                  Huomioithan, että paras sähköyhtiö riippuu aina henkilökohtaisista tarpeistasi.
                  Vertaa sopimuksia yksityiskohtaisemmin vertailulaskurillamme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Usein kysytyt kysymykset</h2>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-slate-200 bg-white"
              open={i === 0}
            >
              <summary className="cursor-pointer p-5 text-lg font-semibold text-slate-900 transition-colors hover:text-[#0066FF]">
                {item.question}
              </summary>
              <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-slate-600">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* === CTA === */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center sm:p-10">
        <h2 className="text-2xl font-bold text-slate-900">Vertaa kaikkia sähkösopimuksia</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Etsitkö vielä edullisempaa sähköä? Vertaa yli 90 sopimusta 37 sähköyhtiöltä
          ilmaisella vertailulaskurillamme.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/vertailu"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0066FF] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#0052CC]"
          >
            Vertaa kaikkia sopimuksia
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/sahkoyhtiot/${p1.slug}`}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            {p1.name}
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/sahkoyhtiot/${p2.slug}`}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            {p2.name}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Related comparisons */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Muita vertailuja</h2>
        <div className="flex flex-wrap gap-2">
          {providerComparisons
            .filter((c) => c.slugPair !== pair)
            .slice(0, 8)
            .map((c) => {
              const cp1 = providers.find((p) => p.slug === c.provider1Slug);
              const cp2 = providers.find((p) => p.slug === c.provider2Slug);
              if (!cp1 || !cp2) return null;
              return (
                <Link
                  key={c.slugPair}
                  href={`/vertailu/${c.slugPair}`}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#0066FF] hover:text-[#0066FF]"
                >
                  {cp1.name} vs {cp2.name}
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}

// --- Sub-components ---

function ComparisonRow({
  label,
  icon,
  value1,
  value2,
  highlight,
}: {
  label: string;
  icon?: React.ReactNode;
  value1: React.ReactNode;
  value2: React.ReactNode;
  highlight?: 'left' | 'right';
}) {
  return (
    <div className="grid grid-cols-3 border-b border-slate-100 last:border-b-0">
      <div className="flex items-center gap-2 p-4 text-sm font-medium text-slate-700">
        {icon && <span className="text-slate-400">{icon}</span>}
        {label}
      </div>
      <div
        className={cn(
          'flex items-center justify-center border-l border-slate-100 p-4 text-center text-sm',
          highlight === 'left' && 'bg-green-50 font-semibold text-green-700'
        )}
      >
        {value1}
      </div>
      <div
        className={cn(
          'flex items-center justify-center border-l border-slate-100 p-4 text-center text-sm',
          highlight === 'right' && 'bg-green-50 font-semibold text-green-700'
        )}
      >
        {value2}
      </div>
    </div>
  );
}

function ContractComparisonCard({
  title,
  contract1,
  contract2,
  provider1,
  provider2,
  annualKwh,
}: {
  title: string;
  contract1: ElectricityContract | null;
  contract2: ElectricityContract | null;
  provider1: ElectricityProvider;
  provider2: ElectricityProvider;
  annualKwh: number;
}) {
  const cost1 = contract1
    ? calculateAnnualCost(contract1.pricePerKwh, contract1.monthlyFee, annualKwh, contract1.type)
    : null;
  const cost2 = contract2
    ? calculateAnnualCost(contract2.pricePerKwh, contract2.monthlyFee, annualKwh, contract2.type)
    : null;

  const winner =
    cost1 !== null && cost2 !== null ? (cost1 <= cost2 ? 'left' : 'right') : cost1 !== null ? 'left' : 'right';

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="grid grid-cols-2 divide-x divide-slate-200">
        {/* Provider 1 */}
        <div className={cn('p-5', winner === 'left' && 'bg-green-50/50')}>
          <div className="mb-1 text-sm font-bold text-slate-900">{provider1.name}</div>
          {contract1 ? (
            <>
              <div className="text-sm text-slate-600">{contract1.name}</div>
              <div className="mt-3 space-y-1">
                <div className="text-sm">
                  <span className="text-slate-500">Marginaali/hinta: </span>
                  <span className="font-medium">{contract1.pricePerKwh.toFixed(2)} c/kWh</span>
                </div>
                <div className="text-sm">
                  <span className="text-slate-500">Kuukausimaksu: </span>
                  <span className="font-medium">{contract1.monthlyFee.toFixed(2)} €/kk</span>
                </div>
                {contract1.contractLength && (
                  <div className="text-sm">
                    <span className="text-slate-500">Sopimusaika: </span>
                    <span className="font-medium">{contract1.contractLength} kk</span>
                  </div>
                )}
                <div className="text-sm">
                  <span className="text-slate-500">Vihreä: </span>
                  {contract1.greenEnergy ? (
                    <span className="font-medium text-green-600">Kyllä</span>
                  ) : (
                    <span className="text-slate-400">Ei</span>
                  )}
                </div>
              </div>
              {cost1 !== null && (
                <div className="mt-3 rounded-lg bg-white p-2 text-center">
                  <div className="text-xs text-slate-500">Vuosikustannus</div>
                  <div className={cn('text-lg font-bold', winner === 'left' ? 'text-green-600' : 'text-slate-900')}>
                    {formatEuros(cost1)}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="mt-2 text-sm text-slate-400">Ei tarjolla</div>
          )}
        </div>

        {/* Provider 2 */}
        <div className={cn('p-5', winner === 'right' && 'bg-green-50/50')}>
          <div className="mb-1 text-sm font-bold text-slate-900">{provider2.name}</div>
          {contract2 ? (
            <>
              <div className="text-sm text-slate-600">{contract2.name}</div>
              <div className="mt-3 space-y-1">
                <div className="text-sm">
                  <span className="text-slate-500">Marginaali/hinta: </span>
                  <span className="font-medium">{contract2.pricePerKwh.toFixed(2)} c/kWh</span>
                </div>
                <div className="text-sm">
                  <span className="text-slate-500">Kuukausimaksu: </span>
                  <span className="font-medium">{contract2.monthlyFee.toFixed(2)} €/kk</span>
                </div>
                {contract2.contractLength && (
                  <div className="text-sm">
                    <span className="text-slate-500">Sopimusaika: </span>
                    <span className="font-medium">{contract2.contractLength} kk</span>
                  </div>
                )}
                <div className="text-sm">
                  <span className="text-slate-500">Vihreä: </span>
                  {contract2.greenEnergy ? (
                    <span className="font-medium text-green-600">Kyllä</span>
                  ) : (
                    <span className="text-slate-400">Ei</span>
                  )}
                </div>
              </div>
              {cost2 !== null && (
                <div className="mt-3 rounded-lg bg-white p-2 text-center">
                  <div className="text-xs text-slate-500">Vuosikustannus</div>
                  <div className={cn('text-lg font-bold', winner === 'right' ? 'text-green-600' : 'text-slate-900')}>
                    {formatEuros(cost2)}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="mt-2 text-sm text-slate-400">Ei tarjolla</div>
          )}
        </div>
      </div>
    </div>
  );
}

function PriceSummaryCard({
  provider,
  contract,
  annualCost,
  isWinner,
}: {
  provider: ElectricityProvider;
  contract: ElectricityContract;
  annualCost: number;
  isWinner: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-6',
        isWinner
          ? 'border-green-300 bg-green-50 ring-2 ring-green-200'
          : 'border-slate-200 bg-white'
      )}
    >
      {isWinner && (
        <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          <Trophy className="h-3 w-3" />
          Edullisin
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900">{provider.name}</h3>
      <p className="mt-1 text-sm text-slate-500">
        {contract.name} ({getContractTypeLabel(contract.type)})
      </p>
      <div className="mt-4">
        <div className="text-3xl font-bold text-slate-900">{formatEuros(annualCost)}</div>
        <div className="text-sm text-slate-500">vuodessa (sis. siirto + verot)</div>
      </div>
      <div className="mt-2 text-sm text-slate-500">
        ≈ {formatEuros(annualCost / 12)}/kk
      </div>
    </div>
  );
}

function ProsConsCard({
  provider,
  details,
}: {
  provider: ElectricityProvider;
  details: { pros: string[]; cons: string[] } | null;
}) {
  const pros = details?.pros ?? provider.pros ?? [];
  const cons = details?.cons ?? provider.cons ?? [];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-bold text-slate-900">{provider.name}</h3>

      {pros.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-green-700">
            <ThumbsUp className="h-4 w-4" />
            Plussat
          </h4>
          <ul className="space-y-1.5">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
      )}

      {cons.length > 0 && (
        <div>
          <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-red-700">
            <ThumbsDown className="h-4 w-4" />
            Miinukset
          </h4>
          <ul className="space-y-1.5">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
