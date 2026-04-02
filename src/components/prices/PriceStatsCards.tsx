'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Calendar, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCard {
  label: string;
  value: string;
  unit: string;
  change?: number; // percentage change vs previous period
  icon: React.ReactNode;
}

function formatPriceFi(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

export default function PriceStatsCards() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch week and month data
        const [weekRes, monthRes] = await Promise.all([
          fetch('/api/prices/spot?period=week'),
          fetch('/api/prices/spot?period=month'),
        ]);

        const weekData = await weekRes.json();
        const monthData = await monthRes.json();

        const cards: StatCard[] = [];

        if (weekData.success && weekData.data?.history?.length > 0) {
          const weekHistory = weekData.data.history;
          const weekAvg =
            weekHistory.reduce((s: number, d: { avgPrice: number }) => s + d.avgPrice, 0) /
            weekHistory.length;

          cards.push({
            label: 'Tämän viikon keskihinta',
            value: formatPriceFi(weekAvg),
            unit: 'c/kWh',
            icon: <Calendar className="h-5 w-5 text-[#0066FF]" />,
          });
        }

        if (monthData.success && monthData.data?.history?.length > 0) {
          const monthHistory = monthData.data.history;
          const monthAvg =
            monthHistory.reduce((s: number, d: { avgPrice: number }) => s + d.avgPrice, 0) /
            monthHistory.length;

          // Split into two halves for comparison
          const half = Math.floor(monthHistory.length / 2);
          const firstHalf = monthHistory.slice(0, half);
          const secondHalf = monthHistory.slice(half);
          const firstAvg =
            firstHalf.length > 0
              ? firstHalf.reduce((s: number, d: { avgPrice: number }) => s + d.avgPrice, 0) / firstHalf.length
              : monthAvg;
          const secondAvg =
            secondHalf.length > 0
              ? secondHalf.reduce((s: number, d: { avgPrice: number }) => s + d.avgPrice, 0) / secondHalf.length
              : monthAvg;
          const change = firstAvg > 0 ? ((secondAvg - firstAvg) / firstAvg) * 100 : 0;

          cards.push({
            label: 'Tämän kuukauden keskihinta',
            value: formatPriceFi(monthAvg),
            unit: 'c/kWh',
            change: Math.round(change),
            icon: <BarChart3 className="h-5 w-5 text-[#0066FF]" />,
          });

          // Min and max for the month
          const monthMin = Math.min(...monthHistory.map((d: { minPrice: number }) => d.minPrice));
          const monthMax = Math.max(...monthHistory.map((d: { maxPrice: number }) => d.maxPrice));

          cards.push({
            label: 'Kuukauden halvin tunti',
            value: formatPriceFi(monthMin),
            unit: 'c/kWh',
            icon: <TrendingDown className="h-5 w-5 text-emerald-500" />,
          });

          cards.push({
            label: 'Kuukauden kallein tunti',
            value: formatPriceFi(monthMax),
            unit: 'c/kWh',
            icon: <TrendingUp className="h-5 w-5 text-red-500" />,
          });
        }

        setStats(cards);
      } catch (error) {
        console.error('Failed to fetch price stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 animate-shimmer rounded bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]" />
              <div className="h-5 w-5 animate-shimmer rounded bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]" />
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <div className="h-7 w-14 animate-shimmer rounded bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]" />
              <div className="h-4 w-10 animate-shimmer rounded bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stats.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">{stat.label}</span>
            {stat.icon}
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
            <span className="text-sm text-slate-500">{stat.unit}</span>
          </div>
          {stat.change !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              {stat.change > 0 ? (
                <TrendingUp className="h-3.5 w-3.5 text-red-500" />
              ) : stat.change < 0 ? (
                <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Minus className="h-3.5 w-3.5 text-slate-400" />
              )}
              <span
                className={cn(
                  'text-xs font-medium',
                  stat.change > 0 ? 'text-red-600' : stat.change < 0 ? 'text-emerald-600' : 'text-slate-500'
                )}
              >
                {stat.change > 0 ? '+' : ''}
                {stat.change} % vs. edellinen kausi
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
