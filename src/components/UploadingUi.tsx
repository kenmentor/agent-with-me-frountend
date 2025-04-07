import React from 'react';


const UploadingUi = () => {
// Don't render if not loading

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-lg">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
        <h3 className="text-xl font-bold">Uploading...</h3>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 mt-4 rounded-full">
          <div
            className="bg-blue-600 h-2 rounded-full"
            // Dynamically update width based on progress
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UploadingUi;
