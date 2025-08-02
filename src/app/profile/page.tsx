'use client'

import React, { useEffect, useState } from 'react';
import { GoVerified } from 'react-icons/go';
import { useAuthStore } from '@/app/store/authStore';
import HouseMainComponent from '@/components/HouseMainComponent';


const userId = "6882a58475f46ad9e3ffe55b";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:800/v1/user/${userId}`);
        const result = await res.json();
        setUserData(result);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, []);

  if (!userData) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  const isHost = userData.role === 'host';

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="flex h-screen overflow-hidden max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-80 bg-white dark:bg-gray-800 p-6 border-r overflow-y-auto">
          <div className="flex flex-col items-center">
            <img
              src={userData.profile || '/profile.jpg'}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow"
            />
            <h2 className="text-lg font-semibold mt-4 flex items-center gap-1">
              {userData.username || 'Unknown User'}
              {userData.adminVerified && <GoVerified className="text-blue-500" title="Verified" />}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">{userData.email}</p>

            <div className="mt-6 text-left w-full text-sm space-y-2">
              <p><span className="font-medium">Phone:</span> {userData.phoneNumber || 'N/A'}</p>
              <p><span className="font-medium">DOB:</span> {new Date(userData.dateOfBirth).toLocaleDateString()}</p>
              <p><span className="font-medium">Rank:</span> #{userData.rank || 0}</p>
              <p><span className="font-medium">Role:</span> {userData.role}</p>
              <p className="font-medium mt-4">Socials:</p>
              <ul className="list-disc ml-5">
                {(userData.socialMedia || []).map((link, i) => (
                  <li key={i}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 overflow-y-auto p-6">
          {isHost ? (
            <>
              <h1 className="text-2xl font-bold mb-2">Your Uploaded Houses</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Browse and manage the properties you've listed.</p>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <HouseMainComponent userId={userId} page={false} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome, Guest!</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                You currently don't have any properties listed. If you're interested in becoming a host, please complete the verification process or contact support.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Become a Host
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
