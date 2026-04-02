# Energiavertailu — Development Plan (Persistent Reference)

**Created**: 2026-03-27
**Status**: IN PROGRESS
**Rule**: Work through all items. Do not stop until Chairman says stop or all items complete.

## EXCLUDED (Do NOT implement)
- A2 (Regional Transmission Integration)
- C6 (Contract Change Detection)
- D10 (Swedish hreflang)
- E3 (Dark Mode)
- F1 (Independence Banner)
- G1 (Contract Expiry Reminders)
- G2/G3 (All email-based features — alerts, newsletter)
- ALL I items (Infrastructure — Chairman will do with guidance)
- ALL J items (Monetization — Chairman will do with guidance)

## IMPLEMENTATION WAVES

### WAVE 1 — Data Foundation [LARGE FILES]
Status: COMPLETE

- [ ] **C1**: Complete provider-details.ts for all 22 new providers (long descriptions, pros/cons, FAQ — all in Finnish)
- [ ] **D5**: Expand blog-posts.ts from 10 → 30+ articles (Finnish, covering all major electricity consumer questions)
- [ ] **D6**: Expand guides.ts from 6 → 12+ guides (heat pump, solar, EV, apartment, business, winter prep)

### WAVE 2 — Core Product Features
Status: COMPLETE

- [ ] **A1**: True Total Cost Calculator — show energy + transmission + tax + VAT in one number. Use regions.ts transfer prices. Add siirtomaksu + sähkövero (2.79372 c/kWh) to comparison results. Update ResultCard, ResultsList, ComparisonSummary.
- [ ] **A3**: Multi-select duration filters — checkboxes instead of radio buttons in PreferencesStep. Support selecting multiple durations simultaneously.
- [ ] **A4**: Advanced filters panel — add: price range slider, max monthly fee filter, provider type filter, risk level filter (max risk %). Collapsible "Lisäsuodattimet" section.
- [ ] **A5**: Side-by-side comparison — new `/vertailu/rinnakkain` page. Let user pick 2-3 contracts from results, show detailed table comparing all dimensions.
- [ ] **A6**: Smart recommendation — highlight "Paras valinta" card weighing price (50%) + risk (30%) + rating (20%). Show explanation of why recommended.
- [ ] **A7**: Consumption input enhancement — add "Syötä sähkölaskustasi" option with kWh input. Add typical consumption ranges for each housing type as helper text.

### WAVE 3 — SEO Pages & Content Structure
Status: COMPLETE

- [ ] **D1**: Regional SEO pages — create `/alue/[slug]` with 18 pages (one per region from regions.ts). Each page: regional intro, transfer price, recommended providers, local energy companies, spot price context.
- [ ] **D2**: Provider vs Provider pages — auto-generate `/vertailu/[provider1]-vs-[provider2]` for top 20 most searched pairs. Comparison table with pricing, risk, features, pros/cons.
- [ ] **D3**: Dedicated "Sähkön hinta tänään" page — `/sahkon-hinta-tanaan` with aggressive SEO for #1 Finnish electricity query. Live spot price, daily summary, historical context, charts.
- [ ] **D4**: Monthly price report template — create page structure for `/blogi/sahkon-hinta-[month]-[year]` auto-generated monthly summaries.
- [ ] **D7**: FAQ schema (JSON-LD FAQPage) on every page with FAQ content — homepage, provider detail pages, tool pages.
- [ ] **D8**: Enhanced LocalBusiness schema for provider pages — add priceRange, areaServed, openingHours.
- [ ] **D9**: Internal linking system — every blog post links to relevant tools/providers/guides. Every provider page links to comparison. Every guide links to providers.

### WAVE 4 — Spot Price & Real-Time Data
Status: COMPLETE

- [ ] **B1**: ENTSO-E API integration — implement /src/lib/api/entsoe.ts properly. Fetch day-ahead prices for Finland bidding zone (10YFI-1--------U). Replace sample data with real historical data.
- [ ] **B2**: 15-minute price support — update types, charts, and display to support 15-min intervals. Show toggle between hourly/15-min view.
- [ ] **B3**: Price history storage — cache historical spot prices as static JSON files (or ISR-cached API routes). Support 7-day, 30-day, 12-month views with real data.
- [ ] **B4**: Tomorrow's prices feature — prominent "Huomisen hinnat" section on /porssisahko. Shows after 13:00 CET when Nord Pool publishes. Highlight cheapest/most expensive hours. Browser push notification opt-in (no email).
- [ ] **B5**: Simple price forecast — basic prediction for next 24h based on historical patterns, wind forecast data. Show as "Hinta-arvio" with confidence indicator. Clearly labeled as estimate.
- [ ] **B6**: Fingrid production mix — real-time widget showing: wind %, nuclear %, hydro %, imports %. From Fingrid Open Data API (datasets 74, 75, 188, 191, 194).

