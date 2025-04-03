import Image from "next/image";
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
  type : string;
  address: string;
  state:string;
  waterSuply:boolean ;
  electricity:number;
}
interface StepThreeProps {
  formData:formData;
  setFormData: React.Dispatch<React.SetStateAction<formData>>;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ formData, setFormData, goToPreviousStep, goToNextStep }) => {
  const handleThumbnailSelect = (file: File) => {
    setFormData((prev: formData) => ({ ...prev, thumbnail: file }));
  };

  return (
    <div className="bg-gray-900 text-gray-300 p-6 rounded shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">Step 3: Select a Thumbnail</h2>
      
      <p className="text-gray-400">Choose an image to use as the main thumbnail for your listing.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
        {formData.files.map((file: File, index: number) => (
          <div
            key={index}
            className={`relative border rounded overflow-hidden cursor-pointer transition-all ${
              formData.thumbnail === file ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-700"
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
  );
};

export default StepThree;
