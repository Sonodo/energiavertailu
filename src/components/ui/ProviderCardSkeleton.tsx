import { Skeleton } from '@/components/ui/Skeleton';

/**
 * Skeleton loader that mimics the provider card on /sahkoyhtiot
 */
export default function ProviderCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Badges */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-10 rounded-full" />
      </div>

      {/* Name */}
      <Skeleton className="h-5 w-36" />

      {/* Rating */}
      <div className="mt-2 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-4 w-4 rounded" />
        ))}
        <Skeleton className="ml-1 h-3.5 w-6" />
      </div>

      {/* Description */}
      <div className="mt-2 space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      {/* Stats */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-14" />
      </div>

      {/* Price */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
