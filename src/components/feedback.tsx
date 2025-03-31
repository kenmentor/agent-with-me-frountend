import React, { useState } from 'react'
import { FaFaceFrown, FaFaceSadCry, FaFaceSmile, FaFaceSmileWink } from 'react-icons/fa6'
import Resource from './Resource'

const Feedback = () => {
  const[data,setdata] = useState("")
  function sumbitFeedback (){
    fetch("https://agent-with-me-backend.onrender.com/",{
      method:"POST",
      body:data
    })
  }
  const [opened,setopened] = useState(false)
  return (
    <>
  
    <div className={`p-3 duration-100 ${opened&&"bg-gray-100 rounded border text-gray-900 m-8"}` }>
        
      <div className='w-full flex items-center  py-5'>
        <button className=' text-gray-200 flex items-center rounded-full gap-4 p-2  text-lg' onClick={()=>setopened(prev=>!prev)}>What Was Your experience <div className='flex gap-2'><FaFaceSmileWink /><FaFaceSmile/> <FaFaceFrown/> <FaFaceSadCry/></div></button>
      </div>
     { opened&&(
      <div className='flex gap-2 flex-col '>
      <textarea  className='bg-gray-200' name="" id="" value={data} onChange={(e)=>setdata(e.target.value)}></textarea>
      <div>
      <button className="py-1 rounded inline-block" onClick={sumbitFeedback}>send</button>
      </div>
      </div>
    )
}
    </div>
    </>
  )
}

export default Feedback
