"use client";

import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type HeaderProps = {
  text: string;
  showBackButton?: boolean; // Optional back button toggle
};

const HeaderCustom = ({ text, showBackButton = true }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setIsVisible(window.scrollY < lastScrollY || window.scrollY === 0);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gray-900 text-white shadow-md"
      initial={{ y: -80 }}
      animate={{ y: isVisible ? 0 : -80 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back Button (Only Show When Needed) */}
      {showBackButton && (
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 border border-gray-500 text-white px-3 py-2 rounded-full hover:bg-gray-700 transition-all"
          aria-label="Go Back"
        >
          <GoArrowLeft size={20} /> Back
        </button>
      )}

      {/* Title */}
      <h1 className="text-lg font-semibold text-center flex-1 truncate">{text}</h1>

      {/* Right Side Content (Empty for Now) */}
      <div className="w-8"></div>
    </motion.header>
  );
};

export default HeaderCustom;
