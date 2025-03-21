"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

// Define the type for SearchboxProps
type SearchboxProps = {
  setKeyword: React.Dispatch<
    React.SetStateAction<{ searchWord: string; category: string[] }>
  >;
};

const Searchbox = ({ setKeyword }: SearchboxProps) => {
  // Initial categories with active state
  const [array, setArray] = useState([
    { text: "anti", active: false },
    { text: "phy", active: false },
    { text: "maths", active: false },
    { text: "stats", active: false },
    { text: "french", active: false },
    { text: "others", active: false },
    { text: "biology", active: false },
    { text: "chemistry", active: false },
    { text: "geography", active: false },
  ]);

  // State for active categories
  const [cate, setCate] = useState<string[]>([]);

  // Handle category activation
  const activate = (id: string) => {
    setArray((prev) =>
      prev.map((item) =>
        item.text === id ? { ...item, active: !item.active } : item
      )
    );

    setCate((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id); // Remove category if already selected
      } else {
        return [...prev, id]; // Add category if not selected
      }
    });
  };

  // Effectively update the `category` in `setKeyword`
  React.useEffect(() => {
    setKeyword((prev) => ({
      ...prev,
      category: cate, // Update category with the latest selected categories
    }));
  }, [cate, setKeyword]);

  return (
    <nav className="flex overflow-x-auto px-6 py-4 gap-4 bg-gray-800 rounded-md shadow-md scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
      {/* Upload Button */}
      <Link href="/upload">
        <div className="flex-shrink-0 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-lg cursor-pointer hover:text-white transition-all duration-200">
          <IoAdd />
        </div>
      </Link>

      {/* Categories */}
      {array.map((data, index) => (
        <div
          onClick={() => activate(data.text)}
          key={index}
          className={`flex-shrink-0 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-lg cursor-pointer ${
            data.active ? "bg-blue-600" : ""
          } hover:text-white transition-all duration-200`}
        >
          {data.text}
        </div>
      ))}
    </nav>
  );
};

export default Searchbox;
