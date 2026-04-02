// ENTSO-E Transparency Platform API client
// Docs: https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html

const ENTSOE_API_BASE = 'https://web-api.tp.entsoe.eu/api';

// Finland bidding zone
const FINLAND_DOMAIN = '10YFI-1--------U';

// VAT rate for electricity in Finland (25.5%)
const VAT_MULTIPLIER = 1.255;

// Timeout for API requests (10 seconds)
const REQUEST_TIMEOUT_MS = 10000;

export interface EntsoePrice {
  timestamp: string;
  price: number; // EUR/MWh
  resolution: 'PT60M' | 'PT15M';
}

interface ParsedTimeSeries {
  start: string;
  end: string;
  resolution: string;
  points: { position: number; price: number }[];
}

/**
 * Fetch day-ahead prices from ENTSO-E for Finland
 * @param startDate - YYYYMMDD0000
 * @param endDate - YYYYMMDD0000
 */
export async function fetchEntsoeDayAheadPrices(
  startDate: string,
  endDate: string
): Promise<EntsoePrice[]> {
  const apiKey = process.env.ENTSOE_API_KEY;

  if (!apiKey) {
    throw new Error('ENTSOE_API_KEY environment variable is not set');
  }

  const params = new URLSearchParams({
    securityToken: apiKey,
    documentType: 'A44', // Day-ahead prices
    in_Domain: FINLAND_DOMAIN,
    out_Domain: FINLAND_DOMAIN,
    periodStart: startDate,
    periodEnd: endDate,
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${ENTSOE_API_BASE}?${params}`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    // Rate limit detection
    if (response.status === 429) {
      throw new Error('ENTSO-E API rate limit exceeded. Try again later.');
    }

    if (response.status === 401 || response.status === 403) {
      throw new Error('ENTSO-E API authentication failed. Check ENTSOE_API_KEY.');
    }

    if (!response.ok) {
      throw new Error(`ENTSO-E API error: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();

    // Check for ENTSO-E error responses embedded in XML
    if (xmlText.includes('<Reason>') && xmlText.includes('<text>')) {
      const reasonMatch = xmlText.match(/<text>(.*?)<\/text>/);
      throw new Error(`ENTSO-E API error: ${reasonMatch?.[1] || 'Unknown error'}`);
    }

    return parseEntsoePrices(xmlText);
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('ENTSO-E API request timed out after 10 seconds');
    }

    throw error;
  }
}

/**
 * Parse all TimeSeries elements from ENTSO-E XML response.
 * Handles multiple TimeSeries (e.g. different resolution periods)
 * and both PT60M (hourly) and PT15M (15-min) resolutions.
 */
function parseEntsoePrices(xml: string): EntsoePrice[] {
  const prices: EntsoePrice[] = [];

  try {
    const timeSeries = extractTimeSeries(xml);

    for (const series of timeSeries) {
      const resolution = series.resolution as 'PT60M' | 'PT15M';
      const baseTime = new Date(series.start);

      // Duration per point in milliseconds
      const stepMs = resolution === 'PT15M' ? 15 * 60 * 1000 : 60 * 60 * 1000;

      for (const point of series.points) {
        const timestamp = new Date(baseTime.getTime() + (point.position - 1) * stepMs);

        prices.push({
          timestamp: timestamp.toISOString(),
          price: point.price,
          resolution,
        });
      }
    }
  } catch (error) {
    console.error('Failed to parse ENTSO-E XML response:', error);
    throw new Error(`Failed to parse ENTSO-E XML: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Sort by timestamp and deduplicate
  prices.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return prices;
}

/**
 * Extract all TimeSeries from the XML document.
 * Each TimeSeries can contain one or more Period elements.
 */
function extractTimeSeries(xml: string): ParsedTimeSeries[] {
  const results: ParsedTimeSeries[] = [];

  // Split by TimeSeries blocks
  const tsRegex = /<TimeSeries>([\s\S]*?)<\/TimeSeries>/g;
  let tsMatch;

  while ((tsMatch = tsRegex.exec(xml)) !== null) {
    const tsContent = tsMatch[1];

    // Each TimeSeries can have multiple Period elements
    const periodRegex = /<Period>([\s\S]*?)<\/Period>/g;
    let periodMatch;

    while ((periodMatch = periodRegex.exec(tsContent)) !== null) {
      const periodContent = periodMatch[1];

      // Extract timeInterval
      const startMatch = periodContent.match(/<start>(.*?)<\/start>/);
      const endMatch = periodContent.match(/<end>(.*?)<\/end>/);

      if (!startMatch) continue;

      // Extract resolution
      const resolutionMatch = periodContent.match(/<resolution>(.*?)<\/resolution>/);
      const resolution = resolutionMatch?.[1] || 'PT60M';

      // Extract all points
      const points: { position: number; price: number }[] = [];
      const pointRegex = /<Point>\s*<position>(\d+)<\/position>\s*<price\.amount>([-\d.]+)<\/price\.amount>\s*<\/Point>/g;
      let pointMatch;

      while ((pointMatch = pointRegex.exec(periodContent)) !== null) {
        points.push({
          position: parseInt(pointMatch[1], 10),
          price: parseFloat(pointMatch[2]),
        });
      }

      if (points.length > 0) {
        results.push({
          start: startMatch[1],
          end: endMatch?.[1] || '',
          resolution,
          points,
        });
      }
    }
  }

  return results;
}

/**
 * Convert EUR/MWh to c/kWh (without VAT)
 */
export function eurMwhToCentKwh(eurPerMwh: number): number {
  return eurPerMwh / 10;
}

/**
 * Convert EUR/MWh to c/kWh including Finnish VAT (25.5%)
 */
export function eurMwhToCentKwhWithVat(eurPerMwh: number): number {
  return (eurPerMwh / 10) * VAT_MULTIPLIER;
}

/**
 * Fetch Finland day-ahead prices for a single date.
 * @param date - Date string in YYYY-MM-DD format
 * @returns Array of hourly prices for the given date
 */
export async function fetchFinlandDayAheadPrices(date: string): Promise<EntsoePrice[]> {
  // ENTSO-E expects YYYYMMDD0000 format
  const dateClean = date.replace(/-/g, '');
  const startDate = `${dateClean}0000`;

  // End date is next day
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  const endDateStr = nextDay.toISOString().split('T')[0].replace(/-/g, '');
  const endDate = `${endDateStr}0000`;

  return fetchEntsoeDayAheadPrices(startDate, endDate);
}

/**
 * Fetch price history for a date range (multiple days).
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 * @returns Array of prices for all days in the range
 */
export async function fetchEntsoeHistoryRange(
  startDate: string,
  endDate: string
): Promise<EntsoePrice[]> {
  const start = startDate.replace(/-/g, '') + '0000';

  // Add one day to endDate to include the full last day
  const endDateObj = new Date(endDate);
  endDateObj.setDate(endDateObj.getDate() + 1);
  const end = endDateObj.toISOString().split('T')[0].replace(/-/g, '') + '0000';

  return fetchEntsoeDayAheadPrices(start, end);
}
