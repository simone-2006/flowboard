import { supabase } from '../utils/supabase';
import { DEV_USER_ID } from '../utils/auth';

function nullableId(id) {
    return id ? id : null;
}

function formatActivityDescription(action, taskName, projectName) {
    if (taskName && projectName) {
        return `${action}: ${taskName} in ${projectName}`;
    }
    if (taskName) {
        return `${action}: ${taskName}`;
    }
    if (projectName) {
        return `${action}: ${projectName}`;
    }
    return action;
}

export async function listActivities() {
    const { data, error } = await supabase
        .from('activities')
        .select(`
            id,
            user_id,
            project_id,
            task_id,
            description,
            created_at,
            creator:profiles (
                name, surname
            )
        `)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
}

export async function createUserActivity({
    userId = DEV_USER_ID,
    projectId = null,
    taskId = null,
    activityDescription,
    taskName = null,
    projectName = null,
} = {}) {
    const { error } = await supabase.from('activities').insert({
        user_id: nullableId(userId) ?? DEV_USER_ID,
        project_id: nullableId(projectId),
        task_id: nullableId(taskId),
        description: formatActivityDescription(activityDescription, taskName, projectName),
    });

    if (error) throw error;
    return 1;
}
