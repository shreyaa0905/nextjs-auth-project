"use client";
import Link from "next/link";
import React,{useEffect} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";







export default function SignupPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const [loading,setLoading]=React.useState(false);


    const onSignup=async()=>{
try {
    setLoading(true);
   const response = await axios.post("/api/users/signup",user);
   console.log("Signup success",response.data);
     console.log("Signup success", response.data);
    toast.success("Signup successful");
   router.push("/login");
} catch (error:any) {
    console.log("Signup failed",error.message);
    toast.error(error.message);
}finally{
    setLoading(false);
}
    }

    useEffect(()=>{
if(user.email.length>0 && user.password.length>0 && user.username.length>0){
    setButtonDisabled(false);
}else{
    setButtonDisabled(true);
}
    },[user]);


   return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-pink-400">
    
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-[350px] text-center">
      
      <h1 className="text-2xl font-semibold mb-6">
        {loading ? "Processing..." : "Signup"}
      </h1>

      <input
        type="text"
        placeholder="Username"
        className="w-full mb-4 p-2 border-b outline-none"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-2 border-b outline-none"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 p-2 border-b outline-none"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onSignup}
        className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-pink-400"
      >
        Signup
      </button>

      <p className="text-sm mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>

    </div>
  </div>
);
}