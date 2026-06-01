"use client";

import { useState, useCallback, memo, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

// Components & Hooks
import { PhoneInput } from "@/components/PhoneInput";
import { ImageUploader } from "@/components/ImageUploader";
import { LocationSuggestions } from "@/components/LocationSuggestions";
import { MapPicker } from "@/components/MapPicker";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useCategories } from "@/hooks/useCategories";

// Services & Constants
import {
  createListing,
  updateListing,
  fetchListingById,
} from "@/services/listings";
import { validatePhone } from "@/services/index";
import { getFieldsForSubcategory } from "@/constants/index";

const EMPTY_FORM = {
  title: "",
  location: "",
  desc: "",
  category_id: "",
  subcategory_id: "",
  status: "For Sale",
  contactNumber: "",
  latitude: null,
  longitude: null,
  attributes: {},
};

export const PostListingPage = memo(({ onToast, user }) => {
  const router = useRouter();
  const params = useParams();

  // Detect edit mode if an ID parameter is present in the route URL string
  const editId = params?.id;
  const isEdit = !!editId;

  const {
    categories,
    subcategories,
    loading: categoriesLoading,
  } = useCategories();
  const [initialLoading, setInitialLoading] = useState(isEdit);

  // Form states
  const [form, setForm] = useState(EMPTY_FORM);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showLocSuggestions, setShowLocSugg] = useState(false);

  // Image upload hook tracking state
  const imageHook = useImageUpload([]);
  const resetImagesRef = useRef(null);
  resetImagesRef.current = imageHook.resetImages;

  // Handle Fetching Listing Details securely if in Edit mode
  useEffect(() => {
    if (!isEdit) {
      setForm(EMPTY_FORM);
      setShowMapPicker(false);
      if (resetImagesRef.current) resetImagesRef.current([]);
      return;
    }

    const loadListingDetails = async () => {
      try {
        setInitialLoading(true);
        const editListing = await fetchListingById(editId);

        if (editListing) {
          setForm({
            title: editListing.title || "",
            location: editListing.location || "",
            desc: editListing.desc || "",
            category_id: editListing.category_id || "",
            subcategory_id: editListing.subcategory_id || "",
            status: editListing.status || "For Sale",
            contactNumber: editListing.contactNumber || "",
            latitude: editListing.latitude || null,
            longitude: editListing.longitude || null,
            attributes: editListing.attributes || {},
          });
          setShowMapPicker(!!(editListing.latitude && editListing.longitude));
          if (resetImagesRef.current) {
            resetImagesRef.current(editListing.images || []);
          }
        }
      } catch (err) {
        onToast?.(
          err.message || "Failed to load listing metrics data.",
          "error",
        );
        router.push("/");
      } finally {
        setInitialLoading(false);
      }
    };

    loadListingDetails();
  }, [editId, isEdit, router, onToast]);

  // Derived taxonomy data mapping arrays
  const availableSubcategories = subcategories.filter(
    (s) => s.category_id === form.category_id,
  );
  const selectedSubcategory = subcategories.find(
    (s) => s.id === form.subcategory_id,
  );
  const dynamicFields = getFieldsForSubcategory(
    selectedSubcategory?.name || "",
  );

  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAttributeChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      attributes: { ...prev.attributes, [key]: value },
    }));
  };

  const handleMapLocation = useCallback(
    (coords) => {
      update("latitude", coords.lat);
      update("longitude", coords.lng);
    },
    [update],
  );

  const handleClearMap = useCallback(() => {
    update("latitude", null);
    update("longitude", null);
    setShowMapPicker(false);
  }, [update]);

  const handleCancelNavigation = () => {
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      onToast?.(
        "You must be logged in to process this marketplace transaction.",
        "error",
      );
      return;
    }

    if (!validatePhone(form.contactNumber)) {
      setPhoneError("Enter a valid PH format: 09XXXXXXXXX or +639XXXXXXXXX");
      return;
    }

    if (imageHook.count === 0) {
      onToast?.("Please upload at least one presentation photo.", "error");
      return;
    }

    if (!form.category_id || !form.subcategory_id) {
      onToast?.("Please assign structural category nodes.", "error");
      return;
    }

    setPhoneError("");
    setSubmitting(true);

    try {
      const imageUrls = await imageHook.commitUploads(user.id);
      const formWithImages = { ...form, images: imageUrls };

      if (isEdit) {
        await updateListing(editId, formWithImages, user.id);
        onToast?.("Property details modified successfully!", "success");
      } else {
        await createListing(formWithImages, user.id);
        onToast?.("Property listed live on the marketplace!", "success");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      onToast?.(
        err.message || "An unexpected transaction error has occurred.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (categoriesLoading || initialLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 font-sans bg-gray-50/50">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 p-8 shadow-gray-100/40">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {isEdit ? "Edit Listing" : "Post a New Listing"}
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-medium">
            {isEdit
              ? "Modify your property metadata parameters."
              : "List your asset configuration on Bantayan's #1 marketplace."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Listing Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Stunning Beachfront Lot"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>

          {/* Location lookup */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Location (Barangay) *
            </label>
            <input
              type="text"
              required
              placeholder="Type barangay name..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
              value={form.location}
              onFocus={() => setShowLocSugg(true)}
              onBlur={() => setTimeout(() => setShowLocSugg(false), 200)}
              onChange={(e) => update("location", e.target.value)}
            />
            <LocationSuggestions
              query={form.location}
              show={showLocSuggestions}
              onSelect={(s) => update("location", s)}
            />
          </div>

          {/* Business Status Variant */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Status Option
            </label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white transition-all font-medium cursor-pointer"
              value={form.status}
              onChange={(e) => update("status", e.target.value)}>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
              <option value="For Walk-ins">For Walk-ins</option>
            </select>
          </div>

          {/* Category Selector Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Category *
              </label>
              <select
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white transition-all font-medium cursor-pointer"
                value={form.category_id}
                onChange={(e) => {
                  const catId = e.target.value;
                  update("category_id", catId);
                  update("subcategory_id", "");
                  update("attributes", {});
                }}>
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Subcategory *
              </label>
              <select
                required
                disabled={!form.category_id}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white transition-all font-medium disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer"
                value={form.subcategory_id}
                onChange={(e) => {
                  const subId = e.target.value;
                  update("subcategory_id", subId);
                  update("attributes", {});
                }}>
                <option value="">Select subcategory...</option>
                {availableSubcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dynamic Attribute Section */}
          {dynamicFields.length > 0 && (
            <div className="border-t border-gray-100 pt-4 mt-2">
              <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                Specific Dynamic Specifications
              </p>
              <div className="space-y-3.5">
                {dynamicFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      {field.label} {field.required && "*"}
                    </label>

                    {field.type === "text" ||
                    field.type === "number" ||
                    field.type === "date" ? (
                      <input
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder || ""}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
                        value={form.attributes[field.name] || ""}
                        onChange={(e) =>
                          handleAttributeChange(field.name, e.target.value)
                        }
                      />
                    ) : field.type === "select" ? (
                      <select
                        required={field.required}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white transition-all font-medium cursor-pointer"
                        value={form.attributes[field.name] || ""}
                        onChange={(e) =>
                          handleAttributeChange(field.name, e.target.value)
                        }>
                        <option value="">Select options...</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "checkbox" ? (
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={form.attributes[field.name] || false}
                          onChange={(e) =>
                            handleAttributeChange(field.name, e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 accent-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Yes / Confirm
                        </span>
                      </label>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Input */}
          <PhoneInput
            value={form.contactNumber}
            onChange={(v) => {
              update("contactNumber", v);
              if (phoneError) setPhoneError("");
            }}
            error={phoneError}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Detailed Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe your property, title papers state, landmarks, accessible roads..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none font-medium"
              value={form.desc}
              onChange={(e) => update("desc", e.target.value)}
            />
          </div>

          {/* Embedded Geospatial Engine */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-gray-700">
                Geospatial Coordinates Map Anchor (Optional)
              </label>
              {!showMapPicker ? (
                <button
                  type="button"
                  onClick={() => setShowMapPicker(true)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer">
                  <MapPin className="w-3.5 h-3.5" /> Pin structural anchor
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClearMap}
                  className="text-xs text-rose-500 hover:text-rose-600 font-bold cursor-pointer">
                  Remove Map Node
                </button>
              )}
            </div>

            {showMapPicker && (
              <div className="space-y-1.5 animate-in fade-in duration-200">
                <MapPicker
                  onLocationChange={handleMapLocation}
                  initialLatLng={
                    form.latitude && form.longitude
                      ? { lat: form.latitude, lng: form.longitude }
                      : null
                  }
                />
                <p className="text-xs text-gray-400 font-medium">
                  Click directly inside your target plot boundary coordinates to
                  anchor the pin placement.
                </p>
              </div>
            )}
          </div>

          {/* Image Upload Core Context */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Asset Presentation Galleries *
            </label>
            <ImageUploader hook={imageHook} disabled={submitting} />
          </div>

          {/* Form Processing Submits */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={handleCancelNavigation}
              className="flex-1 border border-gray-200 py-3 rounded-2xl text-sm font-bold hover:bg-gray-50 active:bg-gray-100 transition-all cursor-pointer text-gray-600">
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white py-3 rounded-2xl text-sm font-bold hover:bg-blue-700 active:bg-blue-800 active:scale-[0.99] transition-all shadow-md shadow-blue-200/50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting
                ? imageHook.uploading
                  ? "Uploading Media Payload..."
                  : "Syncing DB Rows..."
                : isEdit
                  ? "Save Target Alterations"
                  : "Publish Live Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

PostListingPage.displayName = "PostListingPage";
export default PostListingPage;
