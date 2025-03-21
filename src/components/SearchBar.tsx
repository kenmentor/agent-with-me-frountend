import React from "react";
import { FaSearch } from "react-icons/fa";

// Define types for props
type SearchBarProps = {
  setKeyword: React.Dispatch<
    React.SetStateAction<{ searchWord: string; category: string[] }>
  >;
};

const SearchBar = ({ setKeyword }: SearchBarProps) => {
  // Handle the change of input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword((prev) => ({
      ...prev,
      searchWord: e.target.value,
    }));
  };

  return (
    <header className="fixed left-0 right-0 bg-gray-800 top-0 px-6 py-3 flex items-center gap-4 shadow-md z-50">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for resources..."
        className="flex-1 h-12 px-4 rounded-md bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange} // Corrected event handler
      />

      {/* Search Button */}
      <button
        className="bg-blue-600 text-white h-12 w-12 flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </header>
  );
};

export default SearchBar;
