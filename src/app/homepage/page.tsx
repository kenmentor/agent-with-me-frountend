"use client";


import SearchBar from "@/components/SearchBar";
import React, {  useState } from "react";
import Searchbox from "@/components/searchbox";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
import HouseMainComponent from "@/components/HouseMainComponent";
// Define resource type

interface keyword { 
  searchWord: string;
   category: string;
   min:string;
   max:string;
   type:string ;
   location:string
   limit:number;
  }
const Page: React.FC = () => {
  const [keyword, setKeyword] = useState<keyword>(
    { searchWord: "",min:"", max:"",type:"",category:"",location:"" ,limit:50}
  );
 const [bardge,setBardge]  = useState(1)

  return (
    <>
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-16" >
      {/* Header Section */}
   
    <motion.header
      className="px-4 sm:px-6 md:px-8 py-8 bg-blue-600 shadow-md text-white text-center mx-auto max-w-full sm:max-w-3xl md:max-w-4xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Find Your Perfect Home</h1>
      <p className="text-gray-200 mt-2 text-sm sm:text-base md:text-lg">Browse thousands of listings to find your ideal apartment</p>
    </motion.header>






      {/* Search Section */}
      <section className="px-6 py-6 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <SearchBar setKeyword={setKeyword} />
      
          <div className="mt-4" onScroll={()=>setBardge(1)}>
            <Searchbox setKeyword={setKeyword} min={keyword.min} max={keyword.max} />
          </div>
        </div >
      </section>

      <HouseMainComponent keyword={keyword} bardge={bardge}/>
     
    </div >
    <Footer/>
    </>
  );
};

export default Page;
