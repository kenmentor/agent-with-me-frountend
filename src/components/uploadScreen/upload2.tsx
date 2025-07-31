import { motion } from "framer-motion"
import Input from "@/components/Input";
import { MdOtherHouses } from "react-icons/md";
import { CgMore } from "react-icons/cg";
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
  address: string,
  state: string,
  waterSuply: boolean,
  electricity: number,


}
interface StepTwoProps {
  formData: formData;
  setFormData: React.Dispatch<React.SetStateAction<formData>>;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  step:number
}


const types = ["selfcon", "one bed room", "two bed room", "single room "];

const StepTwo: React.FC<StepTwoProps> = ({ formData, setFormData, goToPreviousStep, goToNextStep ,step}) => {
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
       House Type
        </h2>

        <form action="">
          <div className="space-y-4">
            <p className="text-gray-400">Choose the category that best fits your house.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {types.map((type) => (
                <div
                  key={type}
                  className={`p-3 border rounded-lg cursor-pointer text-center transition ${formData.type === type ? "border-blue-500 bg-gray-800" : "border-gray-700"
                    }`}
                  onClick={() => setFormData((prev: formData) => ({ ...prev, type }))}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
          <div className="py-4">
            <Input icon={CgMore}  placeholder= "Others" onChange={(e)=>setFormData((prev: formData) => ({ ...prev, type:e.target.value }))} />
          </div>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={goToPreviousStep}
              className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goToNextStep}
              className="px-6 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </form>
      </div>

    </motion.div>
  );
};

export default StepTwo;
