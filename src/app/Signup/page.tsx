"use client";

import React, { ChangeEvent, useState } from "react";
import { BsGoogle } from "react-icons/bs";

const SignupPage: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [error, setError] = useState("");

  function update(e: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function createUser() {
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    fetch("https://agent-with-me-backend.onrender.com/v1/signup", {
      method: "POST",
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        username: form.username,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Error:", err));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create an Account</h1>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={update}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={update}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={update}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={update}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        
        <button
          onClick={createUser}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition shadow-md font-semibold"
        >
          Sign Up
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">or continue with</p>
          <button
            className="flex items-center justify-center w-full border border-gray-300 p-3 rounded-lg hover:bg-gray-100 transition mt-2 shadow-sm"
          >
            <BsGoogle className="mr-2 text-blue-500" /> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
