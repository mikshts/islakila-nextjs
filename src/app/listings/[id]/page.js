"use client";

import { useState, useRef, useCallback, memo, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
import {
  ArrowLeft,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  MessageSquare,
  Star,
  MessageCircle,
  Send,
} from "lucide-react";

// --- TEMPORARY STRUCTURAL MOCKS FOR STABILITY ---
// Replace these with your real file paths when you copy the files into src/components/
const SafeImage = ({ src, alt, className, style }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    style={style}
    onError={(e) => {
      e.target.src =
        "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=800";
    }}
  />
);
const StarRating = ({ rating, interactive, onRate, size }) => (
  <div className="flex text-amber-400 gap-0.5">
    ★ <span className="text-gray-600 text-xs font-semibold ml-1">{rating}</span>
  </div>
);
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=800";
const getFieldsForSubcategory = () => [];
const submitRating = async () => ({ averageRating: 5, ratingCount: 1 });

// Helper to display price from attributes based on subcategory
const getDisplayPrice = (listing) => {
  if (!listing) return "Contact for price";
  const sub = listing.subcategory_name || "";
  const attrs = listing.attributes || {};

  const priceFieldMap = {
    Motorbike: "price_per_day",
    Scooter: "price_per_day",
    Bicycle: "price_per_hour",
    "E-Bike": "price_per_hour",
    Car: "price_per_day",
    SUV: "price_per_day",
    Van: "price_per_day",
    Tricycle: "price_per_trip",
    Boat: "price_per_day",
    "Jet Ski": "price_per_hour",
    Kayak: "price_per_hour",
    Paddleboard: "price_per_hour",
    Room: "price_per_night",
    "Apartment Rental": "price_per_night",
    Cottage: "price_per_night",
    "Beach House": "price_per_night",
    Hotel: "nightly_rate",
    Homestay: "nightly_rate",
    Airbnb: "nightly_rate",
    Villa: "nightly_rate",
    Seafood: "price_per_kg",
    Souvenirs: "price",
    "Beach Lot": "price_per_sqm",
    House: "price",
    Beaches: "entrance_fee",
    Resorts: "day_use_fee",
    Sandbars: "boat_fee",
  };

  let field =
    priceFieldMap[sub] ||
    (attrs.price !== undefined ? "price" : "price_per_night");
  let value = attrs[field];

  if (value === undefined || value === null) {
    const possible = [
      "price",
      "price_per_night",
      "price_per_day",
      "nightly_rate",
      "entrance_fee",
    ];
    for (let p of possible) {
      if (attrs[p] !== undefined) {
        value = attrs[p];
        break;
      }
    }
  }

  if (value === undefined) return "Contact for price";
  if (typeof value === "string" && value.includes("₱")) return value;
  const num = Number(value);
  return isNaN(num) ? value : `₱${num.toLocaleString()}`;
};

// ---------- Lightbox Modal Component ----------
const LightboxModal = memo(({ images, title, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(null);

  const prev = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    },
    [images.length],
  );

  const next = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentIndex((i) => (i + 1) % images.length);
    },
    [images.length],
  );

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[2000] flex flex-col justify-between select-none"
      onClick={onClose}>
      <div className="w-full p-3 flex justify-between items-center text-white bg-gradient-to-b from-black/70 to-transparent">
        <p className="text-xs font-semibold truncate max-w-[70%]">
          {title} ({currentIndex + 1} / {images.length})
        </p>
        <button
          onClick={onClose}
          className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="relative flex-1 w-full flex items-center justify-center px-4">
        <img
          src={images[currentIndex]}
          alt="Zoomed View"
          className="max-w-full max-h-[65vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 text-white rounded-full flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 text-white rounded-full flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
});

