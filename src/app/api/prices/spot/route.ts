import { NextRequest, NextResponse } from 'next/server';
import {
  getTodayPrices,
  getTomorrowPrices,
  getCurrentPrice,
  getPriceHistory,
} from '@/lib/api/price-service';
import { computeStats } from '@/lib/price-utils';

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'today';

    // Handle history requests
    if (period === 'week' || period === 'month' || period === 'year') {
      const days = period === 'week' ? 7 : period === 'month' ? 30 : 365;

      const { data: history, source } = await getPriceHistory(days);

      return NextResponse.json({
        success: true,
        data: { history },
        source,
        updatedAt: new Date().toISOString(),
      });
    }

    // Fetch today, tomorrow, and current prices in parallel using price service
    const [todayResult, tomorrowResult, currentResult] = await Promise.all([
      getTodayPrices(),
      period === 'tomorrow' || period === 'today' ? getTomorrowPrices() : Promise.resolve({ data: null, source: 'spot-hinta' as const }),
      getCurrentPrice(),
    ]);

    const stats = computeStats(todayResult.data, currentResult.data);

    return NextResponse.json({
      success: true,
      data: {
        today: todayResult.data,
        tomorrow: tomorrowResult.data,
        current: currentResult.data,
        stats,
      },
      source: todayResult.source,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to fetch spot prices:', error);

    // Missing key / auth failure → 503 (uncached) so the widget recovers
    // automatically once keys are fixed instead of being stuck on a cached
    // error response for the revalidate window.
    const msg = error instanceof Error ? error.message.toLowerCase() : '';
    const isAuthOrKey =
      msg.includes('api_key') ||
      msg.includes('api key') ||
      msg.includes('entsoe_api_key') ||
      msg.includes('fingrid_api_key') ||
      msg.includes('authentication failed') ||
      msg.includes('unauthorized') ||
      msg.includes('401') ||
      msg.includes('403');

    return NextResponse.json(
      {
        success: false,
        error: 'Pörssisähkön hintojen haku epäonnistui. Yritä hetken kuluttua uudelleen.',
      },
      { status: isAuthOrKey ? 503 : 500 }
    );
  }
}
