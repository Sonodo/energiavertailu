import { NextRequest, NextResponse } from 'next/server';
import {
  getYearlyConsumptionByUserGroup,
  USER_GROUP_LABELS,
  type DatahubUserGroup,
} from '@/lib/api/datahub-service';
import { HOUSING_TO_DATAHUB_GROUP } from '@/lib/constants';
import type { HouseholdBenchmark } from '@/types';

// Daily ISR — Datahub publishes once a day with ~4-day lag.
// TODO: register at https://data.fingrid.fi/en — Chairman to provision FINGRID_API_KEY.
export const revalidate = 86400;

type HousingType = 'kerrostalo' | 'rivitalo' | 'omakotitalo';
type Heating = 'sahko' | 'other';

function resolveGroup(housingType: HousingType, heating: Heating): DatahubUserGroup {
  if (housingType === 'kerrostalo') return 'BE01';
  if (housingType === 'rivitalo') return 'BE03'; // no electric-heating split for rivitalo
  // omakotitalo
  return heating === 'sahko'
    ? HOUSING_TO_DATAHUB_GROUP['omakotitalo-sahko']
    : HOUSING_TO_DATAHUB_GROUP['omakotitalo'];
}

function isHousingType(v: string | null): v is HousingType {
  return v === 'kerrostalo' || v === 'rivitalo' || v === 'omakotitalo';
}

function degraded(reason: string): NextResponse {
  const payload: HouseholdBenchmark = {
    averageKwhPerYear: 0,
    sampleGroup: '',
    sampleSize: 0,
    dataAsOf: new Date().toISOString(),
    degraded: true,
  };
  return NextResponse.json({ success: false, data: payload, reason }, { status: 200 });
}

/**
 * 503 Service Unavailable — used when the underlying API call fails because
 * an env key is missing or auth fails. ISR will NOT cache 503 responses,
 * so the widget recovers automatically once keys are fixed (vs. degraded
 * 200 responses which get cached for the revalidate window).
 */
function unavailable(reason: string): NextResponse {
  return NextResponse.json(
    { success: false, error: 'Tietolähde tilapäisesti pois käytöstä.', reason },
    { status: 503 }
  );
}

function isAuthOrKeyError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message.toLowerCase();
  return (
    msg.includes('api_key') ||
    msg.includes('api key') ||
    msg.includes('fingrid_api_key') ||
    msg.includes('entsoe_api_key') ||
    msg.includes('missing') ||
    msg.includes('authentication failed') ||
    msg.includes('unauthorized') ||
    msg.includes('401') ||
    msg.includes('403')
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const housingType = searchParams.get('housingType');
  const heating = (searchParams.get('heating') ?? 'other') as Heating;

  if (!isHousingType(housingType)) {
    return degraded('invalid housingType');
  }

  const group = resolveGroup(housingType, heating === 'sahko' ? 'sahko' : 'other');

  try {
    const aggregate = await getYearlyConsumptionByUserGroup(group);
    const payload: HouseholdBenchmark = {
      averageKwhPerYear: aggregate.averageKwhPerHousehold,
      sampleGroup: USER_GROUP_LABELS[group],
      sampleSize: aggregate.averageAccountingPoints,
      dataAsOf: aggregate.latestDataPoint,
    };
    return NextResponse.json({ success: true, data: payload });
  } catch (error) {
    console.error('household-benchmark fetch failed:', error);
    // Missing key / auth failure → 503 (uncached). Other failures → 200 degraded
    // (cached for revalidate window) so transient blips don't slam upstream.
    if (isAuthOrKeyError(error)) {
      return unavailable(error instanceof Error ? error.message : 'unknown error');
    }
    return degraded(error instanceof Error ? error.message : 'unknown error');
  }
}
