'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bookmark, Check, LogIn } from 'lucide-react';
import type { ComparisonResult } from '@/types';
import type { SnapshotItem } from '@/lib/auth/saved-comparisons';

const AUTH_ENABLED = process.env.NEXT_PUBLIC_AUTH_ENABLED === '1';

interface UserResp {
  user: { id: string; email: string; name: string | null } | null;
}

interface SaveComparisonButtonProps {
  results: ComparisonResult[];
  consumption: number;
  region: string;
  transferPrice: number;
  contractType: string;
  selectedDurations: string[];
  greenOnly: boolean;
  sortBy: string;
}

export default function SaveComparisonButton({
  results,
  consumption,
  region,
  transferPrice,
  contractType,
  selectedDurations,
  greenOnly,
  sortBy,
}: SaveComparisonButtonProps) {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!AUTH_ENABLED) {
      setLoggedIn(false);
      return;
    }
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data: UserResp) => setLoggedIn(Boolean(data.user)))
      .catch(() => setLoggedIn(false));
  }, []);

  async function handleSave() {
    if (saving || saved) return;
    setSaving(true);
    setError(null);
    try {
      const snapshot: SnapshotItem[] = results.map((r, idx) => ({
        providerSlug: r.provider.slug,
        providerName: r.provider.name,
        contractId: r.contract.id,
        contractName: r.contract.name,
        contractType: r.contract.type,
        pricePerKwh: r.contract.pricePerKwh,
        monthlyFee: r.contract.monthlyFee,
        monthlyEstimate: r.monthlyCost,
        annualEstimate: r.annualCost,
        rank: idx + 1,
      }));

      const inputs = {
        annualKwh: consumption,
        region,
        transferPrice,
        contractType,
        selectedDurations,
        greenOnly,
        sortBy,
      };

      const res = await fetch('/api/comparisons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comparisonType: 'sahkosopimus',
          inputs,
          snapshot,
        }),
      });
      if (res.status === 401) {
        setError('Kirjaudu sisään tallentaaksesi.');
        return;
      }
      if (!res.ok) {
        setError('Tallennus ei onnistunut. Yritä uudelleen.');
        return;
      }
      setSaved(true);
    } catch {
      setError('Tallennus ei onnistunut. Yritä uudelleen.');
    } finally {
      setSaving(false);
    }
  }

  if (!AUTH_ENABLED) return null;
  if (loggedIn === null) return null; // wait until we know
  if (results.length === 0) return null;

  if (!loggedIn) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500">
        <LogIn className="h-4 w-4" />
        Kirjaudu tallentaaksesi
      </div>
    );
  }

  if (saved) {
    return (
      <Link
        href="/vertailut"
        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
      >
        <Check className="h-4 w-4" />
        Tallennettu — katso vertailut
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
      >
        <Bookmark className="h-4 w-4" />
        {saving ? 'Tallennetaan...' : 'Tallenna vertailu'}
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
