export default function TaskCompletionProgressBar({ percentage = 0 }) {
  // Clamp percentage between 0 and 100
  const progress = Math.max(0, Math.min(percentage, 100));

  return (
    <div className="w-70 max-w-70">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="font-semibold">Task completion:</span>
        <span className="bg-gray-200 px-1 rounded-md">{progress}%</span>
      </div>

      <div className="bg-gray-200 max-w-80 h-2 rounded-md overflow-hidden">
        <div
          className="bg-blue-500 h-2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
