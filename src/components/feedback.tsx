import React, { useState } from 'react';
import { FaFaceFrown, FaFaceSadCry, FaFaceSmile, FaFaceSmileWink } from 'react-icons/fa6';

const Feedback = () => {
  const [data, setData] = useState('');
  const [opened, setOpened] = useState(false);

  function submitFeedback() {
    fetch("https://agent-with-me-backend.onrender.com/", {
      method: "POST",
      body: data,
    });
  }

  return (
    <>
      <div className={`p-3 duration-100 ${opened && "bg-gray-100 rounded border text-gray-900 m-8"}`}>
        {/* Feedback Button */}
        <div className='w-full flex items-center py-5'>
          <button
            className='text-gray-200 flex items-center gap-4 p-2 text-lg md:text-xl'
            onClick={() => setOpened((prev) => !prev)}
          >
            What Was Your Experience? 
            <div className='flex gap-2'>
              <FaFaceSmileWink />
              <FaFaceSmile />
              <FaFaceFrown />
              <FaFaceSadCry />
            </div>
          </button>
        </div>

        {/* Feedback Form */}
        {opened && (
          <div className='flex flex-col gap-4'>
            <textarea
              className='bg-gray-200 p-2 rounded-md w-full max-w-xl'
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Share your feedback"
            ></textarea>
            <div className='flex justify-center'>
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={submitFeedback}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Feedback;