### WAVE 5 — UI/UX Polish
Status: COMPLETE

- [ ] **E1**: Hero section redesign — add live spot price mini-ticker, animated number showing "X sopimusta vertailtu", quick-start CTA.
- [ ] **E2**: Mobile UX audit — test all flows on 375px width. Fix: filter button sizes, comparison card layout, chart responsiveness.
- [ ] **E4**: Skeleton loading states — add skeleton components for: spot price dashboard, comparison results, provider cards, charts.
- [ ] **E5**: Micro-animations — card hover lifts, filter transition fades, chart entry animations, results slide-in. Use CSS transitions, no heavy libs.
- [ ] **E6**: Comparison flow progress — visual stepper bar between steps 1-2-3 with checkmarks.
- [ ] **E7**: Improved empty states — better "no results" with filter relaxation suggestions, popular alternatives.
- [ ] **E8**: Print stylesheet — @media print rules for comparison results. Clean layout, no nav/footer, just the data.
- [ ] **E9**: Accessibility audit — ARIA labels on all interactive elements, keyboard nav for filters, focus indicators, color contrast check.
- [ ] **E10**: Error boundaries — React error boundary components wrapping each major section. Graceful fallback UI.

### WAVE 6 — Trust, Tools & Engagement
Status: COMPLETE

- [ ] **F2**: Methodology page — `/menetelma` explaining: how we calculate total cost, how risk scores work, data sources, update frequency.
- [ ] **F3**: KKV compliance note — add to methodology page: "Noudatamme kuluttaja-asiamiehen ohjeita hintavertailupalveluille."
- [ ] **F4**: Timestamps everywhere — "Hinnat päivitetty" on comparison results, provider cards, spot prices. Show relative time ("15 min sitten").
- [ ] **F5**: Expandable calculation breakdown — click "Näytä laskelma" on any ResultCard to see: kWh × hinta + perusmaksu × 12 + verot = yhteensä.
- [ ] **F6**: Media kit page — `/media` with: brand colors, logo SVG downloads, key stats, press contact.
- [ ] **C2**: Energiavirasto price reference — add data source note and methodology reference.
- [ ] **C3**: Price update timestamps — show "Hinnat päivitetty: DD.MM.YYYY" on provider cards and comparison results.
- [ ] **C4**: Provider logos — create /public/logos/ with SVG placeholder logos using provider brand colors and initials (styled, not just circles).
- [ ] **C5**: User reviews — simple star rating display per provider. Placeholder data for now, with "Kirjoita arvostelu" CTA (localStorage-based for MVP).
- [ ] **G4**: Shareable comparison results — generate URL with encoded filter state. "Jaa vertailu" button copies link.
- [ ] **G5**: Bookmark contracts — heart icon on ResultCard, saves to localStorage, "Tallennetut" section in comparison.
- [ ] **H1**: Enhanced solar calculator — regional solar hours, battery sizing, grid sell-back.
- [ ] **H2**: Heat pump total cost tool — investment + electricity cost vs current heating. COP, climate zone, house size.
- [ ] **H3**: EV charging optimizer — optimal charging windows based on spot prices.
- [ ] **H4**: Apartment budget tool — "What will electricity cost in this home?" by type/size.
- [ ] **H5**: Historical price tracker — provider price changes over time chart.

## TECHNICAL NOTES

### File Locations
- Providers: `/src/data/providers.ts` (42 providers, ~990 lines)
- Provider details: `/src/data/provider-details.ts`
- Blog: `/src/data/blog-posts.ts`
- Guides: `/src/data/guides.ts`
- Types: `/src/types/index.ts`
- Constants: `/src/lib/constants.ts`
- Calculator components: `/src/components/calculator/`
- Spot price components: `/src/components/prices/`
- Tool components: `/src/components/tools/`
- Homepage components: `/src/components/home/`
- Layout: `/src/components/layout/`
- API routes: `/src/app/api/`

### Key Constants
- Electricity tax (sähkövero): 2.79372 c/kWh
- VAT: 25.5% (ELECTRICITY_VAT in constants.ts)
- Average spot price: 5.5 c/kWh (AVERAGE_SPOT_PRICE in providers.ts)
- Site URL: energiavertailu.fi

### Risk Score Tiers
- 0-10: Erittäin vakaa (emerald)
- 11-25: Vakaa (green)
- 26-50: Kohtalainen (amber)
- 51-75: Kohonnut riski (orange)
- 76-100: Korkea riski (red)
