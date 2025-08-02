"use client"
import { useState } from "react"
import FlotingShape from "@/components/FlotingShape"
import { motion } from "framer-motion"
import Input from "@/components/Input"
import { BiLoader, BiLock } from "react-icons/bi"
import { MdEmail } from "react-icons/md"
import Link from "next/link"
import { useAuthStore } from "../store/authStore"
import { useRouter } from "next/navigation"

function Page() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dataOfBirth: ""
  })

  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)
  const login = useAuthStore((state) => state.login)

  function handleChange(e) {
    const elementName = e.target.name
    setFormData((prev) => ({ ...prev, [elementName]: e.target.value }))
  }

  async function handleSumbit(e) {
    e.preventDefault()
    const response = await login(formData)
    if (!error) {
      router.push("/homepage")
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-900 flex items-center justify-center overflow-hidden">
      {/* Floating Background Blur Shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full top-10 left-[-40px] animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 blur-[140px] rounded-full bottom-20 right-[-60px] animate-ping"></div>
        <div className="absolute w-60 h-60 bg-cyan-400/20 blur-[100px] rounded-full top-1/2 left-1/2 animate-pulse"></div>
      </div>

      {/* Floating shapes for extra polish */}
      <FlotingShape color="bg-blue-400" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FlotingShape color="bg-blue-400" size="w-45 h-45" top="50%" left="70%" delay={5} />
      <FlotingShape color="bg-blue-400" size="w-30 h-30" top="-30%" left="90%" delay={2} />

      {/* Login Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-xl z-10"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
            Welcome Back
          </h2>
          <form onSubmit={handleSumbit}>
            <Input
              icon={MdEmail}
              type="email"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
            <Input
              icon={BiLock}
              type="password"
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
            <motion.button
              className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.90 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <BiLoader className="animate-spin mx-auto" size={24} /> : "Login"}
            </motion.button>
          </form>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            I don’t have an account{" "}
            <Link href="/Signup" className="text-blue-400 hover:underline">Signup</Link>
          </p>
        </div>
      </motion.div>

      {/* Fullscreen Loader Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <BiLoader size={48} className="text-white animate-spin" />
        </div>
      )}
    </div>
  )
}

export default Page
