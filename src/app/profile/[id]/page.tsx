"use client";
import { useParams } from "next/navigation";
export default function UserProfile(){
       const params = useParams();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-white">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page
                <span className="p-2 ml-2 rounded bg-blue-900 text-white">{params.id}</span></p>
        </div>
    )
}