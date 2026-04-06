import { cn } from '@/lib/utils';

/**
 * Base skeleton building block with shimmer animation
 */
export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]',
        className
      )}
      style={style}
    />
  );
}

/**
 * Multi-line text skeleton with varying widths
 */
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  const widths = ['w-full', 'w-5/6', 'w-4/6', 'w-3/4', 'w-2/3'];
  return (
    <div className={cn('space-y-2.5', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-3.5', widths[i % widths.length])}
        />
      ))}
    </div>
  );
}

/**
 * Card-shaped skeleton with header, content area, and optional footer
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-4.5 w-40" />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-3/4" />
      </div>
    </div>
  );
}
