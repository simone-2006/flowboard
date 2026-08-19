import { supabase } from '../utils/supabase';
import { DEV_USER_ID } from '../utils/auth';

function nullableId(id) {
    return id ? id : null;
}

export async function listActivities() {
    const { data, error } = await supabase
        .from('activities')
        .select(`
            id,
            userId:user_id,
            projectId:project_id,
            taskId:task_id,
            activityDescription:description,
            timeStamp:created_at
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
} = {}) {
    const { error } = await supabase.from('activities').insert({
        user_id: nullableId(userId) ?? DEV_USER_ID,
        project_id: nullableId(projectId),
        task_id: nullableId(taskId),
        description: activityDescription,
    });

    if (error) throw error;
    return 1;
}
