import React, { Children } from "react";

export default function Select({ variant = "primary", icon = "", children, ...props }) {
    const variantClass = {
        primary: "border border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400",
        ghost: "border-transparent bg-transparent text-blue-500 placeholder-blue-300 focus:ring-1 focus:ring-blue-100",
        danger: "border border-red-500 focus:ring-1 focus:ring-red-500 bg-white text-red-900 placeholder-red-400",
        success: "border border-green-500 focus:ring-1 focus:ring-green-500 bg-white text-green-900 placeholder-green-400",
        warning: "border border-yellow-400 focus:ring-1 focus:ring-yellow-400 bg-white text-yellow-900 placeholder-yellow-500"
    };
    return (
        <div className="flex items-center gap-2">
            {icon && <span>{icon}</span>}
            <select
                className={`px-1.5 py-0.5 rounded-md outline-none ${variantClass[variant]}`}
                {...props}
            >
                {children}
            </select>
        </div>
    );
}