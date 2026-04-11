'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Zap,
  Lock,
  TrendingUp,
  Layers,
  Search,
  BarChart3,
  Check,
  Users,
  Clock,
  Leaf,
  Plus,
  Minus,
  Sun,
  Building2,
  Home,
  ThermometerSun,
  Activity,
  BadgeCheck,
} from 'lucide-react';
import { AnimatedHeading, ScrollReveal, WaveDivider, StatsCounter } from '@/components/landing';

/* ═══════════════════════════════════════════════════════════════════
   Valitse Sähkö — Premium Landing Page
   12 visually varied sections with Framer Motion animations
   ═══════════════════════════════════════════════════════════════════ */

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ── Data ───────────────────────────────────────────────────────── */

const faqItems = [
  {
    q: 'Onko Valitse Sähkön palvelu ilmainen?',
    a: 'Kyllä, palvelumme on täysin ilmainen kuluttajille. Vertailemme sähkösopimuksia kattavasti eikä palvelun käyttö maksa mitään.',
  },
  {
    q: 'Kuinka usein sähkösopimustiedot päivitetään?',
    a: 'Päivitämme sähkösopimustiedot säännöllisesti. Pörssisähkön hinta päivittyy reaaliajassa Nord Pool -pörssistä. Kiinteähintaiset sopimukset tarkistetaan viikoittain.',
  },
  {
    q: 'Miten sähkönmyyjän vaihto toimii?',
    a: 'Sähkönmyyjän vaihto on helppoa ja ilmaista. Tee uusi sopimus haluamasi myyjän kanssa, ja uusi myyjä hoitaa vanhan sopimuksen irtisanomisen. Vaihto kestää noin 2–4 viikkoa.',
  },
  {
    q: 'Mikä on pörssisähkö ja kenelle se sopii?',
    a: 'Pörssisähkössä hinta vaihtelee tunneittain Nord Pool -sähköpörssin mukaan. Se sopii erityisesti niille, jotka voivat ajoittaa kulutustaan — esimerkiksi ladata sähköautoa tai lämmittää vesivaraajaa halvoilla tunneilla.',
  },
  {
    q: 'Kannattaako valita kiinteähintainen vai pörssisähkö?',
    a: 'Riippuu tilanteestasi. Kiinteä hinta tuo ennustettavuutta ja suojaa hintapiikeiltä. Pörssisähkö on usein keskimäärin edullisempi, mutta vaatii joustoa kulutuksessa. Yhdistelmäsopimus tarjoaa molempien parhaat puolet.',
  },
  {
    q: 'Voinko vaihtaa sähkönmyyjää kesken sopimuskauden?',
    a: 'Toistaiseksi voimassa olevan sopimuksen voit irtisanoa kahden viikon varoitusajalla. Määräaikaisen sopimuksen voi yleensä irtisanoa vasta sopimuskauden päättyessä ilman irtisanomismaksua.',
  },
];

const howItWorks = [
  {
    step: 1,
    icon: Search,
    title: 'Vertaile',
    desc: 'Selaa kaikkien sähköyhtiöiden sopimuksia yhdessä paikassa. Suodata tyypin, hinnan tai vihreän sähkön mukaan.',
  },
  {
    step: 2,
    icon: BarChart3,
    title: 'Valitse',
    desc: 'Vertaa sopimuksia rinnakkain ja löydä sinulle sopivin sähkösopimus parhaaseen hintaan.',
  },
  {
    step: 3,
    icon: ArrowRight,
    title: 'Tilaa',
    desc: 'Siirry suoraan sähköyhtiön sivuille ja tee sopimus. Vaihto on ilmainen ja uusi myyjä hoitaa kaiken.',
  },
];

