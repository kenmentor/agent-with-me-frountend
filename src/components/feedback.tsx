import React, { useState } from 'react';
import { FaFaceFrown, FaFaceSadCry, FaFaceSmile, FaFaceSmileWink } from 'react-icons/fa6';

const Feedback = () => {
  const [data, setData] = useState('');
  const [opened, setOpened] = useState(false);

  const submitFeedback = () => {
    fetch("https://agent-with-me-backend.onrender.com/", {
      method: "POST",
      body: data,
    });
  };

  return (
    <div
      className={`p-3 duration-100 ${opened && "bg-gray-100 rounded border text-gray-900 m-8"}`}
    >
      <div className='w-full flex items-center py-5'>
        <button
          className='text-gray-200 flex items-center rounded-full gap-4 p-2 text-lg'
          onClick={() => setOpened((prev) => !prev)}
        >
          What Was Your experience{' '}
          <div className='flex gap-2'>
            <FaFaceSmileWink />
            <FaFaceSmile />
            <FaFaceFrown />
            <FaFaceSadCry />
          </div>
        </button>
      </div>
      {opened && (
        <div className='flex gap-2 flex-col'>
          <textarea
            className='bg-gray-200 p-2 text-sm sm:text-base md:text-lg'
            value={data}
            onChange={(e) => setData(e.target.value)}
          ></textarea>
          <div>
            <button
              className='py-1 px-4 mt-2 rounded inline-block bg-blue-600 text-white text-sm sm:text-base'
              onClick={submitFeedback}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
