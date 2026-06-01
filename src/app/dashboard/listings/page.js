"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PlusCircle, Building } from "lucide-react";

// Components
import { ListingCard } from "@/components/ListingCard";
import { SkeletonGrid } from "@/components/Skeleton";
import { ConfirmModal } from "@/components/ConfirmModal";

// Services
import { fetchUserListings, deleteListing } from "@/services/listings";

export default function MyListingsPage({ onToast, user }) {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Protect client routing instantly if user data vanishes
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    fetchUserListings(user.id)
      .then(setListings)
      .catch((err) => onToast?.(err.message, "error"))
      .finally(() => setLoading(false));
  }, [user, router, onToast]);

  const handleDelete = async () => {
    if (!deleteTarget || !user) return;
    setDeleting(true);
    try {
      await deleteListing(deleteTarget.id, user.id);

      const newListings = listings.filter((l) => l.id !== deleteTarget.id);
      setListings(newListings);

      // Dynamic pagination fallback computation
      const newTotal = newListings.length;
      const newTotalPages = Math.ceil(newTotal / itemsPerPage);
      if (currentPage > newTotalPages && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      onToast?.("Listing permanently removed from system database.", "success");
      router.refresh(); // Syncs active dynamic cache states
    } catch (err) {
      onToast?.(err.message, "error");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // Pagination processing
  const totalItems = listings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedListings = listings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const goToPage = (page) => {
    setCurrentPage(Math.min(totalPages, Math.max(1, page)));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Dynamic Action Navbar Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Back to landing">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            My Listings
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            {loading
              ? "Loading active nodes…"
              : `${totalItems} total listed property item${totalItems !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={() => router.push("/listings/post")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-md shadow-blue-200/50 cursor-pointer">
          <PlusCircle className="w-4 h-4" /> Post New
        </button>
      </div>

      {/* Loading Skeleton States */}
      {loading && <SkeletonGrid count={3} />}

      {/* Clean Zero State Rendering */}
      {!loading && totalItems === 0 && (
        <div className="text-center py-24 text-gray-400 border border-dashed border-gray-200 rounded-3xl bg-gray-50/30">
          <Building className="w-12 h-12 mx-auto mb-3 opacity-25 text-gray-500" />
          <p className="font-bold text-gray-600">
            No active property indexes detected
          </p>
          <p className="text-sm mt-1 text-gray-400 font-medium">
            Post your first structural plot layout configuration to get started
            online.
          </p>
          <button
            onClick={() => router.push("/listings/post")}
            className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200/50 cursor-pointer">
            + Post a Listing
          </button>
        </div>
      )}

      {/* Grid Iteration View & Controls */}
      {!loading && totalItems > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedListings.map((item) => (
              <ListingCard
                key={item.id}
                item={item}
                user={user}
                isWished={false}
                onView={(l) => router.push(`/listings/${l.id}`)}
                showOwnerActions={true}
                onEdit={(l) => router.push(`/listings/${l.id}/edit`)}
                onDelete={(l) => setDeleteTarget(l)}
              />
            ))}
          </div>

          {/* Unified Pagination Footprint Component */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm font-bold rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer">
                Previous
              </button>

              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => goToPage(num + 1)}
                  className={`w-8 h-8 text-sm font-bold rounded-lg transition-all border ${
                    currentPage === num + 1
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200 cursor-pointer"
                  }`}>
                  {num + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm font-bold rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer">
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Dropdown Modal Action confirmation boundaries */}
      {deleteTarget && (
        <ConfirmModal
          title="Delete Property Listing"
          message={`Are you completely certain you want to purge listing instance metadata for "${deleteTarget.title}"? This deployment layer action cannot be reversed.`}
          confirmLabel={deleting ? "Purging Row..." : "Confirm Purge"}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
