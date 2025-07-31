import React from 'react'

const TextArea = ({ props }: any) => {




    return (
        <div className=' relative mb-6'>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">

            </div>
            <textarea {...props} className=' w-full pl-3 pr-3 py-2 bg-gray-500 bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 fovus:ring-blue-500 text-white placeholder-gray-400 transition-duration-200 h-60' ></textarea>
        </div>
    )
}





export default TextArea