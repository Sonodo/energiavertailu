# Energiavertailu — Master Roadmap & Architecture

**Project**: Energiavertailu — Finland's Most Comprehensive Electricity Comparison Platform
**Created**: 2026-03-26
**Status**: ACTIVE — Phase 1 MVP Build
**Target**: #1 Finnish energy comparison site within 12 months

---

## Table of Contents

1. [Vision & Positioning](#1-vision--positioning)
2. [Architecture](#2-architecture)
3. [Phase 1 — MVP (Current Sprint)](#3-phase-1--mvp-current-sprint)
4. [Phase 2 — Growth (Month 2-3)](#4-phase-2--growth-month-2-3)
5. [Phase 3 — AI & Advanced (Month 3-6)](#5-phase-3--ai--advanced-month-3-6)
6. [Phase 4 — Market Leadership (Month 6-12)](#6-phase-4--market-leadership-month-6-12)
7. [Monetization Strategy](#7-monetization-strategy)
8. [SEO Strategy](#8-seo-strategy)
9. [Tech Stack Details](#9-tech-stack-details)
10. [KPIs & Milestones](#10-kpis--milestones)

---

## 1. Vision & Positioning

### 1.1 Vision Statement

Build Finland's most comprehensive, modern, and user-friendly electricity comparison platform — the ONLY Finnish site that combines contract comparison, real-time spot price tracking, and AI-powered recommendations in a single, beautifully designed experience.

### 1.2 The Problem

Finland's 3.3 million households face a fragmented, confusing electricity market:

- **49 active retailers** compete for customers, but comparison tools are basic and outdated
- **33% of households** are on dynamic spot-price contracts (tripled in 3 years) with no good tool to track prices
- **~85% of consumers** don't actively shop for better electricity deals each year (inertia/confusion)
- **15-minute pricing intervals** (since Oct 2025) create 4x more data complexity with zero tools to help consumers navigate it
- Existing comparison sites are either government-run with terrible UX (sahkonhinta.fi) or basic affiliate sites with no real-time features

### 1.3 The Opportunity

From our competitive analysis of 20+ platforms across 7 countries:

| Gap | Current Finnish State | Our Solution |
|-----|----------------------|--------------|
| **Unified platform** | Comparison sites and spot trackers are completely separate | One platform that does both |
| **Real-time visualization** | Basic price tables, minimal charts | Interactive 15-min charts with color coding, history, and forecasts |
| **AI recommendations** | Every site just sorts by price | ML-based personalized contract suggestions based on consumption patterns |
| **Educational content** | Minimal, generic | 30+ expert guides, provider reviews, seasonal analyses |
| **Mobile experience** | No Finnish energy app exists | PWA with push notifications, home screen widgets |
| **Smart home integration** | None | Shelly, Home Assistant, IFTTT integrations |
| **Prosumer tools** | Non-existent | Solar ROI, battery optimization, feed-in comparison |
| **English language** | Only gov site (basic) | Full English version for 400K+ non-Finnish speakers |

### 1.4 Unique Positioning

**"The only Finnish energy platform that combines real-time spot prices, intelligent contract comparison, and AI-powered optimization — helping you not just find cheaper electricity, but use it smarter."**

We combine:
- **UK-level content & trust** (Uswitch-style educational depth, Trustpilot integration)
- **Nordic spot-price visualization** (better than porssisahkoa.fi)
- **German filter sophistication** (Check24-level contract filtering)
- **AI-native features** (nobody anywhere does this — blue ocean)

### 1.5 Target Audience

| Segment | Size | Need | Priority |
|---------|------|------|----------|
| Active electricity shoppers | ~495,000/year (15% switching rate) | Find cheapest contract | PRIMARY |
| Spot-price contract holders | ~1.1M households (33%) | Track daily/hourly prices | PRIMARY |
| Homeowners with electric heating | ~500,000+ | Optimize high consumption (15,000-20,000+ kWh/yr) | HIGH |
| New movers | ~250,000/year | Need new electricity contract | HIGH |
| Solar panel owners (prosumers) | 101,600+ households (growing 10%+ YoY) | Buy/sell optimization | MEDIUM |
| EV owners | Growing rapidly | Charging cost optimization | MEDIUM |
| Students / first-time renters | ~100,000+/year | Simple, cheap contract | MEDIUM |
| Businesses (SME) | ~300,000 | B2B electricity comparison | PHASE 4 |
| Non-Finnish speakers | 400,000+ | English-language comparison | PHASE 3 |

### 1.6 Competitive Landscape Summary

| Competitor | UX | Spot Prices | AI | Content | Mobile | Our Edge |
|-----------|-----|-----------|-----|---------|--------|----------|
| sahkovertailu.fi (Schibsted) | 7/10 | None | None | Good | Web only | Better UX + spot + AI |
| sahkonhinta.fi (Gov) | 5/10 | None | None | Minimal | Basic | Everything |
| kilpailuttaja.fi | 6.5/10 | None | None | Good | Web only | Tech + spot + modern UX |
| vertaaensin.fi | 7/10 | Basic daily | None | Good | Web only | Real-time + AI + depth |
| porssisahkoa.fi | 7/10 | Excellent | None | Minimal | Web only | Add comparison + content |
| **Energiavertailu** | **9/10** | **Best** | **Yes** | **Best** | **PWA** | **All-in-one** |

---

## 2. Architecture

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                     │
│                                                           │
│  Next.js 14 App Router (SSR/SSG/ISR)                     │
│  ├── Static Pages (SSG): Blog, guides, city pages        │
│  ├── Server Components: Comparison, provider directory    │
│  ├── Client Components: Spot charts, calculators          │
│  └── API Routes: Price data, calculations, AI advisor     │
│                                                           │
│  Tailwind CSS + Headless UI                               │
│  Recharts (comparison viz) + Custom D3 (spot prices)      │
│  PWA: Service Worker + Push Notifications                 │
├─────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER                       │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Comparison    │  │ Spot Price   │  │ AI Advisor   │   │
│  │ Engine        │  │ Tracker      │  │ Engine       │   │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤   │
│  │• Contract     │  │• 15-min data │  │• Consumption │   │
│  │  matching     │  │• Day-ahead   │  │  analysis    │   │
│  │• Cost calc    │  │• History     │  │• Contract    │   │
│  │• Filtering    │  │• Alerts      │  │  recommend   │   │
│  │• Sorting      │  │• Forecasts   │  │• Optimization│   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Calculator   │  │ SEO Content  │  │ User         │   │
│  │ Suite        │  │ Engine       │  │ Management   │   │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤   │
│  │• Consumption │  │• Blog/guides │  │• Preferences │   │
│  │• Solar ROI   │  │• City pages  │  │• Alerts      │   │
│  │• EV charging │  │• Provider    │  │• History     │   │
│  │• Heating     │  │  reviews     │  │• Datahub     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
├─────────────────────────────────────────────────────────┤
│                    DATA LAYER                              │
│                                                           │
│  Neon PostgreSQL                                          │
│  ├── price_history (15-min spot prices, partitioned)      │
│  ├── contracts (all retailer contracts, updated daily)    │
│  ├── suppliers (49 retailers, details, ratings)           │
│  ├── user_profiles (preferences, alerts, consumption)     │
│  ├── content (blog posts, guides, city pages)             │
│  ├── predictions (AI price forecasts)                     │
│  └── analytics (comparison events, conversions)           │
│                                                           │
│  Vercel KV / Edge Config (caching layer)                  │
│  ├── Current spot prices (15-min TTL)                     │
│  ├── Day-ahead prices (cached until next publish)         │
│  └── Popular comparison results (1hr TTL)                 │
├─────────────────────────────────────────────────────────┤
│                  EXTERNAL DATA SOURCES                     │
│                                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ ENTSO-E │ │ Fingrid │ │ spot-   │ │Energia- │       │
│  │ Trans-  │ │ Open    │ │ hinta.fi│ │virasto  │       │
│  │ parency │ │ Data    │ │ API     │ │(scrape) │       │
│  │ Platform│ │ API     │ │         │ │         │       │
│  ├─────────┤ ├─────────┤ ├─────────┤ ├─────────┤       │
│  │Day-ahead│ │Grid data│ │Real-time│ │Contract │       │
│  │spot     │ │Wind prod│ │spot     │ │listings │       │
│  │prices   │ │Demand   │ │prices   │ │Retailer │       │
│  │(free)   │ │Forecasts│ │Shelly   │ │details  │       │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│                                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                    │
│  │ FMI     │ │ Nord    │ │ Datahub │                    │
│  │ Weather │ │ Pool    │ │ (user   │                    │
│  │ API     │ │ (future)│ │ auth)   │                    │
│  ├─────────┤ ├─────────┤ ├─────────┤                    │
│  │Weather  │ │Full     │ │Personal │                    │
│  │forecast │ │market   │ │hourly   │                    │
│  │Temp/wind│ │data     │ │consump- │                    │
│  │(free)   │ │(paid)   │ │tion     │                    │
│  └─────────┘ └─────────┘ └─────────┘                    │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

```
                      ┌──────────────┐
                      │   Cron Jobs  │
                      │  (Vercel)    │
                      └──────┬───────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
      ┌──────────┐  ┌──────────┐  ┌──────────┐
      │ ENTSO-E  │  │ Fingrid  │  │ spot-    │
      │ fetch    │  │ fetch    │  │ hinta.fi │
      │ (hourly) │  │ (15min)  │  │ fetch    │
      └────┬─────┘  └────┬─────┘  └────┬─────┘
           │              │              │
           ▼              ▼              ▼
      ┌────────────────────────────────────┐
      │        Neon PostgreSQL              │
      │   price_history / contracts         │
      └──────────────┬─────────────────────┘
                     │
           ┌─────────┼─────────┐
           ▼         ▼         ▼
      ┌────────┐ ┌────────┐ ┌────────┐
      │ Vercel │ │ ISR    │ │ API    │
      │ KV     │ │ Pages  │ │ Routes │
      │ Cache  │ │ (SSG)  │ │ (live) │
      └───┬────┘ └───┬────┘ └───┬────┘
          │          │          │
          └──────────┼──────────┘
                     ▼
              ┌──────────────┐
              │   Browser    │
              │  (Client)    │
              │              │
              │ • SSG pages  │
              │   served     │
              │   instantly  │
              │              │
              │ • Client     │
              │   hydration  │
              │   for charts │
              │              │
              │ • API calls  │
              │   for live   │
              │   spot data  │
              └──────────────┘
```

### 2.3 Page Rendering Strategy

| Page Type | Rendering | Revalidation | Rationale |
|-----------|-----------|-------------|-----------|
| Homepage | ISR | 1 hour | Show fresh spot prices, mostly static content |
| Spot price dashboard | SSR + Client | Real-time (client fetch) | Must show live 15-min prices |
| Comparison calculator | SSR + Client | On-demand | User input drives results |
| Provider directory | SSG | Daily | Changes infrequently |
| Individual provider pages | SSG | Daily | Static content with periodic updates |
| Blog articles | SSG | On publish | Static content |
| Educational guides | SSG | Weekly | Evergreen content |
| City/regional pages | SSG | Weekly | Mostly static, localized |
| Calculator tools | SSR + Client | N/A | Interactive client-side tools |
| Sitemap/robots | SSG | Daily | Updated when new pages added |

---

## 3. Phase 1 — MVP (Current Sprint)

**Timeline**: Week 1-3
**Goal**: Launch a fully functional site with spot prices, comparison calculator, provider directory, educational content, and SEO foundation. Establish presence on all major Finnish electricity keywords.

### 3.1 Homepage

**Route**: `/`

- **Hero Section**: Bold headline ("Löydä halvin sähkösopimus Suomessa"), live spot price ticker, primary CTA to comparison calculator
- **Current Spot Price Widget**: Today's average, current 15-min price, trend arrow, link to full dashboard
- **Value Propositions**: 3-4 cards — "Vertaa kaikkia sähköyhtiöitä", "Reaaliaikainen pörssisähkön seuranta", "Laskurit ja työkalut", "Puolueetonta tietoa"
- **Quick Comparison Form**: Housing type selector + estimated consumption → instant results preview
- **Popular Tools Grid**: Links to spot price dashboard, comparison calculator, provider directory, consumption calculator
- **Latest Blog Posts**: 3-4 recent articles with thumbnails
- **Trust Signals**: Data source attribution (Fingrid, Nord Pool, ENTSO-E), number of providers listed, user count (once available)
- **Footer**: Full navigation, provider links, legal (privacy policy, cookie consent, affiliate disclosure), social links

### 3.2 Real-Time Spot Price Dashboard

**Route**: `/porssisahko`

This is the daily-use traffic magnet. ~1.1 million Finnish households on spot contracts need to check prices.

#### Features:
- **Current Price Hero**: Large display of current 15-minute spot price (c/kWh incl. 25.5% VAT), color-coded (green < 5c, yellow 5-15c, red > 15c), trend indicator vs previous hour
- **Today's Hourly Prices**: Interactive bar chart (Recharts), 24 bars color-coded by price level, hover for exact values, highlight current hour
- **Tomorrow's Prices**: Available after ~14:00 (when Nord Pool publishes day-ahead), same chart format, clear "available at 14:00" message when not yet published
- **7-Day History**: Line chart with daily averages and min/max bands
- **30-Day History**: Line chart with weekly moving average overlay
- **365-Day History**: Monthly averages with year-over-year comparison
- **Daily Statistics Panel**: Average, peak, lowest, current, previous day comparison
- **Price Calendar**: Heatmap calendar showing daily average prices (green-yellow-red gradient)
- **Best Hours Today**: "Cheapest 3 hours today: 02:00-05:00" — practical scheduling advice
- **Consumption Cost Estimator**: "At current prices, running your washing machine now costs X c" with appliance presets

#### Data Sources:
- Primary: ENTSO-E Transparency Platform (free, commercial-use OK, day-ahead prices)
- Secondary: spot-hinta.fi API (real-time, Swagger documented, for 15-min granularity)
- Fallback: porssisahko.net API (undocumented but functional)
- Enrichment: Fingrid Open Data (wind production, demand forecasts for context)

#### Technical Notes:
- Client-side fetching for live prices (SWR/React Query with 5-min polling)
- Server-side rendering of initial chart data for SEO
- Vercel KV cache for current prices (15-min TTL)
- Store all historical prices in Neon PostgreSQL (partitioned by month)

### 3.3 Comparison Calculator

**Route**: `/vertailu`

The core conversion tool. Users input consumption, get sorted contract recommendations.

#### Input Flow (Progressive Disclosure):
1. **Step 1 — Housing Type**: Visual selector with icons
   - Yksiö (studio apartment): default 2,000 kWh
   - Kaksio (2-room): default 2,500 kWh
   - Kolmio+ (3+ rooms): default 3,000 kWh
   - Rivitalo (row house): default 5,000 kWh
   - Omakotitalo (detached house): default 8,000 kWh
   - Omakotitalo + sähkölämmitys (with electric heating): default 18,000 kWh
2. **Step 2 — Consumption**: Pre-filled from Step 1, editable with slider + number input
3. **Step 3 — Preferences** (optional, expandable):
   - Contract type filter: All / Fixed / Spot / Hybrid / Open-ended
   - Contract duration: Any / 6mo / 12mo / 24mo / 36mo
   - Green energy preference: Any / Green certified / 100% renewable
   - Specific providers: Include/exclude checkboxes

#### Results Display:
- **Card-based results** (not tables) sorted by estimated annual cost (default)
- Each card shows:
  - Provider logo + name
  - Contract type badge (Kiinteä / Pörssisähkö / Yhdistelmä)
  - Estimated annual cost (large, prominent)
  - Monthly cost equivalent
  - Energy price (c/kWh) + base fee (€/month)
  - Contract duration
  - Green energy badge if applicable
  - Key terms (2-3 bullet points)
  - "Lue lisää" (Read more) expand for full details
  - CTA button (link to provider or affiliate)
- **Sort options**: Annual cost, kWh price, provider rating, contract duration
- **Estimated savings**: "You could save up to €X/year compared to the average contract"
- **Spot price comparison**: "Based on the last 12 months, a spot contract would have cost you €X vs fixed at €Y"

#### Data Source:
- Manually curated contract database initially (research all 49 retailers' current offerings)
- Scraped from Energiavirasto's sahkonhinta.fi for comprehensive coverage
- Updated daily via cron job
- Affiliate links where partnerships exist; direct provider links otherwise

### 3.4 Provider Directory

**Route**: `/sahkoyhtiot`
**Individual pages**: `/sahkoyhtiot/[provider-slug]`

All 49 Finnish electricity retailers with detailed pages.

#### Directory Page:
- Searchable, filterable grid of all providers
- Filters: Contract types offered, green energy, company size, region
- Sort: Alphabetical, by cheapest current contract, by rating
- Card per provider: Logo, name, tagline, contract types available, cheapest current price, link to detail page

#### Individual Provider Pages (49 pages):
- Company overview (history, ownership, size, region)
- Current contract offerings (all available contracts with pricing)
- Contract type breakdown (which types they offer)
- Green energy options
- Customer service info (phone, email, chat availability)
- Switching process explanation
- Pros/cons analysis
- Link to provider's website
- Structured data (LocalBusiness schema)

#### Top Retailers to Detail First:
1. Fortum
2. Helen
3. Vattenfall
4. Oomi (merged with Lumme)
5. Väre
6. Cheap Energy
7. Hehku Energia
8. Nordic Green Energy
9. Vihreä Älyenergia
10. Aalto Energia

### 3.5 Blog Content (8-10 Articles for Launch)

**Route**: `/blogi` and `/blogi/[slug]`

Each article: 1,500-2,500 words, SEO-optimized, with internal links, schema.org Article markup.

| # | Title (Finnish) | Target Keyword | Search Intent | Est. Volume |
|---|----------------|----------------|---------------|-------------|
| 1 | Sähkövertailu 2026 — Näin löydät halvimman sähkösopimuksen | sähkövertailu | Transactional | 15,000-30,000/mo |
| 2 | Halvin sähkö 2026 — Päivittyvä hintavertailu | halvin sähkö | Transactional | 10,000-20,000/mo |
| 3 | Pörssisähkö — Kaikki mitä sinun tarvitsee tietää | pörssisähkö | Informational | 15,000-30,000/mo |
| 4 | Sähkön hinta tänään — Reaaliaikainen seuranta ja analyysi | sähkön hinta tänään | Informational | 10,000-25,000/mo |
| 5 | Kiinteä vs pörssisähkö 2026 — Kumpi kannattaa? | kiinteä vai pörssisähkö | Informational | 3,000-8,000/mo |
| 6 | Sähkösopimuksen vaihto — Vaiheittainen opas | sähkösopimuksen vaihto | Transactional | 3,000-6,000/mo |
| 7 | Sähkön säästövinkit — 20 tapaa pienentää sähkölaskua | sähkön säästäminen | Informational | 5,000-10,000/mo |
| 8 | Sähköyhtiöt Suomessa — Täydellinen lista 2026 | sähköyhtiöt suomessa | Informational | 3,000-6,000/mo |
| 9 | Pörssisähkön hinta 2026 — Ennuste ja analyysi | pörssisähkön hinta 2026 | Informational | 5,000-10,000/mo |
| 10 | Sähkösopimus opiskelijalle — Paras valinta 2026 | sähkösopimus opiskelijalle | Transactional | 1,000-3,000/mo |

### 3.6 Educational Guides

**Route**: `/oppaat` and `/oppaat/[slug]`

Comprehensive, evergreen educational content — the backbone of organic SEO.

| Guide | Content | Target Length |
|-------|---------|--------------|
| Sähkösopimustyypit | Fixed, spot, hybrid, open-ended explained with pros/cons/who-it's-for | 3,000 words |
| Sähkösopimuksen vaihto | Step-by-step switching guide, timeline, what happens, FAQ | 2,500 words |
| Pörssisähkö-opas | Complete guide to spot pricing: how it works, 15-min intervals, how to save | 3,000 words |
| Sähkön kulutus | Typical consumption by housing type, how to measure, how to reduce | 2,500 words |
| Sähkön verotus | Tax breakdown: energy tax, supply margin, distribution, VAT | 2,000 words |
| Muutto ja sähkö | Moving guide: canceling, starting new contract, timeline | 2,000 words |

### 3.7 Tools & Calculators

#### 3.7.1 Consumption Calculator
**Route**: `/laskurit/sahkonkulutus`

- Input: Housing type, size (m²), heating type, number of residents, appliances (sauna, EV, pool, etc.)
- Output: Estimated annual kWh consumption, monthly breakdown, comparison to Finnish averages
- Visualization: Pie chart of consumption by category (heating, lighting, appliances, hot water, sauna)

#### 3.7.2 Solar ROI Calculator
**Route**: `/laskurit/aurinkopaneelit`

- Input: Location (city), roof area (m²), roof direction, current electricity cost, installation budget
- Output: Estimated annual production (kWh), payback period, 25-year savings, CO2 reduction
- Data: Finnish solar irradiance data by region, current panel costs, feed-in tariff estimates

#### 3.7.3 EV Charging Cost Calculator
**Route**: `/laskurit/sahkoauton-lataus`

- Input: EV model (or battery size), annual km driven, home charging vs public, current electricity contract type
- Output: Annual charging cost on spot vs fixed, optimal charging times, cost per km
- Comparison: EV electricity cost vs gasoline equivalent

#### 3.7.4 Heating Comparison Calculator
**Route**: `/laskurit/lammitysvertailu`

- Input: House size, current heating type, insulation level, region
- Output: Annual cost comparison across heating types (electric, heat pump, district, geothermal, wood)
- Recommendation: Which heating type + electricity contract combo is optimal

### 3.8 SEO Foundation

#### Technical SEO:
- `robots.txt` with proper crawl directives
- Dynamic XML sitemap (auto-generated from all pages)
- Canonical URLs on all pages
- Hreflang tags (fi, future: en, sv)
- Open Graph images per page (auto-generated with consistent brand template)
- Twitter Card metadata
- Structured data on every page type:
  - Organization schema (site-wide)
  - Article schema (blog posts)
  - FAQPage schema (FAQ sections)
  - HowTo schema (guides)
  - LocalBusiness schema (provider pages)
  - Product schema (contract listings)
  - BreadcrumbList schema (all pages)
- Core Web Vitals optimization: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Image optimization: Next.js Image component, WebP/AVIF, lazy loading
- Font optimization: `next/font` with Finnish character support

#### On-Page SEO:
- Unique `<title>` and `<meta description>` per page
- H1-H6 hierarchy on every page
- Internal linking strategy between related content
- Breadcrumb navigation
- Table of contents on long-form content (auto-generated)
- Last-updated dates on all content

### 3.9 Design & UX (Phase 1)

#### Design System:
- **Colors**: Electric blue primary (#0066FF), energy green secondary (#00CC66), warm neutrals for backgrounds
- **Typography**: Inter or similar clean sans-serif, optimized for Finnish characters (ä, ö, å)
- **Layout**: 12-column grid, max-width 1280px content area
- **Components**: Consistent card system, pill badges for contract types, color-coded price indicators
- **Dark mode**: Not for MVP, but design system should support it (Phase 2)

#### Mobile-First:
- All layouts designed mobile-first, enhanced for desktop
- Touch-friendly inputs (large tap targets, 48px minimum)
- Thumb-zone optimized navigation
- Collapsible filters on mobile (expandable panels)
- Sticky CTA bar on comparison results (mobile)
- Swipeable price charts

#### Accessibility:
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader friendly chart descriptions
- Color-blind safe chart color schemes
- Focus indicators on all interactive elements

### 3.10 Phase 1 Deliverables Summary

| Deliverable | Pages/Items | Priority |
|-------------|-------------|----------|
| Homepage | 1 | P0 |
| Spot price dashboard | 1 | P0 |
| Comparison calculator | 1 | P0 |
| Provider directory | 1 index + 10 detail pages (top providers) | P0 |
| Blog articles | 8-10 | P0 |
| Educational guides | 6 | P1 |
| Consumption calculator | 1 | P1 |
| Solar ROI calculator | 1 | P1 |
| EV charging calculator | 1 | P2 |
| Heating comparison calculator | 1 | P2 |
| SEO foundation | Sitemap, robots, schemas, metadata | P0 |
| Legal pages | Privacy policy, cookie consent, affiliate disclosure | P0 |
| **Total Phase 1 pages** | **~35-40** | |

---

## 4. Phase 2 — Growth (Month 2-3)

**Goal**: Drive engagement, expand content, begin monetization, build authority.

### 4.1 Price Alerts System

- Email notifications when spot price drops below user-set threshold
- Daily digest: yesterday's prices + today's forecast summary
- Weekly market summary newsletter
- Alert preferences: immediate, daily, weekly
- Integration with email service (Resend or similar)

### 4.2 Advanced Filtering

- Green energy tiers (inspired by Check24):
  - All sources
  - Green certified (100% renewable certificates)
  - Climate Plus (verified sustainable, no nuclear/coal)
- Contract duration granular filter (6/12/24/36 months)
- Bonus/promotion filtering and transparency
- Price guarantee type filter
- Payment frequency filter
- Provider size filter (large utility vs challenger brand)

### 4.3 User Reviews & Ratings

- Provider review system (1-5 stars + text review)
- Review categories: Price, customer service, switching ease, billing clarity
- Verified switch badge (user actually switched through platform)
- Review moderation system
- Aggregate ratings on provider cards and directory

### 4.4 Regional SEO Pages

**Route**: `/sahkosopimus/[city-slug]`

Programmatic city pages for all major Finnish cities (top 50 initially, expand to 300+ municipalities).

| Tier | Cities | Content |
|------|--------|---------|
| Tier 1 (full pages) | Helsinki, Espoo, Tampere, Vantaa, Oulu, Turku, Jyväskylä, Kuopio, Lahti, Pori | 2,000+ word pages with local data, distribution costs, provider availability |
| Tier 2 (standard pages) | Next 40 cities by population | 1,000+ word pages with templated + unique content |
| Tier 3 (future) | All 300+ municipalities | Programmatic pages with local pricing and provider data |

Each page includes:
- Local electricity distribution company and costs
- Available retailers in the region
- Average consumption for the area
- Local comparison calculator (pre-filled with regional defaults)
- FAQ specific to the city
- Structured data: LocalBusiness + FAQPage

### 4.5 Price History & Analytics

- Interactive historical price explorer (select any date range)
- Monthly/quarterly/annual price trend analysis
- Seasonal pattern visualization
- Year-over-year comparison tools
- Price correlation with weather/wind data (informational)
- Exportable data (CSV download)

### 4.6 Newsletter & Content Expansion

- Weekly "Sähkömarkkinakatsaus" newsletter
- Monthly deep-dive market analysis articles
- Expand blog to 20+ articles total
- Provider comparison articles ("Helen vs Fortum 2026")
- Seasonal content ("Kesän sähkönkulutus", "Talven sähkön säästövinkit")

### 4.7 Monetization Launch

- Google AdSense integration (sidebar, in-content, footer — non-intrusive)
- Affiliate partnerships with first 5-10 retailers
- Track conversion funnel: comparison → provider click → contract signed
- A/B test CTA placements and designs
- Transparent affiliate disclosure on all pages

### 4.8 Remaining Provider Pages

- Complete all 49 provider detail pages
- Add customer review sections
- Add real-time contract pricing where available

### 4.9 Phase 2 Deliverables Summary

| Deliverable | Items | Priority |
|-------------|-------|----------|
| Price alert system | Backend + email integration | P0 |
| Advanced filters | 5+ new filter options | P0 |
| Regional SEO pages | 50 city pages | P0 |
| User review system | Full review CRUD | P1 |
| Price history explorer | Interactive tool | P1 |
| Newsletter system | Weekly automated | P1 |
| 10+ new blog articles | SEO content | P0 |
| AdSense integration | Revenue stream | P1 |
| Affiliate tracking | Conversion tracking | P0 |
| Remaining provider pages | 39 pages | P1 |
| Dark mode | UI enhancement | P2 |
| **Total new Phase 2 pages** | **~100+** | |

---

## 5. Phase 3 — AI & Advanced (Month 3-6)

**Goal**: Deploy AI-native features that no competitor offers. Datahub integration. Smart features that create real lock-in and daily engagement.

### 5.1 AI-Powered Contract Recommendations

- Input: User's consumption pattern (manual entry or Datahub import)
- Analysis: Compare consumption against last 12 months of spot prices
- Output: "Based on your usage pattern, a spot contract would have saved you 23% (€187) vs your current fixed contract last year"
- Contract-specific recommendations with confidence levels
- Explain reasoning in plain Finnish (not just "this is cheapest")
- Seasonal adjustments: "In winter your usage spikes — a hybrid contract could protect against winter price peaks while capturing summer savings"

### 5.2 Price Prediction / Forecasting

- 24-48 hour price forecast using:
  - Weather data (FMI API: temperature → heating demand, wind → wind power production)
  - Historical patterns (time-of-day, day-of-week, seasonal)
  - Fingrid data (production capacity, cross-border flows, demand forecasts)
- Visualize forecast alongside actual prices
- Confidence intervals on predictions
- "Best time to run appliances tomorrow" based on forecast

### 5.3 Datahub Integration (Smart Meter Data Import)

- Finnish Datahub (datahub.fi) allows consumers to authorize third-party access to their hourly consumption data
- OAuth2 flow: User authorizes Energiavertailu to read their data
- Import hourly consumption for past 12 months
- Analyze patterns: when do they use most, peak hours, baseload
- Personalized savings calculations based on actual data (not estimates)
- This is a KILLER FEATURE — no Finnish comparison site does this

### 5.4 Consumption Optimization Suggestions

- Based on Datahub data, identify:
  - Peak-hour usage that could be shifted
  - Overnight usage patterns (EV charging, water heater timing)
  - Baseload anomalies (always-on devices drawing too much)
  - Weekend vs weekday patterns
- Specific, actionable suggestions with estimated savings
- "If you shift your 18:00-20:00 usage to 02:00-04:00, you'd save approximately €X/month on your spot contract"

### 5.5 PWA & Push Notifications

- Progressive Web App installation prompt
- Push notifications for:
  - Price alerts (spot below threshold)
  - Tomorrow's prices available (after 14:00)
  - Contract expiry reminders
  - Weekly market summary
  - Unusually high/low price days
- Home screen widget showing current spot price (PWA)
- Offline capability for recent price data

### 5.6 Auto-Switching Concept

- Monitor user's current contract against market
- Alert when savings opportunity exceeds threshold (e.g., > €50/year)
- Provide one-click comparison with current contract
- Guided switching flow (new provider handles cancellation — standard Finnish process)
- Inspired by UK's Switchcraft, adapted for Finnish market

### 5.7 Prosumer Tools

- Solar production monitoring integration
- Feed-in vs self-consumption optimization
- Battery storage charge/discharge scheduling
- Net metering calculations
- ROI tracking for solar installations
- Community energy participation guide (280 energy communities exist in Finland)

### 5.8 English Language Version

**Route**: `/en/` prefix

- Full site translation for English-speaking residents
- ~400,000 non-Finnish speakers in Finland
- Virtually zero competition in English-language Finnish electricity comparison
- Targets: expats, international students, English-speaking professionals

### 5.9 Phase 3 Deliverables Summary

| Deliverable | Items | Priority |
|-------------|-------|----------|
| AI contract recommender | Core algorithm + UI | P0 |
| Price forecasting | 48h prediction model | P1 |
| Datahub integration | OAuth flow + analysis | P0 |
| Consumption optimization | Actionable suggestions | P1 |
| PWA + push notifications | Service worker, push API | P0 |
| Auto-switching alerts | Monitoring + notification | P1 |
| Prosumer tools suite | Solar, battery, community | P2 |
| English language version | Full site translation | P1 |

---

## 6. Phase 4 — Market Leadership (Month 6-12)

**Goal**: Monetize at scale, build platform ecosystem, establish market dominance.

### 6.1 Affiliate Partnerships at Scale

- Direct partnerships with 20+ electricity retailers
- Negotiated commission rates: €15-30 per signed contract
- Real-time API integrations for live contract pricing (bypass scraping)
- Co-branded landing pages for top partners
- Performance dashboard for partner management

### 6.2 Lead Generation Pipeline

- B2B electricity comparison for small businesses
- Higher contract values = higher commissions (€30-100 per business contract)
- Multi-site comparison for companies with multiple locations
- Dedicated business comparison flow
- CRM integration for lead nurturing

### 6.3 API for Third-Party Integrations

**Route**: `/api/v1/`

- Public API endpoints:
  - `/api/v1/spot-prices` — Current and historical spot prices
  - `/api/v1/contracts` — Available contracts (filtered)
  - `/api/v1/providers` — Provider directory
  - `/api/v1/calculate` — Cost calculation engine
- Pricing tiers:
  - Free: 100 requests/day (non-commercial)
  - Developer: €29/month, 10,000 requests/day
  - Business: €99/month, unlimited requests
  - Enterprise: Custom pricing

### 6.4 Mobile App (React Native / Expo)

- Cross-platform (iOS + Android) native app
- Real-time spot price widget (home screen)
- Push notifications (native, better than PWA)
- Quick comparison from app
- Price chart with gesture navigation (pinch-to-zoom, swipe)
- Apple Watch complication for spot price

### 6.5 Smart Home Integration Guides

- Step-by-step integration guides for:
  - **Shelly devices**: Relay control based on spot price
  - **Home Assistant**: Automation blueprints for price-based control
  - **Homey**: Flow recipes for electricity optimization
  - **IFTTT**: Simple price-triggered applets
- Embeddable price widget for smart home dashboards
- API endpoint for smart home queries

### 6.6 B2B Comparison

- Small business electricity comparison (different contract structures)
- Multi-location cost optimization
- Annual contract review service
- Dedicated account management for larger businesses
- Revenue: higher commission per contract (B2B contracts are larger)

### 6.7 Energy Community Tools

- Tools for Finland's 280+ energy communities
- Collective comparison for housing cooperatives (taloyhtiöt)
- Community solar/wind project comparison
- Shared production/consumption optimization

### 6.8 Phase 4 Deliverables Summary

| Deliverable | Items | Priority |
|-------------|-------|----------|
| 20+ affiliate partnerships | Revenue partnerships | P0 |
| B2B comparison | Business electricity tool | P0 |
| Public API | 4 endpoint tiers | P1 |
| Mobile app | iOS + Android | P1 |
| Smart home guides | 4 platform guides | P2 |
| Energy community tools | Cooperative comparison | P2 |
| White-label widget | Embeddable comparison | P1 |

---

## 7. Monetization Strategy

### 7.1 Revenue Streams by Phase

```
Phase 1 (Month 1):    AdSense only
                       │
Phase 2 (Month 2-3):   AdSense + First affiliate partnerships
                       │
Phase 3 (Month 3-6):   AdSense + Affiliates + Premium features
                       │
Phase 4 (Month 6-12):  AdSense + Affiliates + Premium + API + B2B + Lead gen
```

### 7.2 Revenue Model Detail

| Stream | Launch Phase | Revenue per Unit | Volume Target (Year 1) | Annual Revenue |
|--------|-------------|------------------|----------------------|----------------|
| **Affiliate commissions** | Phase 2 | €15-30/contract | 2,000-5,000 conversions | €30,000-150,000 |
| **Display advertising** | Phase 1 | €3-8 CPM | 2M-6M pageviews | €6,000-48,000 |
| **Premium subscriptions** | Phase 3 | €4.99/month | 200-500 subscribers | €12,000-30,000 |
| **API access** | Phase 4 | €29-99/month | 50-100 subscribers | €17,400-118,800 |
| **B2B lead generation** | Phase 4 | €30-100/lead | 200-500 leads | €6,000-50,000 |
| **White-label licensing** | Phase 4 | €500-2,000/month | 2-5 clients | €12,000-120,000 |

### 7.3 Revenue Projections

| Scenario | Year 1 Revenue | Assumptions |
|----------|---------------|-------------|
| **Conservative** | €45,000 | Slow traffic growth, 5 affiliate partners, minimal premium uptake |
| **Base Case** | €90,000 | Moderate traffic (200K pageviews/mo by M12), 10 affiliates, some premium |
| **Optimistic** | €160,000 | Strong SEO performance, 15+ affiliates, API revenue, B2B launch |

### 7.4 Comparison to Market

- **Energy Brokers Finland** (Kilpailuttaja.fi, 3 employees): €471K-692K annual revenue
- **Sähkövertailu.fi** (Schibsted): Part of €185M Oikotie acquisition
- **Total addressable commission pool**: ~€5M-15M/year (495K switchers × €10-30/conversion)
- **Our Year 1 target**: 1-3% of addressable market

### 7.5 Affiliate Disclosure Policy

Transparency builds trust and is legally required:
- Clear "Affiliate Disclosure" page explaining our revenue model
- Banner on comparison pages: "Some links are affiliate links. We may earn a commission if you switch through our site. This does not affect the order of results."
- Results ordered by estimated cost to consumer (not by commission rate)
- Non-affiliate providers also listed (just without tracking)

---

## 8. SEO Strategy

### 8.1 Target Keywords & Search Volumes

#### Tier 1 — Primary Keywords (Highest Volume)

| Keyword | Est. Monthly Volume | Competition | Target Page |
|---------|-------------------|-------------|-------------|
| sähkön hinta | 20,000-40,000 | High | /porssisahko |
| sähkövertailu | 15,000-30,000 | Very High | /vertailu |
| pörssisähkö | 15,000-30,000 | High | /oppaat/porssisahko |
| halvin sähkö | 10,000-20,000 | Very High | /blogi/halvin-sahko-2026 |
| sähkön hinta tänään | 10,000-25,000 | Medium | /porssisahko |
| sähkösopimus | 8,000-15,000 | High | /vertailu |
| pörssisähkön hinta nyt | 8,000-15,000 | Medium | /porssisahko |

#### Tier 2 — Secondary Keywords (High Intent)

| Keyword | Est. Monthly Volume | Competition | Target Page |
|---------|-------------------|-------------|-------------|
| sähkön kilpailutus | 5,000-12,000 | High | /vertailu |
| halvin sähkösopimus | 5,000-10,000 | Very High | /blogi/halvin-sahko-2026 |
| sähkö hinta huomenna | 5,000-10,000 | Medium | /porssisahko |
| sähkön hintavertailu | 3,000-8,000 | High | /vertailu |
| sähkösopimus vertailu | 3,000-8,000 | Very High | /vertailu |
| sähköyhtiöt | 3,000-6,000 | Medium | /sahkoyhtiot |
| kiinteä sähkösopimus | 2,000-5,000 | Medium | /oppaat/sahkosopimustyypit |

#### Tier 3 — Long-Tail Keywords (Lower Competition)

| Keyword | Est. Monthly Volume | Competition | Target Page |
|---------|-------------------|-------------|-------------|
| sähkösopimus opiskelijalle | 1,000-3,000 | Low | /blogi/sahkosopimus-opiskelijalle |
| sähkösopimus muutto | 1,000-3,000 | Low | /oppaat/muutto-ja-sahko |
| kannattaako pörssisähkö | 1,000-2,000 | Low | /blogi/kiintea-vs-porssisahko |
| pörssisähkö vs kiinteä | 1,000-2,000 | Low | /blogi/kiintea-vs-porssisahko |
| sähkösopimus omakotitalo | 1,000-2,000 | Low | Blog article |
| aurinkopaneelit kannattavuus | 1,000-2,000 | Medium | /laskurit/aurinkopaneelit |
| sähköauton lataus hinta | 1,000-2,000 | Low | /laskurit/sahkoauton-lataus |

#### Tier 4 — Local Keywords (Phase 2)

| Keyword Pattern | Est. Volume per City | Target Page |
|----------------|---------------------|-------------|
| sähkösopimus + [city] | 200-2,000 | /sahkosopimus/[city] |
| sähkön hinta + [city] | 200-2,000 | /sahkosopimus/[city] |
| halvin sähkö + [city] | 100-1,000 | /sahkosopimus/[city] |

Top city targets: Helsinki (highest volume), Tampere, Espoo, Vantaa, Oulu, Turku, Jyväskylä, Kuopio, Lahti, Pori.

### 8.2 Content Calendar

#### Month 1 (Launch)
- 8-10 blog articles (see Phase 1 list)
- 6 educational guides
- 10 provider detail pages
- All tool/calculator pages
- Homepage, comparison, spot dashboard

#### Month 2
- 5 new blog articles (provider comparisons, seasonal content)
- 25 city/regional pages
- 20 more provider pages
- Weekly market analysis post

#### Month 3
- 5 new blog articles (deep dives, data analysis)
- 25 more city/regional pages
- Remaining provider pages
- Start monthly "Sähkömarkkinakatsaus" report series

#### Ongoing
- 2-4 articles per month
- Monthly market analysis
- Update pricing data in existing articles
- Seasonal content refreshes (summer tips in May, winter prep in September)
- React to market events (regulatory changes, price spikes, new providers)

### 8.3 Technical SEO Checklist

- [ ] robots.txt properly configured
- [ ] XML sitemap auto-generated and submitted to Google Search Console
- [ ] Canonical URLs on all pages
- [ ] Structured data on all page types (Article, FAQPage, HowTo, LocalBusiness, BreadcrumbList, Product)
- [ ] Open Graph metadata per page
- [ ] Twitter Card metadata per page
- [ ] Hreflang tags (fi primary; en, sv future)
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Next.js Image component for all images (WebP/AVIF, lazy loading, blur placeholder)
- [ ] Font optimization with `next/font`
- [ ] 301 redirects for any URL changes
- [ ] 404 page with helpful navigation
- [ ] Internal linking strategy (every page links to 3-5 related pages)
- [ ] Breadcrumb navigation on all sub-pages
- [ ] Mobile-first indexing compliant
- [ ] Page speed: < 3s load on 3G
- [ ] Google Search Console setup and monitoring
- [ ] Bing Webmaster Tools setup

### 8.4 Link Building Strategy

#### Phase 1 — Foundation
- Submit to Finnish web directories (fonecta.fi, finder.fi)
- Google Business Profile (if applicable)
- Social media profiles (Twitter/X, LinkedIn, Facebook page)
- Press release for launch (target Tekniikka & Talous, Kauppalehti, Talouselämä)

#### Phase 2 — Content Marketing
- Create shareable infographics (Finnish electricity price trends, comparison data)
- Monthly market reports with original data (journalists love original data)
- Guest posts on Finnish personal finance blogs
- Partner with Finnish lifestyle/finance influencers
- Submit tools to "best Finnish tools" lists

#### Phase 3 — Authority Building
- Original research reports (annual Finnish electricity market report)
- Expert commentary for media (position as go-to source for electricity market analysis)
- Partnerships with housing/real estate portals (embedded comparison widget)
- University/academic partnerships (data sharing for research)
- Energy industry event participation

---

## 9. Tech Stack Details

### 9.1 Core Stack

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| **Framework** | Next.js | 14.x (App Router) | SSR/SSG/ISR for SEO, React Server Components, API routes, proven in empire |
| **Language** | TypeScript | 5.x | Type safety, better DX, fewer bugs |
| **Styling** | Tailwind CSS | 3.x | Rapid UI development, consistent design, small bundle |
| **UI Components** | Headless UI + custom | Latest | Accessible, unstyled primitives + custom design system |
| **Charts** | Recharts | 2.x | React-native charts, good for comparison visualizations |
| **Database** | Neon PostgreSQL | Serverless | Proven in empire, serverless scaling, branching for dev |
| **ORM** | Drizzle ORM | Latest | Type-safe, lightweight, excellent Next.js integration |
| **Deployment** | Vercel | Pro | Proven deployment pipeline, edge functions, analytics |
| **Caching** | Vercel KV | N/A | Edge caching for hot data (current prices) |
| **Email** | Resend | N/A | Transactional email (alerts, newsletters) |
| **Analytics** | Google Analytics 4 | N/A | Traffic, conversion tracking |
| **Error Tracking** | Sentry | Latest | Production error monitoring |

### 9.2 API Integration Details

#### ENTSO-E Transparency Platform (Primary Spot Price Source)
- **URL**: `https://web-api.tp.entsoe.eu/api`
- **Auth**: Free API token (registration required)
- **Data**: Day-ahead prices for Finland (bidding zone 10YFI-1--------U)
- **Format**: XML (parse to JSON)
- **Update frequency**: Day-ahead prices published ~13:00 CET
- **Rate limit**: Generous for commercial use
- **Our usage**: Cron job every hour to fetch latest prices, store in DB

#### Fingrid Open Data API
- **URL**: `https://data.fingrid.fi/api/datasets`
- **Auth**: Free API key (registration at developer-data.fingrid.fi)
- **Data**: Wind production, consumption forecasts, grid status, transmission data
- **Format**: JSON, CSV, XML
- **Useful datasets**:
  - Wind power production (real-time, 3-min updates)
  - Electricity consumption forecast (next 24h)
  - Production capacity by type
  - Cross-border transmission flows
- **Our usage**: Enrich spot price context ("prices are low because wind production is high")

#### spot-hinta.fi API
- **URL**: `https://api.spot-hinta.fi`
- **Auth**: None required
- **Docs**: Swagger at `api.spot-hinta.fi/swagger/ui`
- **Data**: Current spot prices, 15-min intervals, Shelly integration data
- **Format**: JSON
- **Our usage**: Real-time price updates between ENTSO-E fetches, 15-min granularity

#### FMI Open Data (Finnish Meteorological Institute)
- **URL**: `https://opendata.fmi.fi/wfs`
- **Auth**: Free, open data
- **Data**: Weather forecasts, temperature, wind speed by location
- **Our usage**: Phase 3 — price prediction correlation (temperature → heating demand → price)

### 9.3 Database Schema (Core Tables)

```sql
-- Spot prices (partitioned by month for performance)
CREATE TABLE spot_prices (
  id BIGSERIAL,
  timestamp TIMESTAMPTZ NOT NULL,
  price_eur_mwh DECIMAL(10,2) NOT NULL,
  price_cents_kwh DECIMAL(10,4) NOT NULL,  -- incl. VAT 25.5%
  interval_minutes INT DEFAULT 60,          -- 60 or 15
  source VARCHAR(20) NOT NULL,              -- 'entsoe', 'spot-hinta', etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id, timestamp)
) PARTITION BY RANGE (timestamp);

-- Electricity contracts
CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  provider_id INT REFERENCES providers(id),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL,               -- 'fixed', 'spot', 'hybrid', 'open-ended'
  price_cents_kwh DECIMAL(10,4),           -- NULL for spot contracts
  spot_margin_cents DECIMAL(10,4),         -- margin on top of spot price
  base_fee_eur_month DECIMAL(10,2),
  duration_months INT,                      -- NULL for open-ended
  green_energy BOOLEAN DEFAULT FALSE,
  green_tier VARCHAR(20),                   -- 'basic', 'certified', 'climate-plus'
  min_consumption_kwh INT,
  max_consumption_kwh INT,
  active BOOLEAN DEFAULT TRUE,
  valid_from DATE,
  valid_until DATE,
  source_url VARCHAR(500),
  affiliate_url VARCHAR(500),
  affiliate_commission_eur DECIMAL(10,2),
  details JSONB,                            -- flexible fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Electricity providers/retailers
CREATE TABLE providers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  description TEXT,
  description_long TEXT,
  founded_year INT,
  ownership VARCHAR(255),
  customer_count INT,
  market_share_pct DECIMAL(5,2),
  contract_types VARCHAR[] NOT NULL,        -- array of types offered
  green_energy BOOLEAN DEFAULT FALSE,
  regions VARCHAR[],                         -- regions served
  customer_service_phone VARCHAR(50),
  customer_service_email VARCHAR(255),
  customer_service_chat BOOLEAN DEFAULT FALSE,
  rating_avg DECIMAL(3,2),
  rating_count INT DEFAULT 0,
  pros TEXT[],
  cons TEXT[],
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles (Phase 2+)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  housing_type VARCHAR(50),
  annual_consumption_kwh INT,
  current_contract_type VARCHAR(20),
  current_provider_id INT REFERENCES providers(id),
  postal_code VARCHAR(10),
  alert_preferences JSONB,
  datahub_token VARCHAR(500),              -- Phase 3
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Price alerts (Phase 2)
CREATE TABLE price_alerts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  alert_type VARCHAR(20) NOT NULL,         -- 'below_threshold', 'daily_digest', 'weekly_summary'
  threshold_cents DECIMAL(10,4),
  active BOOLEAN DEFAULT TRUE,
  last_triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User reviews (Phase 2)
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  provider_id INT REFERENCES providers(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  rating_price INT CHECK (rating_price >= 1 AND rating_price <= 5),
  rating_service INT CHECK (rating_service >= 1 AND rating_service <= 5),
  rating_switching INT CHECK (rating_switching >= 1 AND rating_switching <= 5),
  rating_billing INT CHECK (rating_billing >= 1 AND rating_billing <= 5),
  review_text TEXT,
  verified_switch BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog/content (managed in MDX files, metadata in DB for querying)
CREATE TABLE content_meta (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL,               -- 'blog', 'guide', 'city', 'provider'
  title VARCHAR(500) NOT NULL,
  description VARCHAR(500),
  keywords VARCHAR[],
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  author VARCHAR(255),
  view_count INT DEFAULT 0
);
```

### 9.4 Project Directory Structure

```
energiavertailu/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (Finnish lang, fonts, metadata)
│   │   ├── page.tsx                      # Homepage
│   │   ├── porssisahko/
│   │   │   └── page.tsx                  # Spot price dashboard
│   │   ├── vertailu/
│   │   │   └── page.tsx                  # Comparison calculator
│   │   ├── sahkoyhtiot/
│   │   │   ├── page.tsx                  # Provider directory
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Individual provider page
│   │   ├── blogi/
│   │   │   ├── page.tsx                  # Blog index
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Blog article
│   │   ├── oppaat/
│   │   │   ├── page.tsx                  # Guides index
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Guide page
│   │   ├── laskurit/
│   │   │   ├── sahkonkulutus/
│   │   │   │   └── page.tsx              # Consumption calculator
│   │   │   ├── aurinkopaneelit/
│   │   │   │   └── page.tsx              # Solar ROI calculator
│   │   │   ├── sahkoauton-lataus/
│   │   │   │   └── page.tsx              # EV charging calculator
│   │   │   └── lammitysvertailu/
│   │   │       └── page.tsx              # Heating comparison
│   │   ├── sahkosopimus/                 # Phase 2: Regional SEO pages
│   │   │   └── [city]/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   ├── spot-prices/
│   │   │   │   └── route.ts              # Spot price API
│   │   │   ├── contracts/
│   │   │   │   └── route.ts              # Contract data API
│   │   │   ├── calculate/
│   │   │   │   └── route.ts              # Calculation API
│   │   │   └── cron/
│   │   │       ├── fetch-prices/
│   │   │       │   └── route.ts          # Cron: fetch spot prices
│   │   │       └── update-contracts/
│   │   │           └── route.ts          # Cron: update contract data
│   │   ├── tietosuoja/
│   │   │   └── page.tsx                  # Privacy policy
│   │   ├── evasteet/
│   │   │   └── page.tsx                  # Cookie policy
│   │   ├── tietoa-meista/
│   │   │   └── page.tsx                  # About us / affiliate disclosure
│   │   ├── sitemap.ts                    # Dynamic sitemap
│   │   └── robots.ts                     # Robots.txt
│   ├── components/
│   │   ├── ui/                           # Design system primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Breadcrumb.tsx
│   │   ├── spot-prices/
│   │   │   ├── CurrentPrice.tsx          # Live price display
│   │   │   ├── HourlyChart.tsx           # Today's hourly bar chart
│   │   │   ├── TomorrowChart.tsx         # Tomorrow's prices
│   │   │   ├── HistoryChart.tsx          # 7/30/365 day history
│   │   │   ├── PriceCalendar.tsx         # Heatmap calendar
│   │   │   ├── DailyStats.tsx            # Daily statistics panel
│   │   │   └── BestHours.tsx             # Cheapest hours today
│   │   ├── comparison/
│   │   │   ├── ComparisonForm.tsx        # Multi-step input form
│   │   │   ├── ResultCard.tsx            # Single contract result
│   │   │   ├── ResultsList.tsx           # Sorted results with filters
│   │   │   ├── FilterSidebar.tsx         # Contract type, duration, green
│   │   │   └── SavingsEstimate.tsx       # Savings highlight
│   │   ├── providers/
│   │   │   ├── ProviderCard.tsx          # Provider grid card
│   │   │   ├── ProviderDetail.tsx        # Full provider info
│   │   │   └── ProviderContracts.tsx     # Provider's current contracts
│   │   ├── calculators/
│   │   │   ├── ConsumptionCalc.tsx
│   │   │   ├── SolarCalc.tsx
│   │   │   ├── EVChargingCalc.tsx
│   │   │   └── HeatingCalc.tsx
│   │   ├── blog/
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleList.tsx
│   │   │   └── TableOfContents.tsx
│   │   ├── seo/
│   │   │   ├── JsonLd.tsx               # Structured data component
│   │   │   └── OgImage.tsx              # OG image template
│   │   └── shared/
│   │       ├── SpotPriceTicker.tsx       # Mini price display (header)
│   │       ├── NewsletterSignup.tsx
│   │       ├── CookieConsent.tsx
│   │       └── AffiliateDisclosure.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   ├── schema.ts               # Drizzle schema definitions
│   │   │   ├── index.ts                 # DB connection
│   │   │   └── migrations/
│   │   ├── api/
│   │   │   ├── entsoe.ts               # ENTSO-E API client
│   │   │   ├── fingrid.ts              # Fingrid API client
│   │   │   ├── spot-hinta.ts           # spot-hinta.fi API client
│   │   │   └── fmi.ts                  # FMI weather API client
│   │   ├── calculations/
│   │   │   ├── consumption.ts           # Consumption estimation logic
│   │   │   ├── cost-comparison.ts       # Cost calculation engine
│   │   │   ├── solar-roi.ts            # Solar ROI calculations
│   │   │   └── ev-charging.ts          # EV cost calculations
│   │   ├── utils/
│   │   │   ├── format.ts               # Number/date formatting (Finnish locale)
│   │   │   ├── price.ts                # Price conversion helpers
│   │   │   └── seo.ts                  # SEO metadata helpers
│   │   └── constants/
│   │       ├── providers.ts             # Static provider data
│   │       ├── consumption-profiles.ts  # Housing type defaults
│   │       └── cities.ts               # Finnish cities data
│   ├── content/
│   │   ├── blog/                        # MDX blog articles
│   │   │   ├── sahkovertailu-2026.mdx
│   │   │   ├── halvin-sahko-2026.mdx
│   │   │   └── ...
│   │   ├── guides/                      # MDX educational guides
│   │   │   ├── sahkosopimustyypit.mdx
│   │   │   ├── porssisahko-opas.mdx
│   │   │   └── ...
│   │   └── providers/                   # MDX provider content
│   │       ├── fortum.mdx
│   │       ├── helen.mdx
│   │       └── ...
│   └── styles/
│       └── globals.css                  # Tailwind imports + custom styles
├── public/
│   ├── images/
│   │   ├── providers/                   # Provider logos
│   │   ├── og/                          # Open Graph images
│   │   └── icons/                       # PWA icons
│   ├── manifest.json                    # PWA manifest
│   └── sw.js                            # Service worker (Phase 3)
├── drizzle/
│   └── migrations/                      # Database migrations
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md                            # Project-specific dev guide
```

### 9.5 Cron Job Schedule

| Job | Frequency | Source | Purpose |
|-----|-----------|--------|---------|
| Fetch day-ahead prices | Every hour (check for new publish ~13:00 CET) | ENTSO-E | Get tomorrow's prices ASAP |
| Fetch current spot prices | Every 15 minutes | spot-hinta.fi | Real-time 15-min price data |
| Update wind production | Every 15 minutes | Fingrid | Context for price movements |
| Update contract database | Daily at 06:00 | Energiavirasto scrape + manual | Keep contract data fresh |
| Send daily price digest | Daily at 07:00 | Internal | Email alert: today's price outlook |
| Send weekly newsletter | Monday at 08:00 | Internal | Weekly market summary |
| Revalidate ISR pages | Every hour | Internal | Keep homepage/comparison fresh |
| Sitemap regeneration | Daily at 03:00 | Internal | Update sitemap with new content |

---

## 10. KPIs & Milestones

### 10.1 Phase 1 Milestones (Month 1)

| Milestone | Target Date | Success Criteria |
|-----------|------------|------------------|
| Site live on Vercel | Week 1 | All MVP pages accessible, no critical errors |
| Spot prices working | Week 1 | Live 15-min prices from ENTSO-E/spot-hinta.fi |
| Comparison calculator functional | Week 2 | Returns results for all housing types |
| 10 provider pages live | Week 2 | Top 10 retailers with full details |
| 8 blog articles published | Week 2-3 | All target keywords covered |
| 6 educational guides live | Week 2-3 | Core guides published |
| All calculators working | Week 3 | Consumption, solar, EV, heating |
| Google Search Console indexed | Week 3 | Sitemap submitted, pages indexed |
| Core Web Vitals passing | Week 3 | LCP < 2.5s, FID < 100ms, CLS < 0.1 |

### 10.2 Phase 2 Milestones (Month 2-3)

| Milestone | Target | Success Criteria |
|-----------|--------|------------------|
| Monthly organic traffic | 10,000+ visitors | Google Analytics verified |
| Pages indexed | 100+ | Google Search Console |
| First affiliate partnership | 1+ active | Revenue tracking working |
| City pages live | 50 pages | All major cities covered |
| Email subscribers | 500+ | Newsletter list built |
| User reviews | 50+ | Review system active |
| First revenue | €500+ | AdSense + affiliate |

### 10.3 Phase 3 Milestones (Month 3-6)

| Milestone | Target | Success Criteria |
|-----------|--------|------------------|
| Monthly organic traffic | 50,000+ visitors | Growing 30%+ MoM |
| AI recommendations live | Functional | Personalized contract suggestions |
| Datahub integration | Working | Users can connect smart meter data |
| Push notifications | Active | PWA with functioning push |
| Affiliate partnerships | 10+ active | Multiple revenue streams |
| Monthly revenue | €2,000+/month | Sustainable growth trajectory |
| Keyword rankings | Top 10 for 5+ primary keywords | Semrush/Ahrefs tracking |
| English version | Live | Full site in English |

### 10.4 Phase 4 Milestones (Month 6-12)

| Milestone | Target | Success Criteria |
|-----------|--------|------------------|
| Monthly organic traffic | 200,000+ visitors | Top 3 in Finnish energy comparison |
| Affiliate partnerships | 20+ active | Major retailers onboard |
| Monthly revenue | €8,000+/month | On track for €90K+ year 1 |
| API users | 50+ | Developer community |
| Mobile app | Published | iOS + Android live |
| B2B comparison | Live | Business electricity section |
| Keyword rankings | Top 3 for "sähkövertailu" | Category authority |
| Brand recognition | Measurable | Mentioned in Finnish media |

### 10.5 North Star Metrics

| Metric | Definition | Year 1 Target |
|--------|-----------|----------------|
| **Monthly Active Users** | Unique visitors/month | 200,000+ by M12 |
| **Comparison Completions** | Users who complete a full comparison | 50,000+ by M12 |
| **Conversion Rate** | Comparisons → provider clicks | 15%+ |
| **Revenue per Visitor** | Total revenue / unique visitors | €0.05+ |
| **Spot Price DAU** | Daily active users on spot dashboard | 10,000+ by M12 |
| **Email Subscribers** | Newsletter + alert subscribers | 10,000+ by M12 |
| **Provider Coverage** | % of Finnish retailers with live data | 90%+ (44/49) |
| **SEO Visibility** | Semrush/Sistrix visibility index | Top 5 in category |

### 10.6 Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| ENTSO-E API downtime | Medium | High | Multiple data sources (spot-hinta.fi, porssisahko.net as fallbacks) |
| Sahkovertailu.fi responds competitively | High | Medium | Move fast, differentiate with spot + AI + UX |
| Low initial SEO traction | Medium | Medium | Invest in content velocity, consider limited SEM to bootstrap traffic |
| Affiliate partnerships slow to close | Medium | Medium | Start with AdSense, build traffic first as leverage |
| Scraping Energiavirasto gets blocked | Low | High | Build direct provider API integrations as alternative |
| Regulatory change (comparison site licensing) | Low | High | Build as if regulation is coming — maximum transparency |
| Data accuracy issues | Medium | High | Multi-source validation, automated anomaly detection, disclaimers |
| Spot-hinta.fi API terms change | Medium | Medium | Build own ENTSO-E integration as primary source |

---

## Appendix A: Finnish Electricity Market Quick Reference

| Fact | Value |
|------|-------|
| Total households | 3.3 million |
| Active retailers | 49 |
| Annual switching rate | ~15% |
| Active shoppers/year | ~495,000 |
| Spot contract share | ~33% (growing) |
| Fixed contract share | ~45% (declining) |
| Open-ended share | ~22% (declining) |
| Pricing interval | 15-minute (since Oct 2025) |
| Average consumption (apartment) | 2,000-3,500 kWh/year |
| Average consumption (house, electric heat) | 15,000-20,000+ kWh/year |
| Solar panel households | 101,600+ |
| Energy communities | 280+ |
| Cheapest fixed rate (2026) | ~7.5-8.5 c/kWh (energy only) |
| Retail household price (all-in) | ~16-29 c/kWh |

## Appendix B: Competitor Quick Reference

| Site | Owner | UX Score | Spot Prices | AI | Revenue Model |
|------|-------|----------|-------------|-----|--------------|
| sahkovertailu.fi | Schibsted (Norway) | 7/10 | No | No | Commission/contract |
| sahkonhinta.fi | Government | 5/10 | No | No | None (taxpayer) |
| kilpailuttaja.fi | Energy Brokers Finland | 6.5/10 | No | No | Broker commission |
| vertaaensin.fi | Private | 7/10 | Basic | No | Affiliate |
| porssisahkoa.fi | Private | 7/10 | Excellent | No | Display ads |
| sahkon-hintavertailu.fi | Private | 6/10 | No | No | Affiliate |
| sahkosopimusvertailu.fi | Private | 5.5/10 | Basic | No | Affiliate (Adtraction) |
| sahkokuningas.fi | Private | 6.5/10 | Historical | No | Affiliate |
| sahkon-kilpailutus.fi | Private | 6.5/10 | No | No | Lead gen |

## Appendix C: Key Data Source Access

| Source | URL | Auth | Cost | Commercial Use |
|--------|-----|------|------|---------------|
| ENTSO-E Transparency | transparency.entsoe.eu | Free token | Free | Yes |
| Fingrid Open Data | data.fingrid.fi | Free API key | Free | Yes |
| spot-hinta.fi API | api.spot-hinta.fi | None | Free | Check terms |
| Sähkötin | sahkotin.fi/prices | None | Free | Non-commercial only |
| FMI Weather | opendata.fmi.fi | None | Free | Yes |
| Energiavirasto | sahkonhinta.fi | N/A (scrape) | Free | Public data |
| Statistics Finland | stat.fi | None | Free | Yes |
| Nord Pool | data.nordpoolgroup.com | Registration | Paid (full) | Yes |

---

*This roadmap is a living document. Updated as the project evolves.*
*Last updated: 2026-03-26*
