'use client';

import { useState, useEffect, useCallback } from 'react';
import { Heart, ChevronDown, Trash2, X } from 'lucide-react';
import { cn, formatEuros, formatPrice } from '@/lib/utils';
import { providers } from '@/data/providers';
import type { ElectricityContract, ElectricityProvider } from '@/types';

const LS_KEY = 'valitsesahko-bookmarks';

interface BookmarkInfo {
  contract: ElectricityContract;
  provider: ElectricityProvider;
}

function getBookmarkedContracts(): BookmarkInfo[] {
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (!stored) return [];
    const ids: string[] = JSON.parse(stored);

    const results: BookmarkInfo[] = [];
    for (const id of ids) {
      for (const provider of providers) {
        const contract = provider.contracts.find((c) => c.id === id);
        if (contract) {
          results.push({ contract, provider });
          break;
        }
      }
    }
    return results;
  } catch {
    return [];
  }
}

function removeBookmark(contractId: string): void {
  try {
    const stored = localStorage.getItem(LS_KEY);
    const ids: string[] = stored ? JSON.parse(stored) : [];
    const updated = ids.filter((id) => id !== contractId);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('bookmarks-updated'));
  } catch {
    // ignore
  }
}

function clearAllBookmarks(): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('bookmarks-updated'));
  } catch {
    // ignore
  }
}

export default function BookmarkedContracts() {
  const [bookmarks, setBookmarks] = useState<BookmarkInfo[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const refresh = useCallback(() => {
    setBookmarks(getBookmarkedContracts());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener('bookmarks-updated', refresh);
    return () => window.removeEventListener('bookmarks-updated', refresh);
  }, [refresh]);

  if (bookmarks.length === 0) return null;

  return (
    <div className="mb-6 rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-white shadow-sm">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 sm:px-6"
      >
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          <span className="text-sm font-semibold text-slate-900">
            Tallennetut ({bookmarks.length})
          </span>
        </div>
        <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-pink-100 px-4 pb-4 sm:px-6">
          <div className="mt-3 space-y-2">
            {bookmarks.map(({ contract, provider }) => (
              <div
                key={contract.id}
                className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5 shadow-sm border border-slate-100"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{contract.name}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{provider.name}</span>
                    <span className="text-slate-300">|</span>
                    <span>{formatPrice(contract.pricePerKwh, 2)}</span>
                    <span className="text-slate-300">|</span>
                    <span>{formatEuros(contract.monthlyFee)}/kk</span>
                  </div>
                </div>
                <button
                  onClick={() => removeBookmark(contract.id)}
                  className="ml-2 shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  title="Poista"
                  aria-label={`Poista ${contract.name} tallennetuista`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 text-right">
            <button
              onClick={clearAllBookmarks}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              Tyhjennä kaikki
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
