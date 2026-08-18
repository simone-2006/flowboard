export default function ProjectStatusChip({ status }) {
    // const status = {
    //     active: "bg-blue-500 text-white hover:bg-blue-600",
    //     planning: "bg-transparent text-gray-800 hover:bg-gray-100 dark:bg-gray-800 shadow-xs",
    // };
    return (
        <div className="rouded-full px-2 rounded-full flex items-center gap-1 bg-gray-200 dark:bg-gray-700">
            <div
                className={`w-2 h-2 rounded-full animate-pulse ${
                    status === "active"
                        ? "bg-green-500 dark:bg-green-400"
                        : "bg-blue-500 dark:bg-blue-400"
                }`}
            ></div>
            <div
                className={`text-xs ${
                    status === "active"
                        ? "text-green-700 dark:text-green-300"
                        : "text-blue-700 dark:text-blue-300"
                }`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
        </div>
    );
}