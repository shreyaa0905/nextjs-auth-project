"use client";
import { useParams } from "next/navigation";

export default function UserProfile() {
    const params = useParams() as { id: string };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">
                Profile page {params?.id}
            </p>
        </div>
    );
}