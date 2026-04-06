// Simple price forecast based on historical patterns
// This is an ESTIMATE, not a guarantee.

import type { HourlyPrice } from '@/types';

export interface ForecastPoint {
  hour: number;
  predictedPrice: number;
  confidence: 'low' | 'medium' | 'high';
}

export interface ForecastResult {
  forecast: ForecastPoint[];
  avgPredicted: number;
  cheapestHour: number;
  cheapestPrice: number;
  expensiveHour: number;
  expensivePrice: number;
  recommendedHours: { hour: number; price: number; label: string }[];
}

/**
 * Generate a 24-hour price forecast based on the last 7 days of hourly data.
 *
 * Algorithm:
 * 1. Weighted average of the same hour across the last 7 days (recent = heavier weight)
 * 2. Weekend vs weekday adjustment
 * 3. Seasonal baseline adjustment (month of year)
 * 4. Trend correction (linear regression over the 7-day daily averages)
 *
 * Confidence is derived from the coefficient of variation at each hour.
 */
export function generateForecast(
  historicalDays: HourlyPrice[][],
  targetDate?: Date
): ForecastResult {
  const target = targetDate || new Date(Date.now() + 24 * 60 * 60 * 1000);
  const targetDayOfWeek = target.getDay(); // 0=Sun, 6=Sat
  const isTargetWeekend = targetDayOfWeek === 0 || targetDayOfWeek === 6;
  const targetMonth = target.getMonth(); // 0-11

  // Ensure we have data — if not, return fallback
  if (historicalDays.length === 0) {
    return buildFallbackForecast(targetMonth, isTargetWeekend);
  }

  // Build per-hour weighted stats
  const forecast: ForecastPoint[] = [];

  // Compute daily averages for trend detection
  const dailyAvgs = historicalDays.map((day) => {
    if (day.length === 0) return 0;
    return day.reduce((s, p) => s + p.price, 0) / day.length;
  });

  // Simple linear trend over the period (slope in c/kWh per day)
  const trend = computeTrend(dailyAvgs);

  // Days into the future from the last historical day
  const daysAhead = 1; // forecasting the next day

  for (let hour = 0; hour < 24; hour++) {
    // Collect prices for this hour across all days, with recency weights
    const hourPrices: { price: number; weight: number; isWeekend: boolean }[] = [];

    historicalDays.forEach((day, dayIndex) => {
      const entry = day.find((p) => p.hour === hour);
      if (entry) {
        const dayDate = new Date(entry.timestamp);
        const dow = dayDate.getDay();
        const isWeekend = dow === 0 || dow === 6;
        // Recency weight: more recent days get higher weight (1.0 to 2.0)
        const weight = 1.0 + (dayIndex / Math.max(1, historicalDays.length - 1));
        hourPrices.push({ price: entry.price, weight, isWeekend });
      }
    });

    if (hourPrices.length === 0) {
      // No data for this hour — use overall average
      const overallAvg =
        dailyAvgs.reduce((s, v) => s + v, 0) / Math.max(1, dailyAvgs.length);
      forecast.push({
        hour,
        predictedPrice: Math.max(0, Math.round(overallAvg * 100) / 100),
        confidence: 'low',
      });
      continue;
    }

    // Weighted average
    let weightedSum = 0;
    let totalWeight = 0;

    // Also compute day-type-specific averages
    let sameTypeSum = 0;
    let sameTypeWeight = 0;
    let diffTypeSum = 0;
    let diffTypeWeight = 0;

    for (const hp of hourPrices) {
      weightedSum += hp.price * hp.weight;
      totalWeight += hp.weight;

      if (hp.isWeekend === isTargetWeekend) {
        sameTypeSum += hp.price * hp.weight;
        sameTypeWeight += hp.weight;
      } else {
        diffTypeSum += hp.price * hp.weight;
        diffTypeWeight += hp.weight;
      }
    }

    // Base prediction from weighted average
    let predicted = weightedSum / totalWeight;

    // Day-type adjustment: blend 70% same-type, 30% different-type (if both available)
    if (sameTypeWeight > 0 && diffTypeWeight > 0) {
      const sameAvg = sameTypeSum / sameTypeWeight;
      const diffAvg = diffTypeSum / diffTypeWeight;
      predicted = sameAvg * 0.7 + diffAvg * 0.3;
    } else if (sameTypeWeight > 0) {
      predicted = sameTypeSum / sameTypeWeight;
    }

    // Seasonal adjustment (multiply by seasonal factor)
    const seasonalFactor = getSeasonalFactor(targetMonth, hour);
    predicted *= seasonalFactor;

    // Trend adjustment: extrapolate the trend forward
    predicted += trend * daysAhead;

    // Clamp to reasonable range
    predicted = Math.max(0, predicted);
    predicted = Math.round(predicted * 100) / 100;

    // Confidence from coefficient of variation
    const prices = hourPrices.map((hp) => hp.price);
    const mean = prices.reduce((s, v) => s + v, 0) / prices.length;
    const variance =
      prices.reduce((s, v) => s + (v - mean) ** 2, 0) / prices.length;
    const cv = mean > 0 ? Math.sqrt(variance) / mean : 1;

    let confidence: 'low' | 'medium' | 'high';
    if (cv < 0.2) confidence = 'high';
    else if (cv < 0.5) confidence = 'medium';
    else confidence = 'low';

    forecast.push({ hour, predictedPrice: predicted, confidence });
  }

  // Compute summary stats
  const avgPredicted =
    Math.round(
      (forecast.reduce((s, f) => s + f.predictedPrice, 0) / forecast.length) *
        100
    ) / 100;

  const cheapest = forecast.reduce((min, f) =>
    f.predictedPrice < min.predictedPrice ? f : min
  );
  const expensive = forecast.reduce((max, f) =>
    f.predictedPrice > max.predictedPrice ? f : max
  );

  // Build recommended hours: cheapest windows for common tasks
  const recommendedHours = buildRecommendations(forecast);

  return {
    forecast,
    avgPredicted,
    cheapestHour: cheapest.hour,
    cheapestPrice: cheapest.predictedPrice,
    expensiveHour: expensive.hour,
    expensivePrice: expensive.predictedPrice,
    recommendedHours,
  };
}

