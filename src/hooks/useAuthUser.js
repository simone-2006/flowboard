import { useCallback, useEffect, useState } from 'react';
import { getProfileById } from '../api/profiles';
import { DEV_USER_ID } from '../utils/auth';

export function useAuthUser() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setError(null);
        try {
            const profile = await getProfileById(DEV_USER_ID);
            setData(profile);
        } catch (err) {
            setError(err);
            setData(null);
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
