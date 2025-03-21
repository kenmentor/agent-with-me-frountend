"use client";
import Erro from "@/components/Erro";
import HeaderCostum from "@/components/HeaderCostum";
import Loainding from "@/components/Loainding";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";


interface data{ 
  
  id:string,
header:string,
description:string,
thumbnail:string,
views:number,
state:string,
landmark:string,
adress:string,
gallery:[{src:string,alt:string},
  {src:string,alt:string},
  {src:string,alt:string},
  {src:string,alt:string}]
}
const Page: React.FC = () => {
  
  const [data, setData] = useState<data>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    fetchData("this to be an id ");
  }, []);

  async function fetchData(id: string) {
    try {
      const res = await fetch(`http://localhost:3001/details/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setData(data);
      console.log(data);
      setError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }




  return (
    <>
      <HeaderCostum text={data ? data.header : "Resource Details"} />
      {loading ? (
        <Loainding />
      ) : error ? (
        <Erro />
      ) : (
        
       <div>
        <div className="flex overflow-scroll gap-5 h-72 object-contain bg-black">
          {data?.gallery.map((element,index)=>(
<Image src={element.src} alt={element.alt}key={index} className=" "/>
))}
        </div>
        <h1>
          details
        </h1>
        <div>
          <div>
          <h2>
            {
              data?.header
            }
          </h2>
          <h2>
            {
              data?.adress
            }
          </h2><h2>
            {
              data?.landmark
            }
          </h2><h2>
            {
              data?.state
            }
          </h2><h2>
            {
              data?.description
            }
          </h2>
          </div>
          <div>
            
          </div>
          <div>
            <button className="flex border p-2 items-center gap-1">Rent Now<FaWhatsapp/> </button>
          </div>
        </div>
       </div>
      )}
    </>
  );
}

export default Page;
