import React from "react";
import { BiLoader } from "react-icons/bi";

const Loainding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <BiLoader className="animate-spin text-gray-400" size={50} />
    </div>
  );
};

export default Loainding;
