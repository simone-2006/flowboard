import React from "react";

export default function Input({ variant = "primary", icon = "", ...props }) {
    const variantClass = {
        primary: "border border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500",
        ghost: "border-transparent bg-transparent text-blue-500 dark:text-blue-400 placeholder-blue-300 dark:placeholder-blue-500/50 focus:ring-1 focus:ring-blue-100 dark:focus:ring-blue-500/30",
        danger: "border border-red-500 focus:ring-1 focus:ring-red-500 bg-white dark:bg-gray-800 text-red-900 dark:text-red-300 placeholder-red-400 dark:placeholder-red-400/60",
        success: "border border-green-500 focus:ring-1 focus:ring-green-500 bg-white dark:bg-gray-800 text-green-900 dark:text-green-300 placeholder-green-400 dark:placeholder-green-400/60",
        warning: "border border-yellow-400 focus:ring-1 focus:ring-yellow-400 bg-white dark:bg-gray-800 text-yellow-900 dark:text-yellow-200 placeholder-yellow-500 dark:placeholder-yellow-400/60"
    };
    return (
        <div className="flex items-center gap-2">
            {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
            <input
                className={`px-1.5 py-0.5 rounded-md outline-none ${variantClass[variant]} ${props.disabled ? "opacity-60 cursor-not-allowed" : ""}`}
       
                {...props}
            />
        </div>
    );
}