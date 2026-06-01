// src/services/index.js
import { supabase } from "./supabase.js";

export const formatPhoneForDisplay = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11 && cleaned.startsWith("09")) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  if (cleaned.length === 13 && cleaned.startsWith("639")) {
    const local = "0" + cleaned.slice(2);
    return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
  }
  return phone;
};

export const validatePhone = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, "");
  return (
    (cleaned.length === 11 && cleaned.startsWith("09")) ||
    (cleaned.length === 13 && cleaned.startsWith("639"))
  );
};

export const sanitizePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
};

export const mapFormToDb = (form, userId) => {
  const {
    title,
    location,
    price,
    description,
    status,
    contact_number,
    category_id,
    subcategory_id,
    images = [],
    latitude,
    longitude,
    ...dynamicFields
  } = form;

  const fixedFields = [
    "title",
    "location",
    "price",
    "description",
    "status",
    "contact_number",
    "category_id",
    "subcategory_id",
    "images",
    "latitude",
    "longitude",
    "user_id",
  ];
  const attributes = {};
  for (const [key, value] of Object.entries(dynamicFields)) {
    if (!fixedFields.includes(key) && value !== undefined && value !== "") {
      attributes[key] = value;
    }
  }

  return {
    title,
    location,
    price,
    description,
    status: status || "For Sale",
    contact_number: contact_number || null,
    images: images || [],
    user_id: userId,
    category_id,
    subcategory_id,
    attributes: Object.keys(attributes).length > 0 ? attributes : {},
    latitude: latitude || null,
    longitude: longitude || null,
  };
};
// src/services/index.js

export const mapListing = (dbListing) => {
  if (!dbListing) return null;
  const {
    attributes = {},
    contact_number,
    wishlist_count,
    created_at,
    user_id,
    average_rating, // ← add this
    rating_count, // ← add this
    ...rest
  } = dbListing;
  return {
    ...rest,
    contactNumber: contact_number,
    wishlistCount: wishlist_count,
    createdAt: created_at,
    userId: user_id,
    averageRating: average_rating ?? 0, // ← map to camelCase
    ratingCount: rating_count ?? 0, // ← map to camelCase
    ...attributes,
  };
};

export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data || [];
};

export const fetchSubcategories = async () => {
  const { data, error } = await supabase
    .from("subcategories")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return data || [];
};
