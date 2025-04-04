
import Link from 'next/link'
import React, { useState } from 'react'
interface ErroMessage_ty{
  setMessage:React.Dispatch<React.SetStateAction<string>>
}
// interface SuccessMessage{
//   setMessage:React.Dispatch<React.SetStateAction<boolean>>
// }

const ErroMessage:React.FC<ErroMessage_ty> = ({setMessage}) => {
  const [clicked,setClicked] = useState(false)
  function click(){
    setMessage("")
    setClicked(true)
  }
  return (
    <div className='top-0 left-0 right-0 bottom-0 fixed backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-red-400  h-40 p-5 rounded-sm' >
        
        
        <div className='flex flex-col item-center gap-5'> 
          <h1 className='text-3xl'> Something went wrong </h1>
            <button className='px-10 text-center' onClick={click}>{!clicked?"OK":"loading..."}</button>
        </div>
      </div>
    </div>
  )
}
const SuccessMessage = () => {
  const [clicked,setClicked] = useState(false)
    return (
      <div className='top-0 left-0 right-0 bottom-0 fixed backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-green-400  h-40 p-5 rounded-sm' >
        
        
        <div className='flex flex-col item-center gap-5'> 
          <h1 className='text-3xl'> Successfully Uploaded</h1>
           <Link href={"/homepage"}><button className='px-10 text-center w-full'onClick={()=>setClicked(true)}>{!clicked?"OK":"loading..."}</button></Link> 
        </div>
      </div>
    </div>
    )
  }
  interface validator {
    message:string 
  }
  const Validation:React.FC<validator>   = ({message})=> {
   
      return (
          <div className='text-white p-2 absolute top-1 left-0 right-0 bg-red-500'> 
            <h1 className='text-3xl'> {message}</h1>
          </div>
      )
    }
export {ErroMessage,SuccessMessage,Validation}
