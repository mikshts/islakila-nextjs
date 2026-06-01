"use client";

import { useState, useEffect, memo, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Search,
  ChevronRight,
  Waves,
  Building,
  MapPin,
  Utensils,
  Car,
  Bed,
  Briefcase,
  ShoppingBag,
} from "lucide-react";

// --- TEMPORARY MOCKS FOR DRAG & DROP COMPONENTS ---
// Swap these imports once you copy your old component files into src/components/
const ListingCard = ({ item, onView }) => (
  <div
    onClick={() => onView(item)}
    className="p-4 bg-white border rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-shadow">
    <div className="h-40 bg-gray-100 rounded-lg mb-2 overflow-hidden">
      {item.images?.[0] && (
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      )}
    </div>
    <h4 className="font-bold text-gray-800">{item.title}</h4>
    <p className="text-xs text-gray-400">📍 {item.location}</p>
    <p className="text-emerald-600 font-bold text-sm mt-1">
      ₱{item.price || "Contact"}
    </p>
  </div>
);
const SkeletonGrid = () => (
  <div className="p-4 text-center text-gray-400">
    Loading dynamic listings...
  </div>
);
const LocationSuggestions = () => null;
const LoginPromptModal = () => null;

const BEACH_IMAGES = [
  "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80",
];

const getCategoryIcon = (categoryName) => {
  const iconMap = {
    Rentals: MapPin,
    "Food & Dining": Utensils,
    Transport: Car,
    Stay: Bed,
    Services: Briefcase,
    Marketplace: ShoppingBag,
    Properties: Building,
    "Tourist Attractions": Waves,
  };
  const Icon = iconMap[categoryName] || MapPin;
  return <Icon className="w-4 h-4 text-white" />;
};

export const HomePage = memo(() => {
  const router = useRouter();

  // Basic Local State Definitions
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [listings, setListings] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 9;
  const featuredSectionRef = useRef(null);

  // 1. Core Authentication Monitor Tracking
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

  // 2. Fetch Categories & Initial Live Sample Listings
  useEffect(() => {
    async function fetchMetadataAndListings() {
      try {
        const { data: catData } = await supabase
          .from("categories")
          .select("*")
          .order("display_order", { ascending: true });
        setCategories(catData || []);

        const { data: listData } = await supabase
          .from("listings")
          .select("*")
          .limit(itemsPerPage)
          .order("created_at", { ascending: false });
        setListings(listData || []);

        if (catData) {
          const counts = {};
          for (const cat of catData) {
            const { count } = await supabase
              .from("listings")
              .select("*", { count: "exact", head: true })
              .eq("category_id", cat.id);
            counts[cat.id] = count || 0;
          }
          setCategoryCounts(counts);
        }
      } catch (err) {
        console.error("Home initialization failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMetadataAndListings();
  }, []);

  // 3. Carousel Background Frame Tick Interval Trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % BEACH_IMAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const sortedFeaturedListings = useMemo(() => {
    if (!user?.id) return listings;
    const nonOwned = listings.filter((listing) => listing.user_id !== user.id);
    const owned = listings.filter((listing) => listing.user_id === user.id);
    return [...nonOwned, ...owned];
  }, [listings, user]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased">
      {/* HERO HERO SECTION */}
      <section className="relative text-white py-28 px-4 overflow-visible min-h-[520px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-slate-950">
          {BEACH_IMAGES.map((imgUrl, index) => (
            <div
              key={imgUrl}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${imgUrl})`,
                opacity: activeIndex === index ? 1 : 0,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/40 to-gray-50 backdrop-blur-[0.5px] z-10" />

        <div className="relative max-w-4xl mx-auto text-center z-40 space-y-6">
          <p className="text-sky-400 text-xs font-bold tracking-[0.25em] uppercase drop-shadow-sm">
            Bantayan Island Marketplace
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] max-w-2xl mx-auto">
            Discover Your Paradise Corner 🌴
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] pb-4">
            Connect directly with verified owners to buy, sell, or rent premium
            beach lots, resorts, and local properties.
          </p>

          {/* Search Inputs Container */}
          <div className="relative z-50 max-w-xl mx-auto flex flex-col sm:flex-row gap-2 bg-white/95 hover:bg-white backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white/20">
            <div className="flex-1 relative z-50">
              <input
                className="w-full px-4 py-3 text-slate-900 text-sm outline-none bg-transparent placeholder-slate-400 font-semibold"
                placeholder="What type of property are you looking for?"
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() =>
                router.push(
                  `/listings?search=${encodeURIComponent(searchQuery)}`,
                )
              }
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold px-7 py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 flex-shrink-0 shadow-lg shadow-blue-600/40 z-50">
              <Search className="w-4 h-4 stroke-[2.5]" /> Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* Categories View Filter Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
            Browse by Category 🗺️
          </h2>
        </div>

        <div className="grid auto-cols-[minmax(160px,auto)] grid-flow-col grid-rows-2 gap-4 overflow-x-auto pb-2 sm:grid sm:grid-flow-row sm:grid-cols-2 md:grid-cols-4 sm:overflow-visible">
          {categories.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => router.push(`/listings?category=${cat.slug}`)}
                className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  {getCategoryIcon(cat.name)}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm tracking-tight group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {count} {count === 1 ? "listing" : "listings"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Grid Section Layout */}
      <section
        ref={featuredSectionRef}
        className="relative z-10 max-w-5xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
            Featured Listings ✨
          </h2>
          <Link
            href="/listings"
            className="text-blue-600 text-xs font-bold uppercase tracking-wider hover:text-blue-700 flex items-center gap-0.5 group">
            View all
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFeaturedListings.map((item) => (
              <ListingCard
                key={item.id}
                item={item}
                onView={(l) => router.push(`/listings/${l.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
