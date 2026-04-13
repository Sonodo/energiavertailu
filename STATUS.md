# Energiavertailu — Status

**Project**: Energiavertailu — Finnish Electricity Price Comparison
**Status**: LIVE at valitsesahko.fi
**Health**: GREEN
**Domain**: valitsesahko.fi (custom domain)
**GA4**: G-JT1SCYMPW2 (hardcoded fallback active)
**Last Updated**: Session #087 — 2026-04-12

## Overview
Finland's most comprehensive electricity price comparison site. Compare contracts from 37 providers (91 contracts verified accurate) with risk scoring, real-time spot price tracking, interactive calculators, educational content.

## Current State — LIVE

- **37 providers** with risk scoring and detailed profiles, **91 contracts** verified accurate
- **Custom domain**: valitsesahko.fi (Valitse brand)
- **GA4**: G-JT1SCYMPW2 active (hardcoded fallback)
- **GSC**: Verification tag added
- **Cross-links**: Links to other Valitse sites (valitselaina.fi, valitsevakuutus.fi, valitseliittyma.fi)
- **Homepage**: Hero, live spot price banner, quick comparison, how it works, features grid, provider logos, FAQ, CTA
- **Spot Price Dashboard** (/porssisahko): Real-time prices from spot-hinta.fi API, hourly charts, price history, best hours
- **Comparison Calculator** (/vertailu): 3-step flow, contracts from 37 providers, housing type presets, filtering, sorting
- **Provider Directory** (/sahkoyhtiot): Provider pages with detailed profiles, contracts, pros/cons, FAQ
- **Blog** (/blogi): 10 Finnish articles targeting key SEO keywords
- **Educational Guides** (/oppaat): 6 comprehensive guides
- **Tools** (/tyokalut): 6 interactive calculators
- **SEO pages**: Regional pages, provider comparison pairs, "sähkön hinta tänään" page
- **SEO**: Sitemap, robots.txt, llms.txt, JSON-LD structured data, per-page metadata

## Recent Changes

### Session #087 — New Logo + Valitse-ID Infra (2026-04-12)
- **New Valitse Sähkö logo deployed**: Updated brand mark live in production (with surgical lightbulb-shift edit for visual polish)
- **Valitse-ID env vars set**: Shared Neon DB URL, Google OAuth client, AUTH_SECRET configured in Vercel
- **Production redeploy completed**: Site serving new logo + Valitse-ID infrastructure ready for frontend wiring

### Session #080 — Compliance Audit (2026-04-07)
- **Cookie consent added**: GDPR-compliant cookie banner implemented
- **Fake reviews removed**: Non-genuine user testimonials cleaned out
- **Brand unified to Valitse**: Consistent branding across all pages
- **Deployed**: Changes pushed to production at valitsesahko.fi

### Session #079 — Live Deployment + Valitse Rebrand (2026-04-07)
- **LIVE at valitsesahko.fi**: Custom domain configured and working
- **GA4 G-JT1SCYMPW2 active**: Hardcoded fallback ensures tracking works without env var
- **GSC verification tag added**: Google Search Console ready
- **Spot price 0.01 bug fixed**: API unit mismatch — EUR/kWh vs c/kWh conversion corrected
- **11 old domain references updated**: Migrated from old domain references to valitsesahko.fi
- **Cross-links to Valitse sites added**: Linking to sibling comparison sites
- **37 providers and 91 contracts verified accurate**: Full data audit completed

### Session #075 — Pre-deploy Fixes (2026-04-01)
- Publication-ready — all fixes applied

## Tech Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Recharts for data visualization
- lucide-react for icons
- date-fns for date formatting
- APIs: spot-hinta.fi (real-time prices)
- Deploy: Vercel

## Next Steps

1. **Monitor GA4 data** — verify events flowing correctly
2. **Submit sitemap to Google Search Console** — accelerate indexing
3. **Apply for AdSense** — organic traffic monetization
4. **Apply for Adtraction energy affiliate programs** — partnership revenue
5. **Configure ENTSO-E API key** for enhanced data
6. **Configure Fingrid API key** for enhanced data
7. **Price alerts feature** — user notifications for price changes
8. **Newsletter system** — email marketing

## Blockers

- None — site is live and operational

## Monetization Plan
- Phase 1: AdSense (organic traffic monetization)
- Phase 2: Affiliate partnerships with electricity retailers (€10-30/contract)
- Phase 3: Lead generation, premium features
