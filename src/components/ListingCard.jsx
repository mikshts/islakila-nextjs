// src/components/ListingCard.jsx
import { memo } from "react";
import { MapPin, Heart, ChevronRight } from "lucide-react";
import { SafeImage } from "./SafeImage.jsx";
import { DEFAULT_IMAGE } from "../constants/index.js";
import { StarRating } from "./StarRating.jsx";

// Helper to extract dynamic highlights from attributes (updated for new schema)
const getHighlights = (item) => {
  const attrs = item.attributes || {};
  const sub = item.subcategory_name || "";
  const highlights = [];

  // Rentals
  if (sub === "Motorbike") {
    if (attrs.transmission) highlights.push(attrs.transmission);
    if (attrs.engine_cc) highlights.push(`${attrs.engine_cc}cc`);
  } else if (sub === "Car" || sub === "Van" || sub === "SUV") {
    if (attrs.transmission) highlights.push(attrs.transmission);
    if (attrs.seats) highlights.push(`${attrs.seats} seats`);
  } else if (
    sub === "Room" ||
    sub === "Cottage" ||
    sub === "Apartment Rental"
  ) {
    if (attrs.bedrooms) highlights.push(`${attrs.bedrooms} BR`);
    if (attrs.price_per_night)
      highlights.push(`₱${attrs.price_per_night}/night`);
  } else if (sub === "Beach House" || sub === "Resort Room") {
    if (attrs.price_per_night)
      highlights.push(`₱${attrs.price_per_night}/night`);
  }

  // Food & Dining
  else if (sub === "Restaurant" && attrs.cuisine) {
    highlights.push(attrs.cuisine);
  } else if (sub === "Cafe" && attrs.coffee_types) {
    highlights.push(attrs.coffee_types.split(",")[0]);
  }

  // Properties (Resort removed)
  else if (sub === "Beach Lot") {
    if (attrs.beachfront) highlights.push("Beachfront");
    if (attrs.lot_area) highlights.push(`${attrs.lot_area} sqm`);
  } else if (sub === "House" || sub === "Beach House") {
    if (attrs.bedrooms) highlights.push(`${attrs.bedrooms} BR`);
    if (attrs.price) highlights.push(`₱${attrs.price}`);
  }

  // Tourist Attractions (new)
  else if (sub === "Beaches" && attrs.best_time_to_visit) {
    highlights.push(attrs.best_time_to_visit);
  } else if (sub === "Resorts" && attrs.day_use_fee) {
    highlights.push(`Day use ₱${attrs.day_use_fee}`);
  } else if (sub === "Sandbars" && attrs.access_method) {
    highlights.push(attrs.access_method);
  } else if (sub === "Nature Spots" && attrs.trail_difficulty) {
    highlights.push(attrs.trail_difficulty);
  } else if (sub === "Caves" && attrs.cave_length_m) {
    highlights.push(`${attrs.cave_length_m}m`);
  } else if (sub === "Historical Sites" && attrs.historical_period) {
    highlights.push(attrs.historical_period);
  } else if (sub === "Churches" && attrs.year_built) {
    highlights.push(`Built ${attrs.year_built}`);
  } else if (sub === "Gardens" && attrs.garden_type) {
    highlights.push(attrs.garden_type);
  }

  // Marketplace (Flower)
  else if (sub === "Flower" && attrs.flower_type) {
    highlights.push(attrs.flower_type);
  } else if (sub === "Seafood" && attrs.seafood_type) {
    highlights.push(attrs.seafood_type);
  }

  // If no specific highlight, try showing entrance_fee (common for tourist spots)
  if (highlights.length === 0 && attrs.entrance_fee) {
    highlights.push(`Entrance ₱${attrs.entrance_fee}`);
  }

  return highlights.slice(0, 2);
};

