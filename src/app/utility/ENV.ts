"use server"
import dotenv from "dotenv"
import { base } from "framer-motion/client"
dotenv.config()


export default async ()=> {
   return { baseUrl :process.env.BACKEND_URL}
}