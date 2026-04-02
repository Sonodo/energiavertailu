// Unified price service with fallback chain:
// 1. spot-hinta.fi (fast, free, no key)
// 2. ENTSO-E (requires API key)
// 3. Sample data (always available)

import {
  fetchTodaySpotPrices,
  fetchTomorrowSpotPrices,
  fetchCurrentSpotPrice,
  fetchPriceHistory as fetchSpotHintaHistory,
  generateSampleHistory,
  generateSamplePrices,
} from '@/lib/api/spot-hinta';
import {
  fetchFinlandDayAheadPrices,
  fetchEntsoeHistoryRange,
  eurMwhToCentKwhWithVat,
  eurMwhToCentKwh,
  EntsoePrice,
} from '@/lib/api/entsoe';
import { getFinnishHour } from '@/lib/utils';
import type { HourlyPrice } from '@/types';

type PriceSource = 'spot-hinta' | 'entsoe' | 'sample';

interface SourcedResult<T> {
  data: T;
  source: PriceSource;
}

/**
 * Convert ENTSO-E prices to our HourlyPrice format
 */
function entsoeToHourlyPrices(entsoePrices: EntsoePrice[]): HourlyPrice[] {
  // If we have 15-min data, aggregate to hourly
  const hourlyMap = new Map<number, { prices: number[]; timestamp: string }>();

  for (const ep of entsoePrices) {
    const date = new Date(ep.timestamp);
    const hour = getFinnishHour(date);

    if (!hourlyMap.has(hour)) {
      hourlyMap.set(hour, { prices: [], timestamp: ep.timestamp });
    }

    hourlyMap.get(hour)!.prices.push(ep.price);
  }

  const hourlyPrices: HourlyPrice[] = [];

  for (const [hour, data] of hourlyMap.entries()) {
    const avgEurMwh = data.prices.reduce((a, b) => a + b, 0) / data.prices.length;
    const priceWithVat = eurMwhToCentKwhWithVat(avgEurMwh);
    const priceNoTax = eurMwhToCentKwh(avgEurMwh);

    hourlyPrices.push({
      hour,
      price: Math.round(priceWithVat * 100) / 100,
      priceNoTax: Math.round(priceNoTax * 100) / 100,
      timestamp: data.timestamp,
      rank: 0, // will be computed below
    });
  }

  // Sort by hour and compute ranks
  hourlyPrices.sort((a, b) => a.hour - b.hour);
  const sorted = [...hourlyPrices].sort((a, b) => a.price - b.price);
  sorted.forEach((p, i) => {
    const original = hourlyPrices.find((op) => op.hour === p.hour);
    if (original) original.rank = i + 1;
  });

  return hourlyPrices;
}

/**
 * Get today's prices. Falls back through the source chain.
 */
export async function getTodayPrices(): Promise<SourcedResult<HourlyPrice[]>> {
  // Try spot-hinta.fi first
  try {
    const prices = await fetchTodaySpotPrices();
    if (prices.length > 0 && prices.some((p) => p.price > 0)) {
      return { data: prices, source: 'spot-hinta' };
    }
  } catch (error) {
    console.warn('[price-service] spot-hinta.fi failed for today:', error);
  }

  // Try ENTSO-E
  try {
    const today = new Date().toISOString().split('T')[0];
    const entsoePrices = await fetchFinlandDayAheadPrices(today);
    if (entsoePrices.length > 0) {
      return { data: entsoeToHourlyPrices(entsoePrices), source: 'entsoe' };
    }
  } catch (error) {
    console.warn('[price-service] ENTSO-E failed for today:', error);
  }

  // Fall back to sample data
  return { data: generateSamplePrices(), source: 'sample' };
}

/**
 * Get tomorrow's prices. Falls back through the source chain.
 * Returns null if prices aren't available yet (normal before ~14:00 CET).
 */
