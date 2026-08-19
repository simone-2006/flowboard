import { useCallback, useEffect, useState } from 'react';
import {
    createProject,
    getProjectById as getProjectByIdApi,
    listProjects,
    updateProject as updateProjectApi,
} from '../api/projects';
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

    const updateProject = async (editedProject, userId = DEV_USER_ID) => {
        try {
            await updateProjectApi(editedProject, userId);
            await refetch();
            return 1;
        } catch (err) {
            setError(err);
            return 0;
        }
    };

    const getProjectById = useCallback(async (projectId) => {
        return getProjectByIdApi(projectId);
    }, []);

    return { data, loading, error, refetch, addProject, updateProject, getProjectById };
}
