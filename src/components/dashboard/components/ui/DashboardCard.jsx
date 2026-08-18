export default function DashboardCard({ cardTitle = "", children }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-md m-1 p-2 border border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold text-xl text-black dark:text-white">{cardTitle}</h2>
            {children}
        </div>
    );
}