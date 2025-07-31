import React from "react";
import { motion } from "framer-motion"
import Input from "../Input";
import { BiCheck, BiWater } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
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
interface Upload3Two {
  formData: formData;
  setFormData: React.Dispatch<React.SetStateAction<formData>>;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  step:number
}
const Upload3Two: React.FC<Upload3Two> = ({
  formData,
  setFormData,
  goToPreviousStep,
  goToNextStep,
  step
}) => {
  const handleWater = () => {
    setFormData((prev: formData) => {
      return { ...prev, waterSuply: !(prev.waterSuply) }
    })
  }
  console.log(formData.electricity)

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
            <Meter number={5} progress={step}/>
      <div className=" p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to to-blue-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <div className="space-y-4">
          <p className="text-gray-400">
            Choose the category that best fits your rental property.
          </p>

          <div className="flex gap-5 flex-col">
            <button className=" w-full pl-10  pr-3 py-2 bg-gray-500 bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 fovus:ring-blue-500 text-white placeholder-gray-400 transition-duration-200 flex items-center gap-5"><BiCheck color="green" size={30} /> Yes there is water supply</button>
            <button className=" w-full pl-10  pr-3 py-2 bg-gray-500 bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 fovus:ring-blue-500 text-white placeholder-gray-400 transition-duration-200 flex items-center gap-5"> <FcCancel size={30}/> No there is no water supply</button>
            <span className="text-gray-400   text-x mb-0">
              What is the level of power supply
            </span>
            <div className={`p-1 cursor-pointer text-center transition "border-blue-500 w-full pl-3  pr-3 py-2 bg-gray-500 bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 fovus:ring-blue-500 text-white placeholder-gray-400 transition-duration-200`}>




              {formData.electricity}
              <input type="range" min="0" max="100" value={formData.electricity} className=""
                onChange={(e) => setFormData((prev: formData) => ({ ...prev, electricity: Number(e.target.value) }))} />


            </div>

          </div>
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
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Upload3Two;
