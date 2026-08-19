import DashboardCard from "./DashboardCard";

import { useActivities } from "../../../../hooks/useActivities";
import { useUsers } from "../../../../hooks/useUsers";
import { formatDateTimeGGMMAAAAHHMMSS } from "../../../../utils/functions";

export default function LastActivityCard() {

    const { data: usersActivities = [], loading, error } = useActivities();
    const { data: users = [] } = useUsers();

    return (
        <DashboardCard cardTitle="Last activities">
            {loading && <p className="text-sm text-gray-500 mb-2">Loading...</p>}
            {error && <p className="text-sm text-red-600 mb-2">Could not load activities.</p>}
            <table className="w-full text-sm border-separate border-spacing-y-1 table-fixed">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/3 text-left px-2 py-1 rounded-r">Timestamp</th>
                        <th className="w-1/3 text-left px-2 py-1 rounded-l">User</th>
                        <th className="w-1/3 text-left px-2 py-1">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {usersActivities && usersActivities.length > 0 ? (
                        [...usersActivities].sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).map((activity) => (
                            <tr key={activity.id} className="group hover:bg-blue-50 border-b border-gray-200 transition-colors">
                                {/* const creator = users.find(user => user.id === creatorID); */}
                                <td className="w-1/3 px-2 py-1 text-gray-900">
                                    {formatDateTimeGGMMAAAAHHMMSS(activity.timeStamp)}
                                </td>
                                <td className="w-1/3 px-2 py-1 font-medium text-gray-900">
                                    {(users.find(user => user.id === activity.userId)?.name + " " + (users.find(user => user.id === activity.userId)?.surname) ?? "Unknown user")}
                                </td>
                                <td className="w-1/3 px-2 py-1 text-gray-900">{activity.activityDescription ?? "No description"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="px-2 py-2 text-center text-gray-400">
                                No recent activity found.
                            </td>
                        </tr>
                    )}
                </tbody>


            </table>
        </DashboardCard>
    );
}
