"use client";

import Resource from "@/components/Resource";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loainding";
import Error from "@/components/Erro";
import { motion } from "framer-motion";
// Define resource type
interface ResourceType {
  header: string;
  views: number;
  description: string;
  id: string;
  thumbnail: string;
  location: string;
  gallery: { src: string; alt: string }[];
  price: number;
  electricity:number;
  waterSuply:boolean;
  _id:string;
}
interface keyword { 
   category: string;
   min:string;
   max:string;
   type:string ;
   location:string;
   limit:number;
   id?:string
  }

 interface HouseMainComponent {
    keyword:keyword;
    bardge:number;
 }
const HouseMainComponent: React.FC<HouseMainComponent> = ({keyword,bardge}) => {
  
  const [data, setData] = useState<ResourceType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
console.log(keyword)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `https://agent-with-me-backend.onrender.com/v1/resources?location=` //${encodeURIComponent(
          //   keyword.location
          // )}&category=${keyword.category}&type=${keyword.type}&min=${keyword.min}&max=${keyword.max}&bardge=${bardge}&limit=${keyword.limit}`
        );
        
        const result = await res.json();
        console.log(result)
        setData((prev:ResourceType[])=>{
          if(bardge<=1){ return result.data||[]}
          else{ return [...prev,result.data]}

         
        });
        console.log("data from ",result)
      } catch (error) {

        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [keyword]);

  return (
      <main className="px-6 py-10">
      
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <motion.div
            className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
           
            {data.length > 0 ? (
              data.map((resource) => (
                <Resource
                  key={resource._id}
                  thumbnail={resource.thumbnail||"/de/d"}
                  id={resource._id}
                  header={resource.header}
                  gallery={resource.gallery}
                  location={resource.location}
                  price={resource.price || 200000}
                  electricity={resource.electricity}
                  waterSuply={resource.waterSuply}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">No results found</p>
            )}
             
          </motion.div>
        )}
         
      </main> 

   
  );
};

export default HouseMainComponent;
