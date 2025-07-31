import Image from "next/image";
import Input from "@/components/Input";
import React, { useState } from "react";
import { BiLocationPlus, BiText } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { FaAddressBook } from "react-icons/fa";
import TextArea from "@/components/TextArea";
import { motion } from "framer-motion"
import Meter from "../meter";
// import validator from "@/app/utility/";
interface formData {
  images: File[];
  thumbnail: File | null;
  title: string;
  description: string;
  files: File[];
  category: string;
  price: string;
  location: string;
  type: string;
  address: string;
  state: string;
  waterSuply: boolean;
  electricity: number;


}
interface StepOneProps {
  formData: formData;
  setFormData: React.Dispatch<React.SetStateAction<formData>>;
  goToNextStep: () => void;
  step: number;
}

const StepOne: React.FC<StepOneProps> = ({ formData, setFormData, goToNextStep ,step}) => {
  const [error, setError] = useState<string | null>(null);
  // const [validatorRes,setValidatorRes] = useState({state:true,message:""})
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter((file) => file.size <= 5 * 1024 * 1024);

    if (validFiles.length !== selectedFiles.length) {
      setError("Some files exceed the 5MB limit and were not added.");
    } else {
      setError(null);
    }

    setFormData((prev: formData) => ({ ...prev, files: [...prev.files, ...validFiles] }));
  };

  return (
    <motion.div initial={
      {
        opacity: 0, y: 20
      }
    }
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}

      className=" max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl "
    >
      <Meter number={5} progress={step} />
      <div className=" p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to to-blue-500 text-transparent bg-clip-text">
          Primary Details
        </h2>

        <form action="">
          <label className="text-gray-400" htmlFor="title">
            title
          </label>
          {/* <input
       
        /> */}
          <Input
            icon={BiText}
            name="title"
            type="text"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) => setFormData((prev: formData) => ({ ...prev, title: e.target.value }))}

          />

          <label className="text-gray-400" htmlFor="price">

          </label>
          <span className="text-gray-400   text-x mb-0">
            price
          </span>

          <Input
            icon={GiPriceTag}
            id="price"
            type="number"
            placeholder="price eg 20000"
            value={formData.price}
            onChange={(e) => setFormData((prev: formData) => ({ ...prev, price: e.target.value }))}
          />

          <label className="text-gray-400" htmlFor="location">
            location
          </label>

          <Input
            icon={BiLocationPlus}
            id="location"
            type="text"
            placeholder="location "
            value={formData.location}
            onChange={(e) => setFormData((prev: formData) => ({ ...prev, location: e.target.value }))}
          />
          <label className="text-gray-400" htmlFor="address">
            address
          </label>

          <Input
            icon={FaAddressBook}
            id="address"
            type="text"
            placeholder="address E.g plot 4 harmony estate "
            value={formData.address}
            onChange={(e) => setFormData((prev: formData) => ({ ...prev, address: e.target.value }))}

          />
          <label className="text-gray-400" htmlFor="description">
            description
          </label>


          <TextArea
            id="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => setFormData((prev: formData) => ({ ...prev, description: e.target.value }))}

          >

          </TextArea>











          <div className="mt-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="text-gray-400"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {formData.files.map((file, index) => (
              <div key={index} className="relative w-full h-32 border border-gray-700 rounded overflow-hidden">
                <Image src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" fill={true} />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={
                goToNextStep

              }
              className="px-6 py-2 bg-blue-600 text-gray-100 rounded hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </form>

      </div>
    </motion.div>
  );
};

export default StepOne;
