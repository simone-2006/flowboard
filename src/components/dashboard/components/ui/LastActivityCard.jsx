import DashboardCard from "./DashboardCard";

import { listActivities } from "../../../../api/activities";
import { formatDateTimeGGMMAAAAHHMMSS } from "../../../../utils/functions";
import { useEffect, useState } from "react";

export default function LastActivityCard() {
    const [usersActivities, setUsersActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        listActivities()
            .then(setUsersActivities)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return (
        <DashboardCard cardTitle="Last activities">
            {loading && <p className="text-sm text-gray-500 mb-2">Loading...</p>}
            {error && <p className="text-sm text-red-600 mb-2">Could not load activities.</p>}
            <table className="w-full text-sm border-separate border-spacing-y-1 table-fixed">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
                        <th className="w-1/3 text-left px-2 py-1 rounded-r">Timestamp</th>
                        <th className="w-1/3 text-left px-2 py-1 rounded-l">User</th>
                        <th className="w-1/3 text-left px-2 py-1">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {usersActivities && usersActivities.length > 0 ? (
                        [...usersActivities].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((activity) => (
                            <tr key={activity.id} className="group hover:bg-blue-50 border-b border-gray-200 transition-colors">
                                {/* const creator = users.find(user => user.id === creatorID); */}
                                <td className="w-1/3 px-2 py-1 text-gray-900">
                                    {formatDateTimeGGMMAAAAHHMMSS(activity.created_at)}
                                </td>
                                <td className="w-1/3 px-2 py-1 font-medium text-gray-900">
                                    {activity.creator?.name + " " + activity.creator?.surname ?? "Unknown user"}
                                </td>
                                <td className="w-1/3 px-2 py-1 text-gray-900">{activity.description ?? "No description"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="px-2 py-2 text-center text-gray-400 dark:text-gray-500">
                                No recent activity found.
                            </td>
                        </tr>
                    )}
                </tbody>


            </table>
        </DashboardCard>
    );
}
