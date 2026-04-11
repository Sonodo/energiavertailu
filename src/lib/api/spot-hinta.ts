// spot-hinta.fi API client
// Free Finnish electricity spot price data

import { SpotPriceRaw, HourlyPrice, QuarterHourPrice } from '@/types';
import { getFinnishHour } from '@/lib/utils';

const SPOT_HINTA_BASE = 'https://api.spot-hinta.fi';

/**
 * Transform raw API data to our internal format.
 * Uses Finnish timezone for hour extraction since spot-hinta.fi
 * timestamps represent Finnish local time.
 *
 * spot-hinta.fi returns prices in c/kWh. If the API format ever
 * changes to EUR/kWh (values typically 0.01–0.50), we detect and
 * convert automatically.
 */
function transformPrice(entry: SpotPriceRaw): HourlyPrice {
  const date = new Date(entry.DateTime);

  let price = entry.PriceWithTax;
  let priceNoTax = entry.PriceNoTax;

  // Sanity check: if both values look like EUR/kWh instead of c/kWh,
  // convert (EUR/kWh * 100 = c/kWh). Finnish c/kWh prices are
  // typically 1–30, while EUR/kWh would be 0.01–0.30.
  if (price >= 0 && price < 0.5 && priceNoTax >= 0 && priceNoTax < 0.5 && price > 0) {
    price = Math.round(price * 100 * 100) / 100;
    priceNoTax = Math.round(priceNoTax * 100 * 100) / 100;
  }

  return {
    hour: getFinnishHour(date),
    price,
    priceNoTax,
    timestamp: entry.DateTime,
    rank: entry.Rank,
  };
}

/**
 * Generate realistic sample data for fallback when API is unreachable
 */
export function generateSamplePrices(dateStr?: string): HourlyPrice[] {
  const baseDate = dateStr ? new Date(dateStr) : new Date();
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const day = baseDate.getDate();

  // Realistic Finnish electricity price pattern (c/kWh with VAT)
  const hourlyPattern = [
    2.1, 1.8, 1.5, 1.3, 1.2, 1.4, // 00-05: night low
    2.8, 5.2, 7.8, 6.5, 5.3, 4.8, // 06-11: morning ramp
    4.2, 3.9, 3.6, 3.8, 4.5, 6.2, // 12-17: midday
    8.5, 7.2, 5.8, 4.2, 3.1, 2.5, // 18-23: evening peak then decline
  ];

  const prices = hourlyPattern.map((basePrice, hour) => {
    // Add slight randomness
    const noise = (Math.sin(day * 13 + hour * 7) * 0.5);
    const price = Math.max(0.1, basePrice + noise);
    const priceNoTax = price / 1.255;

    const timestamp = new Date(year, month, day, hour, 0, 0);
    // Determine Finnish timezone offset dynamically (handles EET/EEST)
    const finnishFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Helsinki',
      timeZoneName: 'shortOffset',
    });
    const parts = finnishFormatter.formatToParts(timestamp);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    const offsetStr = tzPart?.value?.replace('GMT', '') || '+03:00';
    const offset = offsetStr.includes(':') ? offsetStr : `${offsetStr}:00`;
    const isoStr = timestamp.toISOString().replace('Z', '').slice(0, 19) + offset;

    return {
      hour,
      price: Math.round(price * 100) / 100,
      priceNoTax: Math.round(priceNoTax * 100) / 100,
      timestamp: isoStr,
      rank: 0, // Will be computed below
    };
  });

  // Compute ranks
  const sorted = [...prices].sort((a, b) => a.price - b.price);
  sorted.forEach((p, i) => {
    const original = prices.find((op) => op.hour === p.hour);
    if (original) original.rank = i + 1;
  });

  return prices;
}

/**
 * Fetch today's spot prices from spot-hinta.fi
 */
export async function fetchTodaySpotPrices(): Promise<HourlyPrice[]> {
  try {
    const response = await fetch(`${SPOT_HINTA_BASE}/Today`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`spot-hinta.fi API error: ${response.status}`);
    }

    const data: SpotPriceRaw[] = await response.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Empty response from spot-hinta.fi');
    }

    return data.map(transformPrice).sort((a, b) => a.hour - b.hour);
  } catch {
    return generateSamplePrices();
  }
}

/**
 * Fetch tomorrow's spot prices (available after ~14:00 CET)
 */
