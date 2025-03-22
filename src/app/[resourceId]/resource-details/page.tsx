"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar, FaWhatsapp, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/footer";

const placeholderImages = [
  { src: "https://source.unsplash.com/600x400/?house", alt: "Modern house" },
  { src: "https://source.unsplash.com/600x400/?apartment", alt: "Luxury apartment" },
  { src: "https://source.unsplash.com/600x400/?villa", alt: "Beautiful villa" },
  { src: "https://source.unsplash.com/600x400/?real-estate", alt: "Real estate property" },
  { src: "https://source.unsplash.com/600x400/?architecture", alt: "Stunning architecture" },
  { src: "https://source.unsplash.com/600x400/?interior", alt: "Interior design" },
];

const RentalPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string }>(placeholderImages[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImage(placeholderImages[index]);
    setCurrentIndex(index);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % placeholderImages.length;
    setSelectedImage(placeholderImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + placeholderImages.length) % placeholderImages.length;
    setSelectedImage(placeholderImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "2348012345678";
    const message = `Hello, I'm interested in this property. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header & Rating */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Luxury Apartment</h1>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <span className="text-gray-700 font-semibold">4.8 (120 reviews)</span>
        </div>
      </div>
      <p className="text-gray-600 mt-1">📍 Victoria Island, Lagos, Nigeria</p>

      {/* Main Image */}
      <div className="relative w-full h-80 mt-4 rounded-lg overflow-hidden cursor-pointer"
           onClick={() => setModalOpen(true)}>
        <Image src={selectedImage.src} alt={selectedImage.alt} layout="fill" objectFit="cover"
               className="rounded-lg transition duration-300 hover:opacity-80" />
      </div>

      {/* Image Gallery - Slider */}
      <div className="flex mt-4 gap-2 overflow-x-auto hide-scrollbar">
        {placeholderImages.map((image, index) => (
          <div key={index} className={`relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer 
                  ${selectedImage.src === image.src ? "border-4 border-blue-500" : ""}`}
               onClick={() => handleImageClick(index)}>
            <Image src={image.src} alt={image.alt} layout="fill" objectFit="cover"
                   className="rounded-lg transition-transform duration-200 hover:scale-105" />
          </div>
        ))}
      </div>

      {/* Pricing & Booking */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-semibold">
          $250 <span className="text-sm text-gray-600">/ per night</span>
        </p>
        <p className="text-gray-600">4 Guests • 2 Beds • 2 Baths</p>
        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
          Book Now & Pay Later
        </button>

        {/* WhatsApp Contact Button */}
        <button onClick={handleWhatsAppContact}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition">
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
              <button className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-red-500"
                      onClick={() => setModalOpen(false)}>
                <FaTimes />
              </button>

              {/* Large Image */}
              <div className="relative w-full h-[500px] flex justify-center items-center">
                <motion.img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[90vh] w-auto rounded-lg"
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
    <Footer/>
    </>
  );
};

export default RentalPage;
