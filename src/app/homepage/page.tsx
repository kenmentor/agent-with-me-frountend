"use client";
import Resource from "@/components/Resource";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import Searchbox from "@/components/searchbox";
import Loainding from "@/components/Loainding";
import Erro from "@/components/Erro";

// Define resource type more precisely
type ResourceType = {
  header: string;
  views: number;
  description: string;
  rating: number; // Changed from 'Number' to 'number'
  id: string;
  thumbnail: string;
  landmark:string,
  gallery:[{
    src:"",
    alt:""
  }]
  price:number
};

const Page: React.FC = () => {
  const [keyword, setKeyword] = useState<{
    searchWord: string;
    category: string[];
  }>({
    searchWord: "",
    category: [],
  });

  const [data, setData] = useState<ResourceType[]>([]); // Specify the type of data
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from backend when keyword or category changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading when fetching
        const res = await fetch(
          `http://localhost:3001/resources?keyword=${encodeURIComponent(
            keyword.searchWord
          )}&category=${encodeURIComponent(keyword.category.join())}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setData(data);
        setError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [keyword]);
console.log(keyword)
  // Fetch data from the backend API with query params for keyword and category

  // Render resources as components
  const elementResource = data.map((resource,index) => (
    <Resource
      key={index} //should be _id
      thumbnail={resource.thumbnail}
      id={resource.id} // should be _id 
      header={resource.header}
      rating={resource.rating}
      gallery={resource.gallery}
      landmark={resource.landmark}
      price={resource.price}
    />
  ));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Header Section */}
      <header className="px-6 py-8 bg-gray-800 border-b border-gray-700">
        <h1 className="text-lg font-medium text-gray-100 mb-2">
          Rent a House Today
        </h1>
        <p className="text-sm text-gray-400">
          find a decent apartment made just for you 
        </p>
      </header>

      {/* Search Section */}
      <section className="px-6 py-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <SearchBar setKeyword={setKeyword} />
          <div className="mt-4">
            <Searchbox setKeyword={setKeyword} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      {loading ? (
        <Loainding />
      ) : error ? (
        <Erro />
      ) : (
        <main className="px-6 py-10 bg-gray-100">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {elementResource.length&&(
              elementResource
            )}
          </div>
        </main>
      )}

      {/* Footer */}
      {/* <Footer className="mt-auto" /> */}
    </div>
  );
};

export default Page;