// ---------- COMPREHENSIVE PRICE DISPLAY (identical to DetailPage) ----------
const getDisplayPriceFromAttrs = (listing) => {
  const sub = listing.subcategory_name || "";
  const attrs = listing.attributes || {};

  const priceFieldMap = {
    // ----- Rentals -----
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
    Tent: "price_per_night",
    "Fishing Rod": "price_per_day",
    "Camping Chair": "price_per_day",
    "Camping Gear": "price_per_day",
    Surfboard: "price_per_hour",
    "Scuba Gear": "price_per_day",
    "Snorkel Gear": "price_per_day",
    Room: "price_per_night",
    "Apartment Rental": "price_per_night",
    Cottage: "price_per_night",
    "Beach House": "price_per_night",
    "Resort Room": "price_per_night",
    Truck: "price_per_day",
    ATV: "price_per_hour",
    "Golf Cart": "price_per_hour",
    "Event Equipment": "price_per_day",
    "Sound System": "price_per_day",
    "Lights & Sounds": "price_per_event",
    Generator: "price_per_day",
    Videoke: "price_per_day",
    "Tables & Chairs": "price_per_day",
    "Catering Ware": "price_per_day",
    Tools: "price_per_day",
    "Heavy Equipment": "price_per_day",

    // ----- Food & Dining -----
    Restaurant: "price_range",
    "Grilled Food": "price_per_serving",
    Carenderia: "meal_price",
    "Street Food": "price_range",
    "Seafood Store": "price_per_kg",
    Cafe: "price_range",
    Bar: "price_range",
    Restobar: "price_range",
    "Milk Tea": "price_range",
    Bakery: "price_range",
    Buffet: "price_per_person",
    Catering: "price_per_person",
    "Food Delivery": "delivery_fee",

    // ----- Transport -----
    "Port Transfer": "price_per_trip",
    "Airport Transfer": "price_per_trip",
    "Tourist Transport": "price_per_day",
    "Shuttle Service": "price_per_person",
    "Private Driver": "price_per_day",
    "Van Rental w/ Driver": "price_per_day",
    "Car Rental w/ Driver": "price_per_day",
    "Delivery Rider": "delivery_fee",
    "Hauling Service": "price_per_kg",
    "Cargo & Logistics": "price_per_kg",

    // ----- Stay (Resort and Beach Resort removed) -----
    Hotel: "nightly_rate",
    Homestay: "nightly_rate",
    Airbnb: "nightly_rate",
    Cottage: "nightly_rate",
    Hostel: "price_per_night",
    Villa: "nightly_rate",
    "Room Stay": "nightly_rate",
    "Guest House": "nightly_rate",
    "Pension House": "nightly_rate",
    Glamping: "nightly_rate",
    Cabin: "nightly_rate",
    Campsite: "price_per_tent",
    "Eco-Lodge": "nightly_rate",
    Motel: "nightly_rate",

    // ----- Services -----
    "Island Hopping": "price_per_group",
    "Tour Guide": "price_per_day",
    "Boat Tour": "price_per_group",
    "Snorkeling Guide": "price_per_hour",
    "Diving Service": "price_per_dive",
    "Fishing Tour": "price_per_group",
    "Surf Lessons": "price_per_hour",
    "Massage Service": "price_per_hour",
    "Spa & Wellness": "price_range",
    "Tattoo Service": "price_per_hour",
    Photography: "hourly_rate",
    Videography: "hourly_rate",
    "Drone Service": "price_per_hour",
    "Makeup Artist": "price_per_session",
    "Hair Stylist": "price_per_session",
    "Event Organizer": "min_budget",
    "Wedding Coordinator": "price",
    "DJ Services": "price_per_event",
    "Live Band": "price_per_event",
    "Repair Services": "hourly_rate",
    Plumbing: "hourly_rate",
    Electrical: "hourly_rate",
    "Aircon Repair": "service_fee",
    Carpentry: "hourly_rate",
    Masonry: "hourly_rate",
    "Laundry Service": "price_per_kg",
    "Cleaning Service": "price_per_hour",
    "Delivery Service": "delivery_fee",
    Barber: "price_per_haircut",
    "Nail Service": "price_manicure",
    "Salon Service": "price_range",
    "Pet Grooming": "price_per_session",
    "Vet Service": "consultation_fee",
    "Computer Repair": "hourly_rate",
    "Appliance Repair": "service_fee",
    "Auto Repair": "hourly_rate",
    "Legal & Notary": "fee",
    "Money Transfer": "fee_percentage",

    // ----- Marketplace (added Flower) -----
    Seafood: "price_per_kg",
    Souvenirs: "price",
    "Handmade Goods": "price",
    Food: "price",
    "Fresh Produce": "price_per_kg",
    "Meat & Poultry": "price_per_kg",
    Flower: "price",
    Clothing: "price",
    Shoes: "price",
    Bags: "price",
    Accessories: "price",
    Watches: "price",
    Jewelry: "price",
    Electronics: "price",
    Phones: "price",
    Tablets: "price",
    Laptops: "price",
    Computers: "price",
    Cameras: "price",
    Appliances: "price",
    Furniture: "price",
    "Home Decor": "price",
    "Construction Material": "price_per_unit",
    Hardware: "price",
    Tools: "price",
    "Farming Supplies": "price_per_unit",
    "Fishing Gear": "price",
    "Motorcycle Parts": "price",
    "Car Parts": "price",
    "Bicycle Parts": "price",
    Pets: "price",
    "Pet Supplies": "price",
    Plants: "price",
    "Gardening Supplies": "price",
    Books: "price",
    Toys: "price",
    "Musical Instruments": "price",
    "Sports Equipment": "price",
    "Health & Beauty": "price",

    // ----- Properties (Resort removed) -----
    "Beach Lot": "price_per_sqm",
    "Beach House": "price",
    House: "price",
    "Residential Lot": "price_per_sqm",
    "Commercial Lot": "price_per_sqm",
    "Farm Lot": "price",
    Hotel: "price",
    Apartment: "price",
    Condominium: "price",
    Townhouse: "price",
    "Tiny House": "price",
    "Agricultural Land": "price_per_hectare",
    "Industrial Lot": "price",
    Warehouse: "price",
    "Commercial Space": "price",
    "Boarding House": "monthly_rent",
    "Office Space": "monthly_rent",
    Building: "price",
    "Stall/Kiosk": "monthly_rent",

    // ----- Tourist Attractions -----
    Beaches: "entrance_fee",
    Resorts: "day_use_fee",
    Sandbars: "boat_fee",
    "Nature Spots": "entrance_fee",
    "Mangrove Areas": "boardwalk_fee",
    Caves: "entrance_fee",
    Lagoons: "entrance_fee",
    "Historical Sites": "entrance_fee",
    Churches: "entrance_fee",
    Gardens: "entrance_fee",
    "Scenic Viewpoints": "entrance_fee",
    "Sunset Viewpoints": "entrance_fee",
    "Marine Sanctuaries": "snorkeling_fee",
    "Instagrammable Spots": "entrance_fee",
    "Eco Parks": "entrance_fee",
    "Hidden Gems": "entrance_fee",
  };

  let field = priceFieldMap[sub];
  if (!field) {
    field = attrs.price !== undefined ? "price" : "price_per_night";
  }

  let value = attrs[field];
  if (value === undefined || value === null) {
    const possible = [
      "price",
      "price_per_night",
      "price_per_day",
      "price_per_hour",
      "nightly_rate",
      "entrance_fee",
      "day_use_fee",
      "boat_fee",
    ];
    for (let p of possible) {
      if (attrs[p] !== undefined) {
        value = attrs[p];
        break;
      }
    }
  }

  if (value === undefined) return "Contact for price";

  let suffix = "";
  if (field === "price_per_night") suffix = "/night";
  else if (field === "price_per_day") suffix = "/day";
  else if (field === "price_per_hour") suffix = "/hour";
  else if (field === "price_per_kg") suffix = "/kg";
  else if (field === "price_per_sqm") suffix = "/sqm";
  else if (field === "price_per_hectare") suffix = "/ha";
  else if (field === "price_per_trip") suffix = "/trip";
  else if (field === "price_per_group") suffix = "/group";
  else if (field === "price_per_dive") suffix = "/dive";
  else if (field === "price_per_event") suffix = "/event";
  else if (field === "price_per_session") suffix = "/session";
  else if (field === "price_per_haircut") suffix = "/haircut";
  else if (field === "monthly_rent") suffix = "/month";
  else if (field === "nightly_rate") suffix = "/night";
  else if (field === "daily_rate") suffix = "/day";
  else if (field === "hourly_rate") suffix = "/hour";
  else if (field === "entrance_fee") suffix = "";
  else if (field === "day_use_fee") suffix = "/day";
  else if (field === "boat_fee") suffix = "/boat";
  else if (field === "boardwalk_fee") suffix = "";
  else if (field === "snorkeling_fee") suffix = "";

  if (typeof value === "string" && value.includes("₱")) return value;
  const num = Number(value);
  if (isNaN(num)) return value;
  return `₱${num.toLocaleString()}${suffix}`;
};

