import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Zap,
  ChevronRight,
  ArrowRight,
  Building2,
  Lightbulb,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  Home,
  BarChart3,
} from 'lucide-react';
import { regions } from '@/data/regions';
import { regionContent } from '@/data/region-content';
import { providers } from '@/data/providers';
import { SITE_URL, AVG_TRANSFER_PRICE } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Only generate pages for regions that have content, to avoid building 404 pages
  return regions
    .filter((r) => regionContent[r.id])
    .map((r) => ({ slug: r.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = regions.find((r) => r.id === slug);
  const content = regionContent[slug];

  if (!region || !content) {
    return { title: 'Aluetta ei löytynyt' };
  }

  return {
    title: `${content.title} — Siirtohinta, sähköyhtiöt ja sopimukset`,
    description: content.description,
    openGraph: {
      title: `${content.title} — Siirtohinta, sähköyhtiöt ja sopimukset | Valitse Sähkö`,
      description: content.description,
      url: `${SITE_URL}/alue/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/alue/${slug}`,
    },
  };
}

export default async function RegionPage({ params }: PageProps) {
  const { slug } = await params;
  const region = regions.find((r) => r.id === slug);
  const content = regionContent[slug];

  if (!region || !content) {
    notFound();
  }

  // Resolve provider objects
  const localProviderData = content.localProviders
    .map((pSlug) => providers.find((p) => p.slug === pSlug))
    .filter(Boolean) as typeof providers;

  // Transfer price comparison
  const priceDiff = region.transferPrice - AVG_TRANSFER_PRICE;
  const isBelow = priceDiff < 0;
  const isAbove = priceDiff > 0;
  const diffAbs = Math.abs(priceDiff).toFixed(1);

  // JSON-LD FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // JSON-LD BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Etusivu',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Alueet',
        item: `${SITE_URL}/alue`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: region.name,
        item: `${SITE_URL}/alue/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1628] to-[#162540] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Etusivu
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/alue" className="hover:text-white/80 transition-colors">
              Alueet
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">{region.name}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#0066FF]" />
                <span className="text-sm font-medium text-[#0066FF]">Maakunta</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {content.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/70">
                {content.heroText}
              </p>
            </div>

            {/* Key facts card */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:min-w-[300px]">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
                Alueen tiedot
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-white/80">
                  <Building2 className="h-4 w-4 shrink-0 text-[#0066FF]" />
                  <div>
                    <div className="text-xs text-white/50">Siirtoyhtiö</div>
                    <div>{region.gridOperator}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Zap className="h-4 w-4 shrink-0 text-[#0066FF]" />
                  <div>
                    <div className="text-xs text-white/50">Siirtohinta</div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-white">
                        {region.transferPrice.toFixed(1)} c/kWh
                      </span>
                      {isBelow && (
                        <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300">
                          <TrendingDown className="h-3 w-3" />
                          -{diffAbs}
                        </span>
                      )}
                      {isAbove && (
                        <span className="flex items-center gap-0.5 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
                          <TrendingUp className="h-3 w-3" />
                          +{diffAbs}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="h-4 w-4 shrink-0 text-[#0066FF]" />
                  <div>
                    <div className="text-xs text-white/50">Suurimmat kaupungit</div>
                    <div>{content.majorCities.slice(0, 3).join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Transfer price section */}
            <section className="mb-12">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
                <BarChart3 className="h-6 w-6 text-[#0066FF]" />
                Sähkön hinta alueella {region.name}
              </h2>

              {/* Transfer price visualization */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Siirtohinta verrattuna kansalliseen keskiarvoon</h3>
                  <p className="text-sm text-slate-500">
                    Sähkön siirtohinta {region.name}n alueella on{' '}
                    <span className="font-semibold text-slate-700">{region.transferPrice.toFixed(1)} c/kWh</span>,
                    kun kansallinen keskiarvo on {AVG_TRANSFER_PRICE.toFixed(1)} c/kWh.
                    {isBelow && ` Tämä on ${diffAbs} c/kWh edullisempi kuin keskiarvo.`}
                    {isAbove && ` Tämä on ${diffAbs} c/kWh kalliimpi kuin keskiarvo.`}
                    {!isBelow && !isAbove && ' Hinta vastaa kansallista keskiarvoa.'}
                  </p>
                </div>

                {/* Visual bar comparison */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">{region.name}</span>
                      <span className="font-semibold text-slate-900">{region.transferPrice.toFixed(1)} c/kWh</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-slate-100">
                      <div
                        className={cn(
                          'h-4 rounded-full transition-all',
                          isBelow ? 'bg-emerald-500' : isAbove ? 'bg-amber-500' : 'bg-[#0066FF]'
                        )}
                        style={{ width: `${Math.min((region.transferPrice / 6) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-400">Kansallinen keskiarvo</span>
                      <span className="font-semibold text-slate-400">{AVG_TRANSFER_PRICE.toFixed(1)} c/kWh</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-slate-100">
                      <div
                        className="h-4 rounded-full bg-slate-300"
                        style={{ width: `${Math.min((AVG_TRANSFER_PRICE / 6) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Cost impact example */}
                <div className="mt-6 rounded-xl bg-slate-50 p-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Mitä tämä tarkoittaa käytännössä?</h4>
                  <div className="grid gap-3 sm:grid-cols-2 text-sm">
                    <div>
                      <span className="text-slate-500">Kerrostalo (3 000 kWh/v):</span>
                      <br />
                      <span className="font-semibold text-slate-900">
                        Siirto {((region.transferPrice / 100) * 3000).toFixed(0)} &euro;/vuosi
                      </span>
                      {priceDiff !== 0 && (
                        <span className={cn('ml-1 text-xs', isBelow ? 'text-emerald-600' : 'text-amber-600')}>
                          ({isBelow ? '' : '+'}{((priceDiff / 100) * 3000).toFixed(0)} &euro;)
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-slate-500">Omakotitalo (18 000 kWh/v):</span>
                      <br />
                      <span className="font-semibold text-slate-900">
                        Siirto {((region.transferPrice / 100) * 18000).toFixed(0)} &euro;/vuosi
                      </span>
                      {priceDiff !== 0 && (
                        <span className={cn('ml-1 text-xs', isBelow ? 'text-emerald-600' : 'text-amber-600')}>
                          ({isBelow ? '' : '+'}{((priceDiff / 100) * 18000).toFixed(0)} &euro;)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Local providers */}
            <section className="mb-12">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
                <Building2 className="h-6 w-6 text-[#0066FF]" />
                Alueen sähköyhtiöt
              </h2>
              {localProviderData.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {localProviderData.map((provider) => {
                    const cheapestFixed = provider.contracts
                      .filter((c) => c.type === 'fixed')
                      .sort((a, b) => a.pricePerKwh - b.pricePerKwh)[0];
                    const cheapestSpot = provider.contracts
                      .filter((c) => c.type === 'spot')
                      .sort((a, b) => a.pricePerKwh - b.pricePerKwh)[0];

                    return (
                      <Link
                        key={provider.id}
                        href={`/sahkoyhtiot/${provider.slug}`}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-[#0066FF]/30 hover:shadow-md"
                      >
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0066FF] transition-colors">
                          {provider.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                          {provider.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          {cheapestSpot && (
                            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-700">
                              Pörssi: {cheapestSpot.pricePerKwh.toFixed(2)} c/kWh marginaali
                            </span>
                          )}
                          {cheapestFixed && (
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">
                              Kiinteä: {cheapestFixed.pricePerKwh.toFixed(2)} c/kWh
                            </span>
                          )}
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-sm font-medium text-[#0066FF] opacity-0 transition-opacity group-hover:opacity-100">
                          Katso sopimukset
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Tietoja alueen paikallisista sähköyhtiöistä ei ole saatavilla.
                </p>
              )}
              <p className="mt-4 text-sm text-slate-500">
                Huomaa: sähkönmyyjän voit valita vapaasti riippumatta asuinpaikastasi. Myös kaikki{' '}
                <Link href="/sahkoyhtiot" className="text-[#0066FF] hover:underline">
                  valtakunnalliset sähköyhtiöt
                </Link>{' '}
                myyvät sähköä {region.name}n alueella.
              </p>
            </section>

            {/* Electricity profile */}
            <section className="mb-12">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
                <Home className="h-6 w-6 text-[#0066FF]" />
                Tyypillinen kulutus — {region.name}
              </h2>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-600 leading-relaxed">
                  {content.electricityProfile}
                </p>
              </div>
            </section>

            {/* Spot price note */}
            <section className="mb-12">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
                <Zap className="h-6 w-6 text-[#0066FF]" />
                Pörssisähkö alueella {region.name}
              </h2>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-600 leading-relaxed">
                  {content.spotPriceNote}
                </p>
                <div className="mt-4">
                  <Link
                    href="/porssisahko"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0066FF] hover:underline"
                  >
                    Seuraa pörssisähkön hintaa reaaliajassa
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Saving tips */}
            <section className="mb-12">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
                <Lightbulb className="h-6 w-6 text-[#0066FF]" />
                Säästövinkit — {region.name}
              </h2>
              <div className="space-y-4">
                {content.savingTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0066FF]/10 text-sm font-bold text-[#0066FF]">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
                <HelpCircle className="h-6 w-6 text-[#0066FF]" />
                Usein kysytyt kysymykset — {region.name}
              </h2>
              <div className="space-y-4">
                {content.faq.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-base font-bold text-slate-900">{item.question}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* CTA */}
              <div className="rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold">Vertaa sähkösopimuksia</h3>
                <p className="mt-2 text-sm text-white/80">
                  Vertaa sähkösopimuksia {region.name}n alueella ja löydä edullisin vaihtoehto
                  juuri sinun kulutuksellesi.
                </p>
                <Link
                  href={`/vertailu?alue=${slug}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0066FF] transition-colors hover:bg-white/90"
                >
                  Vertaa sopimuksia
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Region facts */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Alueen kaupungit
                </h3>
                <div className="flex flex-wrap gap-2">
                  {content.majorCities.map((city) => (
                    <span
                      key={city}
                      className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-600"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Hyödyllisiä linkkejä
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/porssisahko"
                    className="flex items-center gap-2 text-sm text-slate-700 hover:text-[#0066FF] transition-colors"
                  >
                    <Zap className="h-4 w-4 text-[#0066FF]" />
                    Pörssisähkön hinta nyt
                  </Link>
                  <Link
                    href="/sahkoyhtiot"
                    className="flex items-center gap-2 text-sm text-slate-700 hover:text-[#0066FF] transition-colors"
                  >
                    <Building2 className="h-4 w-4 text-[#0066FF]" />
                    Kaikki sähköyhtiöt
                  </Link>
                  <Link
                    href="/oppaat"
                    className="flex items-center gap-2 text-sm text-slate-700 hover:text-[#0066FF] transition-colors"
                  >
                    <Lightbulb className="h-4 w-4 text-[#0066FF]" />
                    Oppaat ja vinkit
                  </Link>
                  <Link
                    href="/tyokalut"
                    className="flex items-center gap-2 text-sm text-slate-700 hover:text-[#0066FF] transition-colors"
                  >
                    <BarChart3 className="h-4 w-4 text-[#0066FF]" />
                    Sähkölaskurit
                  </Link>
                </div>
              </div>

              {/* Other regions */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Muut maakunnat
                </h3>
                <div className="space-y-2">
                  {regions
                    .filter((r) => r.id !== slug)
                    .slice(0, 6)
                    .map((r) => (
                      <Link
                        key={r.id}
                        href={`/alue/${r.id}`}
                        className="flex items-center justify-between text-sm text-slate-600 hover:text-[#0066FF] transition-colors"
                      >
                        <span>{r.name}</span>
                        <span className="text-xs text-slate-400">{r.transferPrice.toFixed(1)} c/kWh</span>
                      </Link>
                    ))}
                </div>
                <Link
                  href="/alue"
                  className="mt-4 flex items-center gap-1 text-sm font-medium text-[#0066FF] hover:underline"
                >
                  Kaikki alueet
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
