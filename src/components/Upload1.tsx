"use client"
import React, { useState } from "react";
import StepOne from "./uploadScreen/upload1";
import StepTwo from "./uploadScreen/upload2";
import StepThree from "./uploadScreen/upload3";
import StepFour from "./uploadScreen/preview";
import Upload3One from "./uploadScreen/upload3.1";
import Upload3Two from "./uploadScreen/upload3.2";
import { ErroMessage, SuccessMessage, Validation } from "./message";
import { MdArrowBackIos } from "react-icons/md";
import Link from "next/link";
import UploadingUi from "./UploadingUi";
import FlotingShape from "./FlotingShape";

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

const UploadWizard = () => {
  const [step, setStep] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<formData>({
    title: "",
    description: "",
    files: [],
    category: "",
    thumbnail: null,
    price: "",
    location: "",
    images: [],
    type: "",
    address: "",
    state: "Calabar",
    waterSuply: true,
    electricity: 90,
  });
  const [message, setMessage] = useState("");

  const goToNextStep = () => {
    // Add validation for step 1
    if (step === 1 && (!formData.title || !formData.description)) {
      setMessage("Please fill in the required fields (Title & Description).");
      return;
    }

    // Add validation for step 2 (example for image files)
    if (step === 2 && formData.files.length === 0) {
      setMessage("Please upload at least one image.");
      return;
    }

    // Add additional validation checks for each step as necessary
    setStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    // Validation before submit
    if (!formData.thumbnail || !formData.title || !formData.description) {
      setMessage("Please fill in all required fields before submitting.");
      setLoading(false);
      return;
    }

    try {
      console.log(formData)
      const data = new FormData();
      if (formData.thumbnail) {
        data.append("thumbnail", formData.thumbnail);
      }
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("location", formData.location);
      data.append("type", formData.type);
      data.append("address", formData.address);
      data.append("state", formData.state);
      data.append("waterSuply", JSON.stringify(formData.waterSuply));
      data.append("electricity", JSON.stringify(formData.electricity));
      formData.files.forEach((file) => {
        data.append("files", file);
      });

      const res = await fetch(`http://localhost:800/v1/house`, {
        method: "POST",
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();
      console.log("Server Response:", result);
      if (!res.ok) {
        throw new Error(result.message || "Upload failed");
      }

      setMessage("success");
      // Optionally reset formData or redirect here
    } catch {
      setMessage("error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-full mx-auto h-full p-6items-center   min-h-screen bg-gradient-to-br from-gray-900 justify-center relative overflow-hidden flex items-center ">
      <FlotingShape color="bg-blue-400" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FlotingShape color="bg-blue-400" size="w-45 h-45" top="50%" left="70%" delay={5} />
      <FlotingShape color="bg-blue-400" size="w-30 h-30" top="-30%" left="90%" delay={2} />

      {/* Header with Back Arrow and Progress Tracker */}


      {loading && <UploadingUi />}

      {/* Message */}
      {message === "error" && <ErroMessage setMessage={setMessage} />}
      {message === "success" && <SuccessMessage />}
      {message && message !== "success" && message !== "error" && message !== "" && (
        <Validation message={message} setMessage={setMessage} />
      )}

      {/* Step Components */}
      {step === 1 && (
        <StepOne
          formData={formData}
          setFormData={setFormData}
          goToNextStep={goToNextStep}
          step={step}
        />
      )}
      {step === 2 && (
        <StepTwo
          formData={formData}
          setFormData={setFormData}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          step={step}
        />
      )}
      {step === 3 && (
        <StepThree
          formData={formData}
          setFormData={setFormData}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          step={step}
        />
      )}
      {step === 4 && (
        <Upload3One
          formData={formData}
          goToPreviousStep={goToPreviousStep}
          goToNextStep={goToNextStep}
          setFormData={setFormData}
          step={step}
        />
      )}
      {step === 5 && (
        <Upload3Two
          formData={formData}
          setFormData={setFormData}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          step={step}
        />
      )}
      {step === 6 && (
        <StepFour
          formData={formData}
          goToPreviousStep={goToPreviousStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default UploadWizard;
