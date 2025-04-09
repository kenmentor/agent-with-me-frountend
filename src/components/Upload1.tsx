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
  const [step, setStep] = useState<number>(1);
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

      const res = await fetch("https://agent-with-me-backend.onrender.com/v1/upload", {
        method: "POST",
        body: data,
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
    <div className="max-w-full mx-auto h-full p-6">
      {/* Header with Back Arrow and Progress Tracker */}
      <div className="flex sm:flex-row justify-between items-center sm:gap-6 text-white mb-6">
        <Link href={"/homepage"}>
          <MdArrowBackIos className="h-8 w-8 text-white" />
        </Link>

        {/* Progress Tracker */}
        <div className="flex justify-between w-full bg-gray-300 rounded-full overflow-hidden h-4 mt-4 sm:mt-0">
          <div
            className="flex bg-blue-700 h-full rounded-full duration-1000"
            style={{
              width: `${((step - 1) / 5) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {loading && <UploadingUi />}

      {/* Message */}
      {message === "error" && <ErroMessage setMessage={setMessage} />}
      {message === "success" && <SuccessMessage />}
      {message && message !== "success" && message !== "error" &&message !=="" && (
        <Validation message={message} setMessage={setMessage}/>
      )}

      {/* Step Components */}
      {step === 1 && (
        <StepOne
          formData={formData}
          setFormData={setFormData}
          goToNextStep={goToNextStep}
        />
      )}
      {step === 2 && (
        <StepTwo
          formData={formData}
          setFormData={setFormData}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
        />
      )}
      {step === 3 && (
        <StepThree
          formData={formData}
          setFormData={setFormData}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
        />
      )}
      {step === 4 && (
        <Upload3One
          formData={formData}
          goToPreviousStep={goToPreviousStep}
          goToNextStep={goToNextStep}
          setFormData={setFormData}
        />
      )}
      {step === 5 && (
        <Upload3Two
          formData={formData}
          setFormData={setFormData}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
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
