'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Suspense fallback with a 60s timeout. After 60s, render a recovery UI
 * (refresh hint + escape link) so users aren't stuck on an indefinite spinner
 * if a client component fails to hydrate.
 */
export default function LoadingTimeout({
  message = 'Ladataan vertailulaskuria...',
  fallbackHref = '/sahkoyhtiot',
  fallbackLabel = 'Selaa sähköyhtiöitä',
  timeoutMs = 60_000,
}: {
  message?: string;
  fallbackHref?: string;
  fallbackLabel?: string;
  timeoutMs?: number;
}) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), timeoutMs);
    return () => clearTimeout(t);
  }, [timeoutMs]);

  if (timedOut) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="mb-2 font-semibold text-slate-900">
          Laskurin lataus epäonnistui.
        </p>
        <p className="mb-4 text-sm text-slate-600">
          Päivitä sivu tai siirry suoraan tarjoajien sivuille.
        </p>
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Päivitä sivu
          </button>
          <Link
            href={fallbackHref}
            className="rounded-lg border border-slate-900 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
          >
            {fallbackLabel}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm" aria-live="polite">
      <div className="flex h-48 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-accent" />
          <p className="text-sm text-slate-500">{message}</p>
        </div>
      </div>
    </div>
  );
}
