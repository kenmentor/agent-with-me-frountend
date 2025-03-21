"use client";

import React, { ChangeEvent, useState } from 'react'
import { BsGoogle } from 'react-icons/bs'

const Page: React.FC = () => {
    const [form ,setForm ] =  useState({
        email: "",
        password:"",
        comfirmpassword:"",
        username:"",
        comfirmPassword:""
    })

    function update (e:ChangeEvent<HTMLInputElement>){
        setForm ((prev )=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }
    function creatUser(){
        const data = new FormData()
        data.append("email",form.email)
        data.append("password",form.password)
        data.append("comfirmpassword",form.comfirmpassword)
        data.append("username",form.username)
        
        fetch("http://localhost:3001/signup",
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
        signup 
      </h1>
      <div>
        <input type="text" placeholder='username ' name="username" value={form.username} onChange={update}/>
        <input type="text" placeholder='email '  name="email" value={form.email} onChange={update}/>
        <input type="text" placeholder='password '  name="password" value={form.password} onChange={update}/>
        <input type="text" placeholder='comfirm password '  name="comfirmpassword" value={form.comfirmPassword} onChange={update}/>
        <button onClick={creatUser}>continue</button>
      </div>
      <div>
        <button >
            Use Google Account <BsGoogle/>
        </button>
      </div>
    </div>
  )
}

export default Page
