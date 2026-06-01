// src/hooks/useCategories.js
import { useState, useEffect } from "react";
import { fetchCategories, fetchSubcategories } from "../services/categories.js";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        let [cats, subs] = await Promise.all([
          fetchCategories(),
          fetchSubcategories(),
        ]);
        // Sort categories by display_order (ascending)
        cats = cats.sort((a, b) => a.display_order - b.display_order);
        setCategories(cats);
        setSubcategories(subs);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { categories, subcategories, loading, error };
};
