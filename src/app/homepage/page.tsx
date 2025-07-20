"use client";


import SearchBar from "@/components/SearchBar";
import React, {  useState,Suspense } from "react";
import Searchbox from "@/components/searchbox";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
import HouseMainComponent from "@/components/HouseMainComponent";
// Define resource type

interface keyword { 

   category: string;
   min:string;
   max:string;
   type:string ;
   location:string;
   limit:number;
  }
const Page: React.FC = () => {
  const [keyword, setKeyword] = useState<keyword>(
    { min:"", max:"",type:"",category:"",location:"" ,limit:50}
  );
 const [bardge,setBardge]  = useState(1)

  return (
    <>
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-16" >
      {/* Header Section */}
   

    <motion.header
      className="px-6 py-8 bg-blue-600 shadow-md text-white text-center mx-auto w-full max-w-4xl sm:max-w-3xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
        Find Your Perfect Home
      </h1>
      <p className="text-gray-200 text-sm sm:text-base md:text-lg mt-2">
        Browse thousands of availabe houses and find your ideal apartment.
      </p>
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
      <Suspense>
      <HouseMainComponent keyword={keyword} bardge={bardge}/>
      </Suspense>
     
    </div >
    <Footer/>
    </>
  );
};

export default Page;
