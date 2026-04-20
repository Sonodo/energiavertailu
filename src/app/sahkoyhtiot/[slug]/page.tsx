import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Leaf,
  ChevronRight,
  ExternalLink,
  Phone,
  Globe,
  Calendar,
  MapPin,
  Users,
  ThumbsUp,
  ThumbsDown,
  Zap,
  CheckCircle2,
  Building2,
  Shield,
  TrendingDown,
} from 'lucide-react';
import { providers } from '@/data/providers';
import { providerDetails } from '@/data/provider-details';
import { SITE_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import FAQSchema from '@/components/seo/FAQSchema';
import ProviderSchema from '@/components/seo/ProviderSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ContractProductSchema from '@/components/seo/ContractProductSchema';
import InternalLinks from '@/components/InternalLinks';
import ProviderLogo from '@/components/ui/ProviderLogo';
import UpdateTimestamp from '@/components/ui/UpdateTimestamp';
import type { ElectricityProvider, ElectricityContract } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ISR: regenerate static provider pages every 24h so stale static prices
// are refreshed when data/providers.ts is redeployed. Prices shown are
// always accompanied by a "Hinnat päivitetty ..." disclaimer.
export const revalidate = 86400;

// Build-time date used as the authoritative "prices last updated" marker,
// rendered into the static HTML (server) so crawlers see it too.
const PRICES_UPDATED_AT = new Date();
const PRICES_UPDATED_LABEL = PRICES_UPDATED_AT.toLocaleDateString('fi-FI', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

export async function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = providers.find((p) => p.slug === slug);
  if (!provider) {
    return { title: 'Sähköyhtiö ei löytynyt' };
  }

  const title = `${provider.name} sähkösopimukset 2026 – hinnat, sopimukset ja arvostelu | Valitse Sähkö`;
  // Keep meta description under ~160 chars for SERP snippets.
  const rawDescription = `${provider.name}: ${provider.contracts.length} sopimusta, hinnat ja arvostelu. ${provider.description}`;
  const description =
    rawDescription.length > 155
      ? `${rawDescription.slice(0, 152).trimEnd()}...`
      : rawDescription;

  const canonical = `${SITE_URL}/sahkoyhtiot/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `${provider.name} sähkösopimukset 2026 – hinnat ja arvostelu`,
      description,
      url: canonical,
      siteName: 'Valitse Sähkö',
      locale: 'fi_FI',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${provider.name} sähkösopimukset 2026`,
      description,
    },
    alternates: {
      canonical,
    },
  };
}

const TYPE_LABELS: Record<string, string> = {
  fixed: 'Kiinteä',
  spot: 'Pörssi',
  hybrid: 'Yhdistelmä',
  'open-ended': 'Toistaiseksi',
};

const TYPE_COLORS: Record<string, string> = {
  fixed: 'bg-blue-100 text-blue-700',
  spot: 'bg-amber-100 text-amber-700',
  hybrid: 'bg-purple-100 text-purple-700',
  'open-ended': 'bg-slate-100 text-slate-700',
};

const PROVIDER_TYPE_LABELS: Record<string, string> = {
  national: 'Valtakunnallinen',
  regional: 'Alueellinen',
  challenger: 'Haastaja',
};

