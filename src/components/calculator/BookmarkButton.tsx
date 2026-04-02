'use client';

import { useState, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const LS_KEY = 'energiavertailu-bookmarks';

interface BookmarkButtonProps {
  contractId: string;
  contractName: string;
  className?: string;
}

export default function BookmarkButton({ contractId, contractName, className }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        setIsBookmarked(ids.includes(contractId));
      }
    } catch {
      // ignore
    }
  }, [contractId]);

  const toggle = useCallback(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      const ids: string[] = stored ? JSON.parse(stored) : [];

      if (ids.includes(contractId)) {
        const updated = ids.filter((id) => id !== contractId);
        localStorage.setItem(LS_KEY, JSON.stringify(updated));
        setIsBookmarked(false);
      } else {
        ids.push(contractId);
        localStorage.setItem(LS_KEY, JSON.stringify(ids));
        setIsBookmarked(true);
      }
      window.dispatchEvent(new Event('bookmarks-updated'));
    } catch {
      // ignore
    }
  }, [contractId]);

  return (
    <button
      onClick={toggle}
      className={cn(
        'inline-flex min-h-[44px] items-center justify-center rounded-lg p-2 transition-colors',
        isBookmarked
          ? 'text-red-500 hover:bg-red-50'
          : 'text-slate-400 hover:bg-slate-100 hover:text-slate-500',
        className
      )}
      title={isBookmarked ? 'Poista tallennetuista' : 'Tallenna sopimus'}
      aria-label={isBookmarked ? `Poista ${contractName} tallennetuista` : `Tallenna ${contractName}`}
      aria-pressed={isBookmarked}
    >
      <Heart
        className={cn('h-4 w-4', isBookmarked && 'fill-red-500')}
      />
    </button>
  );
}
