import { useCallback, useEffect, useState } from 'react';
import {
    addTaskToProject as addTaskToProjectApi,
    deleteTask as deleteTaskApi,
    listTasksByProject,
    toggleTask as toggleTaskApi,
} from '../api/tasks';
import { DEV_USER_ID } from '../utils/auth';

export function useTasks(projectId, initialTasks = []) {
    const [data, setData] = useState(initialTasks ?? []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        if (!projectId) return;

        setError(null);
        try {
            const tasks = await listTasksByProject(projectId);
            setData(tasks);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        setData(initialTasks ?? []);
        // Nested select is the first paint; mutations refetch this project's tasks.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    const toggleTask = async (projId, taskId, userId = DEV_USER_ID) => {
        try {
            const result = await toggleTaskApi(projId, taskId, userId);
            await refetch();
            return result;
        } catch (err) {
            setError(err);
            return 'error';
        }
    };

    const addTaskToProject = async (projId, taskName, taskDue, userId = DEV_USER_ID) => {
        try {
            const result = await addTaskToProjectApi(projId, taskName, taskDue, userId);
            await refetch();
            return result;
        } catch (err) {
            setError(err);
            return 0;
        }
    };

    const deleteTask = async (projId, taskId, userId = DEV_USER_ID) => {
        try {
            const result = await deleteTaskApi(projId, taskId, userId);
            await refetch();
            return result;
        } catch (err) {
            setError(err);
            return 0;
        }
    };

    return { data, loading, error, refetch, toggleTask, addTaskToProject, deleteTask };
}
