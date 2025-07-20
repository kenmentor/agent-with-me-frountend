"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";
import { MdArrowDropDown } from "react-icons/md";
import Price from "./price";

interface keyword { 
   category: string;
   min:string;
   max:string;
   type:string ;
   location:string;
   limit:number;
  }
type SearchboxProps = {
  setKeyword: React.Dispatch<
    React.SetStateAction<keyword>
  >;
  max:string;
  min:string;
};

const categories = [


{
  name:"type",
  data:[
  "Self Con",
  "Two Bed Room ",
  "Single Room",
  "Three Bed Room "
],
},
{
  name:"category",
  data:[
  "luxerus",
  "preium",
  "mediate",
  "minimal"
],
},
  
  
  
  
];

const Searchbox = ({ setKeyword ,min,max}: SearchboxProps) => {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [price,setPrice] = useState(false)
  // Toggle category selection
  console.log(activeCategories)
  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  // Update the `setKeyword` state when categories change
  
  function onclickPrice(){
    setPrice((prev)=>!prev)
  }
  return (
    <>
  <nav className="flex w-hv overflow-x-auto px-4 py-4 gap-4 bg-gray-100 rounded shadow-md scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
      {/* Upload Button */}
      <Link href="/upload">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="flex-shrink-0 flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-300 border border-blue-600 rounded cursor-pointer hover:text-white hover:bg-blue-700 transition-all duration-200"
        >
          <IoAdd />
        </motion.div>
      </Link>
     
        
      <button className={`flex-shrink-0 flex  items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded cursor-pointer transition-all duration-200 w-1/4 ${
            "bg-blue-600 items-center text-nowrap  justify-between text-white hover:bg-blue-700 hover:text-white"
          }`} onClick={onclickPrice} >{(min != "" ||max != "")?`${max} - ${min}` :"price"}<MdArrowDropDown/></button>
      {/* Categories */}
      {categories.map((category, index) => (
       
         <motion.select
          key={index}
            id="" className={`flex-shrink-0 flex items-center justify-center px-4 py-2  text-sm font-medium text-blue-600 border border-blue-600 rounded cursor-pointer transition-all duration-200 w-1/4 ${
            "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
          }`}
          name={category.name}
          onChange={(e)=>{
            const name = e.target.name
            const value= e.target.value 
            console.log(name,value)
            setKeyword((prev)=>(
              {
                ...prev,[name]:value
              }
            ))
          }}
        
          
          
        >
          <option value="">{category.name}  </option>
          {category.data.map((element, index) => (
        
        <motion.option
         key={index}
         onClick={() => toggleCategory(element)}
         whileTap={{ scale: 0.9 }}
         value={element}
       >{element}

         </motion.option>
      
     ))}
          
         
          </motion.select>
       
      ))}
       
    </nav>
    {price&&<Price setKeyword ={setKeyword} />}
    </>
  );
};

export default Searchbox;