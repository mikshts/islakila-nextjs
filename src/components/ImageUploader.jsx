import { memo, useRef, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { SafeImage } from "./SafeImage.jsx";
import { MAX_IMAGES, MAX_FILE_SIZE_MB } from "../constants/index.js";

export const ImageUploader = memo(({ hook, disabled }) => {
  const ref = useRef();

  const handleFiles = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      hook.addFiles(files);
      e.target.value = "";
    },
    [hook],
  );

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        ref={ref}
        className="hidden"
        onChange={handleFiles}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={disabled || hook.count >= MAX_IMAGES}
        className="w-full border-2 border-dashed border-gray-200 rounded-2xl py-5 flex flex-col items-center gap-1.5 hover:border-blue-400 hover:bg-blue-50/50 transition-all bg-gray-50/30 group disabled:opacity-50 disabled:cursor-not-allowed">
        <Upload className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
          Upload photos ({hook.count}/{MAX_IMAGES})
        </span>
        <span className="text-[10px] text-gray-400">
          JPG, PNG, WEBP · max {MAX_FILE_SIZE_MB}MB each
        </span>
      </button>

      {/* Upload progress bar */}
      {hook.uploading && hook.uploadProgress && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Uploading images…</span>
            <span>
              {hook.uploadProgress.done}/{hook.uploadProgress.total}
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{
                width: `${(hook.uploadProgress.done / hook.uploadProgress.total) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {hook.count > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-3">
          {hook.previewUrls.map((src, i) => (
            <div
              key={i}
              className={`relative group aspect-square rounded-xl overflow-hidden border-2 transition-colors ${i === 0 ? "border-blue-500" : "border-transparent"}`}>
              <SafeImage
                src={src}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] font-bold text-white bg-blue-600/80 py-0.5">
                  Cover
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => hook.setCover(i)}
                    className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">
                    Cover
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => hook.remove(i)}
                  className="w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
