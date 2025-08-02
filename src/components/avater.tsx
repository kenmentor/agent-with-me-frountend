"use client"; // Important: this makes sure it's a Client Component

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useAuthStore } from "@/app/store/authStore";

const colors = [
    "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-pink-500",
    "bg-purple-500", "bg-red-500", "bg-indigo-500", "bg-teal-500",
];

function getInitials(email?: string) {
    if (!email) return "U";
    const name = email.split("@")[0];
    const parts = name.split(".");
    if (parts.length >= 2) return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    return name.slice(0, 2).toUpperCase();
}

function getColor(email?: string) {
    if (!email) return colors[0];
    const index = email.charCodeAt(0) % colors.length;
    return colors[index];
}

export default function UserAvatar() {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();

    const initials = useMemo(() => getInitials(user?.email), [user?.email]);
    const color = useMemo(() => getColor(user?.email), [user?.email]);

    const handleClick = () => {
        router.push("/profile");
    };

    return (
        <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold cursor-pointer shadow-sm ${color}`}
            onClick={handleClick}
            title={user?.email || "Profile"}
        >
            {initials}
        </div>
    );
}
