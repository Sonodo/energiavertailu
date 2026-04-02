'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpdateTimestampProps {
  date?: string | Date;
  label?: string;
  className?: string;
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);

  if (diffSec < 60) return 'juuri nyt';
  if (diffMin < 60) return `${diffMin} min sitten`;
  if (diffHours < 2) return `${diffHours} h sitten`;

  // Check if same day
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return `t\u00e4n\u00e4\u00e4n klo ${date.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Check if yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) return 'eilen';

  // Fallback: DD.MM.YYYY klo HH:MM
  return `${date.toLocaleDateString('fi-FI')} klo ${date.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}`;
}

export default function UpdateTimestamp({
  date,
  label = 'Hinnat p\u00e4ivitetty',
  className,
}: UpdateTimestampProps) {
  const [relativeTime, setRelativeTime] = useState<string | null>(null);

  useEffect(() => {
    const d = date ? new Date(date) : new Date();
    setRelativeTime(getRelativeTime(d));

    // Update the relative time every 30 seconds
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(d));
    }, 30_000);

    return () => clearInterval(interval);
  }, [date]);

  // Don't render on server to avoid hydration mismatch
  if (!relativeTime) return null;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 text-xs text-slate-500',
        className
      )}
    >
      <Clock className="h-3 w-3" />
      <span>
        {label}: {relativeTime}
      </span>
    </div>
  );
}
