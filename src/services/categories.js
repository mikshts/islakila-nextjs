// src/services/categories.js
import { supabase } from "./supabase.js";

let categoriesCache = null;
let subcategoriesCache = null;

export const fetchCategories = async () => {
  if (categoriesCache) return categoriesCache;
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  categoriesCache = data;
  return data;
};

export const fetchSubcategories = async () => {
  if (subcategoriesCache) return subcategoriesCache;
  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  subcategoriesCache = data;
  return data;
};

export const getSubcategoriesForCategory = (categoryId, allSubcategories) => {
  return allSubcategories.filter((sub) => sub.category_id === categoryId);
};

export const clearCategoriesCache = () => {
  categoriesCache = null;
  subcategoriesCache = null;
};
