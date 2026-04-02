# Finnish Electricity Comparison Market — Competitive Intelligence Report

**Date**: 2026-03-27
**Purpose**: Competitive landscape analysis for building the best sahkovertailu site in Finland

---

## 1. MARKET OVERVIEW

The Finnish electricity comparison market has approximately 10-15 active players, from the government-run Energiavirasto tool to commercial affiliate sites. The market is driven by:

- **3.9 million electricity accounting points** in Finland (Fingrid Datahub)
- **High consumer awareness** post-2022 energy crisis (Olkiluoto 3 impact, price spikes)
- **Active switching behavior** — hundreds of thousands of contracts switched annually
- **15-minute pricing** (changed from hourly in October 2025) increasing complexity
- **Growing home battery & solar market** creating new comparison needs

Commission-based comparison sites earn **EUR 10-30 per converted electricity contract** through affiliate programs (primarily via Adtraction network).

---

## 2. TOP COMPETITORS — DETAILED PROFILES

### TIER 1: Major Players

#### 2.1 Sahkovertailu.fi (Sanoma Media Finland Oy)
- **URL**: https://sahkovertailu.fi
- **Owner**: Sanoma Media Finland Oy (major Finnish media conglomerate)
- **Since**: 2011
- **Contracts made**: 330,000+
- **Providers**: 55-80+ electricity companies
- **SimilarWeb Global Rank**: #233,011 | Finland Rank: #1,118
- **Bounce rate**: 28.67% | Pages/visit: 6.29 | Avg duration: 2:19
- **Rating**: 4.7/5 (4,038 reviews)
- **Monetization**: Commission per contract via Adtraction affiliate program
- **Strengths**:
  - Largest provider database in Finland
  - Strong brand recognition and Sanoma media backing
  - Comprehensive content: guides on contract types, switching, pricing
  - Multi-step comparison flow: housing type -> heating -> sqm -> occupants
  - Spot price page with real-time data
  - SEO content targeting all major keywords
- **Weaknesses**:
  - **KKV (Consumer Ombudsman) ruling (Dec 2023)**: Found guilty of misleading annual cost estimates based on short promotional prices
  - Trust issues from the KKV case
  - Heavy affiliate focus may bias recommendations
  - Owned by media company, not energy specialists
  - Content can be generic/thin on some pages

#### 2.2 Sahkonhinta.fi (Energiavirasto / Energy Authority)
- **URL**: https://www.sahkonhinta.fi
- **Owner**: Energiavirasto (Finnish Energy Authority — government)
- **Type**: Official, regulatory
- **Data source**: Mandatory price reporting from all Finnish electricity retailers
- **Strengths**:
  - **Most authoritative** — government-mandated price data
  - All retailers legally required to report prices
  - No commercial bias
  - Recommended by Energiavirasto itself
  - Trusted by consumer protection bodies
- **Weaknesses**:
  - **Terrible UX** — dated government site design
  - No modern comparison interface
  - Limited filtering and sorting
  - No educational content integrated
  - No spot price tracking
  - No calculators or tools
  - No mobile optimization
  - Feels like a database dump, not a consumer tool

#### 2.3 VertaaEnsin.fi
- **URL**: https://www.vertaaensin.fi/sahko/
- **Owner**: Independent comparison platform (multi-vertical: insurance, loans, electricity)
- **Subscribers**: 100,000+
- **Providers**: 40+ companies, 70+ contracts
- **Rating**: 4.5/5 (Google reviews)
- **Monetization**: Commission per contract via Adtraction
- **Strengths**:
  - Multi-vertical brand (lends trust from other comparison categories)
  - Daily price updates
  - Good educational content about contract types
  - Distribution grid comparison content (siirtohinnat)
  - Active TV and radio marketing
- **Weaknesses**:
  - Generic multi-vertical platform, not energy-specialist
  - Comparison UX not as refined as Sahkovertailu.fi
  - Content quality varies

### TIER 2: Niche / Affiliate Sites

#### 2.4 Halvinsahkosopimus.fi
- **URL**: https://halvinsähkösopimus.fi (xn--halvinshksopimus-1nb04a.fi)
- **Type**: SEO-driven affiliate content site
- **Strengths**: Strong keyword targeting ("halvin sähkösopimus"), comprehensive blog content, current year targeting in titles
- **Weaknesses**: Thin comparison tool (embeds other services), primarily content/SEO play

