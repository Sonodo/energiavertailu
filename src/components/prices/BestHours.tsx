'use client';

import { ThumbsUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HourlyPrice, QuarterHourPrice } from '@/types';

interface BestHoursProps {
  todayPrices: HourlyPrice[];
  quarterHourPrices?: QuarterHourPrice[];
  mode?: 'hourly' | 'quarter';
}

function formatPriceFi(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

function formatQuarterTimeSlot(hour: number, quarter: number): string {
  const startH = String(hour).padStart(2, '0');
  const startM = String(quarter * 15).padStart(2, '0');
  const endM = quarter === 3 ? '00' : String((quarter + 1) * 15).padStart(2, '0');
  const endH = quarter === 3 ? String((hour + 1) % 24).padStart(2, '0') : startH;
  return `${startH}:${startM}–${endH}:${endM}`;
}

export default function BestHours({ todayPrices, quarterHourPrices, mode = 'hourly' }: BestHoursProps) {
  const isQuarterMode = mode === 'quarter' && quarterHourPrices && quarterHourPrices.length > 0;

  if (!isQuarterMode && todayPrices.length === 0) return null;
  if (isQuarterMode && (!quarterHourPrices || quarterHourPrices.length === 0)) return null;

  const now = new Date();
  const currentHour = now.getHours();
  const currentQuarter = Math.floor(now.getMinutes() / 15);

  // Determine best/worst depending on mode
  if (isQuarterMode && quarterHourPrices) {
    const sorted = [...quarterHourPrices].sort((a, b) => a.price - b.price);
    const cheapest = sorted.slice(0, 8); // top 8 cheapest quarters
    const mostExpensive = sorted.slice(-5).reverse(); // top 5 most expensive

    const futureCheap = cheapest.filter(
      (p) => p.hour > currentHour || (p.hour === currentHour && p.quarter >= currentQuarter)
    );

    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Best quarter hours */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
              <ThumbsUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Parhaat varttitunnit tänään</h3>
              <p className="text-xs text-slate-500">Halvimmat 8 varttituntia</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {cheapest.map((p) => {
              const isPast = p.hour < currentHour || (p.hour === currentHour && p.quarter < currentQuarter);
              const isCurrent = p.hour === currentHour && p.quarter === currentQuarter;
              return (
                <div
                  key={`${p.hour}-${p.quarter}`}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm transition-colors',
                    isCurrent
                      ? 'border border-emerald-300 bg-emerald-100 font-medium'
                      : isPast
                        ? 'bg-white/50 text-slate-400 line-through'
                        : 'bg-white'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                        isCurrent ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'
                      )}
                    >
                      {p.rank}
                    </span>
                    <span>{formatQuarterTimeSlot(p.hour, p.quarter)}</span>
                    {isCurrent && (
                      <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white">
                        NYT
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-emerald-700">
                    {formatPriceFi(p.price)} c/kWh
                  </span>
                </div>
              );
            })}
          </div>

          {futureCheap.length > 0 && futureCheap.length < cheapest.length && (
            <p className="mt-3 text-xs text-emerald-600">
              {futureCheap.length} edullista varttituntia jäljellä tänään
            </p>
          )}
        </div>

        {/* Worst quarter hours + tips */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Vältä näitä varttitunteja</h3>
                <p className="text-xs text-slate-500">Kalleimmat 5 varttituntia</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {mostExpensive.map((p) => {
                const isPast = p.hour < currentHour || (p.hour === currentHour && p.quarter < currentQuarter);
                const isCurrent = p.hour === currentHour && p.quarter === currentQuarter;
                return (
                  <div
                    key={`${p.hour}-${p.quarter}`}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm',
                      isCurrent
                        ? 'border border-red-300 bg-red-100 font-medium'
                        : isPast
                          ? 'bg-white/50 text-slate-400 line-through'
                          : 'bg-white'
                    )}
                  >
                    <span>
                      {formatQuarterTimeSlot(p.hour, p.quarter)}
                      {isCurrent && (
                        <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
                          NYT
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-red-700">
                      {formatPriceFi(p.price)} c/kWh
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-[#0066FF]/20 bg-blue-50/50 p-6 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                <Lightbulb className="h-5 w-5 text-[#0066FF]" />
              </div>
              <h3 className="font-semibold text-slate-900">15 min hinnoittelun edut</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0066FF]" />
                15 minuutin tarkkuus mahdollistaa entistä tarkemman kulutuksen optimoinnin.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0066FF]" />
                Lyhyetkin halvat jaksot kannattaa hyödyntää esim. lataukseen.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0066FF]" />
                Saman tunnin sisällä hinta voi vaihdella merkittävästi.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Original hourly mode
  const sorted = [...todayPrices].sort((a, b) => a.price - b.price);
  const cheapest = sorted.slice(0, 5);
  const mostExpensive = sorted.slice(-3).reverse();
  const futureCheap = cheapest.filter((p) => p.hour >= currentHour);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Best hours */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
            <ThumbsUp className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Parhaat tunnit tänään</h3>
            <p className="text-xs text-slate-500">Halvimmat 5 tuntia</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {cheapest.map((p) => {
            const isPast = p.hour < currentHour;
            const isCurrent = p.hour === currentHour;
            return (
              <div
                key={p.hour}
                className={cn(
                  'flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm transition-colors',
                  isCurrent
                    ? 'border border-emerald-300 bg-emerald-100 font-medium'
                    : isPast
                      ? 'bg-white/50 text-slate-400 line-through'
                      : 'bg-white'
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                      isCurrent ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'
                    )}
                  >
                    {p.rank}
                  </span>
                  <span>
                    klo {String(p.hour).padStart(2, '0')}:00–{String(p.hour + 1).padStart(2, '0')}:00
                  </span>
                  {isCurrent && (
                    <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white">
                      NYT
                    </span>
                  )}
                </div>
                <span className="font-semibold text-emerald-700">
                  {formatPriceFi(p.price)} c/kWh
                </span>
              </div>
            );
          })}
        </div>

        {futureCheap.length > 0 && futureCheap.length < cheapest.length && (
          <p className="mt-3 text-xs text-emerald-600">
            {futureCheap.length} edullista tuntia jäljellä tänään
          </p>
        )}
      </div>

      {/* Worst hours + tips */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Vältä näitä tunteja</h3>
              <p className="text-xs text-slate-500">Kalleimmat 3 tuntia</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {mostExpensive.map((p) => {
              const isPast = p.hour < currentHour;
              const isCurrent = p.hour === currentHour;
              return (
                <div
                  key={p.hour}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm',
                    isCurrent
                      ? 'border border-red-300 bg-red-100 font-medium'
                      : isPast
                        ? 'bg-white/50 text-slate-400 line-through'
                        : 'bg-white'
                  )}
                >
                  <span>
                    klo {String(p.hour).padStart(2, '0')}:00–{String(p.hour + 1).padStart(2, '0')}:00
                    {isCurrent && (
                      <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
                        NYT
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-red-700">
                    {formatPriceFi(p.price)} c/kWh
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-2xl border border-[#0066FF]/20 bg-blue-50/50 p-6 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
              <Lightbulb className="h-5 w-5 text-[#0066FF]" />
            </div>
            <h3 className="font-semibold text-slate-900">Vinkkejä pörssisähkön käyttäjälle</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0066FF]" />
              Ajoita pesukoneen, kuivausrummun ja astianpesukoneen käyttö halvimmille tunneille.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0066FF]" />
              Lataa sähköauto yöllä, kun sähkö on yleensä halvimmillaan.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0066FF]" />
              Hyödynnä kodin lämpövaraus: lämmitä taloa halvimpina tunteina.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0066FF]" />
              Vältä suurten laitteiden yhtäaikaista käyttöä kalliimpina tunteina.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
