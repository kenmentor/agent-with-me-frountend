"use client";

import React, { useState } from "react";
import StepOne from "./screens/Upload2";
import StepTwo from "./screens/Upload3";
import StepThree from "./screens/Upload4";
import { useRouter } from "next/navigation";

interface FormDataType {
  title: string;
  description: string;
  files: File[];
  category: string;
  thumbnail: File | null;
}

const UploadWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1); // Tracks the current step
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    files: [],
    category: "",
    thumbnail: null,
  });

  const Redirect = useRouter(); // Navigate to the next step
  const goToNextStep = () => setCurrentStep((prev) => prev + 1);

  // Navigate to the previous step
  const goToPreviousStep = () => setCurrentStep((prev) => prev - 1);

  // Submit data (connected to backend API)
  const handleSubmit = async () => {
    try {
      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("description", formData.description);
      dataToSend.append("category", formData.category);

      // Append files
      formData.files.forEach((file) => {
        dataToSend.append("files", file);
      });

      // Append thumbnail if exists
      if (formData.thumbnail) {
        dataToSend.append("thumbnail", formData.thumbnail);
      }

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: dataToSend,
        headers:{
          "Content-Type":"application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to upload resource.");
      }

      console.log("Final Data Submitted:", formData);
      alert("Resource Uploaded Successfully!");
      Redirect.push("/homepage");
    } catch (error) {
      console.error("Error uploading resource:", error);
      alert("Failed to upload resource.");
    }
  };

  // Determine which step component to render
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            goToNextStep={goToNextStep}
          />
        );
      case 2:
        return (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 3:
        return (
          <StepThree
            formData={formData}
            setFormData={setFormData}
            goToPreviousStep={goToPreviousStep}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <div className="text-gray-300">Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">
          Upload Your Resource
        </h1>

        {/* Render current step */}
        {renderStep()}

        {/* Progress Indicator */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-400">Step {currentStep} of 3</span>
        </div>
      </div>
    </div>
  );
};

export default UploadWizard;
