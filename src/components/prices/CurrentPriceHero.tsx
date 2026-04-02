'use client';

import { TrendingUp, TrendingDown, Minus, Zap, Clock, ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import NotificationBell from './NotificationBell';
import type { HourlyPrice, PriceStats } from '@/types';

interface CurrentPriceHeroProps {
  stats: PriceStats;
  todayPrices: HourlyPrice[];
}

function getPriceLevel(price: number) {
  if (price < 5) return 'cheap';
  if (price < 10) return 'moderate';
  if (price < 15) return 'expensive';
  return 'very-expensive';
}

const levelConfig = {
  cheap: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    ring: 'ring-emerald-500/20',
    text: 'text-emerald-700',
    priceText: 'text-emerald-600',
    label: 'Edullinen',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  moderate: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    ring: 'ring-amber-500/20',
    text: 'text-amber-700',
    priceText: 'text-amber-600',
    label: 'Normaali',
    gradient: 'from-amber-500 to-amber-600',
  },
  expensive: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    ring: 'ring-orange-500/20',
    text: 'text-orange-700',
    priceText: 'text-orange-600',
    label: 'Kallis',
    gradient: 'from-orange-500 to-orange-600',
  },
  'very-expensive': {
    bg: 'bg-red-50',
    border: 'border-red-200',
    ring: 'ring-red-500/20',
    text: 'text-red-700',
    priceText: 'text-red-600',
    label: 'Erittäin kallis',
    gradient: 'from-red-500 to-red-600',
  },
};

function formatPriceFi(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

export default function CurrentPriceHero({ stats, todayPrices }: CurrentPriceHeroProps) {
  const level = getPriceLevel(stats.currentPrice);
  const config = levelConfig[level];

  const now = new Date();
  const currentHour = now.getHours();

  const DirectionIcon =
    stats.direction === 'up' ? TrendingUp : stats.direction === 'down' ? TrendingDown : Minus;

  const directionLabel =
    stats.direction === 'up'
      ? 'Hinta nousee'
      : stats.direction === 'down'
        ? 'Hinta laskee'
        : 'Hinta vakaa';

  // Find next hour price for trend
  const nextHourEntry = todayPrices.find((p) => p.hour === currentHour + 1);

  return (
    <section className="mb-8">
      <div className={cn('overflow-hidden rounded-2xl border shadow-sm', config.border, config.bg)}>
        {/* Main price display */}
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left">
            {/* Left: Current price */}
            <div className="flex-1">
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <Zap className="h-5 w-5 text-[#0066FF]" />
                <span className="text-sm font-medium uppercase tracking-wider text-slate-500">
                  Sähkön hinta nyt
                </span>
                <NotificationBell />
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                    config.bg,
                    config.text,
                    'ring-1 ring-inset',
                    config.ring
                  )}
                >
                  {config.label}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-center gap-2 lg:justify-start">
                <span className={cn('text-5xl font-bold tracking-tight sm:text-6xl', config.priceText)}>
                  {formatPriceFi(stats.currentPrice)}
                </span>
                <span className="text-xl text-slate-500">c/kWh</span>
              </div>

              <div className="mt-2 flex items-center justify-center gap-3 lg:justify-start">
                <div className="flex items-center gap-1">
                  <DirectionIcon className={cn('h-4 w-4', config.text)} />
                  <span className={cn('text-sm font-medium', config.text)}>{directionLabel}</span>
                </div>
                {stats.previousHourPrice !== null && (
                  <span className="text-sm text-slate-500">
                    (ed. tunti: {formatPriceFi(stats.previousHourPrice)} c/kWh)
                  </span>
                )}
              </div>

              {nextHourEntry && (
                <div className="mt-1 flex items-center justify-center gap-1 text-sm text-slate-500 lg:justify-start">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    Seuraava tunti: {formatPriceFi(nextHourEntry.price)} c/kWh
                  </span>
                </div>
              )}
            </div>

            {/* Right: Day stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 lg:mt-0 lg:gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                  <span>Keskihinta</span>
                </div>
                <div className="mt-1 text-2xl font-bold text-slate-900">
                  {formatPriceFi(stats.avgPrice)}
                </div>
                <div className="text-xs text-slate-500">c/kWh</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs font-medium uppercase tracking-wider text-emerald-600">
                  <ArrowDown className="h-3 w-3" />
                  <span>Halvin</span>
                </div>
                <div className="mt-1 text-2xl font-bold text-emerald-600">
                  {formatPriceFi(stats.minPrice)}
                </div>
                <div className="text-xs text-slate-500">klo {String(stats.minHour).padStart(2, '0')}:00</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs font-medium uppercase tracking-wider text-red-600">
                  <ArrowUp className="h-3 w-3" />
                  <span>Kallein</span>
                </div>
                <div className="mt-1 text-2xl font-bold text-red-600">
                  {formatPriceFi(stats.maxPrice)}
                </div>
                <div className="text-xs text-slate-500">klo {String(stats.maxHour).padStart(2, '0')}:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with update time */}
        <div className="border-t border-slate-200/60 bg-white/50 px-6 py-2.5 sm:px-8">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Hinnat sisältävät ALV 25,5 %</span>
            <span>
              Päivitetty: {now.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
