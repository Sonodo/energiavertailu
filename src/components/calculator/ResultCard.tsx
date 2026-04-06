'use client';

import { useState, useEffect, useCallback } from 'react';
import { Leaf, Star, ExternalLink, TrendingDown, Shield, GitCompareArrows, Check, Award, ChevronDown, Calculator } from 'lucide-react';
import { cn, formatEuros, formatPrice, formatNumber } from '@/lib/utils';
import { ComparisonResult } from '@/types';
import { ELECTRICITY_VAT, ELECTRICITY_TAX } from '@/lib/constants';
import { AVERAGE_SPOT_PRICE } from '@/data/providers';
import ProviderLogo from '@/components/ui/ProviderLogo';
import BookmarkButton from './BookmarkButton';

const LS_KEY = 'energiavertailu-rinnakkain';

interface ResultCardProps {
  result: ComparisonResult;
  rank: number;
  savingsVsMostExpensive: number;
  consumption?: number;
  transferPrice?: number;
}

function getTypeBadge(type: string) {
  switch (type) {
    case 'spot':
      return { label: 'Pörssi', color: 'bg-blue-100 text-blue-700' };
    case 'fixed':
      return { label: 'Määräaikainen', color: 'bg-purple-100 text-purple-700' };
    case 'open-ended':
      return { label: 'Toistaiseksi', color: 'bg-amber-100 text-amber-700' };
    case 'hybrid':
      return { label: 'Hybridi', color: 'bg-teal-100 text-teal-700' };
    default:
      return { label: type, color: 'bg-slate-100 text-slate-700' };
  }
}

function getDurationLabel(months?: number): string | null {
  if (!months) return null;
  return `${months} kk`;
}

function getRiskBadge(risk: number) {
  if (risk <= 10) return { label: 'Erittäin vakaa', color: 'bg-emerald-100 text-emerald-800', iconColor: 'text-emerald-600' };
  if (risk <= 25) return { label: 'Vakaa', color: 'bg-green-100 text-green-700', iconColor: 'text-green-500' };
  if (risk <= 50) return { label: 'Kohtalainen', color: 'bg-amber-100 text-amber-700', iconColor: 'text-amber-500' };
  if (risk <= 75) return { label: 'Kohonnut riski', color: 'bg-orange-100 text-orange-700', iconColor: 'text-orange-500' };
  return { label: 'Korkea riski', color: 'bg-red-200 text-red-800 border border-red-300', iconColor: 'text-red-600' };
}

