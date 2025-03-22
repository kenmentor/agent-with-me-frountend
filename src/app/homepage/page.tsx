"use client";

import Resource from "@/components/Resource";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import Searchbox from "@/components/searchbox";
import Loading from "@/components/Loainding";
import Error from "@/components/Erro";
import { motion } from "framer-motion";
import Footer from "@/components/footer";
// Define resource type
interface ResourceType {
  header: string;
  views: number;
  description: string;
  rating: number;
  id: string;
  thumbnail: string;
  landmark: string;
  gallery: { src: string; alt: string }[];
  price: number;
  _id:string;
}

const Page: React.FC = () => {
  const [keyword, setKeyword] = useState<{ searchWord: string; category: string[] }>(
    { searchWord: "", category: [] }
  );
  const [data, setData] = useState<ResourceType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `https://agent-with-me-backend.onrender.com/resources?keyword=${encodeURIComponent(
            keyword.searchWord
          )}&category=${encodeURIComponent(keyword.category.join())}`
        );
        const result = await res.json();
        setData(result);
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
    <>
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section */}
      <motion.header
        className="px-6 py-8 bg-blue-600 shadow-md text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Find Your Perfect Home</h1>
        <p className="text-gray-200">Browse thousands of listings to find your ideal apartment</p>
      </motion.header>

      {/* Search Section */}
      <section className="px-6 py-6 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <SearchBar setKeyword={setKeyword} />
          <div className="mt-4">
            <Searchbox setKeyword={setKeyword} />
          </div>
        </div>
      </section>

      {/* Main Content */}
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
                  thumbnail={resource.thumbnail}
                  id={resource._id}
                  header={resource.header}
                  rating={resource.rating}
                  gallery={resource.gallery}
                  landmark={resource.landmark}
                  price={resource.price || 0}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">No results found</p>
            )}
          </motion.div>
        )}
      </main>
     
    </div>
    <Footer/>
    </>
  );
};

export default Page;