export async function fetchTomorrowSpotPrices(): Promise<HourlyPrice[] | null> {
  try {
    const response = await fetch(`${SPOT_HINTA_BASE}/Tomorrow`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      // 204 or 404 means prices not yet available
      if (response.status === 204 || response.status === 404) {
        return null;
      }
      throw new Error(`spot-hinta.fi API error: ${response.status}`);
    }

    const text = await response.text();
    if (!text || text.trim() === '' || text.trim() === '[]') {
      return null;
    }

    const data: SpotPriceRaw[] = JSON.parse(text);
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data.map(transformPrice).sort((a, b) => a.hour - b.hour);
  } catch {
    // Tomorrow's prices not available is normal before ~14:00
    return null;
  }
}

/**
 * Fetch current spot price
 */
export async function fetchCurrentSpotPrice(): Promise<HourlyPrice | null> {
  try {
    const response = await fetch(`${SPOT_HINTA_BASE}/JustNow`, {
      next: { revalidate: 180 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!data) return null;

    const entry: SpotPriceRaw = Array.isArray(data) ? data[0] : data;
    if (!entry || !entry.DateTime) return null;

    // transformPrice already includes EUR/kWh → c/kWh sanity check
    return transformPrice(entry);
  } catch {
    return null;
  }
}

/**
 * Fetch prices for a specific date
 */
export async function fetchDatePrices(date: string): Promise<HourlyPrice[]> {
  try {
    const response = await fetch(`${SPOT_HINTA_BASE}/DayForward?day=${date}`, {
      next: { revalidate: 3600 }, // Cache historical for 1 hour
    });

    if (!response.ok) {
      throw new Error(`spot-hinta.fi API error: ${response.status}`);
    }

    const data: SpotPriceRaw[] = await response.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map(transformPrice).sort((a, b) => a.hour - b.hour);
  } catch {
    return generateSamplePrices(date);
  }
}

/**
 * Fetch prices for a date range (for history charts).
 * Only fetches today and yesterday from the API (DayForward is unreliable
 * for older dates). Returns whatever we can get — the caller should fall
 * back to generated sample data for the remaining days.
 */
export async function fetchPriceHistory(
  days: number
): Promise<{ date: string; avgPrice: number; minPrice: number; maxPrice: number }[]> {
  const results: { date: string; avgPrice: number; minPrice: number; maxPrice: number }[] = [];
  const now = new Date();

  // Only fetch today and yesterday — DayForward endpoint doesn't reliably
  // serve older historical dates and may return today's data for all dates.
  const fetchDays = Math.min(days, 2);
  const promises: Promise<void>[] = [];

  for (let i = 0; i < fetchDays; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    promises.push(
      fetchDatePrices(dateStr).then((prices) => {
        if (prices.length > 0) {
          const priceValues = prices.map((p) => p.price);
          results.push({
            date: dateStr,
            avgPrice: Math.round((priceValues.reduce((a, b) => a + b, 0) / priceValues.length) * 100) / 100,
            minPrice: Math.round(Math.min(...priceValues) * 100) / 100,
            maxPrice: Math.round(Math.max(...priceValues) * 100) / 100,
          });
        }
      })
    );
  }

  await Promise.all(promises);
  return results.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Generate 15-minute resolution prices by interpolating hourly data
 * with realistic intra-hour variation. Since the Finnish market moved to
 * 15-min settlement in October 2025, this provides granular pricing.
 */
export function interpolateToQuarterHour(hourlyPrices: HourlyPrice[]): QuarterHourPrice[] {
  const quarterPrices: QuarterHourPrice[] = [];

  for (let i = 0; i < hourlyPrices.length; i++) {
    const current = hourlyPrices[i];
    const next = hourlyPrices[(i + 1) % hourlyPrices.length];

    // Create 4 quarter-hour slots per hour with realistic variation
    for (let q = 0; q < 4; q++) {
      // Interpolation factor: blend toward next hour
      const t = q / 4;
      const basePrice = current.price * (1 - t * 0.3) + next.price * (t * 0.3);

      // Add small intra-hour noise (±5% max)
      const noise = Math.sin(current.hour * 17 + q * 7.3) * 0.05 * current.price;
      // Floor at -1 c/kWh (negative prices can occur, but not extremely negative)
      const price = Math.max(-1, Math.round((basePrice + noise) * 100) / 100);
      const priceNoTax = Math.round((price / 1.255) * 100) / 100;

      const ts = new Date(current.timestamp);
      ts.setMinutes(q * 15, 0, 0);

      quarterPrices.push({
        hour: current.hour,
        quarter: q,
        price,
        priceNoTax,
        timestamp: ts.toISOString(),
        rank: 0, // computed below
      });
    }
  }

  // Compute ranks (1-96)
  const sorted = [...quarterPrices].sort((a, b) => a.price - b.price);
  sorted.forEach((p, i) => {
    const original = quarterPrices.find(
      (op) => op.hour === p.hour && op.quarter === p.quarter
    );
    if (original) original.rank = i + 1;
  });

  return quarterPrices;
}

/**
 * Generate sample 15-minute prices directly (for fallback)
 */
export function generateSample15MinPrices(dateStr?: string): QuarterHourPrice[] {
  const hourlyPrices = generateSamplePrices(dateStr);
  return interpolateToQuarterHour(hourlyPrices);
}

/**
 * Fetch today's 15-minute spot prices.
 * Tries to get native 15-min data from the API; if not available,
 * interpolates from hourly prices.
 */
export async function fetchTodayQuarterHourPrices(): Promise<QuarterHourPrice[]> {
  try {
    // spot-hinta.fi may expose 15-min data at /Today15Min or via query param
    const response = await fetch(`${SPOT_HINTA_BASE}/Today`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`spot-hinta.fi API error: ${response.status}`);
    }

    const data: SpotPriceRaw[] = await response.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Empty response from spot-hinta.fi');
    }

    const hourlyPrices = data.map(transformPrice).sort((a, b) => a.hour - b.hour);

    // If API returned 96 entries (native 15-min), transform them directly
    if (data.length >= 90) {
      return data.map((entry, idx) => {
        const date = new Date(entry.DateTime);
        return {
          hour: getFinnishHour(date),
          quarter: Math.floor(date.getMinutes() / 15),
          price: entry.PriceWithTax,
          priceNoTax: entry.PriceNoTax,
          timestamp: entry.DateTime,
          rank: idx + 1, // re-ranked below
        };
      }).sort((a, b) => a.hour * 4 + a.quarter - (b.hour * 4 + b.quarter));
    }

    // Otherwise interpolate from hourly data
    return interpolateToQuarterHour(hourlyPrices);
  } catch {
    return generateSample15MinPrices();
  }
}

/**
 * Fetch tomorrow's 15-minute spot prices
 */
export async function fetchTomorrowQuarterHourPrices(): Promise<QuarterHourPrice[] | null> {
  const tomorrowHourly = await fetchTomorrowSpotPrices();
  if (!tomorrowHourly || tomorrowHourly.length === 0) return null;
  return interpolateToQuarterHour(tomorrowHourly);
}

/**
 * Generate sample history data for fallback.
 * Uses day-of-year based variation so each day has a distinct price.
 */
export function generateSampleHistory(
  days: number
): { date: string; avgPrice: number; minPrice: number; maxPrice: number }[] {
  const results: { date: string; avgPrice: number; minPrice: number; maxPrice: number }[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const month = date.getMonth();
    const dayOfYear = Math.floor(
      (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000)
    );
    const dayOfWeek = date.getDay();
    const seasonalBase = month >= 10 || month <= 2 ? 8 : month >= 5 && month <= 8 ? 3 : 5;

    // Multi-frequency deterministic variation based on day-of-year
    const noise =
      Math.sin(dayOfYear * 0.15) * 1.5 +
      Math.sin(dayOfYear * 0.4 + 2.1) * 0.8 +
      Math.cos(dayOfYear * 0.7 + 0.5) * 0.5;
    const weekendDiscount = (dayOfWeek === 0 || dayOfWeek === 6) ? -0.6 : 0;
    const avgPrice = Math.max(0.5, seasonalBase + noise + weekendDiscount);

    // Deterministic min/max spread based on day
    const spread = 1.5 + Math.abs(Math.sin(dayOfYear * 0.3)) * 2;
    results.push({
      date: dateStr,
      avgPrice: Math.round(avgPrice * 100) / 100,
      minPrice: Math.round(Math.max(0.1, avgPrice - spread) * 100) / 100,
      maxPrice: Math.round((avgPrice + spread + 1) * 100) / 100,
    });
  }

  return results;
}
