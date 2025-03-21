import React from "react";
import { BiStar } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

// TypeScript type for RatingProps with 'rating' as a number between 0 and 5
type RatingProps = {
  rating: number; // Rating value between 0 and 5
};

const Rating: React.FC<RatingProps> = ({ rating }) => {
  // Ensure rating is within the valid range (0-5)
  const normalizedRating = Math.min(Math.max(rating, 0), 5);

  // Generate stars based on the normalized rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;

    if (normalizedRating >= starValue) {
      // Full star
      return <BsStarFill key={starValue} className="text-yellow-400" />;
    } else if (normalizedRating > starValue - 1) {
      // Half star
      return <BsStarHalf key={starValue} className="text-yellow-400" />;
    } else {
      // Empty star
      return <BiStar key={starValue} className="text-gray-500" />;
    }
  });

  // Conditionally format rating to remove unnecessary decimals (e.g., 4.0 -> 4)
  const formattedRating =
    normalizedRating % 1 === 0
      ? normalizedRating.toFixed(0)
      : normalizedRating.toFixed(1);

  return (
    <div className="stars flex gap-1 items-center">
      {stars}
      <span className="ml-2 text-gray-700 font-medium">{formattedRating}</span>
    </div>
  );
};

export default Rating;
