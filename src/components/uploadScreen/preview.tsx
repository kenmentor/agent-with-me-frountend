"use client"
interface formData {
    images: File[];
    thumbnail: File | null;
    title: string;
    description: string;
    files: File[];
    category: string;
    price: string;
    location: string;
   
  };
interface StepFourProps {
    formData:formData;
  goToPreviousStep: () => void;
  handleSubmit: () => void;

}

const StepFour: React.FC<StepFourProps> = ({ formData, goToPreviousStep, handleSubmit }) => {
  
  return (
    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">Step 4: Preview & Submit</h2>
      
      <p className="text-gray-400">Review your selections before submitting.</p>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-200">Thumbnail:</h3>
        {formData.thumbnail && (
          <img
            src={URL.createObjectURL(formData.thumbnail)}
            alt="imagesSelected Thumbnail"
            className="w-32 h-32 object-cover rounded-lg mt-2 border border-gray-700"
          />
        )}
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-200">All Uploaded Images:</h3>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {formData.files.map((file: File, index: number) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Upload ${index}`}
              className="w-24 h-24 object-cover rounded-lg border border-gray-700"
            />
          ))}
        </div>
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
          onClick={handleSubmit}
          className={`px-6 py-2  bg-green-600 text-gray-100 rounded-lg hover:bg-green-700 transition`}
          
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StepFour;
