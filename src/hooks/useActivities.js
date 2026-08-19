import { useCallback, useEffect, useState } from 'react';
import { listActivities } from '../api/activities';

export function useActivities() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setError(null);
        try {
            const activities = await listActivities();
            setData(activities);
        } catch (err) {
            setError(err);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, []);



    useEffect(() => {
        setLoading(true);
        refetch();
    }, [refetch]);

    return { data, loading, error, refetch };
}
