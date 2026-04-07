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
} from 'lucide-react';
import { providers } from '@/data/providers';
import { providerDetails } from '@/data/provider-details';
import { SITE_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import FAQSchema from '@/components/seo/FAQSchema';
import ProviderSchema from '@/components/seo/ProviderSchema';
import InternalLinks from '@/components/InternalLinks';
import ProviderLogo from '@/components/ui/ProviderLogo';
import ProviderReviews from '@/components/reviews/ProviderReviews';
import UpdateTimestamp from '@/components/ui/UpdateTimestamp';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = providers.find((p) => p.slug === slug);
  if (!provider) {
    return { title: 'Sähköyhtiö ei löytynyt' };
  }

  const title = `${provider.name} — Sopimukset ja hinnat`;
  const description = `${provider.name}: ${provider.contracts.length} sopimusta. ${provider.description}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Valitse Sähkö`,
      description,
      url: `${SITE_URL}/sahkoyhtiot/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/sahkoyhtiot/${slug}`,
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
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0052CC]"
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

  return (
    <>
      <ProviderSchema provider={provider} details={details} />
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
                {provider.name}
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
                    <Calendar className="h-4 w-4 text-[#0066FF]" />
                    <span>Perustettu {provider.founded}</span>
                  </div>
                )}
                {provider.headquarters && (
                  <div className="flex items-center gap-3 text-white/80">
                    <MapPin className="h-4 w-4 text-[#0066FF]" />
                    <span>{provider.headquarters}</span>
                  </div>
                )}
                {provider.customerCount && (
                  <div className="flex items-center gap-3 text-white/80">
                    <Users className="h-4 w-4 text-[#0066FF]" />
                    <span>{provider.customerCount} asiakasta</span>
                  </div>
                )}
                {details?.revenue && (
                  <div className="flex items-center gap-3 text-white/80">
                    <Building2 className="h-4 w-4 text-[#0066FF]" />
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
                  <Globe className="h-4 w-4 text-[#0066FF]" />
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline underline-offset-2"
                  >
                    {provider.website.replace('https://', '').replace('www.', '')}
                  </a>
                </div>
                {details?.customerServicePhone && (
                  <div className="flex items-center gap-3 text-white/80">
                    <Phone className="h-4 w-4 text-[#0066FF]" />
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
              <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  Sähkösopimukset ({provider.contracts.length})
                </h2>
                <UpdateTimestamp label="Sopimustiedot päivitetty" />
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
                          <div className="text-2xl font-bold text-[#0066FF]">
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
                          href={contract.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex min-h-[44px] items-center gap-1 rounded-lg bg-[#0066FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#0052CC] transition-colors"
                        >
                          Katso tarjous
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
                      <Zap className="mt-0.5 h-5 w-5 shrink-0 text-[#0066FF]" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
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

            {/* Customer reviews */}
            <ProviderReviews providerId={provider.id} providerName={provider.name} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Compare CTA */}
              <div className="rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold">Vertaa sopimuksia</h3>
                <p className="mt-2 text-sm text-white/80">
                  Vertaa {provider.name}n sopimuksia muiden yhtiöiden kanssa ja löydä halvin
                  vaihtoehto.
                </p>
                <Link
                  href="/vertailu"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0066FF] transition-colors hover:bg-white/90"
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
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
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
