import Image from "next/image";
import React from "react";
import { motion } from "framer-motion"
import Meter from "../meter";
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
interface StepThreeProps {
  formData: formData;
  setFormData: React.Dispatch<React.SetStateAction<formData>>;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  step: number
}

const StepThree: React.FC<StepThreeProps> = ({ formData, setFormData, goToPreviousStep, goToNextStep, step }) => {
  const handleThumbnailSelect = (file: File) => {
    setFormData((prev: formData) => ({ ...prev, thumbnail: file }));
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
          Create Account
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
          {formData.files.map((file: File, index: number) => (
            <div
              key={index}
              className={`relative border rounded overflow-hidden cursor-pointer transition-all ${formData.thumbnail === file ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-700"
                }`}
              onClick={() => handleThumbnailSelect(file)}
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={`Thumbnail ${index}`}
                className="w-full h-24 object-cover"

                height={"24"}
                width={"24"}
              />
              {formData.thumbnail === file && (
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  Selected
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={goToPreviousStep}
            className="px-6 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-800 transition"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={goToNextStep}
            className="px-6 py-2 bg-blue-600 text-gray-100 rounded hover:bg-blue-700 transition"
            disabled={!formData.thumbnail}
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StepThree;
