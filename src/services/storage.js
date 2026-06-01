import { supabase } from "./supabase.js";
import { MAX_FILE_SIZE_MB } from "../constants/index.js";

const BUCKET = "listing-images";

/**
 * Upload a single File object to Supabase Storage.
 * Returns the public URL.
 */
export async function uploadImage(file, userId) {
  // Validate size
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new Error(`Image exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
  }
  // Validate type
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  const ext = file.name.split(".").pop().toLowerCase();
  const filename = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, { upsert: false, contentType: file.type });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

/**
 * Upload multiple File objects with progress callback.
 * onProgress(completed, total)
 */
export async function uploadImages(files, userId, onProgress) {
  const urls = [];
  for (let i = 0; i < files.length; i++) {
    const url = await uploadImage(files[i], userId);
    urls.push(url);
    onProgress?.(i + 1, files.length);
  }
  return urls;
}

/**
 * Delete an image by its public URL.
 */
export async function deleteImage(publicUrl) {
  // Extract path from public URL
  const url = new URL(publicUrl);
  const pathParts = url.pathname.split(`/object/public/${BUCKET}/`);
  if (pathParts.length < 2) return;
  const filePath = pathParts[1];

  const { error } = await supabase.storage.from(BUCKET).remove([filePath]);
  if (error) console.warn("Image delete failed:", error.message);
}
