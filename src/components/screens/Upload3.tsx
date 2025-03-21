import React from "react";
interface FormDataType {
  title: string;
  description: string;
  files: File[];
  category: string;
  thumbnail: File | null;
}
type stepTwo ={
  formData:FormDataType;
  setFormData:React.Dispatch<React.SetStateAction<FormDataType>>
  goToNextStep:React.Dispatch<React.SetStateAction<number>>
  goToPreviousStep:React.Dispatch<React.SetStateAction<number>>
}
const StepTwo = ({ formData, setFormData, goToNextStep, goToPreviousStep }:stepTwo) => {
  const categories = ["Maths", "English", "Science", "History", "Others"];

  return (
    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">
        Step 2: Select Category
      </h2>
      <form className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-gray-400 font-medium mb-2">
            Choose a Category
          </label>
          <select
            value={formData.category || ""}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={()=>goToPreviousStep}
            className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={()=>goToNextStep}
            className="px-6 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
