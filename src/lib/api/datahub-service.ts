// Fingrid Datahub Dataset 360 — total electricity consumption (kWh) in Finnish
// distribution networks per user group. Each datapoint also exposes a "count"
// of accounting points contributing to that group, so per-household average is
// derivable without external population data.
//
// Docs: https://data.fingrid.fi/en/datasets/360
// Auth: x-api-key header (FINGRID_API_KEY).
// Throttle: 10k req/day, 10 req/min — cache aggressively.

const FINGRID_API_BASE = 'https://data.fingrid.fi/api/datasets';
const DATASET_HOUSEHOLD_CONSUMPTION = 360;
const REQUEST_TIMEOUT_MS = 15000;

// User group codes — see https://data.fingrid.fi/en/datasets/360
export type DatahubUserGroup =
  | 'BE01' // Apartment buildings (kerrostaloasunnot)
  | 'BE02' // Detached/semi-detached/terraced w/ electric heating (sähkölämmitys)
  | 'BE03' // Detached/semi-detached/terraced w/o electric heating
  | 'BE04' // Holiday homes (vapaa-ajan asunnot)
  | 'BE05'; // Residential communities (asuintaloyhteisöt)

export const USER_GROUP_LABELS: Record<DatahubUserGroup, string> = {
  BE01: 'kerrostaloasunnot',
  BE02: 'omakotitalot sähkölämmityksellä',
  BE03: 'omakotitalot ilman sähkölämmitystä',
  BE04: 'vapaa-ajan asunnot',
  BE05: 'asuintaloyhteisöt',
};

interface DatahubDataPoint {
  startTime: string;
  endTime: string;
  value: number; // kWh (total for the user group)
  count?: number; // number of accounting points
  userGroup?: string; // BE code
  // Some endpoint variants nest these under attributes — handle defensively.
  attributes?: { count?: number; userGroup?: string };
}

interface DatahubResponse {
  data?: DatahubDataPoint[];
  pagination?: { lastPage?: number; currentPage?: number; total?: number };
}

interface YearlyAggregate {
  totalKwh: number;
  averageAccountingPoints: number;
  latestDataPoint: string;
  averageKwhPerHousehold: number;
}

// Simple in-memory cache (per Node process) — keyed by user group.
// TTL 24h; the API route also uses ISR revalidate=86400 so this mostly helps
// with cold-start request bursts within the same process.
const cache = new Map<DatahubUserGroup, { ts: number; value: YearlyAggregate }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function getCached(group: DatahubUserGroup): YearlyAggregate | null {
  const hit = cache.get(group);
  if (!hit) return null;
  if (Date.now() - hit.ts > CACHE_TTL_MS) {
    cache.delete(group);
    return null;
  }
  return hit.value;
}

function setCached(group: DatahubUserGroup, value: YearlyAggregate): void {
  cache.set(group, { ts: Date.now(), value });
}

async function fetchDataset360Page(
  params: URLSearchParams,
  apiKey: string
): Promise<DatahubResponse> {
  const url = `${FINGRID_API_BASE}/${DATASET_HOUSEHOLD_CONSUMPTION}/data?${params}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json', 'x-api-key': apiKey },
      signal: controller.signal,
      next: { revalidate: 86400 },
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`Datahub API error: ${response.status} ${response.statusText}`);
    }
    return (await response.json()) as DatahubResponse;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Datahub API request timed out');
    }
    throw error;
  }
}

function pointGroup(p: DatahubDataPoint): string | undefined {
  return p.userGroup ?? p.attributes?.userGroup;
}

function pointCount(p: DatahubDataPoint): number | undefined {
  return p.count ?? p.attributes?.count;
}

/**
 * Sum the last ~12 months of hourly total consumption for a Datahub user
 * group, then divide by the average count of accounting points to get per-
 * household kWh/year. Fingrid data lags ~4 days actual / ~11 days estimated;
 * we end the window 11 days ago to avoid pulling estimated points.
 */
export async function getYearlyConsumptionByUserGroup(
  group: DatahubUserGroup
): Promise<YearlyAggregate> {
  const cached = getCached(group);
  if (cached) return cached;

  const apiKey = process.env.FINGRID_API_KEY;
  if (!apiKey) {
    throw new Error('FINGRID_API_KEY missing');
  }

  const endTime = new Date(Date.now() - 11 * 24 * 60 * 60 * 1000);
  const startTime = new Date(endTime.getTime() - 365 * 24 * 60 * 60 * 1000);

  // Datahub Dataset 360 returns one datapoint per (hour x user group). 365d *
  // 24h * 5 groups ~= 43.8k rows — over the 20k page cap, so paginate.
  let totalKwh = 0;
  let countSum = 0;
  let countObservations = 0;
  let latestDataPoint = '';
  let page = 1;
  const pageSize = 20000;

  // Hard safety cap — API returns lastPage; bail if it ever balloons.
  const maxPages = 6;

  while (page <= maxPages) {
    const params = new URLSearchParams({
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      format: 'json',
      pageSize: String(pageSize),
      page: String(page),
      // Some Datahub endpoints accept a userGroup filter; if not supported,
      // we just filter client-side below.
      userGroup: group,
    });

    const response = await fetchDataset360Page(params, apiKey);
    const points = response.data ?? [];

    for (const p of points) {
      // Defensive client-side filter in case server-side filter is ignored.
      const g = pointGroup(p);
      if (g && g !== group) continue;

      totalKwh += Number(p.value) || 0;

      const c = pointCount(p);
      if (typeof c === 'number' && c > 0) {
        countSum += c;
        countObservations += 1;
      }

      if (!latestDataPoint || p.endTime > latestDataPoint) {
        latestDataPoint = p.endTime;
      }
    }

    const lastPage = response.pagination?.lastPage ?? page;
    if (page >= lastPage || points.length < pageSize) break;
    page += 1;
  }

  if (totalKwh <= 0 || countObservations === 0) {
    throw new Error(`Datahub returned no usable data for group ${group}`);
  }

  const averageAccountingPoints = countSum / countObservations;
  const averageKwhPerHousehold = totalKwh / averageAccountingPoints;

  const aggregate: YearlyAggregate = {
    totalKwh,
    averageAccountingPoints: Math.round(averageAccountingPoints),
    latestDataPoint: latestDataPoint || endTime.toISOString(),
    averageKwhPerHousehold: Math.round(averageKwhPerHousehold),
  };

  setCached(group, aggregate);
  return aggregate;
}
