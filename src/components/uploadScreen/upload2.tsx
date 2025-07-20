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
  waterSuply:boolean ,
  electricity:number,

 
}
interface StepTwoProps {
  formData: formData;
  setFormData: React.Dispatch<React.SetStateAction<formData>>;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
}

const types = ["selfcon", "one bed room", "two bed room", "single room "];

const StepTwo: React.FC<StepTwoProps> = ({ formData, setFormData, goToPreviousStep, goToNextStep }) => {
  return (
    <div className="bg-gray-900 text-gray-300 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">Step 2: Select House type</h2>
      
      <div className="space-y-4">
        <p className="text-gray-400">Choose the category that best fits your house.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {types.map((type) => (
            <div
              key={type}
              className={`p-3 border rounded-lg cursor-pointer text-center transition ${
      formData.type === type ? "border-blue-500 bg-gray-800" : "border-gray-700"
              }`}
              onClick={() => setFormData((prev: formData) => ({ ...prev, type }))}
            >
              {type}
            </div>
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
          onClick={goToNextStep}
          className="px-6 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
