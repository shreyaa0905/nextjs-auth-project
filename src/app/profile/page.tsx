"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
    } catch (error: any) {
      toast.error("Error fetching user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-pink-400">
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[350px] text-center">
        
        <h1 className="text-2xl font-semibold mb-6">
          Profile
        </h1>

        <p className="text-sm mb-4 text-gray-600">
          Welcome to your profile
        </p>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">User ID</p>

          <div className="p-2 border-b text-sm break-all">
            {data === "nothing" ? (
              "Click below to fetch"
            ) : (
              <Link href={`/profile/${data}`} className="text-blue-500 underline">
                {data}
              </Link>
            )}
          </div>
        </div>

        <button
          onClick={getUserDetails}
          className="w-full py-2 mb-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-pink-400"
        >
          {loading ? "Processing..." : "Get Details"}
        </button>

        <button
          onClick={logout}
          className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-pink-400"
        >
          Logout
        </button>

      </div>
    </div>
  );
}