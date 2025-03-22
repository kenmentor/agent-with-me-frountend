"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Link from "next/link";

// Define the resource type
type ResourceProps = {
  header: string;
  thumbnail: string;
  price: number;
  id: string;
  landmark: string;
  rating?: number; // Optional rating
  category?: string; // Markup placeholder for category
  isNew?: boolean; // Markup placeholder for new badge
  gallery: { src: string; alt: string }[];
};

const Resource = ({
  header,
  thumbnail,
  price,
  id,
  landmark,
  rating,
  category = "Luxury", // 🔥 Markup placeholder (Replace later)
  isNew = false, // 🔥 Markup placeholder (Replace later)
}: ResourceProps) => {
  return (
    <motion.div
      className="relative bg-white rounded-xl overflow-hidden border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* New Badge (Replace later) */}
      {isNew && (
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
          New
        </span>
      )}

      {/* Favorite Button */}
      <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-200">
        <FaHeart className="text-red-500" />
      </button>

      {/* Thumbnail Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={header}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Details Section */}
      <div className="p-4 space-y-3">
        {/* Title, Price & Category */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{header}</h2>
          <span className="text-lg font-bold text-indigo-600">₦{price.toLocaleString()}</span>
        </div>

        {/* Landmark & Category */}
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <FaMapMarkerAlt className="text-red-500" /> {landmark}
        </p>
        <p className="text-xs font-medium text-indigo-500 bg-indigo-100 inline-block px-2 py-1 rounded-lg">
          {category} {/* 🔥 Markup placeholder (Replace later) */}
        </p>

        {/* Rating (if applicable) */}
        {rating !== undefined && (
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"} />
            ))}
          </div>
        )}

        {/* View Details Button */}
        <Link
          href={`${id}resource-details`}
          className="block text-center text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 py-2 rounded-lg font-medium"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default Resource;
