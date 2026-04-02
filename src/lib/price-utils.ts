// Shared price computation utilities

import { getFinnishHour } from '@/lib/utils';
import type { HourlyPrice, PriceStats } from '@/types';

/**
 * Compute price statistics from hourly prices.
 *
 * Uses Finnish timezone (Europe/Helsinki) for determining the current hour,
 * since spot-hinta.fi data uses Finnish local time and server environments
 * (e.g. Vercel) run in UTC.
 */
export function computeStats(
  todayPrices: HourlyPrice[],
  currentPrice: HourlyPrice | null
): PriceStats {
  if (todayPrices.length === 0) {
    return {
      currentPrice: 0,
      avgPrice: 0,
      minPrice: 0,
      maxPrice: 0,
      minHour: 0,
      maxHour: 0,
      direction: 'stable',
      previousHourPrice: null,
    };
  }

  const priceValues = todayPrices.map((p) => p.price);
  const avgPrice = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
  const minPrice = Math.min(...priceValues);
  const maxPrice = Math.max(...priceValues);
  const minEntry = todayPrices.find((p) => p.price === minPrice);
  const maxEntry = todayPrices.find((p) => p.price === maxPrice);

  const currentHour = getFinnishHour();
  const currentEntry =
    currentPrice || todayPrices.find((p) => p.hour === currentHour) || todayPrices[0];
  const previousEntry = todayPrices.find((p) => p.hour === currentHour - 1);

  let direction: 'up' | 'down' | 'stable' = 'stable';
  if (previousEntry) {
    const diff = currentEntry.price - previousEntry.price;
    if (diff > 0.3) direction = 'up';
    else if (diff < -0.3) direction = 'down';
  }

  return {
    currentPrice: Math.round(currentEntry.price * 100) / 100,
    avgPrice: Math.round(avgPrice * 100) / 100,
    minPrice: Math.round(minPrice * 100) / 100,
    maxPrice: Math.round(maxPrice * 100) / 100,
    minHour: minEntry?.hour ?? 0,
    maxHour: maxEntry?.hour ?? 0,
    direction,
    previousHourPrice: previousEntry ? Math.round(previousEntry.price * 100) / 100 : null,
  };
}
