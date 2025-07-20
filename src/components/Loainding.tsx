"use client";

import React from "react";
import { motion } from "framer-motion";
import { BiLoaderAlt } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Animated Loader Icon */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <BiLoaderAlt className="animate-spin text-blue-500 drop-shadow" size={60} />
      </motion.div>

      {/* Subtle Loading Text */}
      <motion.p
        className="mt-4 text-sm text-gray-400 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Loading, please wait...
      </motion.p>

      {/* Glowing effect */}
      <div className="absolute w-20 h-20 opacity-20 rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
};

export default Loading;
