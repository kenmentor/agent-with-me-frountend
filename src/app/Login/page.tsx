"use client";

import React, { ChangeEvent, useState } from 'react'
import { BsGoogle } from 'react-icons/bs'

const Page:React.FC = () => {
    const [form ,setForm ] =  useState({
        email: "",
        password:""
    })
    function update (e:ChangeEvent<HTMLInputElement>){
        setForm ((prev )=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }
    function loginUser(){
            const data = new FormData()
            data.append("email",form.email)
            data.append("password",form.password)
           
            
            fetch("https://agent-with-me-backend.onrender.com/login",
                { 
                    method:"POST",
                    body:JSON.stringify(form),
                    headers:{
                      "Content-Type":"application/json"
                    }
                }
                
            )
            console.log(data)
        }

   
  return (
    <div className='text-black'>
          <h1>
            Login 
          </h1>
          <div>
            <input type="text" placeholder='email ' name  = "email" onChange={update} value={form.email}/>
            <input type="text" placeholder='password ' name  ="password"onChange={update} value={form.password}  />
            <button   onClick={loginUser}>continue</button>
          </div>
          <div>

            <button>http://localhost:3001
                Use Google Account <BsGoogle/>
            </button>
          </div>
        </div>
  )
}

export default Page
