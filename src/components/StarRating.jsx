import { memo, useState } from "react";
import { Star } from "lucide-react";

export const StarRating = memo(
  ({ rating, onRate, interactive = false, size = "w-4 h-4" }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value) => {
      if (!interactive) return;
      onRate?.(value);
    };

    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
            className={interactive ? "cursor-pointer" : "cursor-default"}>
            <Star
              className={`${size} transition-colors ${
                (hoverRating ? star <= hoverRating : star <= rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  },
);
