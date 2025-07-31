"use client"
import React from 'react'
import { motion } from "framer-motion"
import { div } from 'framer-motion/client'
interface floatingShape {
    color: String, size: String, top: String, left: String, delay: number
}
const FlotingShape = ({ color, size, top, left, delay }: floatingShape) => {
    return (

        <motion.div
            className={` absolute rounded-full ${color} ${size} ${top} ${left}  opacity-20 blur-xl `}

            animate={{
                y: ["0%", "100%", "0%"],
                x: ["0%", "100%", "0%"],
                rotate: [0, 360]
            }}

            transition={
                {
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                    delay
                }
            }
            aria-hidden="true"
        />
    )
}
export default FlotingShape