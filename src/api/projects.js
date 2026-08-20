import { supabase } from '../utils/supabase';
import { DEV_USER_ID } from '../utils/auth';
import { createUserActivity } from './activities';

const PROJECT_SELECT = `
    id, name, description, color, status,
    dueDate:due_date,
    creatorID:creator_id,
    tasks (id, title, completed, dueDate:due_date)
`;

export async function listProjects(id) {
    let data, error;
    if (id) {
        ({ data, error } = await supabase
            .from('projects')
            .select(PROJECT_SELECT)
            .eq('id', id));
        // console.log(data)
    } else if (!id) {
        ({ data, error } = await supabase
            .from('projects')
            .select(PROJECT_SELECT));
    }
    if (error) throw error;
    return (data ?? []).map((project) => ({
        ...project,
        tasks: project.tasks ?? [],
    }));
}

// export async function getProjectById(id) {
//     const { data, error } = await supabase
//         .from('projects')
//         .select(PROJECT_SELECT)
//         .match({ id })
//         .single();

//     if (error) throw error;
//     return data;
// }


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
        activityDescription: 'Created a new project',
        projectName: name,
    });

    return project;
}

async function syncProjectTasks(projectId, incomingTasks = []) {
    const { data: existingTasks, error: listError } = await supabase
        .from('tasks')
        .select('id')
        .eq('project_id', projectId);

    if (listError) throw listError;

    const existingIds = new Set((existingTasks ?? []).map((task) => task.id));
    const incoming = incomingTasks ?? [];
    const toUpdate = incoming.filter((task) => existingIds.has(task.id));
    const toInsert = incoming.filter((task) => !existingIds.has(task.id));
    const incomingExistingIds = new Set(toUpdate.map((task) => task.id));
    const toDelete = [...existingIds].filter((taskId) => !incomingExistingIds.has(taskId));

    if (toDelete.length > 0) {
        const { error } = await supabase.from('tasks').delete().in('id', toDelete);
        if (error) throw error;
    }

    if (toInsert.length > 0) {
        const rows = toInsert.map((task) => ({
            project_id: projectId,
            title: task.title,
            completed: Boolean(task.completed),
            due_date: task.dueDate || null,
        }));
        const { error } = await supabase.from('tasks').insert(rows);
        if (error) throw error;
    }

    for (const task of toUpdate) {
        const { error } = await supabase
            .from('tasks')
            .update({
                title: task.title,
                completed: Boolean(task.completed),
                due_date: task.dueDate || null,
            })
            .eq('id', task.id);
        if (error) throw error;
    }
}

export async function updateProject(editedProject, userId = DEV_USER_ID) {
    const { id, name, description, color, dueDate, status, tasks = [] } = editedProject;

    const { data: project, error } = await supabase
        .from('projects')
        .update({
            name,
            description,
            color,
            status,
            due_date: dueDate || null,
            creator_id: userId || DEV_USER_ID,
        })
        .eq('id', id)
        .select('id')
        .single();

    if (error) throw error;

    await syncProjectTasks(id, tasks);

    await createUserActivity({
        userId: userId || DEV_USER_ID,
        projectId: project.id,
        taskId: null,
        activityDescription: 'Edited project',
        projectName: name,
    });

    return project;
}

export async function deleteProject(projectId, userId = DEV_USER_ID) {
    const { data: project, error: fetchError } = await supabase
        .from("projects")
        .select("id, name")
        .eq("id", projectId)
        .single();

    if (fetchError || !project) {
        throw fetchError || new Error("Project not found");
    }

    const { error: activitiesError } = await supabase
        .from("activities")
        .update({ project_id: null })
        .eq("project_id", projectId);

    if (activitiesError) throw activitiesError;

    const { error: tasksError } = await supabase
        .from("tasks")
        .delete()
        .eq("project_id", projectId);

    if (tasksError) throw tasksError;

    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

    if (error) throw error;

    await createUserActivity({
        userId: userId || DEV_USER_ID,
        projectId: null,
        taskId: null,
        activityDescription: "Deleted a project",
        projectName: project.name,
    });

    return 1;
}

