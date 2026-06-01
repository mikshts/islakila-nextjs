import { memo, useMemo } from "react";
import { MapPin } from "lucide-react";
import { BANTAYAN_LOCATIONS } from "../constants/index.js";

export const LocationSuggestions = memo(({ query, onSelect, show }) => {
  const suggestions = useMemo(() => {
    if (!query || !show) return [];
    return BANTAYAN_LOCATIONS.filter((loc) =>
      loc.toLowerCase().includes(query.toLowerCase()),
    ).slice(0, 8);
  }, [query, show]);

  if (!suggestions.length) return null;
  return (
    <ul className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[9999] max-h-48 overflow-y-auto">
      {" "}
      {suggestions.map((s, i) => (
        <li
          key={i}
          onMouseDown={() => onSelect(s)}
          className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-sm text-gray-800 flex items-center gap-2 border-b border-gray-50 last:border-none transition-colors">
          <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
          {s}
        </li>
      ))}
    </ul>
  );
});
