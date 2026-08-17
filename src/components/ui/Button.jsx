import React from "react";

export default function Button({ variant = "primary", icon = "", children, onClick }) {
    const variantClass = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        ghost: "bg-transparent text-gray-800 hover:bg-gray-100 shadow-xs",
        ghostPrimary : "bg-transparent text-blue-500 hover:bg-blue-200",
        danger: "bg-red-500 text-white hover:bg-red-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-yellow-400 text-black hover:bg-yellow-500"
    };
    return (
        <button
            className={`flex items-center gap-2 px-1 py-0.5 rounded-md cursor-pointer transition-all ${variantClass[variant]}`}
            onClick={onClick}
            type="button"
        >
            {icon && icon}
            {children}
        </button>
    );
}