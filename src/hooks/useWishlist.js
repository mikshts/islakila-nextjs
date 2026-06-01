import { useState, useEffect, useCallback } from "react";
import { fetchUserWishlist, toggleWishlistItem } from "../services/listings.js";

export function useWishlist(user) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    fetchUserWishlist(user.id)
      .then(setWishlist)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const toggle = useCallback(
    async (listingId) => {
      if (!user) return false; // not logged in
      const isWished = wishlist.includes(listingId);
      // Optimistic update
      setWishlist((prev) =>
        isWished ? prev.filter((id) => id !== listingId) : [...prev, listingId],
      );
      try {
        await toggleWishlistItem(user.id, listingId, isWished);
      } catch {
        // Rollback
        setWishlist((prev) =>
          isWished
            ? [...prev, listingId]
            : prev.filter((id) => id !== listingId),
        );
      }
      return !isWished;
    },
    [user, wishlist],
  );

  return { wishlist, toggle, loading };
}
