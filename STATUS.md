# Energiavertailu — Status

**Project**: Energiavertailu — Finnish Electricity Price Comparison
**Status**: ACTIVE — Publication-ready — all fixes applied, awaiting deployment
**Created**: 2026-03-26
**Last Updated**: 2026-04-01 (Session #075)

## Overview
Finland's most comprehensive electricity price comparison site. Compare contracts from 42 providers with risk scoring, real-time spot price tracking, interactive calculators, educational content. Built to be the #1 Finnish energy comparison site.

## Current State — Waves 1-6 Complete

- **155 pages** generated (static + SSG)
- **42 providers** with risk scoring and detailed profiles
- **Homepage**: Hero, live spot price banner, quick comparison, how it works, features grid, provider logos, FAQ, CTA
- **Spot Price Dashboard** (/porssisahko): Real-time prices from spot-hinta.fi API, hourly charts, price history, best hours, educational content
- **Comparison Calculator** (/vertailu): 3-step flow, contracts from 42 providers, housing type presets, filtering, sorting
- **Provider Directory** (/sahkoyhtiot): 42 provider pages with detailed profiles, contracts, pros/cons, FAQ
- **Blog** (/blogi): 10 Finnish articles targeting key SEO keywords
- **Educational Guides** (/oppaat): 6 comprehensive guides (contract types, switching, saving, spot electricity, pricing, solar)
- **Tools** (/tyokalut): 6 interactive calculators (consumption, solar ROI, EV charging, heating comparison + 2 more)
- **SEO pages**: Regional pages, provider comparison pairs, "sähkön hinta tänään" page
- **Accessibility**: WCAG compliance pass
- **SEO**: Sitemap, robots.txt, llms.txt, JSON-LD structured data, per-page metadata
- **Legal**: Privacy policy, terms of service
- **Design**: Mobile-first, responsive, modern UI with Tailwind CSS

## Tech Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Recharts for data visualization
- lucide-react for icons
- date-fns for date formatting
- APIs: spot-hinta.fi (real-time prices), ENTSO-E (pending), Fingrid Open Data (pending)
- Deploy: Vercel (pending)

## Monetization Plan
- Phase 1: AdSense (organic traffic monetization)
- Phase 2: Affiliate partnerships with electricity retailers (€10-30/contract)
- Phase 3: Lead generation, premium features

## Next Steps
- [ ] Commit all changes and push to deploy repo
- [ ] Create deploy repo on GitHub (Sonodo/energiavertailu)
- [ ] Deploy to Vercel
- [ ] Expand provider-details for 22 new providers (added in Waves but need full detail pages)
- [ ] Configure ENTSO-E API key for production
- [ ] Configure Fingrid API key for production
- [ ] Set up GA4 tracking
- [ ] Register domain (energiavertailu.fi or sahkovertaa.fi)
- [ ] DNS setup
- [ ] Apply for AdSense
- [ ] Apply for Adtraction energy affiliate programs
- [ ] Submit sitemap to Google Search Console
- [ ] Verify real-time spot price API works in production
- [ ] Price alerts feature
- [ ] Newsletter system

## Blockers
- All changes currently uncommitted (local in empire repo only)
- ENTSO-E and Fingrid API keys not yet configured
