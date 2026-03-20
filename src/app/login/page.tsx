"use client";
import Link from "next/link";
import React,{useEffect} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";



export default function LoginPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
    })

    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const [loading,setLoading]=React.useState(false);

    const onLogin=async()=>{
try {
    setLoading(true);
   const response= await axios.post("/api/users/login",user);
    console.log("Login success",response.data);
    toast.success("Login success");
    router.push(`/profile`);
} catch (error:any) {
    console.log("Login failed",error.message);
    toast.error(error.message);
}finally{
    setLoading(false);
}
    }

    useEffect(()=>{
if(user.email.length>0 && user.password.length>0){
    setButtonDisabled(false);
}
else{
    setButtonDisabled(true);
}
    },[user]);



 return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-pink-400">
    
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-[350px] text-center">
      
      <h1 className="text-2xl font-semibold mb-6">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-2 border-b outline-none focus:border-blue-500"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 p-2 border-b outline-none focus:border-blue-500"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onLogin}
        className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-pink-400 hover:opacity-90 transition"
      >
        {loading ? "Processing..." : "Login"}
      </button>

      <p className="text-sm mt-4">
  <Link href="/forgotpassword" className="text-blue-500 hover:underline">
    Forgot Password?
  </Link>
</p>

      <p className="text-sm mt-2">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>

    </div>
  </div>
);
}
