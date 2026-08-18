export default function DashboardCard({ cardTitle = "", children }) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-md m-1 p-2">
            <h2 className="font-semibold text-xl">{cardTitle}</h2>
            {children}
        </div>
    );
}