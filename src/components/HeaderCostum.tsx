"use client";
type header = {
  text:string
}

import React, { useState, useEffect } from "react";
import { GoArrowBoth } from "react-icons/go";

const HeaderCostum = ({ text }:header) => {
  // State to track whether the header is visible or not
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide the header when scrolling down
      } else {
        setIsVisible(true); // Show the header when scrolling up
      }
      lastScrollY = window.scrollY <= 0 ? 0 : window.scrollY; // Prevent negative scroll position
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <header
      className={`flex items-center justify-between px-1 py-4 bg-gray-900 fixed top-0 left-0 right-0 text-white z-50 shadow-md transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-20"
      }`}
    >
      {/* Back Button */}
      <a href="http://localhost:3000/homepage">
      <button
        className="flex items-center gap-2  border text-white rounded-full hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        aria-label="Go Back"
        
      >
        
        <GoArrowBoth size={25} />
      </button>
      </a>

      {/* Heading Section */}
      <h1 className="text-2xl font-semibold text-center flex-1 text-nowrap ">{text}</h1>

      {/* Additional Content (Right Side) */}
      <div className="flex items-center gap-4"></div>
    </header>
  );
};

export default HeaderCostum;
