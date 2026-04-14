import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  Clock,
  TrendingDown,
  TrendingUp,
  Sun,
  Moon,
  ChevronRight,
  ArrowRight,
  BarChart3,
  Calculator,
  Lightbulb,
  HelpCircle,
  ThumbsUp,
  AlertTriangle,
} from 'lucide-react';
import { getTodayPrices, getTomorrowPrices, getCurrentPrice } from '@/lib/api/price-service';
import { SITE_URL, ELECTRICITY_VAT } from '@/lib/constants';
import { cn, getFinnishHour } from '@/lib/utils';
import { computeStats } from '@/lib/price-utils';
import type { HourlyPrice } from '@/types';

// Revalidate every 5 minutes
export const revalidate = 300;

const todayFi = () => {
  return new Intl.DateTimeFormat('fi-FI', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
};

export async function generateMetadata(): Promise<Metadata> {
  const dateStr = todayFi();

  const title = `Sähkön hinta tänään — Pörssisähkön hinta juuri nyt ${new Date().getFullYear()}`;
  const description = `Sähkön hinta tänään ${dateStr}. Katso pörssisähkön tuntihinnat, halvimmat ja kalleimmat tunnit sekä laskuri sähkökustannusten arviointiin. Päivitetty reaaliajassa.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Valitse Sähkö`,
      description,
      url: `${SITE_URL}/sahkon-hinta-tanaan`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/sahkon-hinta-tanaan`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
      },
    },
  };
}

function getPriceLevel(price: number): 'cheap' | 'moderate' | 'expensive' | 'very-expensive' {
  if (price < 5) return 'cheap';
  if (price < 10) return 'moderate';
  if (price < 15) return 'expensive';
  return 'very-expensive';
}

const levelConfig = {
  cheap: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    priceText: 'text-emerald-600',
    label: 'Edullinen',
    barColor: 'bg-emerald-500',
  },
  moderate: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    priceText: 'text-amber-600',
    label: 'Normaali',
    barColor: 'bg-amber-500',
  },
  expensive: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    priceText: 'text-orange-600',
    label: 'Kallis',
    barColor: 'bg-orange-500',
  },
  'very-expensive': {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    priceText: 'text-red-600',
    label: 'Erittäin kallis',
    barColor: 'bg-red-500',
  },
};

function formatPriceFi(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

export default async function SahkonHintaTanaanPage() {
  let todayPrices: HourlyPrice[] = [];
  let tomorrowPrices: HourlyPrice[] | null = null;
  let currentPrice: HourlyPrice | null = null;
  let isSampleData = false;

  try {
    const [todayResult, tomorrowResult, currentResult] = await Promise.all([
      getTodayPrices(),
      getTomorrowPrices(),
      getCurrentPrice(),
    ]);
    todayPrices = todayResult.data;
    tomorrowPrices = tomorrowResult.data;
    currentPrice = currentResult.data;
    // Detect sample data from source attribution instead of broken rank check
    isSampleData = todayResult.source === 'sample';
  } catch (error) {
    console.error('Server-side fetch failed:', error);
    isSampleData = true;
  }

  const stats = computeStats(todayPrices, currentPrice);
  const level = getPriceLevel(stats.currentPrice);
  const config = levelConfig[level];

  const currentHour = getFinnishHour();

  // Cheapest and most expensive hours
  const sorted = [...todayPrices].sort((a, b) => a.price - b.price);
  const cheapest5 = sorted.slice(0, 5);
  const expensive3 = sorted.slice(-3).reverse();
  const futureCheap = cheapest5.filter((p) => p.hour >= currentHour);

  // Max price for chart scaling
  const maxChartPrice = todayPrices.length > 0 ? Math.max(...todayPrices.map((p) => p.price)) : 10;

  // Cost calculation constants
  const consumptionLevels = [
    { label: 'Pieni asunto (2 000 kWh/v)', kwh: 2000 },
    { label: 'Kerrostalo (3 500 kWh/v)', kwh: 3500 },
    { label: 'Rivitalo (5 000 kWh/v)', kwh: 5000 },
    { label: 'Omakotitalo (12 000 kWh/v)', kwh: 12000 },
    { label: 'Sähkölämmitys (18 000 kWh/v)', kwh: 18000 },
  ];

  // FAQ items
  const faqItems = [
    {
      question: 'Mikä on sähkön hinta tänään?',
      answer: `Tänään sähkön hinta vaihtelee ${formatPriceFi(stats.minPrice)} - ${formatPriceFi(stats.maxPrice)} c/kWh (sis. ALV 25,5 %). Keskihinta on ${formatPriceFi(stats.avgPrice)} c/kWh. Halvimmillaan sähkö on klo ${stats.minHour}:00 ja kalleimmillaan klo ${stats.maxHour}:00. Hinnat perustuvat Nord Pool -sähköpörssin tuntihintaan.`,
    },
    {
      question: 'Milloin sähkö on halvinta?',
      answer: `Sähkö on tyypillisesti halvimmillaan yöllä klo 01-05 ja päivällä klo 12-14, jolloin tuuli- ja aurinkovoiman tuotanto on suurimmillaan. Kalleimmat tunnit ovat yleensä aamulla klo 07-09 ja illalla klo 17-19, jolloin kotitalouksien kulutus on korkeimmillaan. Tänään halvimmat tunnit ovat klo ${cheapest5.map((p) => `${p.hour}:00`).join(', ')}.`,
    },
    {
      question: 'Miten pörssisähkön hinta määräytyy?',
      answer: 'Pörssisähkön hinta määräytyy Nord Pool -sähköpörssissä, jossa sähkön tuottajat ja ostajat kohtaavat. Hinta vaihtelee tunneittain kysynnän ja tarjonnan mukaan. Siihen vaikuttavat mm. sää (tuuli, lämpötila), vesivoiman saatavuus, ydinvoimaloiden tuotanto ja naapurimaiden sähkötilanne. Suomessa käytetään Elspot-alueen FI-hintaa.',
    },
    {
      question: 'Kannattaako pörssisähkö?',
      answer: 'Pörssisähkö on yleensä edullisin vaihtoehto, jos pystyt ajoittamaan kulutustasi halvimmille tunneille. Tyypillinen pörssisähkön vuosikeskiarvo Suomessa on 4-8 c/kWh (alv 0 %), kun kiinteähintaisten sopimusten hinnat ovat usein 7-10 c/kWh. Suurin riski on hintapiikit kylmien talvipäivien aikana, mutta kokonaisuutena pörssisähkö on usein kannattavin valinta.',
    },
    {
      question: 'Mitä sähkön hintaan sisältyy?',
      answer: 'Kuluttajan sähkölaskuun sisältyy: 1) Sähköenergia (pörssihinta tai kiinteä hinta + marginaali), 2) Sähkönsiirto (verkkoyhtiön siirtomaksu, keskimäärin 4-5 c/kWh), 3) Sähkövero (2,79 c/kWh + ALV) ja 4) Arvonlisävero 25,5 %. Tällä sivulla näytetyt tuntihinnat sisältävät ALV:n mutta eivät siirtoa tai veroa.',
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sähkön hinta tänään',
        item: `${SITE_URL}/sahkon-hinta-tanaan`,
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Sähkön hinta tänään — ${todayFi()}`,
    description: `Pörssisähkön hinta tänään: ${formatPriceFi(stats.currentPrice)} c/kWh. Päivän keskihinta ${formatPriceFi(stats.avgPrice)} c/kWh.`,
    url: `${SITE_URL}/sahkon-hinta-tanaan`,
    dateModified: new Date().toISOString(),
    inLanguage: 'fi',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Valitse Sähkö',
      url: SITE_URL,
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/" className="hover:text-accent">
          Etusivu
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-900">Sähkön hinta tänään</span>
      </nav>

      {/* === HERO: Current price === */}
      <div
        className={cn(
          'mb-8 rounded-2xl border p-8 sm:p-10',
          config.bg,
          config.border
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              'mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold',
              config.bg,
              config.text
            )}
          >
            <Zap className="h-4 w-4" />
            {config.label}
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Sähkön hinta tänään
          </h1>
          <p className="mt-1 text-sm text-slate-500">{todayFi()}</p>

          <div className="mt-6">
            <div className={cn('text-5xl font-black sm:text-6xl', config.priceText)}>
              {formatPriceFi(stats.currentPrice)}
            </div>
            <div className="mt-1 text-sm text-slate-500">c/kWh (sis. ALV 25,5 %)</div>
          </div>

          {stats.direction !== 'stable' && (
            <div className="mt-3 flex items-center gap-1 text-sm">
              {stats.direction === 'up' ? (
                <>
                  <TrendingUp className="h-4 w-4 text-red-500" />
                  <span className="text-red-600">
                    Nousussa edellisestä tunnista
                    {stats.previousHourPrice !== null &&
                      ` (${formatPriceFi(stats.previousHourPrice)} c/kWh)`}
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">
                    Laskussa edellisestä tunnista
                    {stats.previousHourPrice !== null &&
                      ` (${formatPriceFi(stats.previousHourPrice)} c/kWh)`}
                  </span>
                </>
              )}
            </div>
          )}

          {isSampleData && (
            <p className="mt-4 rounded-lg bg-yellow-50 px-4 py-2 text-sm text-yellow-700">
              Huom: Näytetään esimerkkihinnat. Reaaliaikaiset hinnat päivittyvät hetken kuluttua.
            </p>
          )}
        </div>
      </div>

      {/* === Key stats === */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          label="Tämänhetkinen"
          value={`${formatPriceFi(stats.currentPrice)} c/kWh`}
          icon={<Zap className="h-5 w-5" />}
          color="blue"
        />
        <StatCard
          label="Päivän keskiarvo"
          value={`${formatPriceFi(stats.avgPrice)} c/kWh`}
          icon={<BarChart3 className="h-5 w-5" />}
          color="slate"
        />
        <StatCard
          label={`Halvin (klo ${stats.minHour}:00)`}
          value={`${formatPriceFi(stats.minPrice)} c/kWh`}
          icon={<TrendingDown className="h-5 w-5" />}
          color="green"
        />
        <StatCard
          label={`Kallein (klo ${stats.maxHour}:00)`}
          value={`${formatPriceFi(stats.maxPrice)} c/kWh`}
          icon={<TrendingUp className="h-5 w-5" />}
          color="red"
        />
      </div>

      {/* === Hourly price chart === */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          <Clock className="mr-2 inline h-6 w-6 text-accent" />
          Tuntihinnat tänään
        </h2>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-1">
            {todayPrices.map((price) => {
              const isCurrentHour = price.hour === currentHour;
              const isPast = price.hour < currentHour;
              const priceLevel = getPriceLevel(price.price);
              const barWidth = maxChartPrice > 0 ? (price.price / maxChartPrice) * 100 : 0;

              return (
                <div
                  key={price.hour}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm',
                    isCurrentHour && 'bg-blue-50 ring-1 ring-blue-200',
                    isPast && !isCurrentHour && 'opacity-50'
                  )}
                >
                  <span
                    className={cn(
                      'w-14 flex-shrink-0 font-mono text-sm',
                      isCurrentHour ? 'font-bold text-blue-700' : 'text-slate-500'
                    )}
                  >
                    {price.hour.toString().padStart(2, '0')}:00
                  </span>
                  <div className="flex-1">
                    <div
                      className={cn(
                        'h-5 rounded-r',
                        levelConfig[priceLevel].barColor,
                        isCurrentHour && 'ring-2 ring-blue-400'
                      )}
                      style={{ width: `${Math.max(barWidth, 2)}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      'w-20 flex-shrink-0 text-right font-mono',
                      isCurrentHour
                        ? 'font-bold text-blue-700'
                        : levelConfig[priceLevel].priceText
                    )}
                  >
                    {formatPriceFi(price.price)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-right text-xs text-slate-400">
            Hinnat c/kWh, sis. ALV 25,5 %
          </div>
        </div>
      </section>

      {/* === Best/worst hours === */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          <Lightbulb className="mr-2 inline h-6 w-6 text-accent" />
          Milloin käyttää sähköä?
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Cheapest hours */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-green-800">
              <ThumbsUp className="h-5 w-5" />
              Halvimmat tunnit tänään
            </h3>
            <div className="mt-4 space-y-2">
              {cheapest5.map((price) => (
                <div
                  key={price.hour}
                  className={cn(
                    'flex items-center justify-between rounded-lg bg-white px-4 py-2',
                    price.hour === currentHour && 'ring-2 ring-green-400'
                  )}
                >
                  <span className="font-medium text-slate-700">
                    klo {price.hour.toString().padStart(2, '0')}:00
                    {price.hour === currentHour && (
                      <span className="ml-2 text-xs text-green-600">(nyt)</span>
                    )}
                  </span>
                  <span className="font-bold text-green-700">
                    {formatPriceFi(price.price)} c/kWh
                  </span>
                </div>
              ))}
            </div>
            {futureCheap.length > 0 && (
              <p className="mt-3 text-sm text-green-700">
                Edessä vielä {futureCheap.length} edullista tuntia. Kannattaa ajoittaa
                pesukone, kuivausrumpu ja tiskikone näille tunneille!
              </p>
            )}
          </div>

          {/* Most expensive hours */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Kalleimmat tunnit tänään
            </h3>
            <div className="mt-4 space-y-2">
              {expensive3.map((price) => (
                <div
                  key={price.hour}
                  className={cn(
                    'flex items-center justify-between rounded-lg bg-white px-4 py-2',
                    price.hour === currentHour && 'ring-2 ring-red-400'
                  )}
                >
                  <span className="font-medium text-slate-700">
                    klo {price.hour.toString().padStart(2, '0')}:00
                    {price.hour === currentHour && (
                      <span className="ml-2 text-xs text-red-600">(nyt)</span>
                    )}
                  </span>
                  <span className="font-bold text-red-700">
                    {formatPriceFi(price.price)} c/kWh
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-red-700">
              Vältä suurta sähkönkulutusta näinä tunteina. Jokainen siirretty
              kilowattitunti säästää rahaa pörssisähkösopimuksella!
            </p>
          </div>
        </div>
      </section>

      {/* === Cost calculator section === */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          <Calculator className="mr-2 inline h-6 w-6 text-accent" />
          Mitä hinta tarkoittaa sinulle?
        </h2>
        <p className="mb-6 text-slate-600">
          Arvioi sähkökustannuksesi tämänhetkisellä pörssihinnalla eri kulutusprofiileille.
          Hinnat sisältävät energian, siirron (keskim. 4,5 c/kWh), sähköveron ja ALV:n.
        </p>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-500">
            <div className="col-span-2">Kulutusprofiili</div>
            <div className="text-right">Tämän tunnin hinta</div>
            <div className="text-right">Päivän keskihinnalla</div>
          </div>
          {consumptionLevels.map((level) => {
            // Current hour cost: hourly rate * kWh/hour (annual / 8760 for average hourly usage)
            const hourlyUsage = level.kwh / 8760;
            // Full cost per kWh including transfer + tax + VAT
            const fullCurrentPrice =
              stats.currentPrice + 4.5 + 2.79372 * (1 + ELECTRICITY_VAT);
            const fullAvgPrice =
              stats.avgPrice + 4.5 + 2.79372 * (1 + ELECTRICITY_VAT);
            // Monthly cost estimate
            const monthlyCurrentEst = (fullCurrentPrice / 100) * (level.kwh / 12);
            const monthlyAvgEst = (fullAvgPrice / 100) * (level.kwh / 12);

            return (
              <div
                key={level.kwh}
                className="grid grid-cols-4 items-center border-b border-slate-100 p-4 last:border-0"
              >
                <div className="col-span-2">
                  <div className="text-sm font-medium text-slate-900">{level.label}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900">
                    ~{monthlyCurrentEst.toFixed(0)} €/kk
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900">
                    ~{monthlyAvgEst.toFixed(0)} €/kk
                  </div>
                </div>
              </div>
            );
          })}
          <div className="bg-slate-50 px-4 py-3 text-xs text-slate-500">
            Arviot ovat suuntaa-antavia ja perustuvat tasaiseen kulutusprofiiliin. Todelliset kustannukset
            vaihtelevat kulutusajankohtien mukaan.
          </div>
        </div>
      </section>

      {/* === Tomorrow preview === */}
      {tomorrowPrices && tomorrowPrices.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            <Sun className="mr-2 inline h-6 w-6 text-accent" />
            Huomisen hinnat
          </h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-slate-500">Keskihinta</div>
                <div className="text-xl font-bold text-slate-900">
                  {formatPriceFi(
                    tomorrowPrices.reduce((a, b) => a + b.price, 0) / tomorrowPrices.length
                  )}{' '}
                  c/kWh
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Halvin</div>
                <div className="text-xl font-bold text-green-600">
                  {formatPriceFi(Math.min(...tomorrowPrices.map((p) => p.price)))} c/kWh
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Kallein</div>
                <div className="text-xl font-bold text-red-600">
                  {formatPriceFi(Math.max(...tomorrowPrices.map((p) => p.price)))} c/kWh
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/porssisahko"
                className="text-sm font-medium text-accent hover:underline"
              >
                Katso huomisen tuntihinnat kokonaan &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* === Energy saving tips === */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          <Lightbulb className="mr-2 inline h-6 w-6 text-accent" />
          Vinkit sähkön säästämiseen tänään
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <TipCard
            icon={<Moon className="h-6 w-6" />}
            title="Ajoita yöhön"
            description="Pesukone, kuivuri ja tiskikone ajastimella halvimmille tunneille. Yöllä sähkö on usein 50-80 % edullisempaa."
          />
          <TipCard
            icon={<Sun className="h-6 w-6" />}
            title="Hyödynnä päivä"
            description="Keskipäivällä aurinkovoima laskee hintoja. Hyvä aika ladata sähköauto tai lämmittää lämminvesivaraaja."
          />
          <TipCard
            icon={<Zap className="h-6 w-6" />}
            title="Vältä piikkejä"
            description="Aamuruuhka (klo 7-9) ja iltaruuhka (klo 17-19) ovat kalleimpia. Siirrä kulutus näiden ohi."
          />
        </div>
      </section>

      {/* === FAQ === */}
      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          <HelpCircle className="mr-2 inline h-6 w-6 text-accent" />
          Usein kysytyt kysymykset
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-slate-200 bg-white"
              open={i === 0}
            >
              <summary className="cursor-pointer p-5 text-lg font-semibold text-slate-900 transition-colors hover:text-accent">
                {item.question}
              </summary>
              <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-slate-600 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* === Internal links === */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Hyödyllisiä linkkejä</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <InternalLinkCard
            href="/porssisahko"
            title="Pörssisähkön hinta nyt"
            description="Reaaliaikainen sähköpörssin seuranta, hintahistoria ja ennusteet"
          />
          <InternalLinkCard
            href="/vertailu"
            title="Vertaa sähkösopimuksia"
            description="Löydä halvin sähkösopimus yli 100 vaihtoehdosta"
          />
          <InternalLinkCard
            href="/blogi/porssisahko-vai-kiintea-hinta"
            title="Pörssisähkö vai kiinteä?"
            description="Opas: kumpi sopimustyyppi on sinulle parempi valinta?"
          />
          <InternalLinkCard
            href="/oppaat/sahkon-saastaminen"
            title="Sähkön säästöopas"
            description="Konkreettiset vinkit sähkölaskun pienentämiseen"
          />
        </div>
      </section>

      {/* === CTA === */}
      <section className="rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#1A2940] p-8 text-center text-white sm:p-10">
        <h2 className="text-2xl font-bold">Vaihda edullisempaan sähkösopimukseen</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          Pörssisähkö ei ole ainoa vaihtoehto. Vertaa kiinteähintaisia ja pörssisähkösopimuksia
          ja löydä sinulle edullisin ratkaisu.
        </p>
        <div className="mt-6">
          <Link
            href="/vertailu"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-700"
          >
            Vertaa sähkösopimuksia
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// --- Sub-components ---

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red' | 'slate';
}) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    slate: 'bg-slate-50 text-slate-600 border-slate-200',
  };

  const iconColorMap = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    red: 'text-red-500',
    slate: 'text-slate-500',
  };

  return (
    <div className={cn('rounded-xl border p-4', colorMap[color])}>
      <div className={cn('mb-2', iconColorMap[color])}>{icon}</div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm font-bold sm:text-base">{value}</div>
    </div>
  );
}

function TipCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 text-accent">{icon}</div>
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </div>
  );
}

function InternalLinkCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-accent hover:bg-blue-50/50"
    >
      <div className="flex-1">
        <div className="font-semibold text-slate-900 group-hover:text-accent">{title}</div>
        <div className="mt-0.5 text-sm text-slate-500">{description}</div>
      </div>
      <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-accent" />
    </Link>
  );
}
