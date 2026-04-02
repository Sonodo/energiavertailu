'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, Zap } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Jokin meni pieleen
        </h1>

        <p className="mt-3 text-slate-600">
          Sivua ladattaessa tapahtui odottamaton virhe. Yritä ladata sivu
          uudelleen tai palaa etusivulle.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0052CC]"
          >
            <RefreshCw className="h-4 w-4" />
            Yritä uudelleen
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Home className="h-4 w-4" />
            Etusivulle
          </Link>
        </div>

        <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">
            Kokeile myös näitä:
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Link
              href="/vertailu"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0066FF] hover:underline"
            >
              <Zap className="h-3.5 w-3.5" />
              Sähkövertailu
            </Link>
            <Link
              href="/porssisahko"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0066FF] hover:underline"
            >
              <Zap className="h-3.5 w-3.5" />
              Pörssisähkö
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
