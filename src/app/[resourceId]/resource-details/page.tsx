"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar, FaWhatsapp, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import Footer from "@/components/footer";
import HouseMainComponent from "@/components/HouseMainComponent";
	



interface data {
  _id	:string;
    title	:string;
    description:	string;
    views	:number;
    rating:	number;
    category	:	string;
    thumbnail:	string;
    gallery	:[string];
    price:number;
    address: string ;
    state:string;
    landmark:string;
    type:string;
    waterSuply:boolean ;
    electricity:number;
}

const RentalPage: React.FC = () => {
  const {resourceId} = useParams()
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const [data,setdata] = useState<data>({
    _id	:"67a1556ba07c49d55f85b11f",
    title	:"HELLO ",
    description:	"JUST TESTING IF IT IS WORKING ",
    views	:0,
    rating:	4.5,
    category	:	"Mediate",
    thumbnail:	"",
    gallery	:[""],
    price:4933,
    address: "saga ",
    state:"lagos",
    landmark:"tou ctoyyr",
    type:"selfcon",
    waterSuply:true ,
    electricity:50,
  })

  const handleImageClick = (index: number) => {
    setSelectedImage(data.gallery[index]);
    setCurrentIndex(index);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % data.gallery.length;
    setSelectedImage(data.gallery[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + data.gallery.length) % data.gallery.length;
    setSelectedImage(data.gallery[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "2349117264336";
    const message = `Hello, I'm interested in this property. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };
  async function getdata (){
    try{
      const res = await fetch(`https://agent-with-me-backend.onrender.com/v1/${resourceId}`)
      const result = await res.json();
      setSelectedImage(result.thumbnail)
      await setdata(result.data)
      
      
    }
   catch{ 
    console.log("error")
   }
  }
useEffect(()=>{
  getdata()
},[])
function click (){
  alert("working boys")
  console.log("working boys")
  setModalOpen(prev=>!prev)
}
let categoryStyle = "text-blue-500"


if (data.category=="Premuim"){
  categoryStyle = "text-blue-500"
}
if (data.category=="Mediate"){
  categoryStyle = "text-orange-500"
}

if (data.category=="Minimal"){
  categoryStyle = "text-green-500"
}


  return (
    <>
   
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded">
      {/* Header & Rating */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <span className="text-gray-700 font-semibold">4.8 ({data.views} reviews)</span>
        </div>
      </div>
      
      <p className="text-gray-600 mt-1">📍 {data.landmark}, {data.state}, Nigeria</p>
     

      {/* Main Image */}
      <div className="relative w-full h-80 mt-4 rounded overflow-hidden cursor-pointer"
           onClick={() => setModalOpen(true)}>
        <Image src={selectedImage} alt={data.title} layout="fill" objectFit="cover"
               className="rounded transition duration-300 hover:opacity-80" />
      </div>

      {/* Image Gallery - Slider */}
      <div className="flex mt-4 gap-2 overflow-x-auto hide-scrollbar">
        {data.gallery.map((image, index) => (
          <div key={index} className={`relative w-24 h-24 rounded overflow-hidden cursor-pointer 
                  ${selectedImage === image ? "border-4 border-blue-500" : ""}`}
               onClick={() => handleImageClick(index)}>
            <Image src={image} alt={image} layout="fill" objectFit="cover"
                   className="rounded transition-transform duration-200 hover:scale-105" />
          </div>
        ))}
      </div>

      {/* Pricing & Booking */}
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <p className="text-lg font-semibold  text-gray-800">
        ₦{data.price.toLocaleString()} <span className="text-sm text-gray-300">/ per year</span>
        </p>
        <p className="text-gray-600">{data.type} • 2 {(data.waterSuply)? "with water":"without water "} •  <div className="inline  bg-gray-200 rounded-xl px-2  py-1  text-center " >
      <p className={`${categoryStyle} inline`}>{data.category}</p>
        </div></p>
        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition">
        Rent Now 
        </button>

        {/* WhatsApp Contact Button */}
        <button onClick={handleWhatsAppContact}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition">
          <FaWhatsapp className="text-xl" />
          Contact via WhatsApp
        </button>
      </div>

      {/* Modal for Full-Screen Image View */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative max-w-4xl w-full p-4 bg-white rounded-lg shadow-lg">
              {/* Close Button */}
              <button  className="absolute top-4 right-4  bg-gray-800 text-white p-2 rounded-full hover:bg-red-500"   onClick={click}>
              <FaTimes />
    </button>

              {/* Large Image */}
              <div className="relative w-full h-[500px] flex justify-center items-center">
                <motion.img src={selectedImage} alt={data.title} className="max-h-[90vh] w-auto rounded-lg"
                            initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} />
              </div>

              {/* Navigation Arrows */}
              <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full hover:bg-gray-700"
                      onClick={prevImage}>
                <FaArrowLeft size={24} />
              </button>
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full hover:bg-gray-700"
                      onClick={nextImage}>
                <FaArrowRight size={24} />
              </button>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  
    <HouseMainComponent keyword={{searchWord:"",category:data.category,min:`${data.price-10000}`,max:"",type:data.type,location:"",limit:6}} bardge={1} />
    <Footer/>
    </>
  );
};

export default RentalPage;
