"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";

type SearchboxProps = {
  setKeyword: React.Dispatch<
    React.SetStateAction<{ searchWord: string; category: string[] }>
  >;
};

const categories = [
  "anti",
  "phy",
  "maths",
  "stats",
  "french",
  "others",
  "biology",
  "chemistry",
  "geography",
];

const Searchbox = ({ setKeyword }: SearchboxProps) => {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  // Update the `setKeyword` state when categories change
  useEffect(() => {
    setKeyword((prev) => ({ ...prev, category: activeCategories }));
  }, [activeCategories, setKeyword]);

  return (
  <nav className="flex w-full overflow-x-auto px-6 py-4 gap-4 bg-gray-100 rounded shadow-md scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
      {/* Upload Button */}
      <Link href="/upload">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="flex-shrink-0 flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-300 border border-blue-600 rounded cursor-pointer hover:text-white hover:bg-blue-700 transition-all duration-200"
        >
          <IoAdd />
        </motion.div>
      </Link>

      {/* Categories */}
      {categories.map((category, index) => (
        <motion.div
          key={index}
          onClick={() => toggleCategory(category)}
          whileTap={{ scale: 0.9 }}
          className={`flex-shrink-0 flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded cursor-pointer transition-all duration-200 ${
            activeCategories.includes(category) ? "bg-blue-600 text-white" : "hover:bg-blue-700 hover:text-white"
          }`}
        >
          {category}
        </motion.div>
      ))}
    </nav>
  );
};

export default Searchbox;
