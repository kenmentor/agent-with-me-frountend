import Image from "next/image";
import React from "react";


interface FormDataType {
  title: string;
  description: string;
  files: File[];
  category: string;
  thumbnail: File | null;
}
interface StepThreeProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  goToPreviousStep: () => void;
  handleSubmit: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  formData,
  setFormData,
  goToPreviousStep,
  handleSubmit,
}) => {
  const handleThumbnailSelect = (file: File) => {
    setFormData({ ...formData, thumbnail: file });
  };
  

  return (

    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">
        Step 3: Choose a Thumbnail
      </h2>

      <div className="space-y-6">
        {/* Instructions */}
        <p className="text-gray-400">
          Select a thumbnail from your uploaded files. This image will represent
          your resource.
        </p>

        {/* Thumbnail Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {formData.files.map((file: File, index:number) => (
            <div
              key={index}
              className={`relative border rounded-lg overflow-hidden cursor-pointer ${
                formData.thumbnail === file
                  ? "border-blue-500 ring-2 ring-blue-500"
                  : "border-gray-700"
              }`}
              onClick={() => handleThumbnailSelect(file)}
            >
              {file.type.startsWith("image/") ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-24 object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-24 bg-gray-800 text-gray-500">
                  {file.name}
                </div>
              )}
              {formData.thumbnail === file && (
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  Selected
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
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
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StepThree;
