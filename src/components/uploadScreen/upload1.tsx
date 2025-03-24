import Image from "next/image";
import React, { useState } from "react";
interface formData {
  images: File[];
  thumbnail: File | null;
  title: string;
  description: string;
  files: File[];
  category: string;
  price: string;
  location: string;
  type : string;
  address: string,
  state:string,
  landmark:string,
  waterSuply:boolean ,
  electricity:number,

 
}
interface StepOneProps {
  formData: formData;
  setFormData: React.Dispatch<React.SetStateAction<formData>>;
  goToNextStep: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ formData, setFormData, goToNextStep }) => {
  const [error, setError] = useState<string | null>(null);

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
    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">Step 1: Upload Files</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={(e) => setFormData((prev: formData) => ({ ...prev, title: e.target.value }))}
          className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
         <input
          type="number"
          placeholder="price eg 20000"
          value={formData.price}
          onChange={(e) => setFormData((prev: formData) => ({ ...prev, price: e.target.value }))}
          className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
         <input
          type="text"
          placeholder="address E.g plot 4 harmony estate "
          value={formData.address}
          onChange={(e) => setFormData((prev: formData) => ({ ...prev, address: e.target.value }))}
          className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
        

        <textarea
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => setFormData((prev: formData) => ({ ...prev, description: e.target.value }))}
          className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      
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
          <div key={index} className="relative w-full h-32 border border-gray-700 rounded-lg overflow-hidden">
            <Image src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" fill={true}/>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={goToNextStep}
          className="px-6 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepOne;
