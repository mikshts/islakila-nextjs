"use client";

import { memo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Components
import { ListingCard } from "@/components/ListingCard";
import { SkeletonGrid } from "@/components/Skeleton";

export const WishlistPage = memo(({ onToast }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [wishedListings, setWishedListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 1. Core Auth State Monitor Loop
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const activeUser = session?.user ?? null;
      setUser(activeUser);
      if (!activeUser) {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Wished Items dynamically via relational joins from your SQL Schema
  useEffect(() => {
    if (!user) return;

    async function fetchUserWishlist() {
      try {
        setLoading(true);
        // Queries your wishlists table, joining the public view mapping automatically
        const { data, error } = await supabase
          .from("wishlists")
          .select(
            `
            listing_id,
            listings:public_listings_with_names!listing_id ( * )
          `,
          )
          .eq("user_id", user.id);

        if (error) throw error;

        // Flatten the data object array to retrieve the underlying records safely
        const cleanListings = data
          ? data.map((entry) => entry.listings).filter(Boolean)
          : [];

        setWishedListings(cleanListings);
      } catch (err) {
        console.error(
          "Failed to gather user wishlist content parameters:",
          err,
        );
        onToast?.("Could not load your bookmarked items.", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchUserWishlist();
  }, [user, onToast]);

  // Handle local optimistic filter changes if a user un-hearts an item inside this view
  const handleToggleWishlist = async (listingId) => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", user.id)
        .eq("listing_id", listingId);

      if (error) throw error;

      setWishedListings((prev) => prev.filter((item) => item.id !== listingId));
      onToast?.("Item removed from your wishlist.", "success");
      router.refresh();
    } catch (err) {
      console.error("Failed to alter wishlist index row node:", err);
    }
  };

  // Pagination Math Calculations
  const totalItems = wishedListings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedListings = wishedListings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const goToPage = (page) => {
    setCurrentPage(Math.min(totalPages, Math.max(1, page)));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [wishedListings.length]);

  if (!user && !loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center font-sans">
        <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-800">
          Access Sign-in Portal
        </h2>
        <p className="text-sm text-gray-400 mt-1 mb-5">
          Please authenticate to manage your marketplace wishlist registry.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700">
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            My Wishlist
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            {loading
              ? "Syncing collection..."
              : `${totalItems} propert${totalItems === 1 ? "y" : "ies"} saved`}
          </p>
        </div>
      </div>

      {loading ? (
        <SkeletonGrid count={3} />
      ) : totalItems === 0 ? (
        /* Empty State */
        <div className="text-center py-24 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
          <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300 opacity-60" />
          <p className="font-bold text-gray-600">
            Your wishlist is completely empty
          </p>
          <p className="text-sm mt-1 text-gray-400 font-medium">
            Tap the heart icons across marketplace boards to keep tabs on
            properties here.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all cursor-pointer">
            Explore Listings
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedListings.map((item) => (
              <ListingCard
                key={item.id}
                item={item}
                user={user}
                isWished={true}
                onToggleWishlist={() => handleToggleWishlist(item.id)}
                onView={(l) => router.push(`/listings/${l.id}`)}
              />
            ))}
          </div>

          {/* Pagination Blocks Footer */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm font-bold rounded-lg border bg-white disabled:opacity-40 cursor-pointer">
                Previous
              </button>
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => goToPage(num + 1)}
                  className={`w-8 h-8 text-sm font-bold rounded-lg border ${
                    currentPage === num + 1
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                  }`}>
                  {num + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm font-bold rounded-lg border bg-white disabled:opacity-40 cursor-pointer">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
});

WishlistPage.displayName = "WishlistPage";
export default WishlistPage;
