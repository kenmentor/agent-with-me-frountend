'use client'

import React, { useEffect, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import Footer from '@/components/footer'
import HouseMainComponent from '@/components/HouseMainComponent'

const userId = "6882a58475f46ad9e3ffe55b"

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "John Doe",
    dateOfBirth: "1997-05-05",
    phoneNumber: "0903894847",
    socialMedia: ["https://twitter.com/johndoe"],
    rank: 1,
    role: "user",
    adminVerified: true,
    profile: "/profile.jpg",
    email: "john@example.com"
  })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:800/v1/user/${userId}`)
        const result = await res.json()
        setUserData(result)
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className=" bg-yellow-400 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 h-svh gap-8 flex">

        {/* USER PROFILE SIDEBAR */}
        <div className='bg-green-400'>

          <aside className="lg:col-span-1 bg-white dark:bg-gray-800 shadow rounded-2xl p-6 flex flex-col items-center text-center ">
            <img
              src={userData.profile}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow"
            />
            <h2 className="text-xl font-semibold mt-4 flex items-center gap-1">
              {userData.username}
              {userData.adminVerified && <GoVerified className="text-blue-500" title="Verified" />}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">{userData.email}</p>
            <div className="mt-4 text-left w-full text-sm">
              <p><span className="font-medium">Phone:</span> {userData.phoneNumber}</p>
              <p><span className="font-medium">DOB:</span> {userData.dateOfBirth}</p>
              <p><span className="font-medium">Rank:</span> #{userData.rank}</p>
              <p><span className="font-medium">Role:</span> {userData.role}</p>
              <p><span className="font-medium">Socials:</span></p>
              <ul className="list-disc ml-5">
                {userData.socialMedia.map((link, i) => (
                  <li key={i}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </aside>
        </div>
        <div className='bg-red-600 flex-1 '>


          <section className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Your Uploaded Houses</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Below is a list of all properties you’ve uploaded.</p>
            </div>

            {/* This component should render a beautiful grid */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
              <HouseMainComponent userId={userId} page={false} />
            </div>
          </section>

        </div>

      </div>
      {/* 
      <Footer /> */}
    </main>
  )
}

export default ProfilePage
