// src/hooks/useListings.js
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabase.js";
import { mapListing } from "../services/index.js";

const PAGE_SIZE = 9;

export const useListings = ({
  categoryId,
  subcategoryId,
  search,
  page = 1,
}) => {
  const [listings, setListings] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from("listings_with_names")
        .select("*", { count: "exact" });

      // Filter by category
      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }
      // Filter by subcategory
      if (subcategoryId) {
        query = query.eq("subcategory_id", subcategoryId);
      }

      // ✅ SAFE FULL‑TEXT SEARCH – handles punctuation, commas, spaces
      if (search && search.trim()) {
        query = query.textSearch("search_vector", search.trim(), {
          type: "websearch",
          config: "english",
        });
      }

      // Pagination
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to).order("created_at", { ascending: false });

      const { data, error: dbError, count } = await query;
      if (dbError) throw dbError;

      const mapped = (data || []).map(mapListing);
      setListings(mapped);
      setTotal(count || 0);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoryId, subcategoryId, search, page]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return { listings, total, loading, error, refetch: fetchListings };
};
