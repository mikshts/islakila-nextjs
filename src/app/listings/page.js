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
          </span>
          <button
            onClick={() => router.push("/listings")}
            className="text-xs text-gray-400 hover:text-gray-600 underline">
            Clear
          </button>
        </div>
      )}

      {/* Primary Top Level Category Filter Badges */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => {
            setSelectedCategoryId(null);
            setSelectedSubcategoryId(null);
            setCurrentPage(1);
          }}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            !selectedCategoryId
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-200 text-gray-600 hover:border-gray-300"
          }`}>
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              selectedCategoryId === cat.id
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Subcategory Scroll Bar Filtering Ribbon */}
      {selectedCategoryId && availableSubcategories.length > 0 && (
        <div className="mb-6 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 flex-nowrap min-w-max pb-1">
            {availableSubcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => handleSubcategoryClick(sub.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  selectedSubcategoryId === sub.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* State Processing Branches */}
      {error && (
        <div className="text-center py-16">
          <p className="text-rose-500 font-medium mb-3">{error}</p>
          <button
            onClick={fetchFilteredListings}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700">
            Retry
          </button>
        </div>
      )}

      {loading && !listings.length && <SkeletonGrid count={PAGE_SIZE} />}

      {!loading && !error && listings.length === 0 && (
        <div className="text-center py-24 text-gray-400">
          <Building className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-semibold text-gray-500">
            No matching items located
          </p>
          <p className="text-sm mt-1">
            Try resetting chosen criteria paths or modifying search tokens.
          </p>
        </div>
      )}

      {listings.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((item) => (
              <ListingCard
                key={item.id}
                item={item}
                onView={(l) => router.push(`/listings/${l.id}`)}
              />
            ))}
          </div>

          {/* Pagination Navigation Control Interface */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border bg-white disabled:opacity-40">
                Previous
              </button>
              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`dots-${idx}`}
                    className="w-8 text-center text-gray-400">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 text-sm font-semibold rounded-lg ${currentPage === page ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"}`}>
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border bg-white disabled:opacity-40">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
});

ListingsPage.displayName = "ListingsPage";
export default function ListingsPageContainer() {
  return <ListingsPage />;
}
