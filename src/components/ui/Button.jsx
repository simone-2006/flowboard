import React from "react";

export default function Button({ variant = "primary", icon = "", children, onClick, className = "", type = "button", disabled = false, ...props }) {
    const variantClass = {
        primary: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400",
        ghost: "bg-transparent text-gray-800 hover:bg-gray-100 shadow-xs dark:text-white dark:hover:bg-gray-700 border border-gray-50",
        ghostPrimary: "bg-transparent text-blue-500 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-500/10",
        danger: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-400",
        success: "bg-green-500 text-white hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-400",
        warning: "bg-yellow-400 text-black hover:bg-yellow-500 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400"
    };
    return (
        <button
            className={`flex items-center max-h-8 gap-2 px-1.5 py-0.5 rounded-md cursor-pointer transition-all ${variantClass[variant]} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...props}
        >
            {icon && icon}
            {children}
        </button>
    );
}