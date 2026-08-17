import React from "react";

export default function Button({ variant = "primary", icon = "", children }) {
    const variantClass = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        ghost: "bg-transparent text-blue-500 hover:bg-blue-100",
        danger: "bg-red-500 text-white hover:bg-red-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-yellow-400 text-black hover:bg-yellow-500"
    };
    return (
        <button className={`flex items-center gap-2 px-1.5 py-0.5 rounded-md cursor-pointer ${variantClass[variant]}`}>
            {icon && icon}
            {children}
        </button>
    );
}