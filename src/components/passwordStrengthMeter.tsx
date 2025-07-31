
import { div } from 'framer-motion/client'
import React from 'react'
import { BiCheck } from 'react-icons/bi'
import { FcCancel } from 'react-icons/fc'
interface password { password: string }
const PasswordCriteria = ({ password }: password) => {
    const criteria = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contain uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contain lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contain number letter", met: /\d/.test(password) },
        { label: "Contain special character", met: /[^A-ZA-Z0-9]/.test(password) },
    ]
    return (
        <div className='mt-2 space-y-1 '>
            {criteria.map((item, index) => (
                <div key={index} className=' flex items-center text-xs'>
                    {
                        item.met ? (
                            <BiCheck className='size-4 text-blue-500 mr-2' />
                        ) : (
                            <FcCancel className='size-4 text-gr-500 mr-2' />
                        )
                    }
                    <span className={item.met ? "text-blue-500" : "text-gray-400"}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    )
}
const PasswordStrengthMeter = ({ password }: password) => {

    const getStrenght = (pass: string) => {
        let strength = 0
        let message = ""
        let color = ""
        if (pass.length >= 6) strength++
        if (/[A-Z]/.test(pass)) strength++
        if (/[a-z]/.test(pass)) strength++
        if (/\d/.test(pass)) strength++
        if (/[^A-ZA-Z0-9]/.test(pass)) strength++
        if (strength === 0) {
            message = "Very weak";

        }
        if (strength === 1) {
            message = "Weak";
            color = "bg-red-500"
        }
        if (strength === 2) {
            message = "Fair";
            color = "bg-red-400"
        }
        if (strength === 3) {
            message = "Good";
            color = "bg-yellow-400"
        }
        if (strength === 4) {
            message = "strong";
            color = "bg-green-500"
        }

        return { strength, message, color }
    }
    const strength = getStrenght(password).strength
    return (
        <div className='mt-2'>
            <div className='flex justify-between items-center mb-1  '>
                <span className=' text-xs text-gray-400 '>Password strength</span>
                <span className='text-xs text-gray-400'>{getStrenght(password).message}</span>


            </div>
            <div className='flex space-x-1'>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getStrenght(password).color : "bg-gray-600"}`}>

                    </div>
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>

    )
}

export default PasswordStrengthMeter