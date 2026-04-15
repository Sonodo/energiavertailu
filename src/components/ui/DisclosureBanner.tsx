import Link from 'next/link';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DisclosureBannerProps {
  className?: string;
}

/**
 * Affiliate disclosure banner — slim, non-dismissible.
 * Placed immediately above any provider CTA list to satisfy
 * advertising transparency requirements without affecting ranking
 * or visual treatment of individual providers.
 */
export default function DisclosureBanner({ className }: DisclosureBannerProps) {
  return (
    <div
      role="note"
      aria-label="Sivuston ansaintamalli"
      className={cn(
        'flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600 sm:items-center',
        className
      )}
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 sm:mt-0" aria-hidden="true" />
      <p className="min-w-0">
        ValitseSähkö on ilmainen vertailupalvelu. Saamme komissiota osalta
        palveluntarjoajista, mutta tämä ei vaikuta vertailun järjestykseen.{' '}
        <Link
          href="/sivuston-ansainta"
          className="font-medium text-slate-700 underline underline-offset-2 hover:text-accent"
        >
          Lue lisää
        </Link>
      </p>
    </div>
  );
}
