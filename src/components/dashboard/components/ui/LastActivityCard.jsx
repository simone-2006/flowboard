import DashboardCard from "./DashboardCard";

import { useAppContext } from "../../../../context/appContext";
import { formatDateTimeGGMMAAAAHHMMSS } from "../../../../utils/functions";

export default function LastActivityCard() {

    const { usersActivities } = useAppContext();
    const { users } = useAppContext();

    console.log(usersActivities)

    return (
        <DashboardCard cardTitle="Last activities">
            <table className="w-full text-sm border-separate border-spacing-y-1">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
                        <th className="text-left px-2 py-1 rounded-r">Timestamp</th>
                        <th className="text-left px-2 py-1 rounded-l">User</th>
                        <th className="text-left px-2 py-1">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {usersActivities && usersActivities.length > 0 ? (
                        usersActivities.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)).map((activity) => (
                            <tr key={activity.id} className="group hover:bg-blue-50 dark:hover:bg-blue-900/30 border-b border-gray-200 dark:border-gray-700 transition-colors">
                                {/* const creator = users.find(user => user.id === creatorID); */}
                                <td className="px-2 py-1 text-gray-900 dark:text-gray-200">
                                    {formatDateTimeGGMMAAAAHHMMSS(activity.timeStamp)}
                                </td>
                                <td className="px-2 py-1 font-medium text-gray-900 dark:text-gray-200">
                                    {(users.find(user => user.id === activity.userId)?.name + " " + (users.find(user => user.id === activity.userId)?.surname) ?? "Unknown user")}
                                </td>
                                <td className="px-2 py-1 text-gray-900 dark:text-gray-200">{activity.activityDescription ?? "No description"}</td>
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