/**
 * Compute a simple linear trend (slope) over daily averages.
 * Returns price change per day (c/kWh/day).
 */
function computeTrend(dailyAvgs: number[]): number {
  const n = dailyAvgs.length;
  if (n < 2) return 0;

  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += dailyAvgs[i];
    sumXY += i * dailyAvgs[i];
    sumX2 += i * i;
  }

  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) return 0;

  return (n * sumXY - sumX * sumY) / denominator;
}

/**
 * Seasonal factor by month and hour.
 * Winter months have higher prices, summer lower.
 * This is a multiplicative factor around 1.0.
 */
function getSeasonalFactor(month: number, hour: number): number {
  // Monthly baseline: winter high, summer low
  const monthlyFactors = [
    1.15, // Jan
    1.12, // Feb
    1.05, // Mar
    0.95, // Apr
    0.88, // May
    0.82, // Jun
    0.80, // Jul
    0.83, // Aug
    0.90, // Sep
    1.00, // Oct
    1.08, // Nov
    1.15, // Dec
  ];

  // In winter, peak hours are even more pronounced
  const isWinter = month <= 1 || month >= 10;
  const isPeakHour = hour >= 7 && hour <= 10 || hour >= 17 && hour <= 20;

  let factor = monthlyFactors[month];

  if (isWinter && isPeakHour) {
    factor *= 1.05; // Extra premium for winter peaks
  }

  return factor;
}

/**
 * Build recommended usage windows from forecast data
 */
function buildRecommendations(
  forecast: ForecastPoint[]
): { hour: number; price: number; label: string }[] {
  const sorted = [...forecast].sort((a, b) => a.predictedPrice - b.predictedPrice);
  const recommendations: { hour: number; price: number; label: string }[] = [];

  // Find cheapest 3-hour window (for laundry, dishwasher)
  let bestWindowStart = 0;
  let bestWindowAvg = Infinity;
  for (let start = 0; start <= 21; start++) {
    const windowPrices = forecast
      .filter((f) => f.hour >= start && f.hour < start + 3)
      .map((f) => f.predictedPrice);
    if (windowPrices.length === 3) {
      const avg = windowPrices.reduce((s, v) => s + v, 0) / 3;
      if (avg < bestWindowAvg) {
        bestWindowAvg = avg;
        bestWindowStart = start;
      }
    }
  }

  recommendations.push({
    hour: bestWindowStart,
    price: Math.round(bestWindowAvg * 100) / 100,
    label: `Pyykinpesu / astianpesu: klo ${String(bestWindowStart).padStart(2, '0')}–${String(bestWindowStart + 3).padStart(2, '0')}`,
  });

  // Single cheapest hour (for EV charging start, water heater)
  recommendations.push({
    hour: sorted[0].hour,
    price: sorted[0].predictedPrice,
    label: `Halvin tunti: klo ${String(sorted[0].hour).padStart(2, '0')}–${String(sorted[0].hour + 1).padStart(2, '0')}`,
  });

  // Find cheapest 6-hour window (for EV charging, overnight heating)
  let bestLongStart = 0;
  let bestLongAvg = Infinity;
  for (let start = 0; start <= 18; start++) {
    const windowPrices = forecast
      .filter((f) => f.hour >= start && f.hour < start + 6)
      .map((f) => f.predictedPrice);
    if (windowPrices.length === 6) {
      const avg = windowPrices.reduce((s, v) => s + v, 0) / 6;
      if (avg < bestLongAvg) {
        bestLongAvg = avg;
        bestLongStart = start;
      }
    }
  }

  recommendations.push({
    hour: bestLongStart,
    price: Math.round(bestLongAvg * 100) / 100,
    label: `Auton lataus: klo ${String(bestLongStart).padStart(2, '0')}–${String(bestLongStart + 6).padStart(2, '0')}`,
  });

  // Most expensive hour to avoid
  const mostExpensive = sorted[sorted.length - 1];
  recommendations.push({
    hour: mostExpensive.hour,
    price: mostExpensive.predictedPrice,
    label: `Vältä: klo ${String(mostExpensive.hour).padStart(2, '0')}–${String(mostExpensive.hour + 1).padStart(2, '0')} (kallein)`,
  });

  return recommendations;
}

