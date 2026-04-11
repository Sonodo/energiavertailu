'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingDown, TrendingUp, Minus, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpotPriceData {
  price: number;
  direction: 'up' | 'down' | 'stable';
  level: 'cheap' | 'moderate' | 'expensive';
}

function getSimulatedData(): SpotPriceData {
  const hour = new Date().getHours();
  const typicalPrices: Record<number, number> = {
    0: 3.2, 1: 2.8, 2: 2.5, 3: 2.3, 4: 2.4, 5: 2.9,
    6: 5.1, 7: 6.5, 8: 7.2, 9: 5.8, 10: 5.2, 11: 4.9,
    12: 4.6, 13: 4.4, 14: 4.5, 15: 4.8, 16: 5.5, 17: 7.0,
    18: 8.2, 19: 7.5, 20: 6.1, 21: 4.8, 22: 3.9, 23: 3.5,
  };
  const price = typicalPrices[hour] ?? 5.0;
  const level: SpotPriceData['level'] =
    price < 4 ? 'cheap' : price < 8 ? 'moderate' : 'expensive';
  const direction: SpotPriceData['direction'] =
    hour >= 6 && hour < 10 ? 'up' : hour >= 20 ? 'down' : 'stable';
  return { price, direction, level };
}

export default function SpotPriceBanner() {
  const [data, setData] = useState<SpotPriceData | null>(null);
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
        const level: SpotPriceData['level'] =
          price < 4 ? 'cheap' : price < 8 ? 'moderate' : 'expensive';

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
      <section className="border-b border-slate-200 bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
          <div className="h-6 w-64 animate-pulse rounded bg-slate-200" />
        </div>
      </section>
    );
  }

  const levelConfig = {
    cheap: {
      bg: 'bg-accent-50',
      border: 'border-accent-200',
      dot: 'bg-accent',
      text: 'text-accent-700',
      label: 'Edullinen',
      ringColor: 'ring-accent-600/20',
    },
    moderate: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      dot: 'bg-secondary',
      text: 'text-amber-700',
      label: 'Normaali',
      ringColor: 'ring-amber-600/20',
    },
    expensive: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      dot: 'bg-red-500',
      text: 'text-red-700',
      label: 'Kallis',
      ringColor: 'ring-red-600/20',
    },
  };

  const config = levelConfig[data.level];

  const DirectionIcon =
    data.direction === 'up'
      ? TrendingUp
      : data.direction === 'down'
        ? TrendingDown
        : Minus;

  return (
    <section className={cn('border-b', config.border, config.bg)}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-slate-700">
            Sähkön hinta nyt:
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                config.dot
              )}
            />
            <span
              className={cn(
                'relative inline-flex h-2.5 w-2.5 rounded-full',
                config.dot
              )}
            />
          </span>
          <span className="text-lg font-bold text-slate-900">
            {data.price.toFixed(2).replace('.', ',')} c/kWh
          </span>
          <DirectionIcon
            className={cn('h-4 w-4', config.text)}
            aria-label={
              data.direction === 'up'
                ? 'Hinta nousee'
                : data.direction === 'down'
                  ? 'Hinta laskee'
                  : 'Hinta vakaa'
            }
          />
        </div>

        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
            config.bg,
            config.text,
            config.ringColor
          )}
        >
          {config.label}
        </span>

        {source !== 'api' && (
          <span className="text-[10px] text-slate-400 italic">
            (arvioitu)
          </span>
        )}

        <Link
          href="/porssisahko"
          className="text-xs font-medium text-accent-600 hover:text-accent-700 transition-colors"
        >
          Katso tarkemmin &rarr;
        </Link>
      </div>
    </section>
  );
}
