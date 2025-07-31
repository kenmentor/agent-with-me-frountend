"use client"
import React, { useEffect, useRef, useState } from 'react'
import FlotingShape from '@/components/FlotingShape'
import { motion } from "framer-motion"
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'next/navigation'
import { BiLoader } from 'react-icons/bi'


const page = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""])

    const inputRefs = useRef([])
    const { error, isLoading, verifyEmail, message } = useAuthStore()
    const router = useRouter()
    async function handleSubmit(e) {
        e.preventDefault();
        const Verificationcode = code.join("")
        try {
            const response = await verifyEmail(Verificationcode)
            if (!error) {
                console.log("sucessful verification ")
                router.push("/homepage")
            }
        } catch (error) {

        }

    }

    function handleChange(index: number, value) {
        const newCode = [...code]
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("")
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || ""
            }
            setCode(newCode);

            const lastFiledIndex = newCode.findLastIndex((digit) => digit !== "")
            const focusIndex = lastFiledIndex < 5 ? lastFiledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus()
        } else {
            newCode[index] = value;
            setCode(newCode)
            if (value && index < 5) {
                inputRefs.current[index + 1].focus()
            }
        }
    }
    function handleKeyDown(index, e) {
        if (e.key === "Backspace" && !code[index] && index > 0) {

            inputRefs.current[index - 1].focus()

        }
    }

    //auto sumbit when all field are filled
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"))
        }
    }, [code])
    return (
        <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-900 justify-center relative overflow-hidden flex items-center">
            <FlotingShape color="bg-blue-400" size="w-64 h-64" top="-5%" left="10%" delay={0} />
            <FlotingShape color="bg-blue-400" size="w-45 h-45" top="50%" left="70%" delay={5} />
            <FlotingShape color="bg-blue-400" size="w-30 h-30" top="-30%" left="90%" delay={2} />
            <div className=' max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden '>
                <motion.div initial={
                    {
                        opacity: 0, y: 20
                    }
                }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className=" max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl "
                >
                    <div className=" p-8">
                        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to to-blue-500 text-transparent bg-clip-text">
                            Verify Your Email
                        </h2>

                        <p className='text-center text-gray-300 mb-6 '>Enter the 6-digit code sent to your email adress. </p>
                        <form className=' space-y-6' onSubmit={handleSubmit}>
                            <div className='flex justify-between '>
                                {
                                    code.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type='text'
                                            maxLength={6}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className=' w-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-blue-500 focus:outline-none'
                                        />
                                    ))
                                }

                            </div>
                            {!error && <p className="text-green-500 font-semibold mt-2">{message}</p>}
                            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                            <motion.button
                                className=" mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-zinc-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 "
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.90 }}>
                                {isLoading ? <BiLoader className="animate-spin mx-auto " size={24} /> : "Verify Email"}
                            </motion.button>
                        </form>
                    </div>

                </motion.div>
            </div>
        </div>
    )
}

export default page