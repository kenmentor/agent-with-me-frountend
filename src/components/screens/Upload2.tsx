import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
interface FormDataType {
  title: string;
  description: string;
  files: File[];
  category: string;
  thumbnail: File | null;
}

type stepOn ={
  formData:FormDataType;
  setFormData:React.Dispatch<React.SetStateAction<FormDataType>>
  goToNextStep:React.Dispatch<React.SetStateAction<number>>
}
const StepOne = ({ formData, setFormData, goToNextStep}:stepOn) => {
  const [selectedFiles, setSelectedFiles] = useState(formData.files || []);

  const handleFileUpload = (e:ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return
    const files = Array.from(e.target.files);
    setSelectedFiles((prev:File[]) => [...prev, ...files]);
    setFormData({ ...formData, files: [...formData.files, ...files] });
  };

  const handleFileRemove = (index:number) => {
    const updatedFiles = selectedFiles.filter((_, i:number) => i !== index);
    setSelectedFiles(updatedFiles);
    setFormData({ ...formData, files: updatedFiles });
  };

  return (
    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">
        Step 1: Resource Details
      </h2>
      <form className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-gray-400 font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter resource title"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-gray-400 font-medium mb-2">
            Description
          </label>
          <textarea
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter a brief description"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-400 font-medium mb-2">
            Upload Files
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
         
         
        </div>

        {/* File Preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-100 mb-4">
              Selected Files
            </h3>
            <div className="flex flex-wrap gap-4">
              {selectedFiles.map((file:File, index:number) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border border-gray-700 bg-gray-800 rounded-lg shadow-md"
                >
                  {file.type.startsWith("image/") ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm font-medium">
                      {file.name}
                    </div>
                  )}
                  <button
                    onClick={() => handleFileRemove(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-sm rounded-full p-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Button */}
        <button
          type="button"
          onClick={()=>goToNextStep}
          className="px-6 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 transition"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default StepOne;
