"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axios.post("/api/users/forgotpassword", { email });

      toast.success("Reset email sent");

    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-pink-400">
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[350px] text-center">
        
        <h1 className="text-2xl font-semibold mb-4">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Enter your email to receive reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-6 p-2 border-b outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-pink-400"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </div>
    </div>
  );
}