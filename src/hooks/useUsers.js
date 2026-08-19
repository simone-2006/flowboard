import { useCallback, useEffect, useState } from 'react';
import { listProfiles } from '../api/profiles';

export function useUsers() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setError(null);
        try {
            const users = await listProfiles();
            setData(users);
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
