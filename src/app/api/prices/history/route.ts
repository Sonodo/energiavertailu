import { NextRequest, NextResponse } from 'next/server';
import {
  getHistoryForPeriod,
  getYearAgoComparison,
  type DailyPriceHistory,
  type MonthlyPriceHistory,
} from '@/data/price-history';
import { getPriceHistory } from '@/lib/api/price-service';

// Revalidate based on period — short periods more frequently
export const revalidate = 300;

type Period = '7d' | '30d' | '3m' | '6m' | '12m';

const VALID_PERIODS: Period[] = ['7d', '30d', '3m', '6m', '12m'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const periodParam = searchParams.get('period') || '30d';

    // Validate period
    const period = VALID_PERIODS.includes(periodParam as Period)
      ? (periodParam as Period)
      : '30d';

    // Get static history data
    const { daily: staticDaily, monthly } = getHistoryForPeriod(period);

    // For short periods (7d, 30d), try to get live data for recent days
    let daily: DailyPriceHistory[] = staticDaily;
    let dataSource: 'live' | 'sample' = 'sample';

    if (period === '7d' || period === '30d') {
      try {
        const days = period === '7d' ? 7 : 30;
        const { data: liveHistory, source } = await getPriceHistory(days);

        if (liveHistory.length > 0 && source !== 'sample') {
          // Merge live data into static data — replace matching dates
          const liveMap = new Map(
            liveHistory.map((entry) => [
              entry.date,
              {
                date: entry.date,
                avgPrice: entry.avgPrice,
                minPrice: entry.minPrice,
                maxPrice: entry.maxPrice,
                avgPriceNoTax: Math.round((entry.avgPrice / 1.255) * 100) / 100,
              },
            ])
          );

          daily = daily.map((d) => liveMap.get(d.date) || d);
          dataSource = 'live';
        }
      } catch (error) {
        console.warn('[history] Failed to fetch live data, using static:', error);
        // Keep using static data
      }
    }

    // Get year-ago comparison data
    const yearAgo = getYearAgoComparison(period);

    // Compute summary statistics for the current period
    const allAvg = daily.map((d) => d.avgPrice);
    const currentAvg =
      allAvg.length > 0
        ? Math.round((allAvg.reduce((a, b) => a + b, 0) / allAvg.length) * 100) / 100
        : 0;

    // Compute trend: compare first half average to second half average
    const midpoint = Math.floor(daily.length / 2);
    const firstHalf = daily.slice(0, midpoint);
    const secondHalf = daily.slice(midpoint);

    const firstHalfAvg =
      firstHalf.length > 0
        ? firstHalf.reduce((a, b) => a + b.avgPrice, 0) / firstHalf.length
        : 0;
    const secondHalfAvg =
      secondHalf.length > 0
        ? secondHalf.reduce((a, b) => a + b.avgPrice, 0) / secondHalf.length
        : 0;

    const trendPercent =
      firstHalfAvg > 0
        ? Math.round(((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100 * 10) / 10
        : 0;

    let trendDirection: 'up' | 'down' | 'stable' = 'stable';
    if (trendPercent > 3) trendDirection = 'up';
    else if (trendPercent < -3) trendDirection = 'down';

    // Year-over-year comparison
    const yoyChangePercent =
      yearAgo.avgPrice > 0
        ? Math.round(((currentAvg - yearAgo.avgPrice) / yearAgo.avgPrice) * 100 * 10) / 10
        : 0;

    const summary = {
      avgPrice: currentAvg,
      minPrice: daily.length > 0 ? Math.min(...daily.map((d) => d.minPrice)) : 0,
      maxPrice: daily.length > 0 ? Math.max(...daily.map((d) => d.maxPrice)) : 0,
      trend: trendDirection,
      trendPercent,
      yearAgoAvg: yearAgo.avgPrice,
      yoyChangePercent,
    };

    return NextResponse.json({
      success: true,
      data: {
        daily,
        monthly,
        summary,
        period,
        source: dataSource,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to fetch price history:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Hintahistorian haku epäonnistui.',
      },
      { status: 500 }
    );
  }
}
