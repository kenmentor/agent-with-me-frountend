import React, { SetStateAction } from 'react'

interface keyword { 
     category: string;
     min:string;
     max:string;
     type:string ;
     location:string
     limit:number;
    }
interface price {
    setKeyword:React.Dispatch<SetStateAction<keyword>>
}
const Price = ({setKeyword}:price) => {
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const value = e.target.value
        const name = e.target.name
        setKeyword((prev)=>({...prev,[name]:value}))
    }
  return (
    <div className='rounded shadow p-5'>
      <div>
        Min <input type="number" name='min' onChange={handleChange}/>
      </div>
      <div>
        Max <input type="number"name='max'  onChange={handleChange} />
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Price