#### 2.5 Sahkon-kilpailutus.fi
- **URL**: https://www.sahkon-kilpailutus.fi
- **Type**: WordPress-based affiliate site (Thrive Theme)
- **Tech**: ActiveCampaign, Mailchimp, Zapier, Google Tag Manager
- **Strengths**: Fast sub-60-second comparison promise, card-based UI
- **Weaknesses**: WordPress template feel, limited provider range, heavy conversion optimization (feels pushy)

#### 2.6 Sahkon-hintavertailu.fi
- **URL**: https://sahkon-hintavertailu.fi
- **Type**: Content + affiliate hybrid
- **Strengths**: Strong educational focus, property-type-specific guidance, historical context (energy crisis, Olkiluoto 3)
- **Weaknesses**: Comparison powered by embedded Halvinsahkosopimus.fi widget (not own tool)

#### 2.7 Kilpailuttaja.fi
- **URL**: https://www.kilpailuttaja.fi/sahkon-kilpailutus
- **Type**: Multi-vertical comparison (insurance, telecom, electricity)
- **Strengths**: Established brand across multiple comparison verticals
- **Weaknesses**: Electricity not primary focus, generic approach

#### 2.8 Vertaa-kilpailuttajat.fi
- **URL**: https://vertaa-kilpailuttajat.fi
- **Type**: Meta-comparison (compares 6 different comparison sites)
- **Strengths**: Unique meta-comparison angle, price forecasts
- **Weaknesses**: Adds a layer of indirection, confusing UX

#### 2.9 Sahkokuningas.fi
- **URL**: https://sahkokuningas.fi
- **Type**: Affiliate comparison site
- **Strengths**: Real-time pricing, free comparison
- **Weaknesses**: Smaller provider range, less established

#### 2.10 Fiksukuluttaja.fi
- **URL**: https://fiksukuluttaja.fi/sahkon-kilpailutus/
- **Type**: Consumer advice + affiliate
- **Strengths**: Good "smart consumer" branding
- **Weaknesses**: Electricity is one of many topics

### TIER 3: Spot Price Trackers (Not Direct Competitors, But Adjacent)

#### Porssisahko.net
- Real-time spot price dashboard
- Simple, clean UI
- Google Ads monetized

#### Sahkotin.fi
- Spot price tracker with free API
- Developer-focused
- Non-commercial license only

#### Spot-hinta.fi
- Open API with Swagger docs
- Shelly device integration for home automation
- Community-driven
- IFTTT integration

#### Sahkovatkain.web.app
- ML-based price forecasting
- Operational since Feb 2024
- Considers wind power, temperature, maintenance

#### Porssisahkoa.fi / Sahkotutka.fi / Sahko.tk
- Various spot price dashboards
- Different UI approaches to the same data

---

## 3. DATA SOURCES & APIs

### 3.1 Official / Authoritative

| Source | URL | Data | Access | Notes |
|--------|-----|------|--------|-------|
| **ENTSO-E Transparency Platform** | https://transparency.entsoe.eu | Day-ahead prices, generation, load | Free API (email for token) | EU-mandated, most authoritative |
| **Fingrid Open Data** | https://data.fingrid.fi | Consumption, production, grid data | Free REST API (JSON/CSV/XML) | Hourly, 15-min, 3-min intervals |
| **Fingrid Datahub** | fingrid.fi/datahub | Individual consumption data | Per-customer portal | 3.9M accounting points |
| **Energiavirasto** | energiavirasto.fi/sahkon-hintatilastot | Price statistics, transmission | Excel downloads | Monthly updates, no API |
| **Nord Pool** | nordpoolgroup.com | Spot prices (owned data) | Commercial license required | Day-ahead published ~14:00 Finnish time |

### 3.2 Free / Community APIs

| Service | Endpoint | Data | Rate Limit | License |
|---------|----------|------|------------|---------|
| **Sahkotin.fi** | `GET sahkotin.fi/prices` | Spot prices (JSON/CSV) | Unspecified (be reasonable) | Non-commercial only |
| **Sahkohinta-api.fi** | sahkohinta-api.fi | Spot prices + optimization | 60 calls/hour | Free (source: ENTSO-E) |
| **Spot-hinta.fi** | api.spot-hinta.fi (Swagger) | Spot prices, Shelly scripts | Unspecified | Open API |
| **Porssisahko.net** | porssisahko.net/api | Hourly/daily prices, stats | Undocumented | Undocumented |

