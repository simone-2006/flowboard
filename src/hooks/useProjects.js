import { useCallback, useEffect, useState } from 'react';
import { createProject, listProjects } from '../api/projects';
import { DEV_USER_ID } from '../utils/auth';

export function useProjects() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setError(null);
        try {
            const projects = await listProjects();
            setData(projects);
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

    const addProject = async (newProject, userId = DEV_USER_ID) => {
        try {
            await createProject(newProject, userId);
            await refetch();
            return 1;
        } catch (err) {
            setError(err);
            return 0;
        }
    };

    return { data, loading, error, refetch, addProject };
}
