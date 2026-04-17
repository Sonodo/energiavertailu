'use client';

import { TrendingDown, Search, Trophy, ArrowDownUp, Award, ExternalLink, Shield } from 'lucide-react';
import { formatEuros, formatNumber } from '@/lib/utils';
import { ComparisonResult, Region } from '@/types';

interface ComparisonSummaryProps {
  results: ComparisonResult[];
  consumption: number;
  region?: Region;
  recommendedResult: ComparisonResult | null;
}

export default function ComparisonSummary({ results, consumption, region, recommendedResult }: ComparisonSummaryProps) {
  if (results.length === 0) return null;

  const cheapest = results[0];
  const mostExpensive = results[results.length - 1];
  const savings = mostExpensive.annualCost - cheapest.annualCost;

  return (
    <div className="space-y-4">
      {/* Recommendation card */}
      {recommendedResult && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 shadow-md sm:p-6">
          {/* Subtle gradient accent line at top */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600" />

          <div className="flex items-center gap-2 mb-4">
            <div className="rounded-full bg-gradient-to-br from-amber-400 to-amber-500 p-2 shadow-sm">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">Suosittelemme</h3>
              <p className="text-xs text-slate-500">Paras yhdistelmä hintaa, luotettavuutta ja laatua</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                  {recommendedResult.provider.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{recommendedResult.provider.name}</p>
                  <p className="font-bold text-slate-900">{recommendedResult.contract.name}</p>
                </div>
              </div>

              {/* Key stats */}
              <div className="mt-3 flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 rounded-lg bg-white/80 px-3 py-1.5 text-sm shadow-sm">
                  <TrendingDown className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-slate-600">Hinta:</span>
                  <span className="font-semibold text-slate-900">{formatEuros(recommendedResult.annualCost, 0)}/v</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-white/80 px-3 py-1.5 text-sm shadow-sm">
                  <Shield className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-slate-600">Riski:</span>
                  <span className="font-semibold text-slate-900">{recommendedResult.provider.counterpartyRisk}%</span>
                </div>
                {recommendedResult.scoreBreakdown && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-blue-100/80 px-3 py-1.5 text-sm shadow-sm">
                    <Award className="h-3.5 w-3.5 text-blue-700" />
                    <span className="text-blue-700">Pisteet:</span>
                    <span className="font-bold text-blue-800">{recommendedResult.scoreBreakdown.totalScore}/100</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <a
                href={recommendedResult.contract.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
              >
                Siirry tarjoukseen
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Stats summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <Search className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Sopimuksia</p>
              <p className="text-lg font-bold text-slate-900">{results.length} kpl</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-emerald-50 p-2">
              <Trophy className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Halvin</p>
              <p className="text-lg font-bold text-emerald-600">
                {formatEuros(cheapest.annualCost, 0)}/v
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-red-50 p-2">
              <ArrowDownUp className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Kallein</p>
              <p className="text-lg font-bold text-slate-700">
                {formatEuros(mostExpensive.annualCost, 0)}/v
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-amber-50 p-2">
              <TrendingDown className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Säästöpotentiaali</p>
              <p className="text-lg font-bold text-amber-600">
                {formatEuros(savings, 0)}/v
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-slate-50 px-4 py-2.5">
          <p className="text-sm text-slate-600">
            Laskenta perustuu vuosikulutukseen{' '}
            <span className="font-semibold text-slate-900">{formatNumber(consumption)} kWh</span>.
            Pörssisähkön hinta perustuu keskimääräiseen spot-hintaan 5,50 c/kWh.
            Hinnat sisältävät ALV 25,5 %.
          </p>
          <p className="mt-1 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Todellinen kokonaiskustannus</span> — hinnat sisältävät energian, siirtomaksun
            {region && (
              <span> (<span className="font-medium">{region.name}</span>, {region.transferPrice.toFixed(1)} c/kWh)</span>
            )}
            {' '}ja sähköveron.
          </p>
        </div>
      </div>
    </div>
  );
}
