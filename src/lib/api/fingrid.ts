// Fingrid Open Data API client
// Docs: https://data.fingrid.fi/

import { getFinnishHour } from '@/lib/utils';

const FINGRID_API_BASE = 'https://data.fingrid.fi/api/datasets';

// Timeout for API requests (10 seconds)
const REQUEST_TIMEOUT_MS = 10000;

interface FingridDataPoint {
  startTime: string;
  endTime: string;
  value: number;
}

/**
 * Fetch data from Fingrid Open Data API
 * @param datasetId - Fingrid dataset ID
 * @param startTime - ISO 8601 start time
 * @param endTime - ISO 8601 end time
 */
export async function fetchFingridData(
  datasetId: number,
  startTime: string,
  endTime: string
): Promise<FingridDataPoint[]> {
  const apiKey = process.env.FINGRID_API_KEY;

  const params = new URLSearchParams({
    startTime,
    endTime,
    format: 'json',
    pageSize: '20000',
  });

  const url = `${FINGRID_API_BASE}/${datasetId}/data?${params}`;

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
      next: { revalidate: 300 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Fingrid API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Fingrid API request timed out after 10 seconds');
    }

    throw error;
  }
}

// Common Fingrid dataset IDs
export const FINGRID_DATASETS = {
  ELECTRICITY_PRODUCTION: 74,
  ELECTRICITY_CONSUMPTION: 124,
  WIND_POWER_PRODUCTION: 75,
  NUCLEAR_POWER_PRODUCTION: 188,
  HYDRO_POWER_PRODUCTION: 191,
  NET_IMPORTS: 194,
  FREQUENCY: 177,
} as const;

export interface ProductionMix {
  timestamp: string;
  nuclear: number;     // MW
  hydro: number;       // MW
  wind: number;        // MW
  solar: number;       // MW (estimated, Fingrid doesn't track directly)
  thermal: number;     // MW (coal, gas, biomass)
  imports: number;     // MW (can be negative = exports)
  totalProduction: number;
  totalConsumption: number;
}

/**
 * Fetch real production mix data from Fingrid API.
 * Queries latest data points for each source.
 */
export async function fetchProductionMix(): Promise<ProductionMix | null> {
  const apiKey = process.env.FINGRID_API_KEY;
  if (!apiKey) return null;

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const startTime = oneHourAgo.toISOString();
  const endTime = now.toISOString();

  try {
    const [production, consumption, wind, nuclear, hydro, imports] =
      await Promise.all([
        fetchFingridData(FINGRID_DATASETS.ELECTRICITY_PRODUCTION, startTime, endTime),
        fetchFingridData(FINGRID_DATASETS.ELECTRICITY_CONSUMPTION, startTime, endTime),
        fetchFingridData(FINGRID_DATASETS.WIND_POWER_PRODUCTION, startTime, endTime),
        fetchFingridData(FINGRID_DATASETS.NUCLEAR_POWER_PRODUCTION, startTime, endTime),
        fetchFingridData(FINGRID_DATASETS.HYDRO_POWER_PRODUCTION, startTime, endTime),
        fetchFingridData(FINGRID_DATASETS.NET_IMPORTS, startTime, endTime),
      ]);

    // Take the most recent value from each dataset
    const latest = (data: FingridDataPoint[]) =>
      data.length > 0 ? data[data.length - 1].value : 0;

    const totalProd = latest(production);
    const totalCons = latest(consumption);
    const windMW = latest(wind);
    const nuclearMW = latest(nuclear);
    const hydroMW = latest(hydro);
    const importsMW = latest(imports);

    // Estimate solar (Fingrid doesn't directly track solar)
    const hour = getFinnishHour(now);
    const month = now.getMonth();
    const isDaytime = hour >= 6 && hour <= 20;
    const summerFactor = Math.max(0, Math.sin(((month + 0.5) / 12) * Math.PI));
    const solarEstimate = isDaytime ? Math.round(summerFactor * 200 * Math.sin(((hour - 6) / 14) * Math.PI)) : 0;

    // Thermal = total production - known sources - solar estimate
    const thermalMW = Math.max(0, totalProd - nuclearMW - hydroMW - windMW - solarEstimate);

    return {
      timestamp: now.toISOString(),
      nuclear: nuclearMW,
      hydro: hydroMW,
      wind: windMW,
      solar: solarEstimate,
      thermal: thermalMW,
      imports: importsMW,
      totalProduction: totalProd,
      totalConsumption: totalCons,
    };
  } catch (error) {
    console.error('Failed to fetch Fingrid production mix:', error);
    return null;
  }
}

