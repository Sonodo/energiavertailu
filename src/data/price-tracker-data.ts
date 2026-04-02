// Static price tracker data for historical price comparison tool
// Realistic data based on Finnish electricity market patterns 2025-2026

export interface MonthlyPriceData {
  month: string; // YYYY-MM
  avgSpot: number; // c/kWh average spot price
  providers: {
    [slug: string]: {
      fixed12: number; // 12-month fixed contract price c/kWh
      spot: number; // spot margin c/kWh
    };
  };
}

export interface ProviderInfo {
  slug: string;
  name: string;
  color: string;
}

export const TRACKED_PROVIDERS: ProviderInfo[] = [
  { slug: 'fortum', name: 'Fortum', color: '#0066FF' },
  { slug: 'helen', name: 'Helen', color: '#FF6B35' },
  { slug: 'vattenfall', name: 'Vattenfall', color: '#FFB800' },
  { slug: 'oomi', name: 'Oomi', color: '#10B981' },
  { slug: 'lumme', name: 'Lumme Energia', color: '#8B5CF6' },
];

// Last 12 months of price data
export const PRICE_HISTORY: MonthlyPriceData[] = [
  {
    month: '2025-04',
    avgSpot: 4.8,
    providers: {
      fortum: { fixed12: 8.9, spot: 0.39 },
      helen: { fixed12: 9.2, spot: 0.45 },
      vattenfall: { fixed12: 9.0, spot: 0.42 },
      oomi: { fixed12: 8.7, spot: 0.35 },
      lumme: { fixed12: 9.1, spot: 0.38 },
    },
  },
  {
    month: '2025-05',
    avgSpot: 3.5,
    providers: {
      fortum: { fixed12: 8.5, spot: 0.39 },
      helen: { fixed12: 8.8, spot: 0.45 },
      vattenfall: { fixed12: 8.6, spot: 0.42 },
      oomi: { fixed12: 8.4, spot: 0.35 },
      lumme: { fixed12: 8.7, spot: 0.38 },
    },
  },
  {
    month: '2025-06',
    avgSpot: 2.8,
    providers: {
      fortum: { fixed12: 8.2, spot: 0.38 },
      helen: { fixed12: 8.5, spot: 0.44 },
      vattenfall: { fixed12: 8.3, spot: 0.41 },
      oomi: { fixed12: 8.0, spot: 0.35 },
      lumme: { fixed12: 8.4, spot: 0.37 },
    },
  },
  {
    month: '2025-07',
    avgSpot: 2.5,
    providers: {
      fortum: { fixed12: 7.9, spot: 0.37 },
      helen: { fixed12: 8.2, spot: 0.43 },
      vattenfall: { fixed12: 8.0, spot: 0.40 },
      oomi: { fixed12: 7.8, spot: 0.34 },
      lumme: { fixed12: 8.1, spot: 0.36 },
    },
  },
  {
    month: '2025-08',
    avgSpot: 3.0,
    providers: {
      fortum: { fixed12: 7.8, spot: 0.37 },
      helen: { fixed12: 8.1, spot: 0.43 },
      vattenfall: { fixed12: 7.9, spot: 0.40 },
      oomi: { fixed12: 7.7, spot: 0.34 },
      lumme: { fixed12: 8.0, spot: 0.36 },
    },
  },
  {
    month: '2025-09',
    avgSpot: 4.5,
    providers: {
      fortum: { fixed12: 7.9, spot: 0.38 },
      helen: { fixed12: 8.2, spot: 0.44 },
      vattenfall: { fixed12: 8.0, spot: 0.41 },
      oomi: { fixed12: 7.8, spot: 0.35 },
      lumme: { fixed12: 8.1, spot: 0.37 },
    },
  },
  {
    month: '2025-10',
    avgSpot: 6.0,
    providers: {
      fortum: { fixed12: 8.1, spot: 0.38 },
      helen: { fixed12: 8.4, spot: 0.44 },
      vattenfall: { fixed12: 8.2, spot: 0.41 },
      oomi: { fixed12: 8.0, spot: 0.35 },
      lumme: { fixed12: 8.3, spot: 0.37 },
    },
  },
  {
    month: '2025-11',
    avgSpot: 8.0,
    providers: {
      fortum: { fixed12: 8.5, spot: 0.39 },
      helen: { fixed12: 8.8, spot: 0.45 },
      vattenfall: { fixed12: 8.6, spot: 0.42 },
      oomi: { fixed12: 8.3, spot: 0.36 },
      lumme: { fixed12: 8.7, spot: 0.38 },
    },
  },
  {
    month: '2025-12',
    avgSpot: 10.0,
    providers: {
      fortum: { fixed12: 8.8, spot: 0.40 },
      helen: { fixed12: 9.1, spot: 0.46 },
      vattenfall: { fixed12: 8.9, spot: 0.43 },
      oomi: { fixed12: 8.6, spot: 0.37 },
      lumme: { fixed12: 9.0, spot: 0.39 },
    },
  },
  {
    month: '2026-01',
    avgSpot: 9.5,
    providers: {
      fortum: { fixed12: 8.6, spot: 0.39 },
      helen: { fixed12: 8.9, spot: 0.45 },
      vattenfall: { fixed12: 8.7, spot: 0.42 },
      oomi: { fixed12: 8.4, spot: 0.36 },
      lumme: { fixed12: 8.8, spot: 0.38 },
    },
  },
  {
    month: '2026-02',
    avgSpot: 8.5,
    providers: {
      fortum: { fixed12: 8.3, spot: 0.38 },
      helen: { fixed12: 8.6, spot: 0.44 },
      vattenfall: { fixed12: 8.4, spot: 0.41 },
      oomi: { fixed12: 8.1, spot: 0.35 },
      lumme: { fixed12: 8.5, spot: 0.37 },
    },
  },
  {
    month: '2026-03',
    avgSpot: 6.5,
    providers: {
      fortum: { fixed12: 7.9, spot: 0.37 },
      helen: { fixed12: 8.2, spot: 0.43 },
      vattenfall: { fixed12: 8.0, spot: 0.40 },
      oomi: { fixed12: 7.7, spot: 0.34 },
      lumme: { fixed12: 8.1, spot: 0.36 },
    },
  },
];

// Helper: get Finnish month name
export function getMonthLabel(monthStr: string): string {
  const monthNames: Record<string, string> = {
    '01': 'Tammi',
    '02': 'Helmi',
    '03': 'Maalis',
    '04': 'Huhti',
    '05': 'Touko',
    '06': 'Kesä',
    '07': 'Heinä',
    '08': 'Elo',
    '09': 'Syys',
    '10': 'Loka',
    '11': 'Marras',
    '12': 'Joulu',
  };
  const parts = monthStr.split('-');
  const year = parts[0].slice(2); // '25' or '26'
  return `${monthNames[parts[1]] || parts[1]} '${year}`;
}
