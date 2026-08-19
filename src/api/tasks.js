import { supabase } from '../utils/supabase';
import { DEV_USER_ID } from '../utils/auth';
import { createUserActivity } from './activities';

export async function listTasksByProject(projectId) {
    const { data, error } = await supabase
        .from('tasks')
        .select('id, title, completed, dueDate:due_date')
        .eq('project_id', projectId)
        .order('due_date', { ascending: true });

    if (error) throw error;
    return data ?? [];
}

export async function toggleTask(projectId, taskId, userId = DEV_USER_ID) {
    const { data: task, error: fetchError } = await supabase
        .from('tasks')
        .select('id, completed')
        .eq('id', taskId)
        .single();

    if (fetchError || !task) {
        throw fetchError || new Error('Task not found');
    }

    const nextCompleted = !task.completed;
    const { error: updateError } = await supabase
        .from('tasks')
        .update({ completed: nextCompleted })
        .eq('id', taskId);

    if (updateError) throw updateError;

    if (nextCompleted) {
        await createUserActivity({
            userId,
            projectId,
            taskId,
            activityDescription: 'Completed a task',
        });
    }

    return nextCompleted ? 'completed' : 'incomplete';
}

export async function addTaskToProject(projectId, taskName, taskDue, userId = DEV_USER_ID) {
    if (taskName === '') {
        throw new Error("Error task name can't be empty");
    }
    if (taskDue === '') {
        throw new Error("Error task due date can't be empty");
    }

    const { data, error } = await supabase
        .from('tasks')
        .insert({
            project_id: projectId,
            title: taskName,
            due_date: taskDue || null,
            completed: false,
        })
        .select('id')
        .single();

    if (error) throw error;

    await createUserActivity({
        userId,
        projectId,
        taskId: data.id,
        activityDescription: `Created a new task: ${taskName}`,
    });

    return 1;
}

export async function deleteTask(projectId, taskId, userId = DEV_USER_ID) {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) throw error;

    await createUserActivity({
        userId,
        projectId,
        taskId: null,
        activityDescription: 'Deleted a task',
    });

    return 1;
}
