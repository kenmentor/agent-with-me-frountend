import React from 'react';
import { motion } from "framer-motion";
import { BiLoaderAlt } from "react-icons/bi";


const UploadingUi = () => {
// Don't render if not loading

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
        <h3 className="text-xl font-bold">Uploading...</h3>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 mt-4 rounded-full">
          <div
            className="bg-blue-600 h-2 rounded-full"
            
          >
            <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <BiLoaderAlt className="animate-spin text-blue-500 drop-shadow" size={60} />
      </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadingUi;
