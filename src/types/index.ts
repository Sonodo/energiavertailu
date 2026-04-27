// Core domain types for Valitse Sähkö

export interface SpotPrice {
  timestamp: string;
  price: number; // c/kWh with VAT
  priceNoTax?: number; // c/kWh without VAT
  unit: string;
  rank?: number; // 1-24 ranking for the day
}

export interface SpotPriceRaw {
  DateTime: string;
  PriceWithTax: number;
  PriceNoTax: number;
  Rank: number;
}

export interface HourlyPrice {
  hour: number; // 0-23
  price: number; // c/kWh with VAT
  priceNoTax: number;
  timestamp: string;
  rank: number;
}

export interface QuarterHourPrice {
  hour: number;        // 0-23
  quarter: number;     // 0-3 (0=:00, 1=:15, 2=:30, 3=:45)
  price: number;       // c/kWh with VAT
  priceNoTax: number;
  timestamp: string;
  rank: number;        // 1-96 ranking for the day
}

export interface DailyPriceSummary {
  date: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  prices: HourlyPrice[];
}

export interface SpotPriceResponse {
  success: boolean;
  data?: {
    today: HourlyPrice[];
    tomorrow: HourlyPrice[] | null;
    current: HourlyPrice | null;
    stats: PriceStats;
  };
  error?: string;
  updatedAt: string;
}

export interface PriceStats {
  currentPrice: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  minHour: number;
  maxHour: number;
  direction: 'up' | 'down' | 'stable';
  previousHourPrice: number | null;
}

export interface ElectricityProvider {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  website: string;
  logo?: string;
  contracts: ElectricityContract[];
  founded?: number;
  headquarters?: string;
  customerCount?: string;
  revenue?: string;
  greenOptions: boolean;
  type?: 'national' | 'regional' | 'challenger';
  counterpartyRisk: number; // 0-100 scale: 0 = no risk (state-owned), 100 = near-certain bankruptcy
  customerServicePhone?: string;
  pros?: string[];
  cons?: string[];
  specialFeatures?: string[];
  isAffiliate?: boolean;
  affiliateUrl?: string;
}

export interface ElectricityContract {
  id: string;
  providerId: string;
  name: string;
  type: 'fixed' | 'spot' | 'hybrid' | 'open-ended';
  pricePerKwh: number; // c/kWh (energy component only)
  monthlyFee: number; // €/month
  contractLength?: number; // months (null for open-ended/spot), e.g. 6, 12, 24, 36
  greenEnergy: boolean;
  description: string;
  features: string[];
  url: string;
}

export interface ConsumptionProfile {
  type: string;
  label: string;
  annualKwh: number;
  description: string;
}

export interface CostBreakdown {
  energyCost: number;       // Annual energy cost in euros (incl. VAT + monthly fees)
  transmissionCost: number; // Annual transmission/siirto cost in euros (incl. VAT)
  taxCost: number;          // Annual electricity tax in euros (incl. VAT)
  totalCost: number;        // Sum of all components
}

export interface ComparisonResult {
  contract: ElectricityContract;
  provider: ElectricityProvider;
  annualCost: number;
  monthlyCost: number;
  savingsVsAverage: number;
  breakdown: CostBreakdown;
  recommendationScore?: number;
  isRecommended?: boolean;
  scoreBreakdown?: {
    priceScore: number;
    riskScore: number;
    ratingScore: number;
    totalScore: number;
  };
}

export interface PriceHistoryEntry {
  date: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
}

export interface Region {
  id: string;
  name: string;
  gridOperator: string;
  transferPrice: number; // c/kWh average transfer price
}

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  author: string;
  tags: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  author: string;
  tags: string[];
  tableOfContents: TableOfContentsItem[];
  relatedGuides: string[]; // slugs of related guides
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number; // 2 or 3
}

// Fingrid Datahub household consumption benchmark
export interface HouseholdBenchmark {
  averageKwhPerYear: number;
  sampleGroup: string;
  sampleSize: number;
  dataAsOf: string;
  degraded?: boolean;
}
