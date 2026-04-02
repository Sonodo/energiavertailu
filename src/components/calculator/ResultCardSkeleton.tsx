import { Skeleton } from '@/components/ui/Skeleton';

/**
 * Skeleton loader that mimics the ResultCard layout
 */
export default function ResultCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left: Provider + contract info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          {/* Contract price info */}
          <div className="mt-3 flex gap-4">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-3.5 w-24" />
          </div>

          {/* Cost breakdown */}
          <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2.5">
            <Skeleton className="mb-2 h-3 w-32" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-3.5 w-14" />
              <Skeleton className="h-3.5 w-14" />
              <Skeleton className="h-3.5 w-18" />
            </div>
          </div>
        </div>

        {/* Right: Cost */}
        <div className="flex flex-row items-end gap-4 sm:flex-col sm:items-end sm:gap-3">
          <div className="space-y-1.5 text-right">
            <Skeleton className="ml-auto h-3 w-20" />
            <Skeleton className="ml-auto h-7 w-24" />
            <Skeleton className="ml-auto h-2.5 w-16" />
          </div>
          <div className="space-y-1.5 text-right">
            <Skeleton className="ml-auto h-3 w-16" />
            <Skeleton className="ml-auto h-5 w-20" />
          </div>
        </div>
      </div>

      {/* Bottom: Savings + CTA */}
      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
