import React from "react";
import { FaSearch } from "react-icons/fa";

// Define types for props
interface keyword { 
   category: string;
   min:string;
   max:string;
   type:string ;
   location:string
   limit:number;
  }

type SearchBarProps = {
  setKeyword: React.Dispatch<
    React.SetStateAction<keyword>
  >;
};

const SearchBar = ({ setKeyword }: SearchBarProps) => {
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword((prev) => ({
      ...prev,
      location: e.target.value,
    }));
  };

  return (
    <header className="fixed left-0 right-0 bg-white top-0 px-6 py-3 flex items-center gap-4 shadow-md z-50">
      {/* Search Input Wrapper */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search with location..."
          className="w-full h-12 pl-12 pr-4 rounded bg-gray-100 text-gray-700 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        {/* Search Icon Inside Input */}
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </header>
  );
};

export default SearchBar;
