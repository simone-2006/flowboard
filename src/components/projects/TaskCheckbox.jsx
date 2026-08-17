import { useState } from "react";

function TaskCheckbox({check = false}) {
    const [checked, setChecked] = useState(check);

    return (
        <button
            onClick={() => setChecked(!checked)}
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
        ${checked
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-transparent border-gray-400 text-transparent"
                }`}
        >
            ✓
        </button>
    );
}

export default TaskCheckbox;