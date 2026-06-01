// src/services/listings.js
import { supabase } from "./supabase.js";
import { mapListing, mapFormToDb } from "./index.js";
import { PAGE_SIZE } from "../constants/index.js";

// ─── FETCH (dynamic categories) ──────────────────────────────────────────────
export async function fetchListings({
  categoryId = null,
  subcategoryId = null,
  search = "",
  page = 0,
} = {}) {
  let query = supabase
    .from("listings_with_names")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }
  if (subcategoryId) {
    query = query.eq("subcategory_id", subcategoryId);
  }

  // ✅ Use Supabase's built-in full‑text search with 'websearch' type
  // This safely handles punctuation, spaces, and special characters
  if (search && search.trim()) {
    query = query.textSearch("search_vector", search.trim(), {
      type: "websearch",
      config: "english",
    });
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { listings: (data || []).map(mapListing), total: count ?? 0 };
}

export async function fetchListingById(id) {
  const { data, error } = await supabase
    .from("listings_with_names")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return mapListing(data);
}

export async function fetchUserListings(userId) {
  const { data, error } = await supabase
    .from("listings_with_names")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapListing);
}

// ─── CREATE ───────────────────────────────────────────────────────────────────
export async function createListing(form, userId) {
  const payload = mapFormToDb(form, userId);
  const { data, error } = await supabase
    .from("listings")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return mapListing(data);
}

// ─── UPDATE ───────────────────────────────────────────────────────────────────
export async function updateListing(id, form, userId) {
  const payload = mapFormToDb(form, userId);
  const { data, error } = await supabase
    .from("listings")
    .update(payload)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw error;
  return mapListing(data);
}

// ─── DELETE ───────────────────────────────────────────────────────────────────
export async function deleteListing(id, userId) {
  const { error } = await supabase
    .from("listings")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw error;
}

// ─── WISHLIST ─────────────────────────────────────────────────────────────────
export async function fetchUserWishlist(userId) {
  const { data, error } = await supabase
    .from("wishlists")
    .select("listing_id")
    .eq("user_id", userId);
  if (error) throw error;
  return data.map((r) => r.listing_id);
}

export async function toggleWishlistItem(userId, listingId, isCurrentlyWished) {
  if (isCurrentlyWished) {
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", userId)
      .eq("listing_id", listingId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("wishlists")
      .insert({ user_id: userId, listing_id: listingId });
    if (error) throw error;
  }
}
