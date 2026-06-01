"use client";

import { useState, useEffect, memo, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Building, RefreshCw } from "lucide-react";

// --- TEMPORARY MOCKS FOR COMPONENT CONTINUITY ---
// Switch these once you copy your real component files over to src/components/
const ListingCard = ({ item, onView }) => (
  <div
    onClick={() => onView(item)}
    className="p-4 bg-white border border-gray-100 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
    <div className="h-44 bg-gray-50 rounded-xl mb-3 overflow-hidden relative">
      {item.images?.[0] && (
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      )}
      <span className="absolute top-2 right-2 bg-white/90 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs text-gray-700">
        {item.status}
      </span>
    </div>
    <div>
      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
        {item.subcategory_name}
      </span>
      <h4 className="font-bold text-gray-800 mt-1.5 line-clamp-1">
        {item.title}
      </h4>
      <p className="text-xs text-gray-400 mt-0.5">📍 {item.location}</p>
    </div>
    <div className="border-t pt-3 mt-3 flex justify-between items-center">
      <p className="text-blue-600 font-extrabold text-sm">
        ₱{item.price || "Contact"}
      </p>
    </div>
  </div>
);

const SkeletonGrid = ({ count }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {[...Array(count || 6)].map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-gray-200 h-64 rounded-2xl w-full"
      />
    ))}
  </div>
);

const ConfirmModal = () => null;

const PAGE_SIZE = 9;

export const ListingsContent = memo(() => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract variables natively from Next.js address parameters
  const urlSearch = searchParams.get("search") || "";
  const urlCategoryId = searchParams.get("categoryId") || null;

  // Global Core State Elements
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [listings, setListings] = useState([]);
  const [total, setTotal] = useState(0);

  const [selectedCategoryId, setSelectedCategoryId] = useState(urlCategoryId);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Sync session authentication state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  // Fetch structured platform category layout maps from data schema
  useEffect(() => {
    async function fetchPlatformStructure() {
      try {
        const { data: catData } = await supabase
          .from("categories")
          .select("*")
          .order("display_order", { ascending: true });
        setCategories(catData || []);

        const { data: subData } = await supabase
          .from("subcategories")
          .select("*")
          .order("display_order", { ascending: true });
        setSubcategories(subData || []);
      } catch (err) {
        console.error("Failed to compile layout definitions:", err);
      }
    }
    fetchPlatformStructure();
  }, []);

  // Central Dynamic Fetch Function querying against base schema criteria
  const fetchFilteredListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Base query pointing to your production database view layout
      let query = supabase
        .from("listings_with_names")
        .select("*", { count: "exact" });

      // Step 2: Inject relational constraints conditionally
      if (selectedCategoryId) {
        query = query.eq("category_id", selectedCategoryId);
      }
      if (selectedSubcategoryId) {
        query = query.eq("subcategory_id", selectedSubcategoryId);
      }
      if (urlSearch.trim() !== "") {
        // Utilizing your generated full-text search vector index
        query = query.textSearch("search_vector", urlSearch.trim());
      }

      // Step 3: Implement system row-pagination blocks
      const fromRow = (currentPage - 1) * PAGE_SIZE;
      const toRow = fromRow + PAGE_SIZE - 1;

      const {
        data,
        count,
        error: fetchError,
      } = await query
        .order("created_at", { ascending: false })
        .range(fromRow, toRow);

      if (fetchError) throw fetchError;

      setListings(data || []);
      setTotal(count || 0);
    } catch (err) {
      setError(err.message || "An unexpected loading discrepancy occurred.");
    } finally {
      setLoading(false);
    }
  }, [selectedCategoryId, selectedSubcategoryId, urlSearch, currentPage]);

  // Synchronize triggers on data parameter adjustments
  useEffect(() => {
    fetchFilteredListings();
  }, [fetchFilteredListings]);

  // Sync state cleanly when top level categories alter via URL parameters
  useEffect(() => {
    setSelectedCategoryId(urlCategoryId);
    setSelectedSubcategoryId(null);
    setCurrentPage(1);
  }, [urlCategoryId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [urlSearch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategoryId, selectedSubcategoryId, urlSearch, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategoryId(catId === selectedCategoryId ? null : catId);
    setSelectedSubcategoryId(null);
    setCurrentPage(1);
  };

  const handleSubcategoryClick = (subId) => {
    setSelectedSubcategoryId(subId === selectedSubcategoryId ? null : subId);
    setCurrentPage(1);
  };

  const availableSubcategories = useMemo(() => {
    return subcategories.filter(
      (sub) => sub.category_id === selectedCategoryId,
    );
  }, [subcategories, selectedCategoryId]);

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Header Context Bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategoryId
              ? categories.find((c) => c.id === selectedCategoryId)?.name ||
                "Category"
              : "All Listings"}
          </h2>
          <p className="text-sm text-gray-500">
            {loading
              ? "Loading records..."
              : `${total} propert${total === 1 ? "y" : "ies"} discovered`}
          </p>
        </div>
        <button
          onClick={fetchFilteredListings}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          title="Refresh Container">
          <RefreshCw
            className={`w-4 h-4 text-gray-500 ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* Query Filter Clear Notification Bar */}
      {urlSearch && (
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <span>
            Showing results for{" "}
            <span className="font-semibold text-blue-600">"{urlSearch}"</span>
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

ListingsContent.displayName = "ListingsContent";