export default function ResultCard({ result, rank, savingsVsMostExpensive, consumption, transferPrice }: ResultCardProps) {
  const { contract, provider } = result;
  const badge = getTypeBadge(contract.type);
  const durationLabel = getDurationLabel(contract.contractLength);
  const riskBadge = getRiskBadge(provider.counterpartyRisk);
  const isTop3 = rank <= 3;
  const isHighRisk = provider.counterpartyRisk >= 76;

  const isRecommended = result.isRecommended === true;

  const [isInComparison, setIsInComparison] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        setIsInComparison(ids.includes(contract.id));
      }
    } catch {
      // ignore
    }
  }, [contract.id]);

  const toggleComparison = useCallback(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      const ids: string[] = stored ? JSON.parse(stored) : [];

      if (ids.includes(contract.id)) {
        // Remove
        const updated = ids.filter((id) => id !== contract.id);
        localStorage.setItem(LS_KEY, JSON.stringify(updated));
        setIsInComparison(false);
        // Dispatch event so the floating bar updates
        window.dispatchEvent(new Event('rinnakkain-updated'));
      } else if (ids.length < 3) {
        // Add
        ids.push(contract.id);
        localStorage.setItem(LS_KEY, JSON.stringify(ids));
        setIsInComparison(true);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1500);
        window.dispatchEvent(new Event('rinnakkain-updated'));
      }
    } catch {
      // ignore
    }
  }, [contract.id]);

  return (
    <div
      className={cn(
        'relative rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
        isRecommended
          ? 'border-2 border-blue-400 shadow-md shadow-blue-100 ring-1 ring-blue-200'
          : rank === 1
            ? 'border-[#0066FF] shadow-md shadow-blue-100'
            : isHighRisk
              ? 'border-red-300 shadow-sm shadow-red-50'
              : 'border-slate-200 shadow-sm'
      )}
    >
      {/* Top badges */}
      <div className="absolute -top-3 left-4 flex items-center gap-2">
        {isRecommended && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-0.5 text-xs font-bold text-white shadow-sm">
            <Award className="h-3 w-3" />
            Paras valinta
          </span>
        )}
        {rank === 1 && (
          <span className="rounded-full bg-[#0066FF] px-3 py-0.5 text-xs font-bold text-white">
            Halvin
          </span>
        )}
      </div>

      <div className="p-4 sm:p-6">
        {/* Mobile: show cost prominently at top */}
        <div className="mb-3 flex items-center justify-between sm:hidden">
          <div>
            <p
              className={cn(
                'text-2xl font-bold',
                isRecommended ? 'text-blue-600' : rank === 1 ? 'text-[#0066FF]' : isTop3 ? 'text-emerald-600' : 'text-slate-900'
              )}
            >
              {formatEuros(result.monthlyCost)}/kk
            </p>
            <p className="text-[10px] text-slate-400">sis. siirto + verot</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-slate-500">Vuodessa</p>
            <p className="text-base font-semibold text-slate-700">
              {formatEuros(result.annualCost, 0)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: Provider + contract info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {/* Provider logo */}
              <ProviderLogo name={provider.name} slug={provider.slug} size="md" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-500">{provider.name}</p>
                <h3 className="truncate font-bold text-slate-900">{contract.name}</h3>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', badge.color)}>
                {badge.label}
              </span>
              {durationLabel && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                  {durationLabel}
                </span>
              )}
              {contract.greenEnergy && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  <Leaf className="h-3 w-3" />
                  Vihreä
                </span>
              )}
              {/* Risk badge */}
              <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', riskBadge.color)}>
                <Shield className={cn('h-3 w-3', riskBadge.iconColor)} />
                Riski: {provider.counterpartyRisk}%
              </span>
              {provider.rating && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-500" title="Toimittajan arvio">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {provider.rating.toFixed(1)}
                </span>
              )}
            </div>

            {/* Recommendation score breakdown (expandable) */}
            {isRecommended && result.scoreBreakdown && (
              <div className="mt-2">
                <button
                  onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  <Award className="h-3 w-3" />
                  Miksi suosittelemme?
                  <ChevronDown className={cn('h-3 w-3 transition-transform', showScoreBreakdown && 'rotate-180')} />
                </button>
                {showScoreBreakdown && (
                  <div className="mt-1.5 rounded-lg bg-blue-50 px-3 py-2.5 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Hinta:</span>
                      <span className="font-semibold text-slate-900">{result.scoreBreakdown.priceScore}/100 pistettä</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Luotettavuus:</span>
                      <span className="font-semibold text-slate-900">{result.scoreBreakdown.riskScore}/100 pistettä</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Asiakastyytyväisyys:</span>
                      <span className="font-semibold text-slate-900">{result.scoreBreakdown.ratingScore}/100 pistettä</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-blue-200 pt-1">
                      <span className="font-semibold text-blue-800">Kokonaispisteet:</span>
                      <span className="font-bold text-blue-800">{result.scoreBreakdown.totalScore}/100</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* High risk warning */}
            {provider.counterpartyRisk >= 50 && (
              <div className={cn(
                'mt-2 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium',
                provider.counterpartyRisk >= 76
                  ? 'bg-red-50 text-red-700'
                  : 'bg-orange-50 text-orange-700'
              )}>
                <Shield className="h-3.5 w-3.5" />
                {provider.counterpartyRisk >= 76
                  ? 'Korkea vastapuoliriski — sopimuksen toteutuminen epävarmaa'
                  : 'Kohonnut vastapuoliriski — huomioi yhtiön vakaus'}
              </div>
            )}

            {/* Contract price info */}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
              <span>
                Energia:{' '}
                <span className="font-medium text-slate-700">
                  {contract.type === 'spot'
                    ? `spot + ${formatPrice(contract.pricePerKwh, 2)} marginaali`
                    : formatPrice(contract.pricePerKwh, 2)}
                </span>
              </span>
              <span>
                Perusmaksu:{' '}
                <span className="font-medium text-slate-700">
                  {formatEuros(contract.monthlyFee)}/kk
                </span>
              </span>
            </div>

            {/* True total cost breakdown */}
            {result.breakdown && (
              <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2.5">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Todellinen vuosikustannus
                </p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs sm:gap-x-4 sm:text-sm md:grid-cols-4">
                  <div>
                    <span className="text-slate-500">Energia: </span>
                    <span className="font-medium text-slate-700">{formatEuros(result.breakdown.energyCost, 0)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Siirto: </span>
                    <span className="font-medium text-slate-700">{formatEuros(result.breakdown.transmissionCost, 0)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Verot: </span>
                    <span className="font-medium text-slate-700">{formatEuros(result.breakdown.taxCost, 0)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Yhteensä: </span>
                    <span className="font-bold text-slate-900">{formatEuros(result.breakdown.totalCost, 0)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Expandable step-by-step calculation */}
            {consumption != null && transferPrice != null && result.breakdown && (
              <div className="mt-2">
                <button
                  onClick={() => setShowCalculation(!showCalculation)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Calculator className="h-3 w-3" />
                  Näytä laskelma
                  <ChevronDown className={cn('h-3 w-3 transition-transform', showCalculation && 'rotate-180')} />
                </button>
                {showCalculation && (() => {
                  const isSpot = contract.type === 'spot';
                  const effectivePrice = isSpot
                    ? AVERAGE_SPOT_PRICE + contract.pricePerKwh
                    : contract.pricePerKwh;
                  const energyBase = (effectivePrice / 100) * consumption;
                  const monthlyFeeAnnual = contract.monthlyFee * 12;
                  const energySubtotal = energyBase + monthlyFeeAnnual;
                  const vatAmount = energySubtotal * ELECTRICITY_VAT;
                  const energyTotal = energySubtotal + vatAmount;
                  const transmissionCost = (transferPrice / 100) * consumption;
                  const taxExcl = (ELECTRICITY_TAX / 100) * consumption;
                  const taxVat = taxExcl * ELECTRICITY_VAT;
                  const taxTotal = taxExcl + taxVat;
                  const grandTotal = energyTotal + transmissionCost + taxTotal;

                  return (
                    <div className="mt-1.5 rounded-lg bg-slate-50 border border-slate-200 px-3 py-3 text-xs space-y-1.5 font-mono">
                      <p className="text-[10px] font-sans font-semibold uppercase tracking-wide text-slate-400 mb-2">
                        Laskelman erittely
                      </p>
                      <div className="text-slate-600">
                        Energiakustannus: {formatNumber(consumption, 0)} kWh &times;{' '}
                        {isSpot
                          ? `(${AVERAGE_SPOT_PRICE.toFixed(2)} + ${contract.pricePerKwh.toFixed(2)}) c/kWh`
                          : `${contract.pricePerKwh.toFixed(2)} c/kWh`
                        } = {formatEuros(energyBase)}
                      </div>
                      <div className="text-slate-600">
                        + Perusmaksu: {formatEuros(contract.monthlyFee)}/kk &times; 12 = {formatEuros(monthlyFeeAnnual)}
                      </div>
                      <div className="text-slate-600">
                        + ALV 25,5 %: {formatEuros(vatAmount)}
                      </div>
                      <div className="font-semibold text-slate-800 border-t border-slate-200 pt-1">
                        = Energiakustannus yhteens&auml;: {formatEuros(energyTotal)}
                      </div>
                      <div className="mt-2 text-slate-600">
                        Siirtomaksu: {formatNumber(consumption, 0)} kWh &times; {transferPrice.toFixed(2)} c/kWh = {formatEuros(transmissionCost)}
                      </div>
                      <div className="text-slate-600">
                        S&auml;hk&ouml;vero: {formatNumber(consumption, 0)} kWh &times; {ELECTRICITY_TAX.toFixed(2)} c/kWh + ALV = {formatEuros(taxTotal)}
                      </div>
                      <div className="mt-1 border-t border-slate-300 pt-1.5 font-bold text-[#0066FF]">
                        YHTEENS&Auml;: {formatEuros(grandTotal, 0)}/vuosi
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Right: Cost — hidden on mobile (shown at card top instead) */}
          <div className="hidden sm:flex sm:flex-col sm:items-end sm:gap-1">
            <div className="text-right">
              <p className="text-xs font-medium text-slate-500">Vuosikustannus</p>
              <p
                className={cn(
                  'text-2xl font-bold',
                  isRecommended ? 'text-blue-600' : rank === 1 ? 'text-[#0066FF]' : isTop3 ? 'text-emerald-600' : 'text-slate-900'
                )}
              >
                {formatEuros(result.annualCost, 0)}
              </p>
              <p className="text-[10px] text-slate-400">sis. siirto + verot</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-slate-500">Kuukausihinta</p>
              <p className="text-lg font-semibold text-slate-700">
                {formatEuros(result.monthlyCost)}/kk
              </p>
            </div>
          </div>
        </div>

        {/* Savings bar + CTA */}
        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          {savingsVsMostExpensive > 0 ? (
            <div className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <TrendingDown className="h-4 w-4" />
              Säästät {formatEuros(savingsVsMostExpensive, 0)}/vuosi kalleimpaan verrattuna
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <BookmarkButton contractId={contract.id} contractName={contract.name} />
            <button
              onClick={toggleComparison}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isInComparison
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
              title={isInComparison ? 'Poista vertailusta' : 'Lisää rinnakkaisvertailuun'}
              aria-label={isInComparison ? `Poista ${contract.name} vertailusta` : `Lisää ${contract.name} rinnakkaisvertailuun`}
              aria-pressed={isInComparison}
            >
              {justAdded ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <GitCompareArrows className="h-3.5 w-3.5" />
              )}
              {isInComparison ? 'Vertailussa' : 'Vertaile'}
            </button>
            <a
              href={contract.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                isRecommended
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              )}
            >
              {isRecommended ? 'Siirry tarjoukseen' : 'Lue lisää'}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
