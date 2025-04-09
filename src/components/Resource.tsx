"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {  FaMapMarkerAlt, } from "react-icons/fa";
import Link from "next/link";
import { GiLightBulb } from 'react-icons/gi'
import { PiShowerBold } from "react-icons/pi";

import { FcCancel } from "react-icons/fc";

// Define the resource type
type ResourceProps = {
  header: string;
  thumbnail: string;
  price: number;
  id: string;
  location: string;
  category?: string; 
  isNew?: boolean; 
  gallery: { src: string; alt: string }[];
  electricity:number;
  waterSuply:boolean;
};

const Resource = ({
  header,
  thumbnail,
  price,
  id,
  location,
  category = "Luxury",
  isNew = false,
  electricity ,
  waterSuply
}: ResourceProps) => {
  let categoryStyle = "text-blue-500 bg-blue-100 ";

  if (category === "Premium") {
    categoryStyle = "text-blue-500  bg-blue-100 " ;
  }
  if (category === "Mediate") {
    categoryStyle = "text-orange-500  bg-orange-100 ";
  }

  if (category === "Minimal") {
    categoryStyle = "text-green-500  bg-green-100 ";
  }
  return (
    <motion.div
      className="relative  bg-gray-50 rounded-sm overflow-hidden border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* New Badge (Replace later) */}
      {isNew && (
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
          New
        </span>
      )}
    

      {/* Thumbnail Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={"hhh"}
          layout="fill"
          objectFit="cover"
          unoptimized={true}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Details Section */}
      <div className="p-4 space-y-3">
        {/* Title, Price & Category */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{header}</h2>
          <span className="text-lg font-bold text-blue-500">₦{price.toLocaleString()}</span>
        </div>

        {/* Landmark & Category */}
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <FaMapMarkerAlt className="text-red-500" /> {location}
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
  {/* Category */}
  <p className= {`${categoryStyle} text-[10px] sm:text-xs font-medium  px-2 py-1 rounded-lg`}>
    {category}
  </p>

  {/* Power Supply */}
  <p className="text-[10px] sm:text-xs flex items-center gap-1 font-medium text-yellow-500 bg-yellow-100 px-2 py-1 rounded-lg">
    <GiLightBulb className="text-sm" />
    Power Supply: {electricity}%
  </p>

  {/* Water Supply */}
  <p className="text-[10px] sm:text-xs flex items-center gap-1 font-medium text-blue-500 bg-blue-100 px-2 py-1 rounded-lg">
    Water Supply: {waterSuply ? <PiShowerBold className="text-sm" /> : <FcCancel className="text-sm" />}
  </p>
</div>

        
     
        
          
       

        {/* View Details Button */}
        <Link
          href={`/${id}/resource-details`}
          className="block text-center text-white  bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-2 rounded-sm font-medium hover:text-blue-500"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default Resource;
