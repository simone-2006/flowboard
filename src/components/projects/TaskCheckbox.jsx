function TaskCheckbox({ checked = false, onChange }) {
    return (
        <button
            type="button"
            onClick={() => onChange?.(!checked)}
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                checked
                    ? "bg-green-600 dark:bg-green-500 border-green-600 dark:border-green-500 text-white"
                    : "bg-transparent border-gray-400 dark:border-gray-500 text-transparent"
            }`}
        >
            ✓
        </button>
    );
}

export default TaskCheckbox;