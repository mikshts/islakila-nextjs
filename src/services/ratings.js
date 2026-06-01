import { supabase } from "./supabase.js"; // ✅ same folder

export async function submitRating(listingId, userId, rating) {
  // 1. Upsert rating (insert or update)
  const { error: upsertError } = await supabase
    .from("ratings")
    .upsert(
      { listing_id: listingId, user_id: userId, score: rating },
      { onConflict: "listing_id, user_id" },
    );

  if (upsertError) {
    console.error("Rating upsert error:", upsertError);
    throw new Error(upsertError.message);
  }

  // 2. Fetch updated listing stats
  const { data: listing, error: fetchError } = await supabase
    .from("listings")
    .select("average_rating, rating_count")
    .eq("id", listingId)
    .single();

  if (fetchError) {
    console.error("Fetch listing stats error:", fetchError);
    throw new Error(fetchError.message);
  }

  return {
    averageRating: listing.average_rating || 0,
    ratingCount: listing.rating_count || 0,
  };
}

export async function getUserRating(listingId, userId) {
  const { data, error } = await supabase
    .from("ratings")
    .select("score")
    .eq("listing_id", listingId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data?.score || null;
}
