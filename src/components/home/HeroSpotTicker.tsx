'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TickerData {
  price: number;
  direction: 'up' | 'down' | 'stable';
  level: 'cheap' | 'moderate' | 'expensive';
}

function getSimulatedData(): TickerData {
  const hour = new Date().getHours();
  const typicalPrices: Record<number, number> = {
    0: 3.2, 1: 2.8, 2: 2.5, 3: 2.3, 4: 2.4, 5: 2.9,
    6: 5.1, 7: 6.5, 8: 7.2, 9: 5.8, 10: 5.2, 11: 4.9,
    12: 4.6, 13: 4.4, 14: 4.5, 15: 4.8, 16: 5.5, 17: 7.0,
    18: 8.2, 19: 7.5, 20: 6.1, 21: 4.8, 22: 3.9, 23: 3.5,
  };
  const price = typicalPrices[hour] ?? 5.0;
  const level: TickerData['level'] = price < 4 ? 'cheap' : price < 8 ? 'moderate' : 'expensive';
  const direction: TickerData['direction'] = hour >= 6 && hour < 10 ? 'up' : hour >= 20 ? 'down' : 'stable';
  return { price, direction, level };
}

export default function HeroSpotTicker() {
  const [data, setData] = useState<TickerData | null>(null);
  const [source, setSource] = useState<'api' | 'simulated'>('simulated');

  useEffect(() => {
    let cancelled = false;

    async function fetchPrice() {
      try {
        const res = await fetch('/api/prices/spot?period=today');
        if (!res.ok) throw new Error('fetch failed');
        const json = await res.json();
        if (!json.success || !json.data?.stats) throw new Error('bad data');

        const stats = json.data.stats;
        const price = stats.currentPrice;
        const level: TickerData['level'] = price < 4 ? 'cheap' : price < 8 ? 'moderate' : 'expensive';

        if (!cancelled) {
          setData({ price, direction: stats.direction, level });
          setSource('api');
        }
      } catch {
        if (!cancelled) {
          setData(getSimulatedData());
          setSource('simulated');
        }
      }
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!data) {
    return (
      <div className="h-[72px] w-44 animate-pulse rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" />
    );
  }

  const levelConfig = {
    cheap: {
      dotColor: 'bg-accent-400',
      textColor: 'text-accent-400',
      label: 'Edullinen',
    },
    moderate: {
      dotColor: 'bg-secondary-400',
      textColor: 'text-secondary-400',
      label: 'Normaali',
    },
    expensive: {
      dotColor: 'bg-red-400',
      textColor: 'text-red-400',
      label: 'Kallis',
    },
  };

  const config = levelConfig[data.level];

  const DirectionIcon =
    data.direction === 'up' ? TrendingUp : data.direction === 'down' ? TrendingDown : Minus;

  return (
    <Link
      href="/porssisahko"
      className="group relative rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-white/10"
    >
      {/* Label */}
      <div className="mb-2 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75', config.dotColor)} />
          <span className={cn('relative inline-flex h-2 w-2 rounded-full', config.dotColor)} />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
          Pörssisähkö nyt
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-accent-400" />
        <span className={cn('text-xl font-bold tabular-nums', config.textColor)}>
          {data.price.toFixed(2).replace('.', ',')}
        </span>
        <span className="text-xs text-white/50">c/kWh</span>
        <DirectionIcon className={cn('h-3.5 w-3.5', config.textColor)} />
      </div>

      {source !== 'api' && (
        <div className="mt-1 text-[9px] text-white/30 italic">
          Arvioitu hinta
        </div>
      )}
    </Link>
  );
}
