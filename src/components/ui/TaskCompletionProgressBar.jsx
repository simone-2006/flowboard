export default function TaskCompletionProgressBar({ percentage = 0 }) {
  // Clamp percentage between 0 and 100
  const progress = Math.max(0, Math.min(percentage, 100));

  return (
    <div className="w-70 max-w-70">
      <div className="flex items-center justify-between text-sm mb-1 text-black dark:text-white">
        <span className="font-semibold">Task completion:</span>
        <span className="bg-gray-200 dark:bg-gray-600 px-1 rounded-md">{progress}%</span>
      </div>

      <div className="bg-gray-200 dark:bg-gray-600 max-w-80 h-2 rounded-md overflow-hidden">
        <div
          className={`${progress === 100 ? "bg-green-500 dark:bg-green-400" : "bg-blue-500 dark:bg-blue-400"} h-2 transition-all duration-300`}
     
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
