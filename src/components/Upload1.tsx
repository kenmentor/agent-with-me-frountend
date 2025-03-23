"use client"
import React, { useState } from "react";
import StepOne from "./uploadScreen/upload1";
import StepTwo from "./uploadScreen/upload2";
import StepThree from "./uploadScreen/upload3";
import StepFour from "./uploadScreen/preview";
import Upload3One from "./uploadScreen/upload3.1";
import Upload3Two from "./uploadScreen/upload3.2";
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
  landmark:string,
  waterSuply:boolean ,
  electricity:number,

}
const UploadWizard = () => {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState <formData> ({
    title: "",
    description: "",
    files: [],
    category: "",
    thumbnail: null,
    price: "",
    location: "",
    images:[],
    type:"",
    address:"",
    state:"",
    landmark:"",
    waterSuply:true,
    electricity:90,
  });

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPreviousStep = () => setStep((prev) => prev - 1);
  const  handleSubmit = async () => {
    const data  = new FormData()
    if (formData.thumbnail){
      data.append("thumbnail",formData.thumbnail)
    }
    data.append("title",formData.title)
    data.append("description",formData.description)
    data.append("category",formData.category)
    data.append("price",formData.price)
    data.append("location",formData.location)
    data.append("type",formData.type)
    data.append("state",formData.price)
    data.append("landmark",formData.landmark)
    data.append("waterSuply",JSON.stringify(formData.waterSuply))
    data.append("electricity",JSON.stringify(formData.electricity))
    formData.files.forEach(()  => {
      data.append("files",formData.title)
    });
    

    fetch("http://localhost:3001/upload",{
      method:"POST",
      body:data
    })
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Progress Tracker */}
      <div className="flex justify-between mb-6">
        {["Upload Images", "Details", "Thumbnail", "Preview & Submit"].map(
          (label, index) => (
            <div key={index} className={`flex-1 text-center ${step === index + 1 ? "font-bold text-blue-600" : "text-gray-400"}`}>{label}</div>
          )
        )}
      </div>

      {/* Step Components */}
      {step === 1 && <StepOne formData={formData} setFormData={setFormData} goToNextStep={goToNextStep} />}
      {step === 2 && <StepTwo formData={formData} setFormData={setFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />}
      {step === 3 && <StepThree formData={formData} setFormData={setFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />}
      {step === 4 && <Upload3One formData={formData} goToPreviousStep={goToPreviousStep} goToNextStep={goToNextStep} setFormData={setFormData}/>}
      {step === 5 && <Upload3Two formData={formData} setFormData={setFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />}
      {step === 6 && <StepFour formData={formData} goToPreviousStep={goToPreviousStep}  handleSubmit={handleSubmit} />}
    </div>
  );
};

export default UploadWizard;
