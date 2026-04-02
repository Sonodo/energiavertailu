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
  let price: number;
  if (hour >= 0 && hour < 6) price = 2.5 + Math.random() * 2;
  else if (hour >= 6 && hour < 9) price = 5.0 + Math.random() * 3;
  else if (hour >= 9 && hour < 17) price = 4.0 + Math.random() * 3;
  else if (hour >= 17 && hour < 21) price = 6.0 + Math.random() * 4;
  else price = 3.0 + Math.random() * 2;

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
        // Fallback to simulated data
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
      dotColor: 'bg-emerald-400',
      textColor: 'text-emerald-400',
      label: 'Edullinen',
    },
    moderate: {
      dotColor: 'bg-amber-400',
      textColor: 'text-amber-400',
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
      className="group relative rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
    >
      {/* Label */}
      <div className="mb-1.5 flex items-center gap-1.5">
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
        <Zap className="h-4 w-4 text-[#0066FF]" />
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