export const ListingCard = memo(
  ({
    item,
    isWished,
    onToggleWishlist,
    onView,
    onToast,
    showOwnerActions,
    onEdit,
    onDelete,
    user,
  }) => {
    const thumb = item.images?.[0] || DEFAULT_IMAGE;
    const isOwner =
      user && (item.user_id === user.id || item.userId === user.id);
    const highlights = getHighlights(item);

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
        <div className="relative overflow-hidden h-48">
          <SafeImage
            src={thumb}
            alt={item.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {item.images?.length > 1 && (
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
              +{item.images.length - 1}
            </span>
          )}
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              item.status === "For Rent"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-blue-100 text-blue-700"
            }`}>
            {item.status}
          </span>
        </div>

        <div className="p-4">
          {/* Rating row with category & subcategory inline */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <StarRating
                rating={item.averageRating || 0}
                interactive={false}
                size="w-3 h-3"
              />
              <span className="text-xs text-gray-500">
                ({item.ratingCount || 0})
              </span>
            </div>
            <div className="flex gap-1 items-center">
              {item.category_name && (
                <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                  {item.category_name}
                </span>
              )}
              {item.subcategory_name && (
                <>
                  <span className="text-[10px] text-gray-400">•</span>
                  <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                    {item.subcategory_name}
                  </span>
                </>
              )}
              {highlights.map((h) => (
                <span
                  key={`${item.id}-${h}`}
                  className="text-[10px] font-medium bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-start gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 flex-1">
              {item.title}
            </h4>
          </div>

          <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </p>

          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-blue-600 text-base truncate">
              {getDisplayPriceFromAttrs(item)}
            </span>
            <div className="flex gap-1.5 flex-shrink-0 items-center">
              {user && !isOwner && onToggleWishlist && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    Promise.resolve(onToggleWishlist(item.id)).then((added) => {
                      onToast?.(
                        added ? "Added to wishlist!" : "Removed from wishlist",
                        "success",
                      );
                    });
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm"
                  aria-label="Toggle wishlist">
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWished ? "fill-rose-500 text-rose-500" : "text-gray-600"
                    }`}
                  />
                </button>
              )}
              {isOwner && showOwnerActions === true && (
                <div className="flex flex-row gap-1.5">
                  <button
                    onClick={() => onEdit?.(item)}
                    className="border border-gray-200 text-gray-600 text-xs px-3 py-2 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 font-medium">
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(item)}
                    className="border border-rose-200 text-rose-600 text-xs px-3 py-2 rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all active:scale-95 font-medium">
                    Delete
                  </button>
                </div>
              )}
              {isOwner && showOwnerActions !== true && (
                <span className="border border-blue-200 text-blue-600 bg-blue-50 text-xs px-3 py-1.5 rounded-xl font-medium cursor-default flex items-center">
                  Owner
                </span>
              )}
              <button
                onClick={() => onView(item)}
                className="bg-blue-600 text-white text-xs px-3 py-2 rounded-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-1 font-semibold">
                View <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default ListingCard;