export default async function ProviderDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const provider = providers.find((p) => p.slug === slug);

  if (!provider) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Building2 className="h-8 w-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Sähköyhtiötä ei löytynyt</h1>
          <p className="mt-2 text-sm text-slate-500">
            Etsimääsi sähköyhtiötä ei löytynyt hakemistostamme. Yhtiö on saattanut vaihtaa nimeä tai sitä ei ole vielä lisätty palveluumme.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/sahkoyhtiot"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
            >
              <Building2 className="h-4 w-4" />
              Selaa kaikkia sähköyhtiöitä
            </Link>
            <Link
              href="/vertailu"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Vertaa sopimuksia
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const details = providerDetails[provider.id];
  const pType = details?.type ?? 'national';

  // Dominant contract type — used to rank alternatives fairly:
  // whichever type this provider has most of (fallback: 'spot').
  const typeCounts: Record<string, number> = {};
  provider.contracts.forEach((c) => {
    typeCounts[c.type] = (typeCounts[c.type] ?? 0) + 1;
  });
  const dominantType =
    (Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as
      | 'fixed'
      | 'spot'
      | 'hybrid'
      | 'open-ended'
      | undefined) ?? 'spot';

  // Top 3 cheapest alternative providers, ranked by the cheapest matching
  // contract of the dominant type. Transparent criterion disclosed in the UI.
  type Alternative = {
    provider: ElectricityProvider;
    contract: ElectricityContract;
  };
  const alternatives: Alternative[] = providers
    .filter((p) => p.id !== provider.id)
    .map((p) => {
      const matching = p.contracts.filter((c) => c.type === dominantType);
      if (matching.length === 0) return null;
      const cheapest = matching.reduce((min, c) =>
        c.pricePerKwh < min.pricePerKwh ? c : min
      );
      return { provider: p, contract: cheapest } as Alternative;
    })
    .filter((a): a is Alternative => a !== null)
    .sort((a, b) => a.contract.pricePerKwh - b.contract.pricePerKwh)
    .slice(0, 3);

  const dominantTypeLabel =
    dominantType === 'fixed'
      ? 'kiinteähintainen'
      : dominantType === 'spot'
        ? 'pörssisähkö'
        : dominantType === 'hybrid'
          ? 'yhdistelmä'
          : 'toistaiseksi voimassa oleva';

  return (
    <>
      <ProviderSchema provider={provider} details={details} />
      <ContractProductSchema provider={provider} contracts={provider.contracts} />
      <BreadcrumbSchema
        items={[
          { name: 'Etusivu', url: SITE_URL },
          { name: 'Sähköyhtiöt', url: `${SITE_URL}/sahkoyhtiot` },
          {
            name: provider.name,
            url: `${SITE_URL}/sahkoyhtiot/${provider.slug}`,
          },
        ]}
      />
      {details?.faq && details.faq.length > 0 && <FAQSchema faqs={details.faq} />}

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1628] to-[#162540] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Etusivu
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/sahkoyhtiot" className="hover:text-white/80 transition-colors">
              Sähköyhtiöt
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">{provider.name}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              {/* Type badge */}
              <span
                className={cn(
                  'mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                  pType === 'national'
                    ? 'bg-blue-500/20 text-blue-300'
                    : pType === 'challenger'
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-amber-500/20 text-amber-300'
                )}
              >
                {PROVIDER_TYPE_LABELS[pType]}
              </span>

              <div className="mb-3">
                <ProviderLogo name={provider.name} slug={provider.slug} size="lg" />
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {provider.name} – sähkösopimukset ja arvostelu
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-white/70">{provider.description}</p>

            </div>

            {/* Key facts card */}
            <div className="w-full rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6 lg:min-w-[280px] lg:w-auto">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
                Perustiedot
              </h2>
              <div className="space-y-3 text-sm">
                {provider.founded && (
                  <div className="flex items-center gap-3 text-white/80">
                    <Calendar className="h-4 w-4 text-accent" />
                    <span>Perustettu {provider.founded}</span>
                  </div>
                )}
                {provider.headquarters && (
                  <div className="flex items-center gap-3 text-white/80">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>{provider.headquarters}</span>
                  </div>
                )}
                {provider.customerCount && (
                  <div className="flex items-center gap-3 text-white/80">
                    <Users className="h-4 w-4 text-accent" />
                    <span>{provider.customerCount} asiakasta</span>
                  </div>
                )}
                {details?.revenue && (
                  <div className="flex items-center gap-3 text-white/80">
                    <Building2 className="h-4 w-4 text-accent" />
                    <span>Liikevaihto {details.revenue}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-white/80">
                  <Shield className={cn('h-4 w-4', provider.counterpartyRisk <= 10 ? 'text-emerald-400' : provider.counterpartyRisk <= 25 ? 'text-green-400' : provider.counterpartyRisk <= 50 ? 'text-amber-400' : provider.counterpartyRisk <= 75 ? 'text-orange-400' : 'text-red-400')} />
                  <span>
                    Vastapuoliriski:{' '}
                    <span className={cn('font-semibold', provider.counterpartyRisk <= 10 ? 'text-emerald-300' : provider.counterpartyRisk <= 25 ? 'text-green-300' : provider.counterpartyRisk <= 50 ? 'text-amber-300' : provider.counterpartyRisk <= 75 ? 'text-orange-300' : 'text-red-300')}>
                      {provider.counterpartyRisk}%
                    </span>
                    {provider.counterpartyRisk <= 10 ? ' — Erittäin vakaa' : provider.counterpartyRisk <= 25 ? ' — Vakaa' : provider.counterpartyRisk <= 50 ? ' — Kohtalainen' : provider.counterpartyRisk <= 75 ? ' — Kohonnut' : ' — Korkea riski'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Globe className="h-4 w-4 text-accent" />
                  <a
                    href={
                      provider.isAffiliate && provider.affiliateUrl
                        ? provider.affiliateUrl
                        : provider.website
                    }
                    target="_blank"
                    rel={
                      provider.isAffiliate
                        ? 'sponsored nofollow noopener noreferrer'
                        : 'noopener noreferrer'
                    }
                    className="hover:text-white underline underline-offset-2"
                  >
                    {provider.website.replace('https://', '').replace('www.', '')}
                  </a>
                </div>
                {details?.customerServicePhone && (
                  <div className="flex items-center gap-3 text-white/80">
                    <Phone className="h-4 w-4 text-accent" />
                    <a
                      href={`tel:${details.customerServicePhone.replace(/\s/g, '')}`}
                      className="hover:text-white"
                    >
                      {details.customerServicePhone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Long description */}
            {details?.longDescription && (
              <section className="mb-12">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Tietoa yhtiöstä: {provider.name}
                </h2>
                <div className="prose prose-slate max-w-none">
                  {details.longDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-slate-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* Contracts */}
            <section className="mb-12">
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  Sähkösopimukset ({provider.contracts.length})
                </h2>
                <UpdateTimestamp label="Sopimustiedot päivitetty" />
              </div>
              {/* Server-rendered "prices updated on" disclaimer — crawler-visible,
                  mitigates stale-price risk on statically generated contract data. */}
              <div
                className="mb-6 flex flex-col gap-1 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between"
                role="note"
              >
                <span>
                  <strong className="font-semibold">Hinnat päivitetty {PRICES_UPDATED_LABEL}.</strong>{' '}
                  Sopimusten kuukausimaksut ja energiahinnat vahvistetaan aina sähköyhtiön sivuilta.
                </span>
                <Link
                  href="/menetelma"
                  className="text-xs font-medium text-amber-900 underline underline-offset-2 hover:text-amber-950"
                >
                  Menetelmä
                </Link>
              </div>
              <div className="space-y-4">
                {provider.contracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900">{contract.name}</h3>
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-xs font-semibold',
                              TYPE_COLORS[contract.type]
                            )}
                          >
                            {TYPE_LABELS[contract.type]}
                          </span>
                          {contract.greenEnergy && (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                              <Leaf className="h-3 w-3" />
                              Vihreä
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-slate-500">{contract.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {contract.features.map((feature) => (
                            <span
                              key={feature}
                              className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600"
                            >
                              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-2 sm:items-end sm:min-w-[160px]">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-accent">
                            {contract.pricePerKwh.toFixed(2)} c/kWh
                          </div>
                          <div className="text-xs text-slate-400">
                            {contract.type === 'spot' ? 'marginaali, alv 0 %' : 'energiamaksu, alv 0 %'}
                          </div>
                        </div>
                        <div className="text-sm text-slate-500">
                          + {contract.monthlyFee.toFixed(2)} €/kk
                        </div>
                        {contract.contractLength && (
                          <div className="text-xs text-slate-400">
                            {contract.contractLength} kk sopimus
                          </div>
                        )}
                        <a
                          href={
                            provider.isAffiliate && provider.affiliateUrl
                              ? provider.affiliateUrl
                              : contract.url
                          }
                          target="_blank"
                          rel={
                            provider.isAffiliate
                              ? 'sponsored nofollow noopener noreferrer'
                              : 'noopener noreferrer'
                          }
                          className="mt-2 inline-flex min-h-[44px] items-center gap-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-700 transition-colors"
                        >
                          Tutustu sopimukseen
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros and Cons */}
            {details && (
              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">Plussat ja miinukset</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Pros */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-800">
                      <ThumbsUp className="h-5 w-5" />
                      Plussat
                    </h3>
                    <ul className="space-y-3">
                      {details.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Cons */}
                  <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-800">
                      <ThumbsDown className="h-5 w-5" />
                      Miinukset
                    </h3>
                    <ul className="space-y-3">
                      {details.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-red-900">
                          <span className="mt-0.5 h-4 w-4 shrink-0 text-center text-red-400">
                            &minus;
                          </span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Special Features */}
            {details?.specialFeatures && (
              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">Erityispiirteet</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {details.specialFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <Zap className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Alternatives — top 3 cheapest providers for the dominant contract type */}
            {alternatives.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  Vertaile {provider.name} muihin sähköyhtiöihin
                </h2>
                <p className="mb-6 text-sm text-slate-500">
                  Kolme halvinta vaihtoehtoa {dominantTypeLabel}-sopimuksille hintavertailussa.
                  Listaus perustuu tietokantamme{' '}
                  {dominantType === 'spot' ? 'marginaaliin' : 'energiahintaan'} (c/kWh, alv 0 %)
                  {' '}— kaikki toimijat näkyvät samoilla säännöillä.
                </p>
                <div className="space-y-3">
                  {alternatives.map((alt, idx) => {
                    const isCheaper =
                      alt.contract.pricePerKwh <
                      Math.min(
                        ...provider.contracts
                          .filter((c) => c.type === dominantType)
                          .map((c) => c.pricePerKwh)
                      );
                    return (
                      <Link
                        key={alt.provider.id}
                        href={`/sahkoyhtiot/${alt.provider.slug}`}
                        className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-accent/50 hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                            {idx + 1}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-base font-semibold text-slate-900">
                              {alt.provider.name}
                            </div>
                            <div className="truncate text-xs text-slate-500">
                              {alt.contract.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <div
                            className={cn(
                              'text-lg font-bold',
                              isCheaper ? 'text-emerald-600' : 'text-slate-900'
                            )}
                          >
                            {alt.contract.pricePerKwh.toFixed(2)} c/kWh
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            {isCheaper && (
                              <TrendingDown className="h-3 w-3 text-emerald-500" />
                            )}
                            + {alt.contract.monthlyFee.toFixed(2)} €/kk
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <Link
                    href={`/vertailu?provider=${provider.slug}`}
                    className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                  >
                    Tee täydellinen vertailu
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/oppaat/sahkosopimustyypit"
                    className="inline-flex items-center gap-1 font-medium text-slate-600 hover:underline"
                  >
                    Opas: spot vs. kiinteä
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            )}

            {/* FAQ */}
            {details?.faq && details.faq.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  Usein kysytyt kysymykset — {provider.name}
                </h2>
                <div className="space-y-4">
                  {details.faq.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <h3 className="text-base font-bold text-slate-900">{item.question}</h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Compare CTA */}
              <div className="rounded-xl bg-gradient-to-br from-accent to-accent-700 p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold">Vertaa sopimuksia</h3>
                <p className="mt-2 text-sm text-white/80">
                  Vertaa {provider.name}n sopimuksia muiden yhtiöiden kanssa ja löydä halvin
                  vaihtoehto.
                </p>
                <Link
                  href={`/vertailu?provider=${provider.slug}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-white/90"
                >
                  Vertaa sopimuksia
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Quick facts */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Yhteenveto
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Sopimuksia</span>
                    <span className="font-semibold text-slate-900">
                      {provider.contracts.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Halvin kiinteä</span>
                    <span className="font-semibold text-slate-900">
                      {(() => {
                        const fixed = provider.contracts.filter((c) => c.type === 'fixed');
                        if (fixed.length === 0) return '—';
                        return `${Math.min(...fixed.map((c) => c.pricePerKwh)).toFixed(2)} c/kWh`;
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Pörssimaginaali</span>
                    <span className="font-semibold text-slate-900">
                      {(() => {
                        const spot = provider.contracts.filter((c) => c.type === 'spot');
                        if (spot.length === 0) return '—';
                        return `${Math.min(...spot.map((c) => c.pricePerKwh)).toFixed(2)} c/kWh`;
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Vihreä vaihtoehto</span>
                    <span className="font-semibold text-slate-900">
                      {provider.greenOptions ? 'Kyllä' : 'Ei'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Visit website */}
              <a
                href={
                  provider.isAffiliate && provider.affiliateUrl
                    ? provider.affiliateUrl
                    : provider.website
                }
                target="_blank"
                rel={
                  provider.isAffiliate
                    ? 'sponsored nofollow noopener noreferrer'
                    : 'noopener noreferrer'
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Globe className="h-4 w-4" />
                Vieraile sivustolla
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {/* Back to directory */}
              <Link
                href="/sahkoyhtiot"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Building2 className="h-4 w-4" />
                Kaikki sähköyhtiöt
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Internal links */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <InternalLinks
          currentPath={`/sahkoyhtiot/${provider.slug}`}
          tags={['sähköyhtiö', 'sähkösopimus', 'vertailu', 'sähkön hinta']}
          category="sahkoyhtiot"
        />
      </div>
    </>
  );
}
