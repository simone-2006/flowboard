import { useEffect, useRef, useState } from "react";
import { createRoot } from 'react-dom/client';
import { CircleCheck, TriangleAlert, CircleX, Info } from 'lucide-react';

export default function Alert({ variant = "success", children, onClose }) {
    const [visible, setVisible] = useState(false);
    const alertRef = useRef(null);

    useEffect(() => {
        // Start with invisible, then fade in for animation
        setVisible(true);

        // Exit after 2700ms (so out-animation completes before unmount)
        const hideTimeout = setTimeout(() => {
            setVisible(false);
        }, 2700);

        // Optionally run onClose after out-animation completes
        let removeTimeout;
        if (onClose) {
            removeTimeout = setTimeout(() => {
                onClose();
            }, 3000);
        }

        return () => {
            clearTimeout(hideTimeout);
            if (removeTimeout) clearTimeout(removeTimeout);
        };
    }, [onClose]);

    // Fade-in and fade-out classes
    const baseAnim = "transition-all duration-300 ease-in-out";
    const showAnim = visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2 pointer-events-none";

    const variantIcon = {
        success: <CircleCheck size={18} />,
        danger: <TriangleAlert size={18} />,
        error: <CircleX size={18} />,
        info: <Info size={18} />
    };
    const variantClasses = {
        success: "text-green-600",
        danger: "text-amber-600",
        error: "text-red-600",
        info: "text-gray-600"
    };

    return (
        <div
            ref={alertRef}
            className={`bg-gray-100 rounded-md flex items-center gap-2 px-2 py-1 font-bold ${variantClasses[variant] || ""} ${baseAnim} ${showAnim}`}
        >
            {variantIcon[variant] || null}
            {children}
        </div>
    );
}

export function showAlert(message, variant = "success", containerId = "alert-container") {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id ${containerId} not found`);
        return;
    }

    const wrapper = document.createElement("div");
    container.appendChild(wrapper);

    const root = createRoot(wrapper);

    // Define a cleanup function to unmount & remove wrapper after animation
    const handleClose = () => {
        root.unmount();
        wrapper.remove();
    };

    root.render(<Alert variant={variant} onClose={handleClose}>{message}</Alert>);
}