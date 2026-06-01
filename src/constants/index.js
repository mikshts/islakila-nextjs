// src/constants/index.js

export const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80";

export const PAGE_SIZE = 9;
export const MAX_FILE_SIZE_MB = 5;
export const MAX_IMAGES = 5;

export const BANTAYAN_LOCATIONS = [
  // (your exact array - unchanged, kept as is)
  "Atop-atop, Bantayan",
  "Baigad, Bantayan",
  "Bantigue, Bantayan",
  "Baod, Bantayan",
  "Binaobao, Bantayan",
  "Botigues, Bantayan",
  "Doong, Bantayan",
  "Guiwanon, Bantayan",
  "Hilotongan, Bantayan",
  "Kabac, Bantayan",
  "Kabangbang, Bantayan",
  "Kampingganon, Bantayan",
  "Kangkaibe, Bantayan",
  "Lipayran, Bantayan",
  "Liptong, Bantayan",
  "Luyongbaybay, Bantayan",
  "Mojon, Bantayan",
  "Obo-ob, Bantayan",
  "Patao, Bantayan",
  "Putian, Bantayan",
  "Sillon, Bantayan",
  "Suba, Bantayan",
  "Sulangan, Bantayan",
  "Sungko, Bantayan",
  "Tamiao, Bantayan",
  "Ticad, Bantayan",
  "Atop-atop Proper, Atop-atop, Bantayan",
  "Baigad Proper, Baigad, Bantayan",
  "Baigad Shoreline, Baigad, Bantayan",
  "Baod Proper, Baod, Bantayan",
  "Bantigue Proper, Bantigue, Bantayan",
  "Bantigue Beachfront, Bantigue, Bantayan",
  "Binaobao Proper, Binaobao, Bantayan",
  "Botigues Proper, Botigues, Bantayan",
  "Doong Proper, Doong, Bantayan",
  "Guiwanon Proper, Guiwanon, Bantayan",
  "Guinlacgan, Patao, Bantayan",
  "Hilotongan Island Proper, Hilotongan, Bantayan",
  "Kabac Proper, Kabac, Bantayan",
  "Kabangbang Proper, Kabangbang, Bantayan",
  "Kampingganon Proper, Kampingganon, Bantayan",
  "Kangkaibe Proper, Kangkaibe, Bantayan",
  "Lawis, Sulangan, Bantayan",
  "Lipayran Island Proper, Lipayran, Bantayan",
  "Liptong Proper, Liptong, Bantayan",
  "Luyongbaybay Proper, Luyongbaybay, Bantayan",
  "Manan-ao, Ticad, Bantayan",
  "Mojon Proper, Mojon, Bantayan",
  "Obo-ob Mangrove Area, Obo-ob, Bantayan",
  "Purok Centro, Mojon, Bantayan",
  "Purok Coconut, Sulangan, Bantayan",
  "Purok Crossing, Ticad, Bantayan",
  "Purok Fishing Village, Bantigue, Bantayan",
  "Purok Proper, Baod, Bantayan",
  "Purok Riverside, Suba, Bantayan",
  "Purok Sayaw, Patao, Bantayan",
  "Purok Seaside, Baigad, Bantayan",
  "Purok Sunrise, Obo-ob, Bantayan",
  "Purok Talisay, Sungko, Bantayan",
  "Putian Proper, Putian, Bantayan",
  "Sillon Proper, Sillon, Bantayan",
  "Suba Proper, Suba, Bantayan",
  "Sulangan Proper, Sulangan, Bantayan",
  "Sungko Proper, Sungko, Bantayan",
  "Tamiao Proper, Tamiao, Bantayan",
  "Ticad Proper, Ticad, Bantayan",
  "Balidbid, Santa Fe",
  "Hagdan, Santa Fe",
  "Hilantagaan, Santa Fe",
  "Kinatarcan, Santa Fe",
  "Langub, Santa Fe",
  "Maricaban, Santa Fe",
  "Okoy, Santa Fe",
  "Poblacion, Santa Fe",
  "Pooc, Santa Fe",
  "Talisay, Santa Fe",
  "Alice Beach Area, Okoy, Santa Fe",
  "Baungon, Pooc, Santa Fe",
  "Balidbid Proper, Balidbid, Santa Fe",
  "Camp Sawi Area, Okoy, Santa Fe",
  "Hagdan Proper, Hagdan, Santa Fe",
  "Hilantagaan Island Proper, Hilantagaan, Santa Fe",
  "Islam, Talisay, Santa Fe",
  "Kinatarcan Island Proper, Kinatarcan, Santa Fe",
  "Kota Beach Area, Poblacion, Santa Fe",
  "Langub Proper, Langub, Santa Fe",
  "Maricaban Proper, Maricaban, Santa Fe",
  "Marikit Area, Pooc, Santa Fe",
  "MJ Square Area, Poblacion, Santa Fe",
  "Okoy Proper, Okoy, Santa Fe",
  "Paradise Beach Area, Maricaban, Santa Fe",
  "Pooc Proper, Pooc, Santa Fe",
  "Poblacion Proper, Poblacion, Santa Fe",
  "Purok Beachside, Pooc, Santa Fe",
  "Purok Bougainvillea, Poblacion, Santa Fe",
  "Purok Kalachuchi, Okoy, Santa Fe",
  "Purok Lubi, Talisay, Santa Fe",
  "Purok Mangrove, Hagdan, Santa Fe",
  "Purok Proper, Balidbid, Santa Fe",
  "Purok Roadside, Langub, Santa Fe",
  "Purok Seaside, Pooc, Santa Fe",
  "Purok Tourism Road, Poblacion, Santa Fe",
  "Ruins Area, Kota Beach, Poblacion, Santa Fe",
  "Santa Fe Port Area, Poblacion, Santa Fe",
  "Sugar Beach Area, Poblacion, Santa Fe",
  "Talisay Proper, Talisay, Santa Fe",
  "Bunakan, Madridejos",
  "Kangwayan, Madridejos",
  "Kaongkod, Madridejos",
  "Kodia, Madridejos",
  "Maalat, Madridejos",
  "Malbago, Madridejos",
  "Mancilang, Madridejos",
  "Pili, Madridejos",
  "Poblacion, Madridejos",
  "San Agustin, Madridejos",
  "Tabagak, Madridejos",
  "Talangnan, Madridejos",
  "Tarong, Madridejos",
  "Tugas, Madridejos",
  "Bunakan Proper, Bunakan, Madridejos",
  "Bunakan Shoreline, Bunakan, Madridejos",
  "Kangwayan Proper, Kangwayan, Madridejos",
  "Kaongkod Proper, Kaongkod, Madridejos",
  "Kodia Proper, Kodia, Madridejos",
  "Kota Park Area, Poblacion, Madridejos",
  "Lawis, Poblacion, Madridejos",
  "Maalat Proper, Maalat, Madridejos",
  "Malbago Proper, Malbago, Madridejos",
  "Mancilang Proper, Mancilang, Madridejos",
  "Pili Proper, Pili, Madridejos",
  "Poblacion Proper, Poblacion, Madridejos",
  "Purok Baybay, Bunakan, Madridejos",
  "Purok Centro, Poblacion, Madridejos",
  "Purok Crossing, Kangwayan, Madridejos",
  "Purok Fisheries, Kaongkod, Madridejos",
  "Purok Proper, Tabagak, Madridejos",
  "Purok Roadside, Tarong, Madridejos",
  "Purok Seaside, Bunakan, Madridejos",
  "Purok Tugas Proper, Tugas, Madridejos",
  "San Agustin Proper, San Agustin, Madridejos",
  "Suba, Mancilang, Madridejos",
  "Tabagak Proper, Tabagak, Madridejos",
  "Talangnan Proper, Talangnan, Madridejos",
  "Tarong Proper, Tarong, Madridejos",
  "Tugas Proper, Tugas, Madridejos",
].sort();

