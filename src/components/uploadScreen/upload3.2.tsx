import React from "react";
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
}
const Upload3Two: React.FC<Upload3Two> = ({
  formData,
  setFormData,
  goToPreviousStep,
  goToNextStep,
}) => {
  const handleWater = ()=> {
    setFormData((prev:formData)=>{
      return {...prev,waterSuply:!(prev.waterSuply)}
    })
  }
  console.log(formData.electricity)
  
  return (
    <div className="bg-gray-900 text-gray-300 p-6 rounded shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">
        Step 2: Select Category
      </h2>

      <div className="space-y-4">
        <p className="text-gray-400">
          Choose the category that best fits your rental property.
        </p>

        <div className="flex gap-10 flex-col">
          <div className={`p-3 border rounded cursor-pointer text-center transition flex  items-center `}>
           <h2 className=" text-white text-nowrap font-semibold " onClick={handleWater}> Is There Water Supply</h2>
           <input type="checkbox" height={"100"} />
          </div>
          <div className={`p-3 border rounded cursor-pointer text-center transition "border-blue-500 bg-gray-800`}>
            <h2 className=" text-white text-nowrap font-semibold ">

           What is the level of power supply
            </h2>
            {formData.electricity}
            <input type="range" min="0" max="100" value={formData.electricity} 
            onChange={(e)=> setFormData((prev:formData) =>({...prev ,electricity:Number(e.target.value)}))}/>
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
  );
};

export default Upload3Two;
