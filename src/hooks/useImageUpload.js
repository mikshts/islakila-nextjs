import { useState, useCallback, useRef } from "react";
import { uploadImages } from "../services/storage.js";
import { MAX_IMAGES, MAX_FILE_SIZE_MB } from "../constants/index.js";

/**
 * Manages a mixed array of:
 *  - existing URLs (strings, already uploaded)
 *  - pending File objects (not yet uploaded)
 *
 * Call `commitUploads(userId)` before saving to DB — it uploads
 * all pending Files and returns a final URL-only array.
 */
export function useImageUpload(initialUrls = []) {
  // Each item: { type: "url", value: string } | { type: "file", value: File, preview: string }
  const [items, setItems] = useState(
    initialUrls.map((u) => ({ type: "url", value: u })),
  );
  const [uploadProgress, setUploadProgress] = useState(null); // { done, total }
  const [uploading, setUploading] = useState(false);

  const previewUrls = items.map((item) =>
    item.type === "url" ? item.value : item.preview,
  );

  const addFiles = useCallback(
    (files) => {
      const filtered = files.filter((f) => {
        if (!f.type.startsWith("image/")) return false;
        if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) return false;
        return true;
      });

      if (items.length + filtered.length > MAX_IMAGES) {
        filtered.splice(MAX_IMAGES - items.length);
      }

      const newItems = filtered.map((f) => ({
        type: "file",
        value: f,
        preview: URL.createObjectURL(f),
      }));

      setItems((prev) => [...prev, ...newItems]);
    },
    [items.length],
  );

  const remove = useCallback((index) => {
    setItems((prev) => {
      const copy = [...prev];
      const removed = copy.splice(index, 1)[0];
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      return copy;
    });
  }, []);

  const setCover = useCallback((index) => {
    setItems((prev) => {
      const copy = [...prev];
      const [target] = copy.splice(index, 1);
      copy.unshift(target);
      return copy;
    });
  }, []);

  const reset = useCallback((urls = []) => {
    setItems(urls.map((u) => ({ type: "url", value: u })));
  }, []);

  /**
   * Upload any pending File items to Supabase Storage.
   * Returns final array of public URLs (preserves order).
   */
  const commitUploads = useCallback(
    async (userId) => {
      const pendingFiles = items
        .map((item, i) => ({ item, i }))
        .filter(({ item }) => item.type === "file");

      if (!pendingFiles.length) {
        return items.map((item) => item.value);
      }

      setUploading(true);
      setUploadProgress({ done: 0, total: pendingFiles.length });

      try {
        const files = pendingFiles.map(({ item }) => item.value);
        const urls = await uploadImages(files, userId, (done, total) => {
          setUploadProgress({ done, total });
        });

        // Merge uploaded URLs back into items order
        let urlIdx = 0;
        const final = items.map((item) => {
          if (item.type === "url") return item.value;
          return urls[urlIdx++];
        });

        setItems(final.map((u) => ({ type: "url", value: u })));
        return final;
      } finally {
        setUploading(false);
        setUploadProgress(null);
      }
    },
    [items],
  );

  return {
    items,
    previewUrls,
    addFiles,
    remove,
    setCover,
    reset,
    commitUploads,
    uploading,
    uploadProgress,
    count: items.length,
  };
}
