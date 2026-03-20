"use client";
export const dynamic = "force-dynamic";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const t = searchParams.get("token");
    if (t) setToken(t);
  }, [searchParams]);

  const handleReset = async () => {
    try {
      if (!token) {
        toast.error("Invalid or missing token");
        return;
      }

      setLoading(true);

      await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      toast.success("Password reset successful");

      setTimeout(() => {
        router.push("/login");
      }, 1000);

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
          Reset Password
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Enter your new password below
        </p>

        <input
          type="password"
          placeholder="New password"
          className="w-full mb-6 p-2 border-b outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-pink-400"
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>

      </div>
    </div>
  );
}