import { Skeleton } from '@/components/ui/Skeleton';

/**
 * Rich skeleton loader that mimics the SpotDashboard layout
 */
export default function SpotDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Current price hero skeleton */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left">
            {/* Left: Current price */}
            <div className="flex-1">
              <div className="flex items-center justify-center gap-2 lg:justify-start">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="mt-3 flex items-baseline justify-center gap-2 lg:justify-start">
                <Skeleton className="h-14 w-32 rounded-lg sm:h-16 sm:w-40" />
                <Skeleton className="h-5 w-12" />
              </div>
              <div className="mt-2 flex items-center justify-center gap-3 lg:justify-start">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>

            {/* Right: Day stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 lg:mt-0 lg:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-7 w-12" />
                  <Skeleton className="h-3 w-10" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-slate-200/60 bg-slate-50/50 px-6 py-2.5 sm:px-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      {/* Resolution toggle skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="ml-1 h-9 w-28 rounded-md" />
        </div>
      </div>

      {/* Chart skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Skeleton className="mb-4 h-5 w-40" />
        <div className="flex items-end gap-1 sm:gap-1.5" style={{ height: '280px' }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="flex-1"
              style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}
            >
              <Skeleton
                className="w-full rounded-t"
                style={{
                  height: `${30 + Math.sin(i * 0.5) * 25 + Math.random() * 20}%`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>

      {/* Best hours skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Skeleton className="mb-4 h-5 w-48" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-5 w-14" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <Skeleton className="h-7 w-14" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
