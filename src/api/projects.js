import { supabase } from '../utils/supabase';
import { DEV_USER_ID } from '../utils/auth';
import { createUserActivity } from './activities';

const PROJECT_SELECT = `
    id, name, description, color, status,
    dueDate:due_date,
    creatorID:creator_id,
    tasks (id, title, completed, dueDate:due_date)
`;

export async function listProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select(PROJECT_SELECT);

    if (error) throw error;
    return (data ?? []).map((project) => ({
        ...project,
        tasks: project.tasks ?? [],
    }));
}

export async function createProject(newProject, userId = DEV_USER_ID) {
    const { name, description, color, dueDate, status, tasks = [] } = newProject;

    const { data: project, error } = await supabase
        .from('projects')
        .insert({
            name,
            description,
            color,
            status,
            due_date: dueDate || null,
            creator_id: userId || DEV_USER_ID,
        })
        .select('id')
        .single();

    if (error) throw error;

    if (tasks.length > 0) {
        const rows = tasks.map((task) => ({
            project_id: project.id,
            title: task.title,
            completed: Boolean(task.completed),
            due_date: task.dueDate || null,
        }));

        const { error: tasksError } = await supabase.from('tasks').insert(rows);
        if (tasksError) throw tasksError;
    }

    await createUserActivity({
        userId: userId || DEV_USER_ID,
        projectId: project.id,
        taskId: null,
        activityDescription: `Created a new project: ${name}`,
    });

    return project;
}
