"use client";
import Link from 'next/link';
import React, { useState } from 'react';

interface ErroMessageProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ModalWrapper: React.FC<{ children: React.ReactNode; bgColor: string }> = ({ children, bgColor }) => (
  <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
    <div className={`${bgColor} min-w-[300px] max-w-sm w-full p-6 rounded-md shadow-lg`}>
      {children}
    </div>
  </div>
);

// ❌ Error Message
export const ErroMessage: React.FC<ErroMessageProps> = ({ setMessage }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setMessage(""), 500); // Delay to show loading
  };

  return (
    <ModalWrapper bgColor="bg-red-500 text-white">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <button
          className="bg-white text-red-600 px-6 py-2 rounded-md font-medium hover:bg-red-100 transition"
          onClick={handleClick}
          disabled={clicked}
        >
          {clicked ? "Loading..." : "OK"}
        </button>
      </div>
    </ModalWrapper>
  );
};

// ✅ Success Message
export const SuccessMessage = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <ModalWrapper bgColor="bg-green-500 text-white">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold">Successfully Uploaded</h1>
        <Link href="/homepage">
          <button
            className="bg-white text-green-600 px-6 py-2 rounded-md font-medium hover:bg-green-100 transition w-full"
            onClick={() => setClicked(true)}
            disabled={clicked}
          >
            {clicked ? "Loading..." : "Go to Homepage"}
          </button>
        </Link>
      </div>
    </ModalWrapper>
  );
};

// ⚠️ Validation Warning
interface ValidatorProps {
  message: string;
  setMessage:React.Dispatch<React.SetStateAction<string>>
}

export const Validation: React.FC<ValidatorProps> = ({ message ,setMessage}) => (
  <div className='fixed top-0 left-0 right-0 bottom-0' onClick={()=>setMessage("")}>

 
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-600 text-white rounded-md shadow-md z-50">
    <p className="text-sm font-medium">{message}</p>
  </div>
  </div>
);
