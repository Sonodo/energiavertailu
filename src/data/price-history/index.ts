// Static price history data for Finland electricity spot prices
// Realistic sample data based on actual Finnish price patterns
// All prices in c/kWh including VAT 25.5%

export interface DailyPriceHistory {
  date: string; // YYYY-MM-DD
  avgPrice: number; // c/kWh incl. VAT
  minPrice: number;
  maxPrice: number;
  avgPriceNoTax: number;
}

export interface MonthlyPriceHistory {
  month: string; // YYYY-MM
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  totalConsumptionGWh?: number;
}

/**
 * Seeded pseudo-random number generator for reproducible data.
 * Uses a simple mulberry32 algorithm.
 */
function seededRandom(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Get seasonal base price for Finnish electricity.
 * Winter (Nov-Feb): 6-12 c/kWh, Summer (May-Aug): 2-5 c/kWh, Spring/Autumn: 4-8 c/kWh
 */
function getSeasonalBase(month: number): { base: number; volatility: number } {
  // month is 0-indexed (0 = January)
  const seasonalMap: Record<number, { base: number; volatility: number }> = {
    0: { base: 9.5, volatility: 3.5 },   // January - deep winter
    1: { base: 8.5, volatility: 3.0 },   // February - late winter
    2: { base: 6.5, volatility: 2.5 },   // March - early spring
    3: { base: 5.0, volatility: 2.0 },   // April - spring
    4: { base: 3.5, volatility: 1.8 },   // May - late spring
    5: { base: 2.8, volatility: 1.5 },   // June - early summer
    6: { base: 2.5, volatility: 1.5 },   // July - midsummer
    7: { base: 3.0, volatility: 1.5 },   // August - late summer
    8: { base: 4.5, volatility: 2.0 },   // September - early autumn
    9: { base: 6.0, volatility: 2.5 },   // October - autumn
    10: { base: 8.0, volatility: 3.0 },  // November - early winter
    11: { base: 10.0, volatility: 4.0 }, // December - winter peak
  };
  return seasonalMap[month];
}

/**
 * Generate realistic daily price history for the last N days.
 * Each day uses a unique seed derived from its date so prices genuinely vary.
 */
export function generateDailyHistory(days: number): DailyPriceHistory[] {
  const results: DailyPriceHistory[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const month = date.getMonth();
    const dayOfWeek = date.getDay();
    const dayOfYear = Math.floor(
      (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000)
    );

    // Unique seed per day — ensures each day gets different random values
    const dateSeed = Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
    const rand = seededRandom(dateSeed);

    const { base, volatility } = getSeasonalBase(month);

    // Multi-frequency weather-like variation (deterministic per day-of-year)
    const weatherEffect =
      Math.sin(dayOfYear * 0.15) * 1.5 +
      Math.sin(dayOfYear * 0.4 + 2.1) * 0.8 +
      Math.cos(dayOfYear * 0.7 + 0.5) * 0.5;

    // Occasional spikes (cold wave / wind drop) — ~5% chance
    const spikeChance = rand();
    let spike = 0;
    if (spikeChance > 0.97) {
      spike = 5 + rand() * 15;
    } else if (spikeChance > 0.93) {
      spike = 2 + rand() * 5;
    } else if (spikeChance < 0.03) {
      spike = -(1 + rand() * 3);
    }

    // Weekend effect: slightly lower prices
    const weekendDiscount = (dayOfWeek === 0 || dayOfWeek === 6) ? -0.8 : 0;

    // Holiday/special period effects
    const isChristmas = month === 11 && date.getDate() >= 23 && date.getDate() <= 26;
    const isMidsummer = month === 5 && date.getDate() >= 19 && date.getDate() <= 22;
    const holidayEffect = isChristmas ? 3 : isMidsummer ? -1.5 : 0;

    // Daily noise from the per-day PRNG
    const dailyNoise = (rand() - 0.5) * volatility;

    // Compute average price
    let avgPrice = base + weatherEffect + dailyNoise + spike + weekendDiscount + holidayEffect;
    avgPrice = Math.max(0.1, avgPrice);

    // Min is typically 30-60% of avg (night hours)
    const minRatio = 0.3 + rand() * 0.3;
    let minPrice = avgPrice * minRatio;
    minPrice = Math.max(-0.5, minPrice);

    // Max is typically 150-300% of avg (peak hours)
    const maxRatio = 1.5 + rand() * 1.5;
    let maxPrice = avgPrice * maxRatio;

    if (spike > 5) {
      maxPrice = avgPrice + spike * 2;
    }

    // Subtle yearly trend (prices were higher a year ago)
    const yearlyTrend = i > 200 ? 1.5 : i > 100 ? 0.5 : 0;
    avgPrice += yearlyTrend;
    minPrice += yearlyTrend * 0.5;
    maxPrice += yearlyTrend * 1.5;

    const avgPriceNoTax = avgPrice / 1.255;

    results.push({
      date: dateStr,
      avgPrice: Math.round(avgPrice * 100) / 100,
      minPrice: Math.round(Math.max(-0.5, minPrice) * 100) / 100,
      maxPrice: Math.round(Math.max(avgPrice + 0.5, maxPrice) * 100) / 100,
      avgPriceNoTax: Math.round(avgPriceNoTax * 100) / 100,
    });
  }

  return results;
}

/**
 * Generate monthly summaries from daily data.
 */
export function generateMonthlyHistory(months: number): MonthlyPriceHistory[] {
  // Generate enough daily data to cover the requested months
  const days = months * 31 + 10; // Extra buffer
  const dailyData = generateDailyHistory(days);

  // Group by month
  const monthlyMap = new Map<string, DailyPriceHistory[]>();

  for (const day of dailyData) {
    const monthKey = day.date.substring(0, 7); // YYYY-MM
    if (!monthlyMap.has(monthKey)) monthlyMap.set(monthKey, []);
    monthlyMap.get(monthKey)!.push(day);
  }

  // Compute monthly summaries
  const results: MonthlyPriceHistory[] = [];

  for (const [month, days] of monthlyMap.entries()) {
    if (days.length < 20) continue; // Skip incomplete months

    const avgPrices = days.map((d) => d.avgPrice);
    const allMin = days.map((d) => d.minPrice);
    const allMax = days.map((d) => d.maxPrice);

    const avgPrice = avgPrices.reduce((a, b) => a + b, 0) / avgPrices.length;

    // Estimate consumption: higher in winter due to heating
    const monthNum = parseInt(month.split('-')[1], 10) - 1;
    const consumptionBase = monthNum >= 10 || monthNum <= 2 ? 7.5 : monthNum >= 5 && monthNum <= 8 ? 5.0 : 6.0;
    const totalConsumptionGWh = Math.round((consumptionBase + Math.random() * 1.5) * 100) / 100;

    results.push({
      month,
      avgPrice: Math.round(avgPrice * 100) / 100,
      minPrice: Math.round(Math.min(...allMin) * 100) / 100,
      maxPrice: Math.round(Math.max(...allMax) * 100) / 100,
      totalConsumptionGWh,
    });
  }

  return results.sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * Get history data for a specific period.
 * Returns daily data for short periods, monthly summaries for longer ones.
 */
export function getHistoryForPeriod(period: '7d' | '30d' | '3m' | '6m' | '12m'): {
  daily: DailyPriceHistory[];
  monthly: MonthlyPriceHistory[];
} {
  switch (period) {
    case '7d':
      return { daily: generateDailyHistory(7), monthly: [] };
    case '30d':
      return { daily: generateDailyHistory(30), monthly: [] };
    case '3m':
      return { daily: generateDailyHistory(90), monthly: generateMonthlyHistory(3) };
    case '6m':
      return { daily: generateDailyHistory(180), monthly: generateMonthlyHistory(6) };
    case '12m':
      return { daily: generateDailyHistory(365), monthly: generateMonthlyHistory(12) };
    default:
      return { daily: generateDailyHistory(30), monthly: [] };
  }
}

/**
 * Get comparison data: same period from the previous year.
 * Useful for year-over-year trend analysis.
 */
export function getYearAgoComparison(period: '7d' | '30d' | '3m' | '6m' | '12m'): {
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
} {
  // Generate data going back far enough to cover "same period last year"
  const daysMap: Record<string, number> = { '7d': 7, '30d': 30, '3m': 90, '6m': 180, '12m': 365 };
  const periodDays = daysMap[period] || 30;

  // Use a different seed offset for year-ago data
  const now = new Date();
  const yearAgo = new Date(now);
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  const results: DailyPriceHistory[] = [];
  const rand = seededRandom(42000); // Fixed seed for year-ago data

  for (let i = periodDays - 1; i >= 0; i--) {
    const date = new Date(yearAgo);
    date.setDate(date.getDate() - i);
    const month = date.getMonth();
    const { base, volatility } = getSeasonalBase(month);

    // Last year prices were generally ~20% higher
    const yearAgoMultiplier = 1.2;
    const dailyNoise = (rand() - 0.5) * volatility;
    const avgPrice = Math.max(0.5, (base + dailyNoise) * yearAgoMultiplier);

    results.push({
      date: date.toISOString().split('T')[0],
      avgPrice: Math.round(avgPrice * 100) / 100,
      minPrice: Math.round(Math.max(0.1, avgPrice * 0.4) * 100) / 100,
      maxPrice: Math.round(avgPrice * 2.5 * 100) / 100,
      avgPriceNoTax: Math.round((avgPrice / 1.255) * 100) / 100,
    });
  }

  const allAvg = results.map((r) => r.avgPrice);
  return {
    avgPrice: Math.round((allAvg.reduce((a, b) => a + b, 0) / allAvg.length) * 100) / 100,
    minPrice: Math.round(Math.min(...results.map((r) => r.minPrice)) * 100) / 100,
    maxPrice: Math.round(Math.max(...results.map((r) => r.maxPrice)) * 100) / 100,
  };
}
