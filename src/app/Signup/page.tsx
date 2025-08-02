"use client"
import FlotingShape from "@/components/FlotingShape"
import { motion } from "framer-motion"
import Input from "@/components/Input"
import { BiLoader, BiLock, BiUser } from "react-icons/bi"
import { useEffect, useState } from "react"
import { MdEmail } from "react-icons/md"
import Link from "next/link"
import { useAuthStore } from "../store/authStore"
import PasswordStrengthMeter from "@/components/passwordStrengthMeter"
import { useRouter } from "next/navigation"
import { GrContact } from "react-icons/gr"

// ✅ Overlay Component
const ScreenBlocker = () => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <BiLoader className="animate-spin text-white" size={40} />
  </div>
)

function Page() {
  const router = useRouter()
  const signup = useAuthStore((state) => state.signup)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)
  const user = useAuthStore((state) => state.user)

  const [isRedirecting, setIsRedirecting] = useState(false) // ✅ new

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phoneNumber: ""
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = await signup(formData)
      console.log("Signup response:", data)

      if (data.status === 200) {
        alert("Signup successful!")
        setIsRedirecting(true) // ✅ show loader before redirect
        setTimeout(() => router.push("/verify-email"), 1500)
      } else {
        alert("Signup failed. Check the response.")
        console.log("Signup failed data:", data)
      }
    } catch (error) {
      console.log("Signup error:", error.message || error)
    }

    console.log("Error:", error)
    console.log("Loading:", isLoading)
    console.log("User:", user)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-900 justify-center relative overflow-hidden flex items-center">
      {isRedirecting && <ScreenBlocker />} {/* ✅ screen overlay */}

      <FlotingShape color="bg-blue-400" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FlotingShape color="bg-blue-400" size="w-45 h-45" top="50%" left="70%" delay={5} />
      <FlotingShape color="bg-blue-400" size="w-30 h-30" top="-30%" left="90%" delay={2} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
            Create Account
          </h2>
          <form onSubmit={handleSubmit}>
            <Input icon={BiUser} type="text" placeholder="Full Name" value={formData.name} name="name" onChange={handleChange} />
            <Input icon={MdEmail} type="email" placeholder="Email" value={formData.email} name="email" onChange={handleChange} />
            <Input icon={GrContact} type="number" placeholder="Phone Number" value={formData.phoneNumber} name="phoneNumber" onChange={handleChange} />
            <Input icon={BiLock} type="date" placeholder="Date Of Birth" value={formData.dateOfBirth} name="dateOfBirth" onChange={handleChange} />
            <Input icon={BiLock} type="password" placeholder="Password" value={formData.password} name="password" onChange={handleChange} />

            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
            <PasswordStrengthMeter password={formData.password} />

            <motion.button
              className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-zinc-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.90 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <BiLoader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/Login" className="text-blue-400 hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Page
