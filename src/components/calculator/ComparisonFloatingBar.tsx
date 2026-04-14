'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GitCompareArrows, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const LS_KEY = 'valitsesahko-rinnakkain';

export default function ComparisonFloatingBar() {
  const [count, setCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  function updateCount() {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        setCount(ids.length);
      } else {
        setCount(0);
      }
    } catch {
      setCount(0);
    }
  }

  useEffect(() => {
    updateCount();

    // Listen for changes from ResultCard toggle buttons
    function handleUpdate() {
      updateCount();
      setDismissed(false); // Re-show when a contract is added
    }

    window.addEventListener('rinnakkain-updated', handleUpdate);
    // Also listen for storage events from other tabs
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('rinnakkain-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  if (count === 0 || dismissed) return null;

  return (
    <div className="no-print fixed bottom-4 left-1/2 z-50 -translate-x-1/2" data-no-print>
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-lg shadow-slate-200/50">
        <Link
          href="/vertailu/rinnakkain"
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors',
            'bg-accent hover:bg-accent-700'
          )}
        >
          <GitCompareArrows className="h-4 w-4" />
          Vertaa rinnakkain ({count})
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Sulje"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
