
import Image from 'next/image'
import React ,{useEffect, useState} from 'react'
type Gallary = {
  gallary:[{
    src:string,
    alt:string
  }]
}
type image = {
  src:string ,
  alt:string ,
  isActive:boolean  ,
  id:number
}

const Gallary = ({gallary}:Gallary) => {
    const [gallaryElement,setgallary] = useState([{
      src:"",
      alt:"",
      isActive:true ,
      id:0
    }])
    
      
    useEffect(()=>{
    const modifiedGalllary = gallary.map((element,index)=>{
      if (index == 0){

      
     return (
      { 
        isActive:true,id:index,...element
      }
     ) 
      }else {
      return (
        {
          isActive:false,id:index,...element
        }
      )
    }
    })
    setgallary(modifiedGalllary)
    console.log("modieeu",modifiedGalllary)
      
    },[])
    

    const  active = (element:image) =>{
      console.log(element)
    }
   
      
   const  images = gallaryElement.map((Element)=> (
   <Image 

   className ={`h-10 w-10 bg-cover object-cover rounded ${!(Element.isActive)&& "border"}`}
   onClick={
    ()=>active(Element)
  } 
   src={Element.src} 
   alt={Element.alt} 
   key ={Element.id}/>)
  )
  
  return (
    <div>
      {images}
    </div>
  )
}

export default Gallary