export async function getTomorrowPrices(): Promise<SourcedResult<HourlyPrice[] | null>> {
  // Try spot-hinta.fi first
  try {
    const prices = await fetchTomorrowSpotPrices();
    if (prices && prices.length > 0) {
      return { data: prices, source: 'spot-hinta' };
    }
  } catch (error) {
    console.warn('[price-service] spot-hinta.fi failed for tomorrow:', error);
  }

  // Try ENTSO-E
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    const entsoePrices = await fetchFinlandDayAheadPrices(tomorrowStr);
    if (entsoePrices.length > 0) {
      return { data: entsoeToHourlyPrices(entsoePrices), source: 'entsoe' };
    }
  } catch (error) {
    console.warn('[price-service] ENTSO-E failed for tomorrow:', error);
  }

  // Tomorrow's prices not yet available — this is normal
  return { data: null, source: 'spot-hinta' };
}

/**
 * Get the current spot price. Falls back through the source chain.
 */
export async function getCurrentPrice(): Promise<SourcedResult<HourlyPrice | null>> {
  // Try spot-hinta.fi first
  try {
    const price = await fetchCurrentSpotPrice();
    if (price) {
      return { data: price, source: 'spot-hinta' };
    }
  } catch (error) {
    console.warn('[price-service] spot-hinta.fi failed for current price:', error);
  }

  // Try to derive from today's ENTSO-E data
  try {
    const today = new Date().toISOString().split('T')[0];
    const entsoePrices = await fetchFinlandDayAheadPrices(today);
    if (entsoePrices.length > 0) {
      const hourlyPrices = entsoeToHourlyPrices(entsoePrices);
      const currentHour = getFinnishHour();
      const currentEntry = hourlyPrices.find((p) => p.hour === currentHour);
      if (currentEntry) {
        return { data: currentEntry, source: 'entsoe' };
      }
    }
  } catch (error) {
    console.warn('[price-service] ENTSO-E failed for current price:', error);
  }

  return { data: null, source: 'sample' };
}

/**
 * Get price history for the given number of days.
 * For longer periods (>30 days), uses sample data to avoid API overload.
 */
export async function getPriceHistory(
  days: number
): Promise<SourcedResult<{ date: string; avgPrice: number; minPrice: number; maxPrice: number }[]>> {
  // For long periods, use sample data directly
  if (days > 30) {
    return { data: generateSampleHistory(days), source: 'sample' };
  }

  // Try spot-hinta.fi first
  try {
    const history = await fetchSpotHintaHistory(days);
    if (history.length > 0) {
      return { data: history, source: 'spot-hinta' };
    }
  } catch (error) {
    console.warn(`[price-service] spot-hinta.fi failed for ${days}d history:`, error);
  }

  // Try ENTSO-E
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const entsoePrices = await fetchEntsoeHistoryRange(
      startDate.toISOString().split('T')[0],
      endDate.toISOString().split('T')[0]
    );

    if (entsoePrices.length > 0) {
      // Group by date and compute daily summaries
      const dailyMap = new Map<string, number[]>();
      for (const ep of entsoePrices) {
        const dateStr = new Date(ep.timestamp).toISOString().split('T')[0];
        if (!dailyMap.has(dateStr)) dailyMap.set(dateStr, []);
        dailyMap.get(dateStr)!.push(eurMwhToCentKwhWithVat(ep.price));
      }

      const history = Array.from(dailyMap.entries())
        .map(([date, prices]) => ({
          date,
          avgPrice: Math.round((prices.reduce((a, b) => a + b, 0) / prices.length) * 100) / 100,
          minPrice: Math.round(Math.min(...prices) * 100) / 100,
          maxPrice: Math.round(Math.max(...prices) * 100) / 100,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return { data: history, source: 'entsoe' };
    }
  } catch (error) {
    console.warn(`[price-service] ENTSO-E failed for ${days}d history:`, error);
  }

  // Fall back to sample data
  return { data: generateSampleHistory(days), source: 'sample' };
}
