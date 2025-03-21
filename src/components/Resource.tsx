

import Gallary from "./gallary";
import Image from "next/image";

// Define the resource type more clearly
type ResourceProps = {
  header: string;
  thumbnail: string;
  rating: number;
  id: string;
  landmark:string
  gallery:[{
    src:"",
    alt:""
  }],
  price:number
};

const Resource = ({ header, thumbnail, price, id ,gallery,landmark}: ResourceProps) => {
 
  // async function updateView(id:string,views:number){
  // let res = await fetch("http://localhost:3001/updateView",{
   
  //   headers: {
  //       'Content-Type': 'application/json'
  //   },
  //   method:"PUT",
  //   body:JSON.stringify({id:id})
    
  // })
  
  
  // }
  
  // console.log(thumbnail)

  return (
    <a href={`https://agent-with-me-backend.onrender.com/${id}/resource-details`} >
      <div className="resourcebox flex flex-col bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
        {/* Thumbnail Section */}
        <div className="thumbnailCont h-64 w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt="Resource Thumbnail"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Details Section */}
        <div className="detailCont flex flex-col p-4 gap-2">
          {/* header */}
          <div className=" flex  text-center items-center w-full justify-between ">
          <h2 className="text-lg font-semibold text-gray-200">{header}</h2>
          <h2 className=" text-lg font-semibold " > {price}</h2>
          </div>
          <h3 className="font-semibold text-gray-400 ">{landmark} </h3>
          {/* Views and Stars Section */}
          <div className="sub2 flex justify-between items-center  ">
            {/* Views */}
            
            <div className="  w-full overflow-scroll">
            <Gallary gallary={gallery}/>
            </div>
            {/* Rating */}
            {/* <Rating rating={rating} /> */}
          </div>
        </div>
      </div>
    </a>
  );
};

export default Resource;
