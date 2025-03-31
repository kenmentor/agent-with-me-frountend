"use client";

import React, { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { BsGoogle } from "react-icons/bs";


const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(e: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function loginUser() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://agent-with-me-backend.onrender.com/v1/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      })
      const {ok,data} = await res.json()

      if (!ok) throw new Error("Invalid email or password");
      console.log("Login successful");
      localStorage.setItem("token",data)
    } catch {
      setError("incorrect username or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
     
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        <div className="mt-6">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={update}
            value={form.email}
            className="w-full p-3 bg-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={update}
            value={form.password}
            className="w-full p-3 bg-gray-200 text-gray-900 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={loginUser}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Continue"}
        </button>

        <div className="mt-4 flex items-center justify-center">
          <button className="flex items-center gap-2 bg-gray-200 p-3 rounded-lg w-full hover:bg-gray-300 transition">
            <BsGoogle size={18} />
            Use Google Account
          </button>
        </div>
      </motion.div>
    </div>
    
  );
};

export default Login;
