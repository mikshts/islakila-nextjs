import { memo } from "react";

export const CardSkeleton = memo(() => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-4 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="flex justify-between mt-3">
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="h-7 bg-gray-200 rounded w-16" />
      </div>
    </div>
  </div>
));

export const SkeletonGrid = memo(({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
));