export const ROUTES = {
  HOME: "home",
  LISTINGS: "listings",
  DETAIL: "detail",
  POST: "post",
  MY_LISTINGS: "my_listings",
  MESSAGES: "messages",
  WISHLIST: "wishlist",
  LOGIN: "login",
  RESET_PASSWORD: "reset-password",
};

// ============================================================
// DYNAMIC CATEGORIES & SUBCATEGORIES (fallback)
// Will be overwritten by data from the database at runtime
// ============================================================
export const CATEGORIES_DATA = {
  categories: [],
  subcategories: [],
};

export const getSubcategoriesForCategory = (categoryId, subcategoriesList) => {
  return subcategoriesList.filter((sub) => sub.category_id === categoryId);
};
// ============================================================
// DYNAMIC FORM FIELDS FOR EVERY SUBCATEGORY
// ============================================================
export const SUBCATEGORY_FIELDS = {
  // ----- Rentals -----
  Motorbike: [
    { name: "brand", label: "Brand", type: "text", required: true },
    { name: "model", label: "Model", type: "text", required: true },
    { name: "engine_cc", label: "Engine CC", type: "number" },
    {
      name: "transmission",
      label: "Transmission",
      type: "select",
      options: ["Manual", "Automatic", "Semi-Automatic"],
    },
    {
      name: "fuel_type",
      label: "Fuel Type",
      type: "select",
      options: ["Gasoline", "Diesel", "Electric"],
    },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
    { name: "security_deposit", label: "Security Deposit (₱)", type: "number" },
    {
      name: "driver_license_required",
      label: "Driver License Required",
      type: "checkbox",
    },
  ],
  Scooter: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "engine_cc", label: "Engine CC", type: "number" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  Bicycle: [
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["Mountain", "Road", "Hybrid", "Electric"],
    },
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
  ],
  "E-Bike": [
    { name: "brand", label: "Brand", type: "text" },
    { name: "battery_range_km", label: "Battery Range (km)", type: "number" },
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
  ],
  Car: [
    { name: "brand", label: "Brand", type: "text", required: true },
    { name: "model", label: "Model", type: "text", required: true },
    { name: "year", label: "Year", type: "number" },
    {
      name: "transmission",
      label: "Transmission",
      type: "select",
      options: ["Manual", "Automatic"],
    },
    { name: "seats", label: "Seats", type: "number" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
    { name: "security_deposit", label: "Security Deposit (₱)", type: "number" },
  ],
  SUV: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "seats", label: "Seats", type: "number" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  Van: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "capacity", label: "Passenger Capacity", type: "number" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  Tricycle: [
    {
      name: "price_per_trip",
      label: "Price Per Trip (₱)",
      type: "number",
      required: true,
    },
    { name: "routes", label: "Common Routes (comma separated)", type: "text" },
  ],
  Boat: [
    { name: "length_ft", label: "Length (ft)", type: "number" },
    { name: "capacity", label: "Max Persons", type: "number" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  "Jet Ski": [
    { name: "horsepower", label: "Horsepower", type: "number" },
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
  ],
  Kayak: [
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["Single", "Double"],
    },
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
  ],
  Paddleboard: [
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
  ],
  Tent: [
    { name: "capacity", label: "Capacity (persons)", type: "number" },
    {
      name: "price_per_night",
      label: "Price Per Night (₱)",
      type: "number",
      required: true,
    },
  ],
  "Fishing Rod": [
    { name: "type", label: "Type", type: "text" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  "Camping Chair": [
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  "Camping Gear": [
    { name: "items", label: "Items Included (comma)", type: "text" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  Surfboard: [
    { name: "board_type", label: "Board Type", type: "text" },
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
  ],
  "Scuba Gear": [
    { name: "includes_tank", label: "Includes Tank", type: "checkbox" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  "Snorkel Gear": [
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  Room: [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    { name: "bathrooms", label: "Bathrooms", type: "number" },
    {
      name: "price_per_night",
      label: "Price Per Night (₱)",
      type: "number",
      required: true,
    },
    { name: "amenities", label: "Amenities (comma separated)", type: "text" },
  ],
  "Apartment Rental": [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    {
      name: "price_per_night",
      label: "Price Per Night (₱)",
      type: "number",
      required: true,
    },
  ],
  Cottage: [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    {
      name: "price_per_night",
      label: "Price Per Night (₱)",
      type: "number",
      required: true,
    },
  ],
  "Beach House": [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    {
      name: "price_per_night",
      label: "Price Per Night (₱)",
      type: "number",
      required: true,
    },
  ],
  "Resort Room": [
    { name: "room_type", label: "Room Type", type: "text" },
    {
      name: "price_per_night",
      label: "Price Per Night (₱)",
      type: "number",
      required: true,
    },
  ],
  Truck: [
    { name: "capacity_kg", label: "Capacity (kg)", type: "number" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  ATV: [
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
  ],
  "Golf Cart": [
    { name: "seats", label: "Seats", type: "number" },
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
  ],
  "Event Equipment": [
    { name: "equipment_type", label: "Equipment Type", type: "text" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  "Sound System": [
    { name: "watts", label: "Watts", type: "number" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  "Lights & Sounds": [
    { name: "package_name", label: "Package Name", type: "text" },
    {
      name: "price_per_event",
      label: "Price Per Event (₱)",
      type: "number",
      required: true,
    },
  ],
  Generator: [
    { name: "watts", label: "Watts", type: "number" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  Videoke: [
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  "Tables & Chairs": [
    { name: "table_count", label: "Number of Tables", type: "number" },
    { name: "chair_count", label: "Number of Chairs", type: "number" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  "Catering Ware": [
    { name: "items_included", label: "Items Included (comma)", type: "text" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  Tools: [
    { name: "tool_type", label: "Tool Type", type: "text" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  "Heavy Equipment": [
    { name: "equipment_type", label: "Equipment Type", type: "text" },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],

  // ----- Food & Dining -----
  Restaurant: [
    { name: "cuisine", label: "Cuisine Type", type: "text" },
    {
      name: "price_range",
      label: "Price Range (e.g., ₱200-500)",
      type: "text",
    },
    { name: "opening_hours", label: "Opening Hours", type: "text" },
  ],
  "Grilled Food": [
    { name: "specialty", label: "Specialty Dish", type: "text" },
    {
      name: "price_per_serving",
      label: "Price Per Serving (₱)",
      type: "number",
    },
  ],
  Carenderia: [
    { name: "menu_items", label: "Menu Items (comma)", type: "text" },
    { name: "meal_price", label: "Average Meal Price (₱)", type: "number" },
  ],
  "Street Food": [
    { name: "items", label: "Street Food Items (comma)", type: "text" },
    { name: "price_range", label: "Price Range (₱)", type: "text" },
  ],
  "Seafood Store": [
    { name: "seafood_types", label: "Seafood Types (comma)", type: "text" },
    { name: "price_per_kg", label: "Price Per KG (₱)", type: "number" },
  ],
  Cafe: [
    { name: "coffee_types", label: "Coffee Types (comma)", type: "text" },
    { name: "price_range", label: "Price Range (₱)", type: "text" },
  ],
  Bar: [
    { name: "drinks_specialty", label: "Specialty Drinks", type: "text" },
    { name: "happy_hour", label: "Happy Hour Info", type: "text" },
  ],
  Restobar: [
    { name: "cuisine", label: "Cuisine", type: "text" },
    {
      name: "entertainment",
      label: "Entertainment (e.g., Live Band)",
      type: "text",
    },
  ],
  "Milk Tea": [
    { name: "flavors", label: "Flavors (comma)", type: "text" },
    { name: "price_range", label: "Price Range (₱)", type: "text" },
  ],
  Bakery: [
    { name: "baked_goods", label: "Baked Goods (comma)", type: "text" },
    { name: "price_range", label: "Price Range (₱)", type: "text" },
  ],
  Buffet: [
    {
      name: "price_per_person",
      label: "Price Per Person (₱)",
      type: "number",
      required: true,
    },
    { name: "menu_includes", label: "Menu Includes", type: "text" },
  ],
  Catering: [
    { name: "cuisine", label: "Cuisine Type", type: "text" },
    {
      name: "price_per_person",
      label: "Price Per Person (₱)",
      type: "number",
      required: true,
    },
    { name: "min_pax", label: "Minimum Pax", type: "number" },
  ],
  "Food Delivery": [
    { name: "delivery_fee", label: "Delivery Fee (₱)", type: "number" },
    { name: "min_order", label: "Minimum Order (₱)", type: "number" },
  ],

  // ----- Transport -----
  "Port Transfer": [
    {
      name: "price_per_trip",
      label: "Price Per Trip (₱)",
      type: "number",
      required: true,
    },
    { name: "vehicle_type", label: "Vehicle Type", type: "text" },
  ],
  "Airport Transfer": [
    {
      name: "price_per_trip",
      label: "Price Per Trip (₱)",
      type: "number",
      required: true,
    },
    { name: "vehicle_type", label: "Vehicle Type", type: "text" },
  ],
  "Tourist Transport": [
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
    { name: "destinations", label: "Destinations (comma)", type: "text" },
  ],
  "Shuttle Service": [
    {
      name: "price_per_person",
      label: "Price Per Person (₱)",
      type: "number",
      required: true,
    },
    { name: "route", label: "Route", type: "text" },
  ],
  "Private Driver": [
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
    { name: "languages", label: "Languages Spoken", type: "text" },
  ],
  "Van Rental w/ Driver": [
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
    { name: "capacity", label: "Capacity", type: "number" },
  ],
  "Car Rental w/ Driver": [
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
    { name: "car_model", label: "Car Model", type: "text" },
  ],
  "Delivery Rider": [
    {
      name: "delivery_fee",
      label: "Delivery Fee (₱)",
      type: "number",
      required: true,
    },
    { name: "area_coverage", label: "Area Coverage", type: "text" },
  ],
  "Hauling Service": [
    { name: "price_per_kg", label: "Price Per KG (₱)", type: "number" },
    { name: "vehicle_type", label: "Vehicle Type", type: "text" },
  ],
  "Cargo & Logistics": [
    { name: "price_per_kg", label: "Price Per KG (₱)", type: "number" },
    {
      name: "estimated_delivery_days",
      label: "Estimated Delivery (days)",
      type: "number",
    },
  ],

  // ----- Stay (Resort and Beach Resort removed) -----
  Hotel: [
    {
      name: "star_rating",
      label: "Star Rating",
      type: "number",
      min: 1,
      max: 5,
    },
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  Homestay: [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  Airbnb: [
    { name: "property_type", label: "Property Type", type: "text" },
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  Cottage: [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  Hostel: [
    { name: "bed_type", label: "Bed Type (e.g., Dorm, Private)", type: "text" },
    {
      name: "price_per_night",
      label: "Price Per Night (₱)",
      type: "number",
      required: true,
    },
  ],
  Villa: [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
    { name: "private_pool", label: "Private Pool", type: "checkbox" },
  ],
  "Room Stay": [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  "Guest House": [
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  "Pension House": [
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  Glamping: [
    { name: "tent_type", label: "Tent Type", type: "text" },
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  Cabin: [
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  Campsite: [
    {
      name: "price_per_tent",
      label: "Price Per Tent (₱)",
      type: "number",
      required: true,
    },
  ],
  "Eco-Lodge": [
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
    { name: "eco_features", label: "Eco Features", type: "text" },
  ],
  Motel: [
    {
      name: "nightly_rate",
      label: "Nightly Rate (₱)",
      type: "number",
      required: true,
    },
  ],

  // ----- Services (unchanged) -----
  "Island Hopping": [
    {
      name: "duration_hours",
      label: "Duration (hours)",
      type: "number",
      required: true,
    },
    { name: "max_people", label: "Max People", type: "number", required: true },
    {
      name: "price_per_group",
      label: "Price Per Group (₱)",
      type: "number",
      required: true,
    },
    { name: "destinations", label: "Destinations (comma)", type: "text" },
  ],
  "Tour Guide": [
    {
      name: "languages",
      label: "Languages Spoken",
      type: "text",
      required: true,
    },
    {
      name: "price_per_day",
      label: "Price Per Day (₱)",
      type: "number",
      required: true,
    },
  ],
  "Boat Tour": [
    { name: "duration_hours", label: "Duration (hours)", type: "number" },
    {
      name: "price_per_group",
      label: "Price Per Group (₱)",
      type: "number",
      required: true,
    },
  ],
  "Snorkeling Guide": [
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
    {
      name: "equipment_included",
      label: "Equipment Included",
      type: "checkbox",
    },
  ],
  "Diving Service": [
    { name: "certification_level", label: "Certification Level", type: "text" },
    {
      name: "price_per_dive",
      label: "Price Per Dive (₱)",
      type: "number",
      required: true,
    },
  ],
  "Fishing Tour": [
    { name: "duration_hours", label: "Duration (hours)", type: "number" },
    {
      name: "price_per_group",
      label: "Price Per Group (₱)",
      type: "number",
      required: true,
    },
  ],
  "Surf Lessons": [
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
    {
      name: "equipment_included",
      label: "Equipment Included",
      type: "checkbox",
    },
  ],
  "Massage Service": [
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
    {
      name: "massage_types",
      label: "Massage Types (e.g., Swedish, Thai)",
      type: "text",
    },
  ],
  "Spa & Wellness": [
    { name: "price_range", label: "Price Range (₱)", type: "text" },
    { name: "services", label: "Services Offered", type: "text" },
  ],
  "Tattoo Service": [
    { name: "price_per_hour", label: "Price Per Hour (₱)", type: "number" },
    { name: "artist_name", label: "Artist Name", type: "text" },
  ],
  Photography: [
    { name: "event_types", label: "Event Types (comma)", type: "text" },
    {
      name: "hourly_rate",
      label: "Hourly Rate (₱)",
      type: "number",
      required: true,
    },
    {
      name: "delivery_format",
      label: "Delivery Format (e.g., Digital, Print)",
      type: "text",
    },
  ],
  Videography: [
    { name: "event_types", label: "Event Types (comma)", type: "text" },
    {
      name: "hourly_rate",
      label: "Hourly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  "Drone Service": [
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
    { name: "licensed", label: "Licensed", type: "checkbox" },
  ],
  "Makeup Artist": [
    {
      name: "price_per_session",
      label: "Price Per Session (₱)",
      type: "number",
      required: true,
    },
    { name: "bridal_specialist", label: "Bridal Specialist", type: "checkbox" },
  ],
  "Hair Stylist": [
    {
      name: "price_per_session",
      label: "Price Per Session (₱)",
      type: "number",
      required: true,
    },
  ],
  Catering: [
    { name: "cuisine", label: "Cuisine Type", type: "text" },
    {
      name: "price_per_person",
      label: "Price Per Person (₱)",
      type: "number",
      required: true,
    },
  ],
  "Event Organizer": [
    { name: "event_types", label: "Event Types (comma)", type: "text" },
    { name: "min_budget", label: "Minimum Budget (₱)", type: "number" },
  ],
  "Wedding Coordinator": [
    { name: "package_name", label: "Package Name", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "DJ Services": [
    {
      name: "price_per_event",
      label: "Price Per Event (₱)",
      type: "number",
      required: true,
    },
    {
      name: "equipment_included",
      label: "Equipment Included",
      type: "checkbox",
    },
  ],
  "Live Band": [
    { name: "band_name", label: "Band Name", type: "text" },
    {
      name: "price_per_event",
      label: "Price Per Event (₱)",
      type: "number",
      required: true,
    },
  ],
  "Repair Services": [
    {
      name: "service_type",
      label: "Service Type",
      type: "text",
      required: true,
    },
    { name: "callout_fee", label: "Callout Fee (₱)", type: "number" },
    { name: "hourly_rate", label: "Hourly Rate (₱)", type: "number" },
  ],
  Plumbing: [
    { name: "callout_fee", label: "Callout Fee (₱)", type: "number" },
    {
      name: "hourly_rate",
      label: "Hourly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  Electrical: [
    { name: "licensed", label: "Licensed Electrician", type: "checkbox" },
    {
      name: "hourly_rate",
      label: "Hourly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  "Aircon Repair": [
    {
      name: "service_fee",
      label: "Service Fee (₱)",
      type: "number",
      required: true,
    },
  ],
  Carpentry: [
    {
      name: "hourly_rate",
      label: "Hourly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  Masonry: [
    {
      name: "hourly_rate",
      label: "Hourly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  "Laundry Service": [
    {
      name: "price_per_kg",
      label: "Price Per KG (₱)",
      type: "number",
      required: true,
    },
  ],
  "Cleaning Service": [
    {
      name: "price_per_hour",
      label: "Price Per Hour (₱)",
      type: "number",
      required: true,
    },
  ],
  "Delivery Service": [
    {
      name: "delivery_fee",
      label: "Delivery Fee (₱)",
      type: "number",
      required: true,
    },
  ],
  Barber: [
    {
      name: "price_per_haircut",
      label: "Price Per Haircut (₱)",
      type: "number",
      required: true,
    },
  ],
  "Nail Service": [
    { name: "price_manicure", label: "Manicure Price (₱)", type: "number" },
    { name: "price_pedicure", label: "Pedicure Price (₱)", type: "number" },
  ],
  "Salon Service": [
    { name: "price_range", label: "Price Range (₱)", type: "text" },
  ],
  "Pet Grooming": [
    {
      name: "price_per_session",
      label: "Price Per Session (₱)",
      type: "number",
      required: true,
    },
  ],
  "Vet Service": [
    {
      name: "consultation_fee",
      label: "Consultation Fee (₱)",
      type: "number",
      required: true,
    },
  ],
  "Computer Repair": [
    { name: "diagnostic_fee", label: "Diagnostic Fee (₱)", type: "number" },
    {
      name: "hourly_rate",
      label: "Hourly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  "Appliance Repair": [
    {
      name: "service_fee",
      label: "Service Fee (₱)",
      type: "number",
      required: true,
    },
  ],
  "Auto Repair": [
    { name: "service_type", label: "Service Type", type: "text" },
    {
      name: "hourly_rate",
      label: "Hourly Rate (₱)",
      type: "number",
      required: true,
    },
  ],
  "Legal & Notary": [
    {
      name: "service_type",
      label: "Service Type (e.g., Notary, Contract)",
      type: "text",
    },
    { name: "fee", label: "Fee (₱)", type: "number", required: true },
  ],
  "Money Transfer": [
    { name: "fee_percentage", label: "Fee Percentage (%)", type: "number" },
    { name: "min_fee", label: "Minimum Fee (₱)", type: "number" },
  ],

  // ----- Marketplace (including Flower) -----
  Seafood: [
    {
      name: "seafood_type",
      label: "Type of Seafood",
      type: "text",
      required: true,
    },
    {
      name: "price_per_kg",
      label: "Price Per KG (₱)",
      type: "number",
      required: true,
    },
    {
      name: "fresh_or_frozen",
      label: "Fresh / Frozen",
      type: "select",
      options: ["Fresh", "Frozen"],
    },
  ],
  Souvenirs: [
    {
      name: "type",
      label: "Souvenir Type",
      type: "text",
    },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Handmade Goods": [
    { name: "material", label: "Material", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Food: [
    { name: "expiry_date", label: "Expiry Date", type: "date" },
    { name: "organic", label: "Organic", type: "checkbox" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Fresh Produce": [
    {
      name: "produce_type",
      label: "Type (e.g., Vegetables, Fruits)",
      type: "text",
    },
    {
      name: "price_per_kg",
      label: "Price Per KG (₱)",
      type: "number",
      required: true,
    },
  ],
  "Meat & Poultry": [
    { name: "meat_type", label: "Type", type: "text" },
    {
      name: "price_per_kg",
      label: "Price Per KG (₱)",
      type: "number",
      required: true,
    },
  ],
  // ----- NEW: Flower subcategory -----
  Flower: [
    {
      name: "flower_type",
      label: "Flower Type (e.g., Roses, Sunflowers)",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price (₱)",
      type: "number",
      required: true,
    },
    {
      name: "unit",
      label: "Unit (per stem / per bouquet)",
      type: "text",
      placeholder: "e.g., per stem, per bouquet",
    },
    { name: "color", label: "Color", type: "text" },
    {
      name: "occasion",
      label: "Occasion (e.g., Birthday, Wedding)",
      type: "text",
    },
  ],
  Clothing: [
    { name: "size", label: "Size", type: "text" },
    { name: "brand", label: "Brand", type: "text" },
    {
      name: "condition",
      label: "Condition",
      type: "select",
      options: ["New", "Like New", "Used"],
    },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Shoes: [
    { name: "size", label: "Size", type: "text" },
    { name: "brand", label: "Brand", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Bags: [
    { name: "type", label: "Type (Backpack, Handbag, etc.)", type: "text" },
    { name: "brand", label: "Brand", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Accessories: [
    { name: "type", label: "Type (e.g., Sunglasses, Hat)", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Watches: [
    { name: "brand", label: "Brand", type: "text" },
    {
      name: "condition",
      label: "Condition",
      type: "select",
      options: ["New", "Used"],
    },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Jewelry: [
    { name: "metal_type", label: "Metal Type", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Electronics: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "model", label: "Model", type: "text" },
    {
      name: "condition",
      label: "Condition",
      type: "select",
      options: ["New", "Like New", "Used", "Refurbished"],
    },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Phones: [
    { name: "brand", label: "Brand", type: "text", required: true },
    { name: "model", label: "Model", type: "text", required: true },
    { name: "storage_gb", label: "Storage (GB)", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Tablets: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "screen_size", label: "Screen Size (inches)", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Laptops: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "ram_gb", label: "RAM (GB)", type: "number" },
    { name: "storage_type", label: "Storage Type (SSD/HDD)", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Computers: [
    { name: "type", label: "Type (Desktop/All-in-One)", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Cameras: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "megapixels", label: "Megapixels", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Appliances: [
    {
      name: "appliance_type",
      label: "Type (Refrigerator, Washing Machine)",
      type: "text",
    },
    { name: "brand", label: "Brand", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Furniture: [
    { name: "material", label: "Material", type: "text" },
    { name: "dimensions", label: "Dimensions (LxWxH)", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Home Decor": [
    { name: "type", label: "Type (e.g., Vase, Painting)", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Construction Material": [
    {
      name: "material_type",
      label: "Material Type (Cement, Wood, etc.)",
      type: "text",
    },
    {
      name: "price_per_unit",
      label: "Price Per Unit (₱)",
      type: "number",
      required: true,
    },
  ],
  Hardware: [
    { name: "item_type", label: "Item Type", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Tools: [
    { name: "tool_type", label: "Tool Type", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Farming Supplies": [
    {
      name: "supply_type",
      label: "Supply Type (Fertilizer, Seeds)",
      type: "text",
    },
    {
      name: "price_per_unit",
      label: "Price Per Unit (₱)",
      type: "number",
      required: true,
    },
  ],
  "Fishing Gear": [
    { name: "gear_type", label: "Gear Type (Net, Line, etc.)", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Motorcycle Parts": [
    { name: "part_name", label: "Part Name", type: "text", required: true },
    { name: "compatible_models", label: "Compatible Models", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Car Parts": [
    { name: "part_name", label: "Part Name", type: "text", required: true },
    { name: "compatible_models", label: "Compatible Models", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Bicycle Parts": [
    { name: "part_name", label: "Part Name", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Pets: [
    {
      name: "animal_type",
      label: "Animal Type (Dog, Cat, etc.)",
      type: "text",
    },
    { name: "breed", label: "Breed", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Pet Supplies": [
    {
      name: "supply_type",
      label: "Supply Type (Food, Toy, etc.)",
      type: "text",
    },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Plants: [
    {
      name: "plant_type",
      label: "Plant Type (Ornamental, Fruit, etc.)",
      type: "text",
    },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Gardening Supplies": [
    {
      name: "supply_type",
      label: "Supply Type (Soil, Pot, etc.)",
      type: "text",
    },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Books: [
    { name: "author", label: "Author", type: "text" },
    { name: "genre", label: "Genre", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Toys: [
    { name: "age_range", label: "Age Range", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Musical Instruments": [
    {
      name: "instrument_type",
      label: "Type (Guitar, Piano, etc.)",
      type: "text",
    },
    { name: "brand", label: "Brand", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Sports Equipment": [
    {
      name: "equipment_type",
      label: "Type (Ball, Racket, etc.)",
      type: "text",
    },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Health & Beauty": [
    {
      name: "product_type",
      label: "Product Type (Skincare, Supplement)",
      type: "text",
    },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],

  // ----- Properties (Resort removed) -----
  "Beach Lot": [
    {
      name: "lot_area",
      label: "Lot Area (sqm)",
      type: "number",
      required: true,
    },
    {
      name: "price_per_sqm",
      label: "Price Per SQM (₱)",
      type: "number",
      required: true,
    },
    { name: "beachfront", label: "Beachfront", type: "checkbox" },
    { name: "clean_title", label: "Clean Title", type: "checkbox" },
    { name: "coordinates", label: "Coordinates (lat,lng)", type: "text" },
  ],
  "Beach House": [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    { name: "bathrooms", label: "Bathrooms", type: "number" },
    { name: "lot_area", label: "Lot Area (sqm)", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
    { name: "beachfront", label: "Beachfront", type: "checkbox" },
  ],
  House: [
    { name: "area_sqm", label: "Area (sqm)", type: "number", required: true },
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    { name: "bathrooms", label: "Bathrooms", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
    { name: "parking", label: "Parking", type: "checkbox" },
  ],
  "Residential Lot": [
    {
      name: "lot_area",
      label: "Lot Area (sqm)",
      type: "number",
      required: true,
    },
    {
      name: "price_per_sqm",
      label: "Price Per SQM (₱)",
      type: "number",
      required: true,
    },
  ],
  "Commercial Lot": [
    {
      name: "lot_area",
      label: "Lot Area (sqm)",
      type: "number",
      required: true,
    },
    { name: "zoning", label: "Zoning", type: "text" },
    {
      name: "price_per_sqm",
      label: "Price Per SQM (₱)",
      type: "number",
      required: true,
    },
  ],
  "Farm Lot": [
    {
      name: "lot_area",
      label: "Lot Area (sqm)",
      type: "number",
      required: true,
    },
    { name: "water_source", label: "Water Source", type: "text" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Hotel: [
    { name: "star_rating", label: "Star Rating", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Apartment: [
    { name: "floor", label: "Floor", type: "number" },
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Condominium: [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    { name: "square_meters", label: "Square Meters", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Townhouse: [
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Tiny House": [
    { name: "area_sqm", label: "Area (sqm)", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Agricultural Land": [
    {
      name: "area_hectares",
      label: "Area (hectares)",
      type: "number",
      required: true,
    },
    {
      name: "price_per_hectare",
      label: "Price Per Hectare (₱)",
      type: "number",
      required: true,
    },
  ],
  "Industrial Lot": [
    { name: "lot_area", label: "Lot Area (sqm)", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  Warehouse: [
    { name: "floor_area", label: "Floor Area (sqm)", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Commercial Space": [
    { name: "floor_area", label: "Floor Area (sqm)", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Boarding House": [
    { name: "number_of_rooms", label: "Number of Rooms", type: "number" },
    {
      name: "monthly_rent",
      label: "Monthly Rent (₱)",
      type: "number",
      required: true,
    },
  ],
  "Office Space": [
    { name: "floor_area", label: "Floor Area (sqm)", type: "number" },
    {
      name: "monthly_rent",
      label: "Monthly Rent (₱)",
      type: "number",
      required: true,
    },
  ],
  Building: [
    { name: "total_area", label: "Total Area (sqm)", type: "number" },
    { name: "price", label: "Price (₱)", type: "number", required: true },
  ],
  "Stall/Kiosk": [
    { name: "size_sqm", label: "Size (sqm)", type: "number" },
    {
      name: "monthly_rent",
      label: "Monthly Rent (₱)",
      type: "number",
      required: true,
    },
  ],

  // ----- Tourist Attractions -----
  Beaches: [
    { name: "best_time_to_visit", label: "Best Time to Visit", type: "text" },
    { name: "entrance_fee", label: "Entrance Fee (₱)", type: "number" },
    { name: "facilities", label: "Facilities (comma)", type: "text" },
  ],
  Resorts: [
    { name: "amenities", label: "Amenities (comma)", type: "text" },
    { name: "day_use_fee", label: "Day Use Fee (₱)", type: "number" },
    { name: "overnight_rate", label: "Overnight Rate (₱)", type: "number" },
  ],
  Sandbars: [
    { name: "access_method", label: "Access Method (boat/walk)", type: "text" },
    { name: "boat_fee", label: "Boat Fee (₱)", type: "number" },
    { name: "tidal_info", label: "Tidal Info", type: "text" },
  ],
  "Nature Spots": [
    { name: "trail_difficulty", label: "Trail Difficulty", type: "text" },
    { name: "entrance_fee", label: "Entrance Fee (₱)", type: "number" },
    { name: "guided_tour", label: "Guided Tour Available", type: "checkbox" },
  ],
  "Mangrove Areas": [
    { name: "boardwalk_fee", label: "Boardwalk Fee (₱)", type: "number" },
    { name: "kayak_rental", label: "Kayak Rental (₱)", type: "number" },
    { name: "guided_tour", label: "Guided Tour Available", type: "checkbox" },
  ],
  Caves: [
    { name: "cave_length_m", label: "Cave Length (m)", type: "number" },
    { name: "entrance_fee", label: "Entrance Fee (₱)", type: "number" },
    { name: "guide_required", label: "Guide Required", type: "checkbox" },
  ],
  Lagoons: [
    { name: "swimming_allowed", label: "Swimming Allowed", type: "checkbox" },
    { name: "entrance_fee", label: "Entrance Fee (₱)", type: "number" },
    { name: "boat_rental", label: "Boat Rental (₱)", type: "number" },
  ],
  "Historical Sites": [
    { name: "historical_period", label: "Historical Period", type: "text" },
    { name: "entrance_fee", label: "Entrance Fee (₱)", type: "number" },
    { name: "guided_tour", label: "Guided Tour Available", type: "checkbox" },
  ],
  Churches: [
    { name: "year_built", label: "Year Built", type: "number" },
    { name: "mass_schedule", label: "Mass Schedule", type: "text" },
    { name: "heritage_status", label: "Heritage Status", type: "text" },
  ],
  Gardens: [
    {
      name: "garden_type",
      label: "Garden Type (Botanical/Orchid/etc)",
      type: "text",
    },
    { name: "entrance_fee", label: "Entrance Fee (₱)", type: "number" },
    { name: "best_season", label: "Best Season to Visit", type: "text" },
  ],
  "Scenic Viewpoints": [
    { name: "view_description", label: "View Description", type: "text" },
    { name: "hiking_time_min", label: "Hiking Time (minutes)", type: "number" },
    { name: "access_road", label: "Access Road", type: "text" },
  ],
  "Sunset Viewpoints": [
    { name: "best_months", label: "Best Months", type: "text" },
    { name: "popularity", label: "Popularity (Low/Medium/High)", type: "text" },
    {
      name: "nearby_food_stalls",
      label: "Nearby Food Stalls",
      type: "checkbox",
    },
  ],
  "Marine Sanctuaries": [
    { name: "marine_life", label: "Marine Life (comma)", type: "text" },
    { name: "snorkeling_fee", label: "Snorkeling Fee (₱)", type: "number" },
    { name: "conservation_rules", label: "Conservation Rules", type: "text" },
  ],
  "Instagrammable Spots": [
    { name: "spot_name", label: "Spot Name", type: "text" },
    { name: "best_time_for_photo", label: "Best Time for Photo", type: "text" },
    { name: "has_props", label: "Has Props (swings/frames)", type: "checkbox" },
  ],
  "Eco Parks": [
    { name: "park_area_ha", label: "Park Area (hectares)", type: "number" },
    { name: "entrance_fee", label: "Entrance Fee (₱)", type: "number" },
    { name: "activities", label: "Activities (comma)", type: "text" },
  ],
  "Hidden Gems": [
    { name: "secret_tip", label: "Secret Tip", type: "text" },
    { name: "access_difficulty", label: "Access Difficulty", type: "text" },
    {
      name: "local_guide_needed",
      label: "Local Guide Needed",
      type: "checkbox",
    },
  ],
};

export const getFieldsForSubcategory = (subcategoryName) => {
  return SUBCATEGORY_FIELDS[subcategoryName] || [];
};