### 3.3 Key Data Points Available
- Spot prices: 15-minute intervals (since Oct 2025), historical hourly
- Consumption by customer type, user group, metering type (aggregated)
- Wind power production (affects pricing significantly)
- Temperature data (drives demand)
- Futures prices (forward contracts on Nasdaq OMX)

---

## 4. MONETIZATION MODELS IN THE MARKET

### 4.1 Commission Per Contract (Primary Model)
- **Platform**: Adtraction affiliate network
- **Sahkovertailu.fi**: Commission on every contract concluded through site
- **VertaaEnsin.fi**: Commission per valid electricity contract
- **Estimated commission**: EUR 10-30 per contract (industry standard)
- **Volume**: Sahkovertailu.fi alone has done 330,000+ contracts since 2011

### 4.2 Display Advertising
- Google AdSense on spot price tracker sites
- Display ads on content-focused affiliate sites

### 4.3 Lead Generation
- Email capture for newsletters
- Integration with CRM tools (ActiveCampaign, Mailchimp)
- Remarketing via Google Ads, Meta Pixel

### 4.4 Provider Partnerships
- Direct partnerships with electricity retailers
- Sponsored placement in comparison results
- Provider-branded content/articles

### 4.5 Revenue Potential Estimate
- Finland has ~3.9M electricity points
- Average switching rate ~10-15% annually = 390,000-585,000 potential switches
- At EUR 15 average commission = EUR 5.8M-8.7M total addressable market for comparison sites
- Top site (Sahkovertailu.fi) likely captures 15-20% = EUR 870K-1.7M annually

---

## 5. USER PAIN POINTS & MARKET GAPS

### 5.1 Documented Consumer Complaints

1. **Misleading price estimates** — KKV ruled Sahkovertailu.fi showed promotional prices as annual costs (Dec 2023)
2. **Confusing contract types** — Consumers don't understand spot vs. fixed vs. hybrid differences
3. **Hidden costs** — Siirtomaksu (transmission fees) rarely included in comparisons, giving false total picture
4. **Auto-renewal traps** — Fixed contracts expiring silently into expensive continuous contracts
5. **Price validity confusion** — Promotional prices lasting only weeks, not reflected in annual estimates
6. **Billing surprises** — Small providers with erratic billing practices
7. **Information overload** — Too many options without personalized guidance

### 5.2 Market Gaps (Opportunities)

| Gap | Description | Opportunity |
|-----|-------------|-------------|
| **No total cost calculator** | Nobody shows energy + transmission + taxes in one view | Build the only "true total cost" calculator |
| **No contract expiry tracker** | Consumers forget when contracts end, get trapped in expensive auto-renewal | Alert system for contract expiration |
| **No independent trust score** | All comparison sites are affiliate-biased | Create transparent, data-driven provider ratings |
| **No consumption integration** | Sites guess consumption, nobody connects to Datahub | Integrate with Fingrid Datahub for real consumption data |
| **No AI price advisor** | Nobody offers personalized "best contract for YOU" based on actual usage patterns | ML-based recommendation engine |
| **No home battery/solar comparison** | Growing market with no independent comparison tool | Solar ROI + battery comparison calculator |
| **No 15-min price optimization** | Market shifted to 15-min pricing in Oct 2025, tools lag behind | 15-minute granularity in all tools |
| **No regional total cost** | Transmission varies wildly by region but isn't integrated into comparisons | Region-specific total cost including transmission |
| **No contract quality scoring** | Sites rank by price only, not by terms, flexibility, customer service | Multi-factor contract scoring system |
| **Weak mobile experience** | Most sites are desktop-first or WordPress templates | Native-feeling mobile PWA |
| **No price alert system** | Only Fingrid's Tuntihinta app does alerts, but for spot prices only | Comprehensive alerts: spot prices, new contracts, contract expiry |
| **No provider complaints data** | No aggregated view of which providers have issues | Crowdsourced or scraped provider review aggregation |

---

## 6. SEO & CONTENT LANDSCAPE

### 6.1 High-Value Keywords (Finnish)