const valueProps = [
  {
    icon: Shield,
    title: 'Kattava vertailu',
    description: 'Emme suosi mitään sähköyhtiötä. Vertailumme perustuu todellisiin hintoihin ja ehtoihin — et mainoksiin.',
  },
  {
    icon: Clock,
    title: 'Reaaliaikainen data',
    description: 'Pörssisähkön hinta päivittyy reaaliajassa. Kiinteähintaiset sopimukset tarkistetaan viikoittain.',
  },
  {
    icon: TrendingUp,
    title: 'Säästä sähkölaskussa',
    description: 'Suomalaiset maksavat usein liikaa sähköstä. Vertailumme auttaa löytämään saman sähkön edullisemmin.',
  },
  {
    icon: Leaf,
    title: 'Vihreä sähkö',
    description: 'Suodata vihreät sähkösopimukset ja tue uusiutuvaa energiaa — tuuli, aurinko ja vesivoima.',
  },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

interface HomeContentProps {
  providerCount: number;
  totalContracts: number;
  latestPosts: Array<{
    slug: string;
    title: string;
    description: string;
    category: string;
    publishedAt: string;
    readTime: number;
  }>;
  providers: Array<{
    id: string;
    name: string;
    slug: string;
    type?: string;
  }>;
}

export default function HomeContent({
  providerCount,
  totalContracts,
  latestPosts,
  providers,
}: HomeContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO
          Full viewport, dark navy, animated heading
         ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] overflow-hidden bg-navy">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow orbs */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[128px]" />
          <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-accent-400/10 blur-[128px]" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-secondary/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 sm:pb-36 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              Sähkövertailu
            </motion.div>

            {/* Animated heading */}
            <AnimatedHeading
              text="LÖYDÄ HALVIN SÄHKÖSOPIMUS."
              className="text-4xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-2 text-4xl font-extrabold uppercase leading-tight tracking-wide sm:text-5xl lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">
                Vertaa ja säästä.
              </span>
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/80"
            >
              Vertaile sähkösopimuksia kaikilta sähköyhtiöiltä — kiinteä, pörssi vai yhdistelmä.
              Fortum, Helen, Vattenfall ja muut yhdellä haulla.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/vertailu"
                className="group inline-flex items-center justify-center border-2 border-accent bg-accent px-6 py-3 sm:px-8 sm:py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent hover:text-white"
              >
                Vertaa sähkösopimuksia
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/porssisahko"
                className="inline-flex items-center justify-center border-2 border-white/30 px-6 py-3 sm:px-8 sm:py-4 text-sm font-bold uppercase tracking-widest text-white/80 transition-all duration-300 hover:border-white hover:text-white"
              >
                <Zap className="mr-2 h-4 w-4 text-accent-400" />
                Pörssisähkön hinta nyt
              </Link>
            </motion.div>

            {/* Quick-start presets */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0, ease }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              <span className="text-xs text-white/40">Pikavertailu:</span>
              <Link
                href="/vertailu?kulutus=2000&tyyppi=kerrostalo"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-accent/5 hover:text-white active:scale-[0.98]"
              >
                <Building2 className="h-3 w-3" />
                Kerrostalo
              </Link>
              <Link
                href="/vertailu?kulutus=5000&tyyppi=rivitalo"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-accent/5 hover:text-white active:scale-[0.98]"
              >
                <Home className="h-3 w-3" />
                Rivitalo
              </Link>
              <Link
                href="/vertailu?kulutus=18000&tyyppi=omakotitalo"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-accent/5 hover:text-white active:scale-[0.98]"
              >
                <ThermometerSun className="h-3 w-3" />
                Omakotitalo
              </Link>
            </motion.div>

            {/* Hero trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease }}
              className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
            >
              {[
                { value: `${providerCount}+`, label: 'sähköyhtiötä' },
                { value: `${totalContracts}+`, label: 'sopimusta' },
                { value: '24/7', label: 'reaaliaikainen data' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="h-8 w-px bg-white/10" />}
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                    <p className="text-sm text-slate-400">{item.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Animated wave to white */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider color="#ffffff" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: TRUST BAR
          Subtle light strip
         ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 sm:px-6 lg:px-8">
          {[
            { icon: Shield, text: 'Laaja vertailu', color: 'text-accent' },
            { icon: Check, text: 'Ilmainen palvelu', color: 'text-emerald-500' },
            { icon: Users, text: `${providerCount} sähköyhtiötä`, color: 'text-accent-400' },
            { icon: Activity, text: 'Reaaliaikainen pörssihinta', color: 'text-amber-500' },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <item.icon className={`h-5 w-5 ${item.color}`} />
                {item.text}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: CONTRACT TYPE CARDS — Gradient progression
          White bg, 3-col cards with accent color progression
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
              Sopimustyypit
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              Valitse sinulle sopivin sähkösopimuksen tyyppi
            </p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:gap-3">
            {[
              { icon: Lock, title: 'Kiinteähintainen', desc: 'Vakaa kuukausihinta', href: '/vertailu?tyyppi=kiintea', bg: 'bg-accent-100', text: 'text-accent-900', iconColor: 'text-accent-600' },
              { icon: TrendingUp, title: 'Pörssisähkö', desc: 'Tuntihinnoittelu', href: '/porssisahko', bg: 'bg-accent-300', text: 'text-white', iconColor: 'text-white/80' },
              { icon: Layers, title: 'Yhdistelmä', desc: 'Kiinteä + pörssi', href: '/vertailu?tyyppi=yhdistelma', bg: 'bg-accent', text: 'text-white', iconColor: 'text-white/80' },
            ].flatMap((item, i, arr) => {
              const elements = [
                <ScrollReveal key={`cat-${i}`} delay={i * 0.12} direction="up">
                  {/* Mobile arrow */}
                  {i > 0 && (
                    <div className="flex justify-center pb-2 md:hidden">
                      <svg className="h-6 w-6 text-accent-300" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-6-6m6 6l6-6" />
                      </svg>
                    </div>
                  )}
                  <Link
                    href={item.href}
                    className={`group flex min-h-[180px] flex-col items-center justify-center rounded-xl px-6 py-8 ${item.bg} transition-transform duration-300 hover:scale-[1.03]`}
                  >
                    <item.icon className={`h-10 w-10 ${item.iconColor}`} />
                    <p className={`mt-4 text-center text-lg font-bold ${item.text}`}>
                      {item.title}
                    </p>
                    <p className={`mt-1 text-center text-sm font-medium ${item.text} opacity-70`}>
                      {item.desc}
                    </p>
                    <span className={`mt-3 text-xs font-bold uppercase tracking-widest ${item.text} opacity-60 transition-opacity group-hover:opacity-100`}>
                      Vertaile &rarr;
                    </span>
                  </Link>
                </ScrollReveal>,
              ];
              if (i < arr.length - 1) {
                elements.push(
                  <div key={`arrow-${i}`} className="hidden items-center justify-center md:flex">
                    <svg className="h-5 w-7 text-accent-300" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                );
              }
              return elements;
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: VALUE PROPOSITION — 2-column layout
          Dark bg, large heading left, info cards right
         ───────────────────────────────────────────────────────────── */}
      <WaveDivider color="#0B1F3F" flip={false} />
      <section className="bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: large heading and text */}
            <ScrollReveal direction="left">
              <div className="max-w-xl">
                <h2 className="text-2xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-3xl lg:text-4xl">
                  Kattava. Reaaliaikainen. Ilmainen.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white/70">
                  Suomalaiset kotitaloudet maksavat sähköstä 1 200–3 000 euroa vuodessa. Sähkönmyyjän vaihtaminen edullisempaan
                  voi tuoda 200–600 euron vuosisäästöt — ilman että kulutustottumuksia tarvitsee muuttaa.
                </p>
                <div className="mt-8">
                  <Link
                    href="/vertailu"
                    className="inline-flex items-center gap-2 border-2 border-accent bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent hover:text-white"
                  >
                    Aloita vertailu
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: 2x2 value cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {valueProps.map((vp, i) => (
                <ScrollReveal key={i} delay={i * 0.12} direction="right">
                  <div className="rounded-xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                    <vp.icon className="h-8 w-8 text-accent-400" />
                    <h3 className="mt-4 text-base font-bold text-white">
                      {vp.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {vp.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: STATS
          Dark bg, CountUp numbers
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-navy pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <StatsCounter
            stats={[
              { end: providerCount, suffix: '+', label: 'Sähköyhtiötä' },
              { end: totalContracts, suffix: '+', label: 'Sopimusta' },
              { end: 24, suffix: '/7', label: 'Reaaliaikainen data' },
              { end: 0, suffix: ' €', label: 'Hintaa palvelusta' },
            ]}
          />
        </div>
      </section>
      <WaveDivider color="#ffffff" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: PROVIDERS
          White bg, provider grid with initial circles
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
                Sähköyhtiöt vertailussa
              </h2>
              <p className="mt-3 text-slate-500">
                Vertailemme kaikkia Suomen merkittävimpiä sähkönmyyjiä
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {providers.map((provider, i) => (
              <ScrollReveal key={provider.id} delay={i * 0.06} direction="up">
                <Link
                  href={`/sahkoyhtiot/${provider.slug}`}
                  className="card-hover group flex flex-col items-center text-center"
                >
                  <div
                    className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl font-bold text-white shadow-lg"
                  >
                    {provider.name.charAt(0)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-accent">{provider.name}</h3>
                  <span className="mt-1 text-xs text-slate-500">
                    {provider.type === 'national' ? 'Valtakunnallinen' : provider.type === 'regional' ? 'Alueellinen' : 'Haastaja'}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: HOW IT WORKS — Horizontal numbered steps
          Light bg, connected step icons
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="mb-14 text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
                Näin helppoa se on
              </h2>
              <p className="mt-3 text-slate-500">
                Löydä halvin sähkösopimus kolmessa askeleessa
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="absolute left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] top-10 hidden h-0.5 bg-gradient-to-r from-accent-200 via-accent-400 to-accent md:block" aria-hidden="true" />

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {howItWorks.map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 0.15} direction="up">
                  <div className="flex flex-col items-center text-center">
                    {/* Numbered circle */}
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-accent/20">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                        {item.step}
                      </div>
                    </div>
                    <item.icon className="mt-6 h-8 w-8 text-accent-400" />
                    <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: SAVINGS HIGHLIGHTS — 3-col feature cards
          White bg, icon-driven cards
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
                Säästä sähkölaskussa
              </h2>
              <p className="mt-3 text-lg text-slate-500">
                Aktiivisella vertailulla voit säästää satoja euroja vuodessa
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Pörssisähkön seuranta',
                description: 'Seuraa pörssisähkön tuntihintaa reaaliajassa ja ajoita kulutuksesi halvimmille tunneille.',
                color: 'bg-amber-50 text-amber-600',
              },
              {
                icon: Sun,
                title: 'Vihreä energia',
                description: 'Vertaile uusiutuvan energian sopimuksia. Tuuli-, aurinko- ja vesivoimasähkö yhdessä paikassa.',
                color: 'bg-emerald-50 text-emerald-600',
              },
              {
                icon: BadgeCheck,
                title: 'Luotettavat yhtiöt',
                description: 'Arvioimme jokaisen sähköyhtiön luotettavuuden. Vertaile vastapuoliriskiä ja asiakaskokemuksia.',
                color: 'bg-accent-50 text-accent-600',
              },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.12} direction="up">
                <div className="card-hover flex flex-col items-start">
                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${feature.color.split(' ')[0]}`}>
                    <feature.icon className={`h-7 w-7 ${feature.color.split(' ')[1]}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: COMPARISON TABLE
          White bg, highlight Valitse Sähkö column
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
              Miksi Valitse Sähkö?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              Vertaile eri tapoja löytää halvin sähkösopimus
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <div className="mt-12 overflow-x-auto rounded-lg ring-1 ring-slate-200">
              <table className="w-full min-w-[500px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-white">
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 sm:px-6">&nbsp;</th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400 sm:px-6">
                      Itse etsiminen
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400 sm:px-6">
                      Sähköyhtiön sivut
                    </th>
                    <th className="bg-navy px-5 py-4 text-center text-xs font-bold uppercase tracking-widest text-white sm:px-6">
                      Valitse Sähkö
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-sm">
                  {[
                    { label: 'Kattavuus', a: 'Yhtiö kerrallaan', b: 'Vain omat sopimukset', c: 'Kaikki sähköyhtiöt' },
                    { label: 'Läpinäkyvyys', a: 'Mainosten vaikutus', b: 'Oma yhtiö edullisimmaksi', c: 'Avoin menetelmä' },
                    { label: 'Pörssisähkön hinta', a: 'Etsittävä erikseen', b: 'Voi näkyä', c: 'Reaaliajassa' },
                    { label: 'Ajankäyttö', a: 'Tunteja', b: '30 min / yhtiö', c: 'Muutama minuutti' },
                    { label: 'Hinta', a: 'Ilmainen', b: 'Ilmainen', c: 'Ilmainen' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-5 py-4 font-medium text-slate-900 sm:px-6">{row.label}</td>
                      <td className="px-5 py-4 text-center text-slate-500 sm:px-6">{row.a}</td>
                      <td className="px-5 py-4 text-center text-slate-500 sm:px-6">{row.b}</td>
                      <td className="bg-navy/5 px-5 py-4 text-center font-bold text-navy sm:px-6">{row.c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 10: FAQ ACCORDION
          Light bg, animated expand/collapse
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
              Usein kysytyt kysymykset
            </h2>
          </ScrollReveal>

          <div className="mt-10 divide-y divide-slate-200 border-t border-slate-200">
            {faqItems.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05} direction="none">
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="flex w-full min-h-[44px] items-center justify-between py-6 text-left"
                    aria-expanded={openFaqIndex === index}
                  >
                    <span className="pr-4 text-base font-semibold text-slate-900 sm:text-lg">
                      {item.q}
                    </span>
                    {openFaqIndex === index ? (
                      <Minus className="h-5 w-5 shrink-0 text-accent" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-slate-400" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaqIndex === index && (
                      <motion.div
                        key={`faq-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 leading-relaxed text-slate-600">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 11: BLOG PREVIEW
          White bg, 3-col article cards
         ───────────────────────────────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="mb-12 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
                  Ajankohtaista
                </h2>
                <Link
                  href="/blogi"
                  className="hidden items-center gap-1 text-sm font-bold uppercase tracking-widest text-accent hover:text-accent-600 sm:flex"
                >
                  Kaikki artikkelit <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {latestPosts.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.12} direction="up">
                  <Link
                    href={`/blogi/${post.slug}`}
                    className="card-hover group flex h-full flex-col"
                  >
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">{post.category}</span>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 line-clamp-2 text-sm text-slate-600">{post.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-slate-400">
                        {post.readTime} min lukuaika
                      </p>
                      <span className="text-xs font-bold uppercase tracking-widest text-accent opacity-0 transition-opacity group-hover:opacity-100">
                        Lue &rarr;
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="mt-8 text-center sm:hidden">
                <Link href="/blogi" className="text-sm font-bold uppercase tracking-widest text-accent hover:text-accent-600">
                  Kaikki artikkelit &rarr;
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 12: CTA
          Dark bg with glow, strong call to action
         ───────────────────────────────────────────────────────────── */}
      <WaveDivider color="#0B1F3F" flip={false} />
      <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
        {/* Glow */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[128px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <AnimatedHeading
              as="h2"
              text="Löydä halvin sähkösopimus"
              className="text-3xl font-extrabold text-white sm:text-4xl"
            />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Vertaa sähkösopimuksia ilmaiseksi ja löydä juuri sinulle sopivin vaihtoehto.
              Kattava, reaaliaikainen ja täysin ilmainen palvelu.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/vertailu"
                className="group inline-flex items-center gap-2 border-2 border-accent bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent hover:text-white"
              >
                Vertaa sähkösopimuksia
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/porssisahko"
                className="inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white/80 transition-all duration-300 hover:border-white hover:text-white"
              >
                <Zap className="mr-1 h-4 w-4 text-accent-400" />
                Pörssisähkön hinta
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
