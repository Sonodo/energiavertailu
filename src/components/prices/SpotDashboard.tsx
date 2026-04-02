'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import CurrentPriceHero from './CurrentPriceHero';
import HourlyPriceChart from './HourlyPriceChart';
import QuarterHourChart from './QuarterHourChart';
import TomorrowPrices from './TomorrowPrices';
import PriceStatsCards from './PriceStatsCards';
import BestHours from './BestHours';
import PriceHistoryChart from './PriceHistoryChart';
import ProductionMix from './ProductionMix';
import PriceForecast from './PriceForecast';
import PriceNotifications from './PriceNotifications';
import SpotDashboardSkeleton from './SpotDashboardSkeleton';
import UpdateTimestamp from '@/components/ui/UpdateTimestamp';
import { interpolateToQuarterHour } from '@/lib/api/spot-hinta';
import { cn } from '@/lib/utils';
import type { HourlyPrice, QuarterHourPrice, PriceStats, SpotPriceResponse } from '@/types';

type ResolutionMode = 'hourly' | 'quarter';

interface SpotDashboardProps {
  initialData: {
    today: HourlyPrice[];
    tomorrow: HourlyPrice[] | null;
    current: HourlyPrice | null;
    stats: PriceStats;
  } | null;
  isSampleData?: boolean;
}

export default function SpotDashboard({ initialData, isSampleData }: SpotDashboardProps) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [usingSample, setUsingSample] = useState(isSampleData ?? false);
  const [resolution, setResolution] = useState<ResolutionMode>('hourly');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/prices/spot?period=today');
      const result: SpotPriceResponse = await response.json();
      if (result.success && result.data) {
        setData(result.data);
        setUsingSample(false);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Failed to refresh spot prices:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh data every 5 minutes
  useEffect(() => {
    // If no initial data, fetch immediately
    if (!initialData) {
      fetchData();
    }

    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData, initialData]);

  // Generate 15-min data from hourly prices
  const quarterHourPrices: QuarterHourPrice[] = useMemo(() => {
    if (!data?.today || data.today.length === 0) return [];
    return interpolateToQuarterHour(data.today);
  }, [data?.today]);

  // Tomorrow notification data
  const tomorrowStats = useMemo(() => {
    if (!data?.tomorrow || data.tomorrow.length === 0) {
      return { available: false, avgPrice: undefined, minPrice: undefined, minHour: undefined };
    }
    const prices = data.tomorrow;
    const avgPrice = prices.reduce((s, p) => s + p.price, 0) / prices.length;
    const minEntry = prices.reduce((min, p) => (p.price < min.price ? p : min), prices[0]);
    return {
      available: true,
      avgPrice: Math.round(avgPrice * 100) / 100,
      minPrice: minEntry.price,
      minHour: minEntry.hour,
    };
  }, [data?.tomorrow]);

  if (loading || !data) {
    return <SpotDashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Sample data disclaimer */}
      {usingSample && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <strong>Huom:</strong> Näytetään esimerkkidataa. Reaaliaikaiset hinnat eivät ole juuri nyt
          saatavilla — tiedot päivitetään automaattisesti, kun yhteys palautuu.
        </div>
      )}

      {/* Last updated indicator */}
      <div className="flex justify-end">
        <UpdateTimestamp date={lastUpdated} label="Hinnat päivitetty" />
      </div>

      {/* 1. Current price hero */}
      <CurrentPriceHero stats={data.stats} todayPrices={data.today} />

      {/* Resolution toggle + 15-min feature banner */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Toggle tabs */}
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setResolution('hourly')}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium transition-colors',
              resolution === 'hourly'
                ? 'bg-[#0066FF] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            Tuntihinnat
          </button>
          <button
            onClick={() => setResolution('quarter')}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium transition-colors',
              resolution === 'quarter'
                ? 'bg-[#0066FF] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            15 min hinnat
          </button>
        </div>

        {/* Feature banner */}
        {resolution === 'quarter' && (
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0066FF]/20 bg-[#0066FF]/5 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0066FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0066FF]" />
            </span>
            <span className="text-xs font-semibold text-[#0066FF]">
              Uutta: 15 minuutin tarkkuudella!
            </span>
          </div>
        )}
      </div>

      {/* 2. Today's prices chart — conditionally hourly or 15-min */}
      {resolution === 'hourly' ? (
        <HourlyPriceChart
          prices={data.today}
          title="Tänään — tuntihinnat"
          highlightCurrentHour={true}
        />
      ) : (
        <QuarterHourChart
          prices={quarterHourPrices}
          title="Tänään — 15 min hinnat"
          highlightCurrentQuarter={true}
        />
      )}

      {/* 3. Best/worst hours */}
      <BestHours
        todayPrices={data.today}
        quarterHourPrices={quarterHourPrices}
        mode={resolution}
      />

      {/* 4. Tomorrow's prices */}
      <TomorrowPrices
        tomorrowPrices={data.tomorrow}
        todayPrices={data.today}
        todayAvgPrice={data.stats.avgPrice}
      />

      {/* 5. Price forecast */}
      <PriceForecast
        todayPrices={data.today}
        tomorrowPrices={data.tomorrow}
      />

      {/* 6. Notifications */}
      <PriceNotifications
        tomorrowPricesAvailable={tomorrowStats.available}
        tomorrowAvgPrice={tomorrowStats.avgPrice}
        tomorrowMinPrice={tomorrowStats.minPrice}
        tomorrowMinHour={tomorrowStats.minHour}
      />

      {/* 7. Price history */}
      <PriceHistoryChart />

      {/* 8. Production mix */}
      <ProductionMix />

      {/* 9. Stats cards */}
      <PriceStatsCards />
    </div>
  );
}