| Keyword | Intent | Competition | Who Ranks |
|---------|--------|-------------|-----------|
| sähkövertailu | Transactional | Very High | sahkovertailu.fi, vertaaensin.fi |
| sähkön kilpailutus | Transactional | Very High | sahkon-kilpailutus.fi, sahkovertailu.fi |
| halvin sähkösopimus | Transactional | High | halvinsahkosopimus.fi, sahkovertailu.fi |
| sähkön hinta | Informational | High | sahkovertailu.fi, vattenfall.fi |
| pörssisähkön hinta | Informational | High | porssisahko.fi, vattenfall.fi, sahkovertailu.fi |
| sähkön hintavertailu | Transactional | High | sahkonhinta.fi, sahkon-hintavertailu.fi |
| sähkösopimus | Informational | Medium | sahkovertailu.fi, vattenfall.fi |
| pörssisähkö vai kiinteä | Informational | Medium | Helen.fi, kilpailuttaja.fi, sahkovertailu.fi |
| sähkön siirtohinta | Informational | Medium | vertaaensin.fi, sahkohinta.com |
| sähkön hinta nyt | Informational | Medium | vattenfall.fi, vare.fi |
| sähkösopimus omakotitalo | Transactional | Medium | sahkovertailu.fi |
| millainen sähkösopimus kannattaa | Informational | Medium | sahkovertailu.fi, halvinsahkosopimus.fi |
| sähkön kulutus laskuri | Tool-based | Low | (weak competition) |
| kotiakku vertailu | Emerging | Low | 1komma5.com, powera.fi |
| aurinkopaneeli sähkösopimus | Emerging | Low | (almost no competition) |

### 6.2 Content Patterns That Rank Well

