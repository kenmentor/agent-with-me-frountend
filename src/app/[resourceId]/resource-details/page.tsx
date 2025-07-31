"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar, FaWhatsapp, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import Footer from "@/components/footer";
import HouseMainComponent from "@/components/HouseMainComponent";
import HeaderCustom from "@/components/HeaderCostum";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaBullseye } from "react-icons/fa6";

interface data {
  _id: string;
  title: string;
  description: string;
  views: number;
  rating: number;
  category: string;
  thumbnail: string;
  gallery: [{ url: string, type: string }];
  price: number;
  address: string;
  state: string;
  type: string;
  waterSuply: boolean;
  electricity: number;
  location: string;
}

const RentalPage: React.FC = () => {
  const { resourceId } = useParams();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [data, setData] = useState<data>({
    _id: "67a1556ba07c49d55f85b11f",
    title: "HELLO ",
    description: "JUST TESTING IF IT IS WORKING ",
    views: 0,
    rating: 4.5,
    category: "Mediate",
    thumbnail: "",
    gallery: [{ url: "", type: "" }],
    price: 4933,
    address: "saga ",
    state: "lagos",
    location: "ab",
    type: "selfcon",
    waterSuply: true,
    electricity: 50,
  });

  const handleImageClick = (index: number) => {
    setSelectedImage(data.gallery[index].url);
    setCurrentIndex(index);
  };

  const nextImage = () => {
    if (currentIndex <= data.gallery.length) {


      const newIndex = (currentIndex + 1) % data.gallery.length;
      setSelectedImage(data.gallery[newIndex].url);
      setCurrentIndex(newIndex);
    }
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + data.gallery.length) % data.gallery.length;
    setSelectedImage(data.gallery[newIndex].url);
    setCurrentIndex(newIndex);
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "2349117264336";
    const message = `Hello, I'm interested in this property. Can you provide more details? ${data.title} house id: ${data._id}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  async function getData() {
    try {
      const res = await fetch(`http://localhost:800/v1/house/`);
      const result = await res.json();

      if (result && result.data) {
        setData(result.data);
        const thumbnail = result.data.thumbnail || (result.data.gallery && result.data.gallery[0]) || "";
        setSelectedImage(thumbnail);
      } else {
        console.error("Invalid data structure:", result);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    }
  }
  async function updateView(id: string) {
    try {
      const res = await fetch(`http://localhost:800/v1/house/v1/`, {
        method: "PUT",
        body: id
      });
      console.log(res.json())
    } catch (err) {
      console.log("Fetch error:", err);
    }
  }

  useEffect(() => {
    getData();
    updateView(data._id);
  }, []);

  let categoryStyle = "text-blue-500";

  if (data.category === "Premium") {
    categoryStyle = "text-blue-500";
  }
  if (data.category === "Mediate") {
    categoryStyle = "text-orange-500";
  }

  if (data.category === "Minimal") {
    categoryStyle = "text-green-500";
  }

  const brokenImage = ""; // Default placeholder for broken images
  let count = 0
  return (
    <>
      <HeaderCustom text={data.title || "Title"} showBackButton={true} />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded mt-13">
        {/* Header & Rating */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{data.title || "Title"}</h1>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span className="text-gray-700 font-semibold">4.8 ({data.views || "0"} reviews)</span>
          </div>
        </div>

        <p className="text-gray-600 mt-1">📍 {data.location || "location"}, {data.state || "Cross river"}, Nigeria</p>

        {/* Main Image */}
        <div
          className="relative w-full h-80 mt-4 rounded overflow-hidden cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <Image
            src={selectedImage || brokenImage}
            alt={data.title || "Title"}
            layout="fill"
            objectFit="cover"
            className="rounded transition duration-300 hover:opacity-80"
            onError={(e) => (e.currentTarget.src = brokenImage)} // Handle broken images
          />
        </div>

        {/* Image Gallery - Slider */}
        {data.gallery && data.gallery.length > 0 && (
          <div className="flex mt-4 gap-2 overflow-x-auto hide-scrollbar">
            {data.gallery.map((image, index) => (
              <div
                key={index}
                className={`relative w-24 h-24 rounded overflow-hidden cursor-pointer ${
                  selectedImage === image .url? "border-4 border-blue-500" : ""
                }`}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={image.url || brokenImage}
                  alt={`gallery-image-${index}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded transition-transform duration-200 hover:scale-105"
                  onError={(e) => (e.currentTarget.src = brokenImage)} // Handle broken images
                />
              </div>
            ))}
          </div>
          
        )}

        
        {/* Pricing & Booking */}
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="text-lg font-semibold text-gray-800">
            ₦{data.price?.toLocaleString() || "0.000"} <span className="text-sm text-gray-300">/ per year</span>
          </p>
          <p className="text-gray-600">
            {data.type} • 2 {data.waterSuply ? "with water" : "without water"} •{" "}
            <div className="inline bg-gray-200 rounded-xl px-2 py-1 text-center">
              <p className={`${categoryStyle} inline`}>{data.category}</p>
            </div>
          </p>
          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded font-semibold hover:bg-orange-600 transition">
            Rent Now <h1>

          {count}
        </h1>
          </button>

          {/* WhatsApp Contact Button */}
          <button
            onClick={handleWhatsAppContact}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition"
          >
            <FaWhatsapp className="text-xl" />
            Contact via WhatsApp
          </button>
        </div>

        {/* Description */}
        <div className="text-gray-800 bg-gray-100 p-4 rounded mt-2">
          <h1 className="font-semibold text-lg">Description</h1>
          <div className="relative">
            <p
              className={`transition-all duration-300 ease-in-out ${!readMore ? "max-h-20 overflow-hidden" : "max-h-full"}`}
              style={{ WebkitLineClamp: !readMore ? 3 : 'none', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}
            >
              {data.description}
              <span
                onClick={() => setReadMore((prev) => !prev)}
                className="text-blue-500 cursor-pointer  "
              >
                {!readMore ? "Read more" : "Show less"}
              </span>
            </p>
          </div>
        </div>


        {/* Modal for Full-Screen Image View */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 top-0 bottom-0 left-0 right-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative max-w-4xl w-full p-4 bg-white rounded-lg shadow-lg">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-red-500"
                  onClick={() => setModalOpen(false)}
                >
                  <FaTimes />
                </button>

                {/* Large Image */}
                <div className="relative w-full h-full flex justify-center items-center ">
                  <motion.img
                    src={selectedImage || brokenImage}
                    alt={data.title || "Full Screen Image"}
                    className="max-h-full w-full rounded-lg"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  />
                </div>

                {/* Navigation Arrows */}
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full hover:bg-gray-700"
                  onClick={prevImage}
                >
                  <MdArrowBackIos size={24} />
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full hover:bg-gray-700"
                  onClick={nextImage}
                >
                  <MdArrowForwardIos size={24} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="bg-white ">

        {<HouseMainComponent keyword={{ category: data.category, min: `${data.price - 10000}`, max: "", type: data.type, location: data.location, limit: 6, id: data._id }} bardge={1} page={false} />}
  
      </div>

      <Footer />
    </>
  );
};

export default RentalPage;
