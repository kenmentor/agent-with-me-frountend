import React, { useState } from 'react'
import { FaFaceFrown, FaFaceSadCry, FaFaceSmile, FaFaceSmileWink } from 'react-icons/fa6'

const Feedback = () => {
  const [data, setData] = useState("");
  const [opened, setOpened] = useState(false);

  // Handle submit feedback
  function submitFeedback() {
    fetch("https://agent-with-me-backend.onrender.com/", {
      method: "POST",
      body: data
    });
  }

  return (
    <>
      <div className={`p-3 duration-100 ${opened && "bg-gray-100 rounded border text-gray-900 m-8"} sm:m-1 sm:p-1`}>

        {/* Toggle Button to open/close feedback */}
        <div className="w-full flex items-center py-5">
          <button
            className="text-gray-200 flex items-center rounded-full gap-2 p-2 text-lg sm:text-xs"
            onClick={() => setOpened(prev => !prev)}
          >
            What Was Your experience 
            <div className="flex gap-2">
              <FaFaceSmileWink />
              <FaFaceSmile />
              <FaFaceFrown />
              <FaFaceSadCry />
            </div>
          </button>
        </div>

        {/* Feedback Section */}
        {opened && (
          <div className="flex gap-2 flex-col">
            <textarea
              className="bg-gray-200 p-2 rounded resize-none w-full sm:w-72 md:w-80"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Share your thoughts..."
            />
            <div className="mt-2">
              <button
                className="py-1 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200"
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
