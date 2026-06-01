import { Suspense } from "react";
import { ListingsContent } from "./ListingsContent";

// Fallback component shown while ListingsContent is loading
function ListingsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 h-64 rounded-2xl w-full"
          />
        ))}
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<ListingsSkeleton />}>
      <ListingsContent />
    </Suspense>
  );
}
