import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Building2,
  Zap,
  CheckCircle2,
  Star,
  Home,
  Building,
} from 'lucide-react';
import { providers } from '@/data/providers';
import SpotPriceBanner from '@/components/home/SpotPriceBanner';
import QuickComparison from '@/components/home/QuickComparison';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import ProviderLogos from '@/components/home/ProviderLogos';
import LatestBlogPosts from '@/components/home/LatestBlogPosts';
import FAQ from '@/components/home/FAQ';
import CTASection from '@/components/home/CTASection';
import HeroSpotTicker from '@/components/home/HeroSpotTicker';
import AnimatedCounter from '@/components/home/AnimatedCounter';
import FadeIn from '@/components/ui/FadeIn';

export const metadata: Metadata = {
  title: 'Sähkövertailu — Vertaa sähkösopimuksia ja löydä halvin sähkö | Valitse Sähkö',
  description:
    'Vertaa 37 sähköyhtiön sopimuksia, seuraa pörssisähkön hintaa reaaliajassa ja säästä sähkölaskussa. Ilmainen ja puolueeton sähkövertailu Suomessa.',
  openGraph: {
    title: 'Sähkövertailu — Vertaa sähkösopimuksia ja löydä halvin sähkö',
    description:
      'Vertaa 37 sähköyhtiön sopimuksia, seuraa pörssisähkön hintaa reaaliajassa ja säästä sähkölaskussa.',
    url: '/',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
};

// Count total contracts from providers data at build time
const totalContracts = providers.reduce((sum, p) => sum + p.contracts.length, 0);

export default function HomePage() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#0F1D32] to-[#162540]">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          {/* Glow orbs */}
          <div className="absolute -left-48 top-0 h-96 w-96 rounded-full bg-[#0066FF]/15 blur-[120px]" />
          <div className="absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-[#0066FF]/10 blur-[120px]" />
          <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: Main hero content */}
            <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
              {/* Badge */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400">
                  <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                </span>
                Päivitetty reaaliajassa
              </div>

              {/* Headline */}
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Löydä halvin{' '}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-[#0066FF] to-[#3385FF] bg-clip-text text-transparent">
                    sähkösopimus
                  </span>
                </span>{' '}
                Suomesta
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl lg:mx-0">
                Vertaa 37 sähköyhtiön sopimuksia, seuraa pörssisähkön hintaa
                reaaliajassa ja löydä edullisin sähkösopimus. Ilmainen ja puolueeton.
              </p>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/vertailu"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#3385FF] hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98]"
                >
                  Vertaa sähkösopimuksia
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/porssisahko"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 active:scale-[0.98]"
                >
                  <Zap className="h-5 w-5 text-[#0066FF]" />
                  Seuraa pörssisähköä
                </Link>
              </div>

              {/* Quick-start presets */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="text-xs text-white/40">Pikavertailu:</span>
                <Link
                  href="/vertailu?kulutus=2000&tyyppi=kerrostalo&step=3"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-[0.98]"
                >
                  <Building2 className="h-3 w-3" />
                  Kerrostalo
                </Link>
                <Link
                  href="/vertailu?kulutus=5000&tyyppi=rivitalo&step=3"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-[0.98]"
                >
                  <Building className="h-3 w-3" />
                  Rivitalo
                </Link>
                <Link
                  href="/vertailu?kulutus=18000&tyyppi=omakotitalo&step=3"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-[0.98]"
                >
                  <Home className="h-3 w-3" />
                  Omakotitalo
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
                <TrustBadge icon={<Shield className="h-5 w-5" />} label="Puolueeton" />
                <TrustBadge icon={<CheckCircle2 className="h-5 w-5" />} label="Ilmainen" />
                <TrustBadge icon={<Building2 className="h-5 w-5" />} label="37 yhtiötä" />
                <TrustBadge icon={<Star className="h-5 w-5" />} label="Ilmainen vertailu" />
              </div>
            </div>

            {/* Right: Spot price ticker */}
            <div className="flex-shrink-0 lg:mt-16">
              <HeroSpotTicker />
            </div>
          </div>

          {/* Hero stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            <HeroStat value="37" label="Sähköyhtiötä" />
            <HeroStatAnimated count={totalContracts} suffix="+" label="Sopimusta" />
            <HeroStat value="0 €" label="Vertailun hinta" />
            <HeroStat value="24/7" label="Reaaliaikainen data" />
          </div>
        </div>
      </section>

      {/* ─── Live Spot Price Banner ─── */}
      <SpotPriceBanner />

      {/* ─── Quick Comparison Tool ─── */}
      <FadeIn>
        <QuickComparison />
      </FadeIn>

      {/* ─── How It Works ─── */}
      <FadeIn>
        <HowItWorks />
      </FadeIn>

      {/* ─── Features Grid ─── */}
      <FadeIn>
        <FeaturesGrid />
      </FadeIn>

      {/* ─── Provider Logos ─── */}
      <FadeIn>
        <ProviderLogos />
      </FadeIn>

      {/* ─── Latest Blog Posts ─── */}
      <FadeIn>
        <LatestBlogPosts />
      </FadeIn>

      {/* ─── FAQ Section ─── */}
      <FadeIn>
        <FAQ />
      </FadeIn>

      {/* ─── Final CTA ─── */}
      <FadeIn>
        <CTASection />
      </FadeIn>

      {/* Structured data is in layout.tsx — no duplicate here */}
    </>
  );
}

// ─── Sub-components (server-rendered) ───

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400">
      <span className="text-[#0066FF]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center backdrop-blur-sm">
      <div className="text-2xl font-bold text-white sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-slate-400 sm:text-sm">{label}</div>
    </div>
  );
}

function HeroStatAnimated({ count, suffix, label }: { count: number; suffix: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center backdrop-blur-sm">
      <div className="text-2xl font-bold text-white sm:text-3xl">
        <AnimatedCounter target={count} duration={1800} suffix={suffix} />
      </div>
      <div className="mt-1 text-xs text-slate-400 sm:text-sm">{label}</div>
    </div>
  );
}
