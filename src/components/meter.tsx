"use client"
import React from 'react'

const Meter = ({ number, progress }: { number: number, progress: number }) => {
    let color = ""

    if (progress == 1) color = "bg-red-500"
    if (progress == 2) color = "bg-red-400"
    if (progress == 3) color = "bg-yellow-400"
    if (progress == 4) color = "bg-green-500"
    if (progress == 5) color = "bg-green-400"
    if (progress == 6) color = "bg-green-500"
    if (progress == 7) color = "bg-green-600"
    return (
        <div className='flex space-x-1  w-full'>
            {[...Array(number)].map((_, index) => (
                <div key={index} className={`h-1 w-1/4 rounded-full transition-colors duration-300 bg-gray-600 ${index < progress ? color : "bg-gray-500"}`}>

                </div>
            ))}
        </div>

    )
}

export default Meter