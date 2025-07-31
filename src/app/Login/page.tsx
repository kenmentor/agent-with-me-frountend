"use client"
import { useState } from "react"
import FlotingShape from "@/components/FlotingShape"
import { motion } from "framer-motion"
import Input from "@/components/Input"
import { BiLock, BiUser } from "react-icons/bi"
import { MdEmail } from "react-icons/md"
import Link from "next/link"

function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dataOfBirth: ""

  })
  function handleChange(e) {
    const elementName = e.target.name

    setFormData((prev) => {
      return { ...prev, [elementName]: e.target.value }
    })
  }
  function handleSumbit() {
    console.log("hello ")
  }
  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-900 justify-center relative overflow-hidden flex items-center">
      <FlotingShape color="bg-blue-400" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FlotingShape color="bg-blue-400" size="w-45 h-45" top="50%" left="70%" delay={5} />
      <FlotingShape color="bg-blue-400" size="w-30 h-30" top="-30%" left="90%" delay={2} />


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
            Welcome Back
          </h2>
          <form onSubmit={handleSumbit}>

            <Input icon={MdEmail}
              type="email"
              placeholder="Email"
              value={formData.email}

              name="email"
              onChange={handleChange}

            />
            <Input icon={BiLock}
              type="password"
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={handleChange}

            />

            <motion.button className=" mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-zinc-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.90 }}
              type="submit"
            >
              Login
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className=" text-sm text-gray-400">
            I dont have an account {""}
            <Link href={"/Signup"} className="text-blue-400 hover:underline ">Signup </Link>
          </p>
        </div>
      </motion.div>

    </div>
  )
}
export default Page