/**
 * Fallback forecast when no historical data is available.
 * Uses typical Finnish price patterns.
 */
function buildFallbackForecast(
  month: number,
  isWeekend: boolean
): ForecastResult {
  const basePattern = [
    2.1, 1.8, 1.5, 1.3, 1.2, 1.4, // 00-05: night
    2.8, 5.2, 7.8, 6.5, 5.3, 4.8, // 06-11: morning
    4.2, 3.9, 3.6, 3.8, 4.5, 6.2, // 12-17: midday
    8.5, 7.2, 5.8, 4.2, 3.1, 2.5, // 18-23: evening
  ];

  const forecast: ForecastPoint[] = basePattern.map((base, hour) => {
    let price = base;
    price *= getSeasonalFactor(month, hour);
    if (isWeekend) price *= 0.85; // Weekends typically cheaper
    price = Math.round(Math.max(0, price) * 100) / 100;
    return { hour, predictedPrice: price, confidence: 'low' as const };
  });

  const avgPredicted =
    Math.round(
      (forecast.reduce((s, f) => s + f.predictedPrice, 0) / 24) * 100
    ) / 100;
  const cheapest = forecast.reduce((min, f) =>
    f.predictedPrice < min.predictedPrice ? f : min
  );
  const expensive = forecast.reduce((max, f) =>
    f.predictedPrice > max.predictedPrice ? f : max
  );

  return {
    forecast,
    avgPredicted,
    cheapestHour: cheapest.hour,
    cheapestPrice: cheapest.predictedPrice,
    expensiveHour: expensive.hour,
    expensivePrice: expensive.predictedPrice,
    recommendedHours: buildRecommendations(forecast),
  };
}

/**
 * Generate forecast from sample data when real API data isn't available.
 * Produces a realistic-looking set of hourly data for 7 days.
 */
export function generateSampleHistoricalDays(): HourlyPrice[][] {
  const days: HourlyPrice[][] = [];
  const now = new Date();

  for (let d = 6; d >= 0; d--) {
    const date = new Date(now);
    date.setDate(date.getDate() - d);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dow = date.getDay();
    const isWeekend = dow === 0 || dow === 6;

    const basePattern = [
      2.1, 1.8, 1.5, 1.3, 1.2, 1.4,
      2.8, 5.2, 7.8, 6.5, 5.3, 4.8,
      4.2, 3.9, 3.6, 3.8, 4.5, 6.2,
      8.5, 7.2, 5.8, 4.2, 3.1, 2.5,
    ];

    const hourly: HourlyPrice[] = basePattern.map((base, hour) => {
      // Add day-specific noise
      const noise = Math.sin(day * 13 + hour * 7 + d * 3) * 1.5;
      let price = base + noise;
      if (isWeekend) price *= 0.85;

      // Seasonal
      const seasonFactor = getSeasonalFactor(month, hour);
      price *= seasonFactor;

      // Slight trend (getting slightly more expensive)
      price += d * 0.05;

      price = Math.max(0.1, price);
      const priceNoTax = price / 1.255;

      const timestamp = new Date(year, month, day, hour, 0, 0);
      const isoStr = timestamp.toISOString();

      return {
        hour,
        price: Math.round(price * 100) / 100,
        priceNoTax: Math.round(priceNoTax * 100) / 100,
        timestamp: isoStr,
        rank: 0,
      };
    });

    // Compute ranks
    const sorted = [...hourly].sort((a, b) => a.price - b.price);
    sorted.forEach((p, i) => {
      const original = hourly.find((op) => op.hour === p.hour);
      if (original) original.rank = i + 1;
    });

    days.push(hourly);
  }

  return days;
}
