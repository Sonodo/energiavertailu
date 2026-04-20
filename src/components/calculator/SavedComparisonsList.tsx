'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { BookmarkPlus, Trash2, RefreshCw, AlertTriangle, TrendingDown, LogIn } from 'lucide-react';
import { formatEuros } from '@/lib/utils';

interface SavedComparisonItem {
  id: string;
  comparisonType: string;
  site: string;
  label: string | null;
  inputs: Record<string, unknown>;
  createdAt: string;
  lastViewedAt: string;
  itemCount: number;
  delta: {
    cheapestNowSlug: string | null;
    cheapestNowContractName: string | null;
    cheapestNowMonthlyEstimate: number | null;
    wasCheapestSlug: string | null;
    wasCheapestContractName: string | null;
    wasCheapestMonthlyEstimate: number | null;
    nowCheaperByPercent: number | null;
    firstSavingsPercent: number | null;
    cheapestRetired: boolean;
  };
}

const AUTH_ENABLED = process.env.NEXT_PUBLIC_AUTH_ENABLED === '1';

function formatDate(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

function inputsSummary(inputs: Record<string, unknown>): string {
  const parts: string[] = [];
  if (typeof inputs.annualKwh === 'number') parts.push(`${inputs.annualKwh} kWh/v`);
  if (typeof inputs.region === 'string') parts.push(inputs.region as string);
  if (typeof inputs.contractType === 'string' && inputs.contractType !== 'all') {
    const label =
      inputs.contractType === 'spot'
        ? 'Pörssi'
        : inputs.contractType === 'fixed'
          ? 'Kiinteä'
          : 'Toistaiseksi voimassa';
    parts.push(label);
  }
  if (inputs.greenOnly) parts.push('Vihreä');
  return parts.join(' · ');
}

function buildRerunUrl(inputs: Record<string, unknown>): string {
  const p = new URLSearchParams();
  if (typeof inputs.annualKwh === 'number') p.set('kulutus', String(inputs.annualKwh));
  if (typeof inputs.region === 'string') p.set('alue', inputs.region as string);
  if (typeof inputs.contractType === 'string') p.set('sopimus', inputs.contractType as string);
  if (Array.isArray(inputs.selectedDurations) && (inputs.selectedDurations as string[]).length > 0) {
    const v = (inputs.selectedDurations as string[]).includes('all')
      ? 'all'
      : (inputs.selectedDurations as string[]).join(',');
    p.set('kesto', v);
  }
  if (inputs.greenOnly) p.set('vihrea', '1');
  if (typeof inputs.sortBy === 'string') p.set('jarjestys', inputs.sortBy as string);
  p.set('step', '3');
  return `/vertailu?${p.toString()}`;
}

export default function SavedComparisonsList() {
  const [items, setItems] = useState<SavedComparisonItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/comparisons');
      if (res.status === 401) {
        setNeedsLogin(true);
        setItems([]);
        return;
      }
      if (!res.ok) {
        setError('Vertailuja ei voitu ladata.');
        return;
      }
      const data = await res.json();
      setItems(data.comparisons || []);
    } catch {
      setError('Vertailuja ei voitu ladata.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string) {
    if (deletingId) return;
    if (typeof window !== 'undefined' && !window.confirm('Poistetaanko tämä vertailu?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/comparisons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => (prev ? prev.filter((i) => i.id !== id) : prev));
      }
    } finally {
      setDeletingId(null);
    }
  }

  if (!AUTH_ENABLED) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Kirjautuminen ei ole käytössä tässä ympäristössä.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <RefreshCw className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (needsLogin) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <LogIn className="mx-auto mb-3 h-10 w-10 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-900">Kirjaudu nähdäksesi tallennukset</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Tallennettuja vertailuja voi selata kirjautuneena. Kirjaudu sisään sivun yläreunan valikosta.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <BookmarkPlus className="mx-auto mb-3 h-10 w-10 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-900">Ei tallennettuja vertailuja</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Kun teet vertailun, voit tallentaa sen tältä sivulta löytyväksi. Ilmoitamme, jos edullisempi sopimus tulee saataville.
        </p>
        <Link
          href="/vertailu"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-600"
        >
          Tee uusi vertailu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const d = item.delta;
        const title = item.label || `Sähkövertailu ${formatDate(item.createdAt)}`;
        const summary = inputsSummary(item.inputs);
        const rerunUrl = buildRerunUrl(item.inputs);
        const showSavingsBanner =
          d.firstSavingsPercent !== null && d.firstSavingsPercent >= 3;

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            {/* Delta banner */}
            {d.cheapestRetired && (
              <div className="flex items-start gap-2 bg-amber-50 px-4 py-3 text-sm text-amber-800 border-b border-amber-200">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Aiemmin edullisin sopimus ei ole enää saatavilla. Katso nykyinen tilanne.
                </span>
              </div>
            )}
            {showSavingsBanner && !d.cheapestRetired && (
              <div className="flex items-start gap-2 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 border-b border-emerald-200">
                <TrendingDown className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Edullisempi sopimus löytynyt: -{d.firstSavingsPercent!.toFixed(1)} % verrattuna aiempaan suosikkiin.
                </span>
              </div>
            )}

            <div className="p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  {summary && <p className="mt-1 text-sm text-slate-500">{summary}</p>}
                  <p className="mt-1 text-xs text-slate-400">
                    Tallennettu {formatDate(item.createdAt)} · {item.itemCount} sopimusta
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={rerunUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white hover:bg-accent-600"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Tarkastele uudelleen
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
                    aria-label="Poista vertailu"
                  >
                    <Trash2 className="h-4 w-4" />
                    Poista
                  </button>
                </div>
              </div>

              {/* Mini delta summary */}
              {(d.cheapestNowContractName || d.wasCheapestContractName) && (
                <div className="mt-4 grid gap-3 rounded-lg bg-slate-50 p-3 sm:grid-cols-2">
                  {d.wasCheapestContractName && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Silloin edullisin</p>
                      <p className="mt-0.5 text-sm font-medium text-slate-900">
                        {d.wasCheapestContractName}
                      </p>
                      {d.wasCheapestMonthlyEstimate !== null && (
                        <p className="text-xs text-slate-500">
                          {formatEuros(d.wasCheapestMonthlyEstimate)}/kk
                        </p>
                      )}
                    </div>
                  )}
                  {d.cheapestNowContractName && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Nyt edullisin</p>
                      <p className="mt-0.5 text-sm font-medium text-slate-900">
                        {d.cheapestNowContractName}
                      </p>
                      {d.cheapestNowMonthlyEstimate !== null && (
                        <p className="text-xs text-slate-500">
                          {formatEuros(d.cheapestNowMonthlyEstimate)}/kk
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
