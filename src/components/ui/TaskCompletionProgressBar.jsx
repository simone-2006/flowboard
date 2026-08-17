export default function TaskCompletionProgressBar({ percentage = 0 }) {
  // Clamp percentage between 0 and 100
  const progress = Math.max(0, Math.min(percentage, 100));

  return (
    <div>
        <p className="font-semibold">Task completion: {progress}%</p>
        <div className="bg-gray-200 max-w-80 h-2 rounded-md overflow-hidden">
          <div
            className="bg-blue-500 h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
    </div>
  );
}
