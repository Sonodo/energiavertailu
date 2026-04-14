# Valitse Sähkö — 0.01% Tier Improvement Plan

## Strategic Context

**Market leader Sahkovertailu.fi (Sanoma Media) was found guilty by KKV (Dec 2023) for misleading price calculations.** This is our opening. We position as the trustworthy, technically superior, consumer-first alternative. Nobody in Finland currently does true total cost comparison (energy + transmission + taxes), nobody uses real Datahub consumption data, and nobody has adapted to 15-minute pricing (Oct 2025).

**Current state**: Solid MVP with 42 providers, 100+ contracts, spot price dashboard, 4 calculators, 10 blog posts, 6 guides. Needs polish, real data integration, and killer differentiator features to be best-in-class.

---

## THE PLAN — Item by Item

### A. CORE COMPARISON ENGINE (The Product)

- [ ] **A1. True Total Cost Calculator** — Show energy + transmission fees (per region) + electricity tax + VAT in ONE number. Nobody does this. Use the existing `regions.ts` data (18 regions with transfer prices). This is our #1 differentiator vs every competitor.

- [ ] **A2. Regional Transmission Integration** — Let user select their grid operator / municipality. Auto-calculate their actual total cost including siirtomaksu. Source: Energiavirasto published grid operator prices.

- [ ] **A3. Multi-select Duration Filters** — Let users check multiple durations simultaneously (e.g., "show me 12kk AND 24kk"). Currently single-select only.

- [ ] **A4. Advanced Filters Panel** — Add: price range slider, green-only toggle in comparison, max monthly fee filter, provider type filter, risk level filter (e.g., "only show risk < 25%").

- [ ] **A5. Side-by-Side Contract Comparison** — Let user pick 2-3 contracts and see them in a detailed comparison table (price, fees, risk, features, total cost at different consumption levels).

- [ ] **A6. "Best For You" Smart Recommendation** — After user inputs consumption + preferences, show a highlighted "Suosittelemme" pick weighing price + risk + rating. Not just cheapest.

- [ ] **A7. Consumption Profile from Real Data** — Add option to input actual kWh from your electricity bill or connect to Datahub (Fingrid) to pull real consumption. Most users don't know their annual kWh.

### B. REAL-TIME DATA & APIS

- [ ] **B1. ENTSO-E Spot Price Integration** — Replace/supplement spot-hinta.fi with ENTSO-E Transparency Platform API (authoritative, EU-mandated, free). More reliable than third-party scraping.

- [ ] **B2. 15-Minute Price Granularity** — Finland moved to 15-min settlement in Oct 2025. Be the first comparison site to show 15-min prices (Fingrid publishes this). Massive differentiation.

- [ ] **B3. Price History Charts (Real Data)** — Currently using sample data for periods > 1 day. Implement real historical data storage (Supabase/DB or cached JSON) going back 12+ months.

- [ ] **B4. Tomorrow's Prices Push Notification** — Tomorrow's spot prices publish daily at ~13:00 CET. Show them prominently with "cheapest hours" highlighted. Add browser push notification opt-in.

- [ ] **B5. Price Forecast / ML Prediction** — Show a simple short-term price forecast (next 24-48h) based on weather + wind + historical patterns. sahkovatkain.web.app does this — we should too.

- [ ] **B6. Fingrid Production Mix Widget** — Show real-time electricity production mix (wind, nuclear, hydro, imports) from Fingrid Open Data. Helps users understand WHY spot prices are high/low.

### C. PROVIDER DATA QUALITY

- [ ] **C1. Complete Provider Details** — 22 new providers are missing long descriptions, pros/cons, FAQ in provider-details.ts. Write them all.

- [ ] **C2. Energiavirasto Price Scraping** — Automate monthly pull of actual contract prices from Energiavirasto published data (Excel downloads). Keep our pricing data honest and up-to-date.

- [ ] **C3. Provider Price Update Timestamps** — Show "Hinnat päivitetty: 15.3.2026" on each provider card. Builds trust. Users need to know data is fresh.

- [ ] **C4. Provider Logos** — Add actual SVG/PNG logos for all 42 providers. Currently showing first-letter placeholder circles.

- [ ] **C5. User Reviews System** — "Asiakasarvostelut tulossa pian" placeholder exists. Build actual review submission + display. Even a simple star rating + comment would be valuable.

- [ ] **C6. Contract Change Detection** — Track when providers change prices/contracts. Show "Hinta muuttunut!" badge and changelog. Builds trust and gives us fresh content for SEO.

### D. SEO & CONTENT

- [ ] **D1. Regional SEO Pages** — Create 18+ pages like `/alue/uusimaa`, `/alue/pirkanmaa` with region-specific transfer prices, recommended providers, local analysis. Massive keyword expansion.

