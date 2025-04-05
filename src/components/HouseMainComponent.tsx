"use client";

import Resource from "@/components/Resource";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loainding";
import Error from "@/components/Erro";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

interface ResourceType {
  header: string;
  views: number;
  description: string;
  id: string;
  thumbnail: string;
  location: string;
  gallery: { src: string; alt: string }[];
  price: number;
  electricity: number;
  waterSuply: boolean;
  _id: string;
}

interface keyword {
  category: string;
  min: string;
  max: string;
  type: string;
  location: string;
  limit: number;
  id?: string;
}

interface HouseMainComponent {
  keyword?: keyword;
  bardge?: number;
}

const HouseMainComponent: React.FC<HouseMainComponent> = ({ keyword, bardge = 0 }) => {
  const [data, setData] = useState<ResourceType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const queryObj: Record<string, string> = {};

    // Only add params if they exist (filter is active)
    ["location", "category", "type", "min", "max", "limit", "bardge"].forEach((key) => {
      const val = searchParams.get(key);
      if (val && val !== "") queryObj[key] = val;
    });

    const query = new URLSearchParams(queryObj).toString();
    const finalUrl = `https://agent-with-me-backend.onrender.com/v1/resources${query ? "?" + query : ""}`;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(finalUrl);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams.toString()]);
  
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
                thumbnail={resource.thumbnail || "/de/d"}
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
