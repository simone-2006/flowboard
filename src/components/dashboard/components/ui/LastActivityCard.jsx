import DashboardCard from "./DashboardCard";
import { Table, TableRow, TableCell, TableEmpty } from "../../../ui/Table";

import { listActivities } from "../../../../api/activities";
import { formatDateTimeGGMMAAAAHHMMSS } from "../../../../utils/functions";
import { useEffect, useState } from "react";

const ACTIVITY_COLUMNS = [
    { key: "timestamp", label: "Timestamp", width: "w-1/3" },
    { key: "user", label: "User", width: "w-1/3" },
    { key: "action", label: "Action", width: "w-1/3" },
];

function activityUserName(activity) {
    const name = [activity.creator?.name, activity.creator?.surname].filter(Boolean).join(" ");
    return name || "Unknown user";
}

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

    const sortedActivities = [...usersActivities].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return (
        <DashboardCard cardTitle="Last activities">
            {loading && <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Loading...</p>}
            {error && <p className="text-sm text-red-600 dark:text-red-400 mb-2">Could not load activities.</p>}
            <Table columns={ACTIVITY_COLUMNS}>
                {sortedActivities.length > 0 ? (
                    sortedActivities.map((activity) => (
                        <TableRow key={activity.id}>
                            <TableCell width="w-1/3">
                                {formatDateTimeGGMMAAAAHHMMSS(activity.created_at)}
                            </TableCell>
                            <TableCell width="w-1/3" className="font-medium">
                                {activityUserName(activity)}
                            </TableCell>
                            <TableCell width="w-1/3">
                                {activity.description ?? "No description"}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    !loading && (
                        <TableEmpty colSpan={3}>No recent activity found.</TableEmpty>
                    )
                )}
            </Table>
        </DashboardCard>
    );
}