- [ ] **D2. Provider vs Provider Pages** — Auto-generate `/vertailu/fortum-vs-helen`, `/vertailu/vare-vs-oomi` comparison pages. High-intent search keywords ("fortum vai helen").

- [ ] **D3. "Sähkön hinta tänään" Page** — Dedicated, aggressively SEO'd daily spot price page. This is the #1 search query in the Finnish electricity space. Currently our `/porssisahko` page, but needs dedicated daily-optimized version.

- [ ] **D4. Monthly Price Report Blog Posts** — Auto-generate monthly "Sähkön hinta maaliskuu 2026" summary posts with charts. Recurring SEO traffic.

- [ ] **D5. Expand Blog to 30+ Articles** — Current 10 posts is thin. Target: 30+ covering every major question Finnish consumers have about electricity.

- [ ] **D6. Expand Guides to 12+** — Current 6 guides. Add: heat pump guide, solar panel guide, EV charging guide, apartment electricity guide, business electricity guide, winter preparation guide.

- [ ] **D7. FAQ Schema on Every Page** — Add FAQ structured data (JSON-LD) to every page that has FAQ content. Google shows these as rich snippets.

- [ ] **D8. LocalBusiness Schema Enhancement** — Improve structured data for each provider page with full offers, price range, service area.

- [ ] **D9. Internal Linking System** — Build systematic internal links: every blog post links to relevant tools, every provider page links to comparison, every guide links to related providers.

- [ ] **D10. Hreflang for Swedish** — Many Finnish electricity sites also serve Swedish-speaking users. Optional but valuable niche.

### E. UI/UX POLISH

- [ ] **E1. Hero Section Redesign** — Current hero is functional but generic. Add: live spot price ticker, "X consumers compared today" social proof counter, animated comparison demo.

- [ ] **E2. Mobile UX Audit** — Full audit of comparison flow on mobile. Filter panels need to be more touch-friendly. Duration buttons are small.

- [ ] **E3. Dark Mode** — Implement full dark mode toggle. Increasingly expected for web apps.

- [ ] **E4. Loading States & Skeletons** — Add proper skeleton loaders for spot price dashboard, comparison results, provider pages. Currently no loading indicators.

- [ ] **E5. Micro-animations** — Add subtle entry animations on cards, smooth filter transitions, chart entrance animations. Polish signals quality.

- [ ] **E6. Comparison Flow Progress Bar** — The 3-step wizard works but could have a visual progress bar/stepper showing Step 1→2→3.

- [ ] **E7. Empty States** — Better empty state for "no results match your filters" with suggestions to loosen criteria.

- [ ] **E8. Print Styles** — Users may want to print/PDF a comparison. Add print-friendly CSS.

- [ ] **E9. Accessibility (WCAG 2.1 AA)** — Full accessibility audit: ARIA labels, keyboard navigation, screen reader testing, color contrast verification. Required for government endorsement.

- [ ] **E10. Error Boundaries** — Add React error boundaries so individual component failures don't crash the whole page.

### F. TRUST & CREDIBILITY

- [ ] **F1. "Vertailumme on riippumaton" Trust Banner** — Prominent trust statement explaining we're independent, not owned by any energy company (unlike Sahkovertailu.fi/Sanoma). Link to methodology.

- [ ] **F2. Methodology Page** — `/miten-vertailemme` explaining exactly how we calculate costs, how risk scores work, what data sources we use. Full transparency.

- [ ] **F3. KKV Compliance Statement** — Explicitly state we comply with consumer ombudsman guidelines for price comparison. Reference the KKV ruling against Sahkovertailu.fi (without naming them) as something we've designed to avoid.

- [ ] **F4. Last Updated Timestamps Everywhere** — Show data freshness on every comparison, every price, every provider. "Päivitetty 15 min sitten" for spot prices.

- [ ] **F5. Calculation Breakdown Expandable** — Let users expand any comparison result to see the full math: kWh × price + monthly fee × 12 + tax = total. Full transparency on how we got the number.

- [ ] **F6. Media Kit & Press Page** — `/media` page with brand assets, key stats, contact for journalists. Helps with PR and backlinks.

### G. ENGAGEMENT & RETENTION

- [ ] **G1. Email Alert: Contract Expiry Reminder** — Let users input their current contract end date. Send email 30 days before: "Sopimuksesi päättyy pian — vertaa uudet vaihtoehdot." Killer retention feature.

- [ ] **G2. Price Alert: Spot Price Threshold** — Let users set a threshold (e.g., "alert me when spot price > 15 c/kWh"). Browser push + email.

- [ ] **G3. Newsletter: Monthly Market Summary** — Monthly email with spot price trends, best deals, market news. Build the audience.