// ---------- Image Slider Component ----------
const ImageSlider = memo(({ images, title, onImageClick }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const prev = useCallback(
    () => setSliderIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setSliderIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  return (
    <div className="relative w-full h-64 sm:h-80 bg-gray-100 overflow-hidden select-none group/slider">
      <div
        className="flex h-full transition-transform duration-300 ease-out cursor-pointer"
        onClick={() => onImageClick(sliderIndex)}
        style={{ transform: `translateX(-${sliderIndex * 100}%)` }}>
        {images.map((src, i) => (
          <SafeImage
            key={i}
            src={src}
            alt={`${title} ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            style={{ minWidth: "100%" }}
          />
        ))}
      </div>
      <button
        onClick={() => onImageClick(sliderIndex)}
        className="absolute top-2 left-2 bg-black/50 text-white p-1.5 rounded-lg text-[10px] flex items-center gap-1 opacity-0 group-hover/slider:opacity-100 transition-opacity">
        <Maximize2 className="w-3 h-3" /> Tap to View
      </button>
      {hasMultiple && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
});

// ---------- Main DetailPage File Container ----------
export default function DetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise); // Safely unwrap Next.js Dynamic route params
  const router = useRouter();

  const [currentListing, setCurrentListing] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    index: 0,
  });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  // 1. Core Auth Session Observer
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Listing Record Natively based on Route parameters id
  useEffect(() => {
    if (!params?.id) return;
    async function getCompleteListingData() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("listings")
          .select("*")
          .eq("id", params.id)
          .maybeSingle();
        if (error) throw error;
        if (data) {
          setCurrentListing(data);

          // Cascading fetch for related comments
          const { data: commentData } = await supabase
            .from("comments")
            .select("*")
            .eq("listing_id", data.id)
            .order("created_at", { ascending: false });
          setComments(commentData || []);
        }
      } catch (err) {
        console.error("Error gathering listing parameters:", err);
      } finally {
        setLoading(false);
      }
    }
    getCompleteListingData();
  }, [params?.id]);

  const handleAddComment = async () => {
    if (!user || !newComment.trim()) return;
    setSubmittingComment(true);
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          listing_id: currentListing.id,
          user_id: user.id,
          content: newComment.trim(),
        })
        .select()
        .single();
      if (error) throw error;
      setComments((prev) => [data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const openLightbox = useCallback(
    (index) => setLightboxState({ isOpen: true, index }),
    [],
  );
  const closeLightbox = useCallback(
    () => setLightboxState((prev) => ({ ...prev, isOpen: false })),
    [],
  );

  if (loading || !currentListing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded-2xl w-full"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  const images = currentListing?.images?.length
    ? currentListing.images
    : [DEFAULT_IMAGE];

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <Link
        href="/listings"
        className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-blue-600 mb-3 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Directory
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <ImageSlider
          images={images}
          title={currentListing.title}
          onImageClick={openLightbox}
        />

        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-1 text-[11px] text-gray-500 mb-2">
            <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-medium">
              {currentListing.subcategory_name || "General"}
            </span>
            <span className="ml-auto text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
              {currentListing.status || "Active"}
            </span>
          </div>

          <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-0.5">
            {currentListing.title}
          </h2>
          <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
            <MapPin className="w-3.5 h-3.5 text-gray-300" />{" "}
            {currentListing.location}
          </p>

          <div className="border-t pt-4">
            <p className="text-xs text-gray-400 uppercase font-semibold">
              Listed Price
            </p>
            <p className="text-xl font-black text-blue-600">
              {getDisplayPrice(currentListing)}
            </p>
          </div>

          {/* Render description safely */}
          {currentListing.desc && (
            <div className="border-t mt-4 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {currentListing.desc}
              </p>
            </div>
          )}

          {/* Comments section interface handling */}
          <div className="border-t mt-6 pt-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Community Comments ({comments.length})
            </h3>

            {user ? (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Ask a question about this listing..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-xl text-sm outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleAddComment}
                  disabled={submittingComment}
                  className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p className="text-xs text-gray-400 mb-4 bg-gray-50 p-2.5 rounded-xl">
                Please sign in to drop questions or submit dynamic responses.
              </p>
            )}

            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="bg-gray-50 p-3 rounded-xl text-xs">
                  <p className="font-bold text-gray-700 mb-0.5">
                    User_{c.user_id?.slice(0, 5)}
                  </p>
                  <p className="text-gray-600">{c.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxState.isOpen && (
        <LightboxModal
          images={images}
          title={currentListing.title}
          initialIndex={lightboxState.index}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