1. **"[Year] guides"** — "Sähkön kilpailutus 2026", "Halvin sähkösopimus 2026" (freshness signal)
2. **Comparison tables** — Side-by-side contract comparisons with prices
3. **Decision guides** — "Pörssisähkö vai kiinteä?" style content
4. **Property-type specific** — "Sähkösopimus omakotitalo", "sähkö kerrostalo"
5. **Price pages** — "Sähkön hinta nyt", "pörssisähkön hinta tänään"
6. **Provider reviews** — Individual company pages (sahkovertailu.fi/sahkoyhtiot/*)
7. **FAQ-rich content** — Structured FAQ sections get rich snippets
8. **Calculator tools** — Interactive tools earn backlinks and engagement

### 6.3 Content Gaps to Exploit

- **"Sähkön kokonaiskustannus"** (total electricity cost) — nobody owns this term
- **Regional content** — "sähkösopimus [city]" pages are underserved
- **Seasonal guides** — "paras sähkösopimus talveksi/kesäksi" timing content
- **Life event content** — "sähkösopimus muutto" (moving), "first apartment electricity"
- **Technology intersection** — EV + electricity, heat pump + electricity, solar + battery + electricity
- **Business electricity** — B2B comparison is largely ignored
- **Renewable energy comparison** — Which providers are actually green vs. greenwashing

---

## 7. COMPETITIVE ADVANTAGES TO BUILD

Based on the analysis, here is what would make our site the definitive #1:

### 7.1 Trust & Transparency (Counter Sahkovertailu.fi's KKV problem)
- **Show true annual costs** including transmission fees by region
- **No promotional price tricks** — always show real, ongoing prices
- **Transparent scoring methodology** published openly
- **"Energiavirasto data + better UX"** positioning

### 7.2 Technology Edge (Counter everyone's dated tech)
- **15-minute price granularity** (most competitors still hourly)
- **ML-based price forecasting** with accuracy tracking
- **Real-time spot price with push notifications**
- **Datahub integration** for personalized recommendations based on actual consumption
- **PWA with offline support** for mobile-first users

### 7.3 Comprehensive Scope (Counter single-focus competitors)
- **One platform**: contract comparison + spot prices + calculators + guides
- **Total cost view**: energy + transmission + taxes for your exact location
- **Future energy stack**: solar + battery + EV charging in one comparison
- **Provider quality scores**: not just price, but service, billing reliability, green credentials

### 7.4 Content Authority (Counter thin affiliate content)
- **Data journalism**: monthly market reports with original analysis
- **Provider deep-dives**: not just logos but actual investigative reviews
- **Regional guides**: every major Finnish city with specific transmission costs
- **Interactive tools**: calculators that earn backlinks and social shares

### 7.5 Consumer Protection Angle (Counter industry bias)
- **Contract expiry alerts**: free service to remind before auto-renewal
- **Price change notifications**: alert when your provider changes prices
- **Complaint aggregation**: transparent data on provider issues
- **Partnership with Kuluttajaliitto** positioning

---

## 8. TECHNICAL ARCHITECTURE RECOMMENDATIONS

### 8.1 Data Pipeline
```
ENTSO-E API → Our Backend → 15-min spot prices (primary, authoritative)
Spot-hinta.fi API → Fallback for spot prices
Fingrid Open Data → Consumption/production statistics
Energiavirasto Excel → Monthly contract price updates (scrape/parse)
Provider websites → Contract data (scrape + manual verification)
```

### 8.2 Key Technical Differentiators
- **ISR (Incremental Static Regeneration)** for spot prices: revalidate every 5 minutes
- **Edge functions** for personalized recommendations
- **Structured data** (JSON-LD) for every contract, provider, and price
- **Core Web Vitals optimized** — beat all competitors on PageSpeed
- **Accessibility (WCAG 2.1 AA)** — no competitor does this well

---

## 9. SOURCES

- [Sahkovertailu.fi](https://sahkovertailu.fi/) — Sanoma Media's comparison platform
- [Sahkonhinta.fi](https://www.sahkonhinta.fi/) — Energiavirasto's official price comparison
- [VertaaEnsin.fi](https://www.vertaaensin.fi/sahko/sahkon-kilpailutus) — Multi-vertical comparison
- [Sahkon-kilpailutus.fi](https://www.sahkon-kilpailutus.fi/) — WordPress-based affiliate site
- [Sahkon-hintavertailu.fi](https://sahkon-hintavertailu.fi/) — Content + affiliate hybrid
- [Vertaa-kilpailuttajat.fi](https://vertaa-kilpailuttajat.fi/) — Meta-comparison site
- [Sahkokuningas.fi](https://sahkokuningas.fi/) — Affiliate comparison
- [Fiksukuluttaja.fi](https://fiksukuluttaja.fi/sahkon-kilpailutus/) — Consumer advice + affiliate
- [Halvinsahkosopimus.fi](https://xn--halvinshksopimus-1nb04a.fi/) — SEO-driven content site
- [Energiavirasto - Sahkon hintatilastot](https://energiavirasto.fi/sahkon-hintatilastot) — Official price statistics
- [KKV ruling on Sahkovertailu.fi](https://www.kkv.fi/paatokset/kuluttaja-asiat/kuluttaja-asiamiehen-ratkaisut/alustan-vastuu-sahkon-hintavertailupalvelussa/) — Misleading pricing decision
- [Fingrid Open Data](https://data.fingrid.fi/en) — Free REST API for electricity market data
- [Fingrid Datahub](https://www.fingrid.fi/en/electricity-market/datahub/) — Centralized data exchange
- [ENTSO-E Transparency Platform](https://www.entsoe.eu/data/transparency-platform/) — EU electricity market data
- [Sahkotin.fi API](https://sahkotin.fi/api) — Free spot price API
- [Spot-hinta.fi API](https://spot-hinta.fi/) — Open API with Swagger docs
- [Porssisahko.net](https://porssisahko.net) — Spot price dashboard
- [Sahkovatkain ML Forecast](https://sahkovatkain.web.app/) — Machine learning price predictions
- [Adtraction - Sahkovertailu.fi Program](https://adtraction.com/fi/mainostaja/1795474067) — Affiliate program details
- [Adtraction - VertaaEnsin Program](https://adtraction.com/fi/mainostaja/1869117242) — Affiliate program details
- [SimilarWeb - Sahkovertailu.fi](https://www.similarweb.com/website/sahkovertailu.fi/competitors/) — Traffic analytics
- [Kuluttajaliitto - Sahkon kilpailutus](https://www.kuluttajaliitto.fi/materiaalit/vastuullinen-kuluttaminen-sahkon-kilpailutus/) — Consumer guidance
- [VertaaEnsin - Siirtohinnat](https://www.vertaaensin.fi/sahko/sahkonsiirto) — Transmission price data