- [ ] **G4. Shareable Comparison Results** — Let users share their comparison results via URL or social media image. Viral growth mechanism.

- [ ] **G5. Bookmark / Save Contracts** — Let users save favorite contracts to compare later (localStorage, no account needed).

### H. ADVANCED TOOLS

- [ ] **H1. Solar + Battery ROI Calculator Enhancement** — Current solar calculator is basic. Add: battery storage sizing, grid sell-back pricing, regional solar hours data, Fingrid production data integration.

- [ ] **H2. Heat Pump Total Cost Tool** — Calculate: heat pump investment + electricity cost vs. current heating. Factor in COP, climate zone, house size. High-value tool for Finnish homeowners.

- [ ] **H3. EV Charging Optimizer** — When to charge your EV based on spot prices. Show optimal charging windows for today/tomorrow.

- [ ] **H4. Apartment vs House Electricity Budget Tool** — For people moving: "What will my electricity cost in this new home?" Input address/type, get estimate.

- [ ] **H5. Historical Contract Price Tracker** — Show how each provider's prices have changed over time. "Fortum's 12kk fixed was 6.5 c/kWh in 2024, now 7.89 c/kWh." Builds content & trust.

### I. INFRASTRUCTURE & PERFORMANCE

- [ ] **I1. Analytics (GA4 + Plausible)** — Implement dual analytics: GA4 for deep analysis, Plausible for privacy-friendly public stats.

- [ ] **I2. Vercel Deployment + Custom Domain** — Deploy to Vercel, set up valitsesahko.fi domain.

- [ ] **I3. Supabase for Dynamic Data** — Set up database for: user preferences, price alerts, review storage, price history cache.

- [ ] **I4. Cron Jobs for Price Updates** — Daily: fetch spot prices + cache. Weekly: check provider contract updates. Monthly: pull Energiavirasto data.

- [ ] **I5. CDN Image Optimization** — Use Next.js Image component + Vercel image optimization for all provider logos and content images.

- [ ] **I6. Performance Budget** — Target: Lighthouse 95+ on all scores. Current unknown. Audit and optimize.

- [ ] **I7. PWA Support** — Add service worker, manifest.json, offline support. Users can "install" the site as an app.

- [ ] **I8. Uptime Monitoring** — Set up Vercel/BetterStack monitoring. 99.9% uptime target.

### J. MONETIZATION

- [ ] **J1. Adtraction Affiliate Integration** — Apply to electricity provider affiliate programs via Adtraction. Add tracked affiliate links to "Lue lisää" buttons on comparison results.

- [ ] **J2. Google AdSense / Programmatic Ads** — Apply for AdSense. Place ads in content-heavy pages (blog, guides) but NOT on comparison pages (trust issue).

- [ ] **J3. Sponsored Provider Highlights** — Offer providers the option to have a "Sponsoroitu" highlighted placement (clearly labeled). Premium position in results for a fee.

- [ ] **J4. Lead Generation API** — For providers who want direct leads: "Tilaa tämä sopimus" button that passes user info to provider. Higher commission than affiliate links.

- [ ] **J5. White-label Comparison Widget** — Offer embeddable comparison widget for real estate sites, bank sites, etc. Revenue share model.

---

## PRIORITY TIERS

### TIER 1 — Ship This Week (Immediate Impact)
A1, A2, C1, D7, E6, E10, F1, F4, I2

### TIER 2 — Ship This Month (Core Differentiators)
A4, A5, A6, B1, B3, B6, C3, C4, D1, D2, D5, E1, E4, F2, F5, G4, G5, I1, J1

### TIER 3 — Ship Next Month (Growth & Polish)
A3, A7, B2, B4, C2, C5, D3, D4, D6, D8, D9, E2, E3, E5, E9, F3, G1, G2, G3, H1, H3, I3, I4, I6, J2

### TIER 4 — Long-term (Advanced Features)
B5, C6, D10, E7, E8, F6, H2, H4, H5, I5, I7, I8, J3, J4, J5

---

## WHAT MAKES THIS #1 IN FINLAND

1. **True total cost** (nobody else does energy + siirto + tax in one)
2. **Counterparty risk scoring** (nobody else shows this)
3. **Transparent methodology** (exploits KKV ruling against market leader)
4. **42 providers** (most comprehensive — competitors have 15-25)
5. **15-min price granularity** (first mover)
6. **Real consumption data** (Datahub integration)
7. **Modern UX** (competitors are WordPress/2015-era)
8. **Tool suite** (5+ calculators vs competitors' 0-1)
9. **Independent** (not owned by media/energy company)
10. **SEO depth** (regional pages, vs-pages, monthly reports)