/**
 * Generate realistic sample production mix data for Finland.
 * Based on typical Finnish electricity system patterns.
 */
export function generateSampleProductionMix(): ProductionMix {
  const now = new Date();
  const hour = getFinnishHour(now);
  const month = now.getMonth();

  // Nuclear: OL1 (890MW), OL2 (890MW), OL3 (1600MW), Loviisa 1+2 (2x507MW)
  // Total capacity ~4394 MW, availability ~90%
  const nuclearBase = 3900;
  const nuclearVariation = Math.sin(now.getDate() * 0.5) * 200;
  const nuclear = Math.round(nuclearBase + nuclearVariation);

  // Wind: highly variable, 0-5000 MW
  // Higher in winter, lower in summer; varies by "day"
  const windSeasonFactor = 0.7 + 0.3 * Math.cos(((month - 1) / 12) * 2 * Math.PI);
  const windBase = 1200 * windSeasonFactor;
  const windVariation = Math.sin(now.getDate() * 3.7 + hour * 0.3) * 800;
  const windGust = Math.abs(Math.sin(now.getDate() * 7.3)) * 600;
  const wind = Math.round(Math.max(200, Math.min(3500, windBase + windVariation + windGust)));

  // Hydro: seasonal (spring flood = high, winter = moderate, summer = lower)
  const hydroSeason = [
    1800, 1600, 1500, 2200, 2800, 2500, // Jan-Jun
    2000, 1800, 1600, 1500, 1600, 1700, // Jul-Dec
  ];
  const hydroBase = hydroSeason[month];
  const hydroVariation = Math.sin(now.getDate() * 2.1 + hour * 0.1) * 300;
  const hydro = Math.round(Math.max(800, Math.min(3200, hydroBase + hydroVariation)));

  // Solar: daytime only, seasonal
  const isDaytime = hour >= 6 && hour <= 20;
  const summerFactor = Math.max(0, Math.sin(((month + 0.5) / 12) * Math.PI));
  const dayProgress = isDaytime ? Math.sin(((hour - 6) / 14) * Math.PI) : 0;
  const solar = Math.round(Math.max(0, summerFactor * 400 * dayProgress));

  // Thermal: fills the gap, higher in winter peak hours
  const isWinter = month <= 1 || month >= 10;
  const isPeakHour = (hour >= 7 && hour <= 10) || (hour >= 17 && hour <= 20);
  let thermalBase = 300;
  if (isWinter) thermalBase += 200;
  if (isPeakHour) thermalBase += 150;
  const thermalVariation = Math.sin(hour * 0.8) * 100;
  const thermal = Math.round(Math.max(100, thermalBase + thermalVariation));

  // Total domestic production
  const totalProduction = nuclear + hydro + wind + solar + thermal;

  // Consumption: follows daily pattern, seasonal
  const consumptionPattern = [
    7800, 7500, 7300, 7200, 7300, 7600,  // 00-05
    8500, 9500, 10200, 10000, 9800, 9500, // 06-11
    9200, 9000, 8800, 9000, 9500, 10500,  // 12-17
    10800, 10200, 9500, 8800, 8300, 8000, // 18-23
  ];
  const baseConsumption = consumptionPattern[hour];
  const winterBoost = isWinter ? 1500 : 0;
  const consumptionNoise = Math.sin(now.getDate() * 1.3) * 400;
  const totalConsumption = Math.round(baseConsumption + winterBoost + consumptionNoise);

  // Imports fill the gap (positive = importing, negative = exporting)
  const imports = totalConsumption - totalProduction;

  return {
    timestamp: now.toISOString(),
    nuclear,
    hydro,
    wind,
    solar,
    thermal,
    imports: Math.round(imports),
    totalProduction,
    totalConsumption,
  };
}
