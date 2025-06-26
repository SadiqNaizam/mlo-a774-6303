import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  /** The current rating value. Can be a float for display mode. */
  rating: number;
  /** The total number of stars to display. Defaults to 5. */
  totalStars?: number;
  /** The size of the star icons in pixels. Defaults to 20. */
  size?: number;
  /** If true, the component is for display only and supports half-stars. */
  readonly?: boolean;
  /** Callback function when a user clicks a star in interactive mode. */
  onRatingChange?: (rating: number) => void;
  /** Additional CSS classes for the container. */
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = 20,
  readonly = false,
  onRatingChange,
  className,
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  console.log('StarRating component loaded');

  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-0.5",
        { 'cursor-pointer': !readonly },
        className
      )}
      onMouseLeave={!readonly ? handleMouseLeave : undefined}
      aria-label={`Rating: ${rating.toFixed(1)} out of ${totalStars} stars.`}
    >
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        if (readonly) {
          // Display-only mode with support for partial stars (e.g., 3.7)
          const fillPercentage =
            rating >= starValue
              ? '100%'
              : rating > index && rating < starValue
              ? `${(rating % 1) * 100}%`
              : '0%';
          
          return (
            <div key={starValue} style={{ position: 'relative', width: size, height: size }} title={`${rating.toFixed(1)} stars`}>
              <Star
                className="text-gray-300"
                fill="currentColor"
                style={{ width: size, height: size, position: 'absolute' }}
              />
              <div style={{ position: 'absolute', width: fillPercentage, height: '100%', overflow: 'hidden' }}>
                <Star
                  className="text-yellow-400"
                  fill="currentColor"
                  style={{ width: size, height: size }}
                />
              </div>
            </div>
          );
        } else {
          // Interactive mode for input
          const displayRating = hoverRating || rating;
          return (
            <Star
              key={starValue}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onClick={() => handleClick(starValue)}
              className={cn(
                "transition-colors",
                starValue <= displayRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )}
              style={{ width: size, height: size }}
            />
          );
        }
      })}
    </div>
  );
};

export default StarRating;