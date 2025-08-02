"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center p-6">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold mb-4 drop-shadow-2xl text-center leading-tight"
      >
        Rent Smarter, Move Faster.
      </motion.h1>


      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="text-lg max-w-2xl mx-auto text-gray-300"
      >
        Find your perfect space—modern, affordable, and just a click away.
      </motion.p>

      {/* Call to Action Button */}
      <motion.a
        href="/homepage"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}

        className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-orange-600 transition"
      >
        Get Started
      </motion.a>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 bg-white bg-opacity-20 rounded-full blur-xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-2xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
    </div>
  );
};

export default Page;
