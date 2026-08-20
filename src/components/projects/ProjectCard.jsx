import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash, Pen } from "lucide-react";
import useSound from "use-sound";

import Button from "../ui/Button";
import TaskCompletionProgressBar from "../ui/TaskCompletionProgressBar";
import ProjectStatusChip from "./ProjectStatusChip";
import TasksTable from "./TasksTable";
import ConfirmModal from "../ui/ConfirmModal";
import { showAlert } from "../ui/Alert";

import { getProfileById, listProfiles } from "../../api/profiles";
import { addTaskToProject, deleteTask, listTasksByProject, toggleTask } from "../../api/tasks";
import { deleteProject } from "../../api/projects";
import { formatDateGGMMAAAA } from "../../utils/functions";
import { DEV_USER_ID } from "../../utils/auth";
import dingSound from "../../sound/Ding.mp3";

export default function ProjectCard({
    name,
    id,
    description,
    color,
    creatorID,
    tasks: initialTasks,
    dueDate,
    status,
    onDeleted,
}) {
    const [authUserData, setAuthUserData] = useState(null);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState(initialTasks ?? []);
    const [playDing] = useSound(dingSound);

    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDue, setNewTaskDue] = useState("");
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    useEffect(() => {
        getProfileById(DEV_USER_ID).then(setAuthUserData).catch(() => { });
        listProfiles().then(setUsers).catch(() => { });
    }, []);

    useEffect(() => {
        setTasks(initialTasks ?? []);
    }, [id]);

    const totalTask = tasks.length;
    const taskCompleted = tasks.filter((task) => task.completed).length;
    const tasksPercentage = totalTask === 0 ? 0 : ((100 * taskCompleted) / totalTask).toFixed(0);

    const creator = users.find((user) => user.id === creatorID);
    const creatorLabel = !creator
        ? "Unknown"
        : creatorID === authUserData?.id
            ? `you (${creator.name} ${creator.surname})`
            : `${creator.name} ${creator.surname}`;

    async function handleToggleTask(taskID) {
        try {
            const result = await toggleTask(id, taskID, authUserData?.id ?? DEV_USER_ID);
            setTasks(await listTasksByProject(id));
            if (result === "completed") {
                showAlert("Task marked as completed", "success");
                playDing();
            } else if (result === "incomplete") {
                showAlert("Task marked as incomplete", "info");
            }
        } catch {
            showAlert("Task not found", "warning");
        }
    }

    async function handleAddTask() {
        if (newTaskName.trim() === "") {
            showAlert("Task name can't be empty", "error");
            return;
        }
        try {
            await addTaskToProject(id, newTaskName.trim(), newTaskDue, authUserData?.id ?? DEV_USER_ID);
            setTasks(await listTasksByProject(id));
            showAlert("Task added to project", "success");
            playDing();
            setAddTaskOpen(false);
            setNewTaskName("");
            setNewTaskDue("");
        } catch {
            showAlert("Error adding task", "error");
        }
    }

    async function handleConfirmDeleteTask() {
        if (!taskToDelete) return;
        try {
            await deleteTask(id, taskToDelete.id, authUserData?.id ?? DEV_USER_ID);
            setTasks(await listTasksByProject(id));
            showAlert("Task deleted from project", "success");
            playDing();
        } catch {
            showAlert("Error deleting task", "error");
        } finally {
            setTaskToDelete(null);
        }
    }

    async function handleDeleteProject() {
        try {
            await deleteProject(id, authUserData?.id ?? DEV_USER_ID);
            showAlert("Project deleted", "success");
            playDing();
            setShowDeleteProjectModal(false);
            onDeleted?.(id);
        } catch {
            showAlert("Error deleting project", "error");
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-xl">
            <div className="flex items-center justify-between mb-3">
                <div className="flex gap-3 items-center">
                    <div
                        className="h-4 w-4 rounded-full border-2 border-gray-200 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                    />
                    <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">{name}</h1>
                    <ProjectStatusChip status={status} />
                </div>
                <div className="flex items-center gap-2">
                    <Link to={`/editProject/${id}`}>
                        <Button variant="ghost" icon={<Pen size={18} />} aria-label="Edit project" />
                    </Link>
                    <Button
                        variant="danger"
                        icon={<Trash size={18} />}
                        onClick={() => setShowDeleteProjectModal(true)}
                        aria-label="Delete project"
                    />
                </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2 italic">{description}</p>

            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-3">
                <span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Created by: </span>
                    <span className="ml-1">{creatorLabel}</span>
                </span>
                <span>
                    <span className="font-medium">Due: </span>
                    {dueDate ? formatDateGGMMAAAA(dueDate) : "-"}
                </span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between text-sm mb-1 text-black dark:text-white">
                    <div>
                        <span>Task completed:</span>
                        <span className="font-semibold ml-1">{taskCompleted}</span>
                        <span className="text-gray-400 dark:text-gray-500">/</span>
                        <span className="font-semibold">{totalTask}</span>
                    </div>
                </div>
                <div className="my-2">
                    <TaskCompletionProgressBar percentage={tasksPercentage} />
                </div>
            </div>

            <TasksTable
                tasks={tasks}
                addTaskOpen={addTaskOpen}
                newTaskName={newTaskName}
                newTaskDue={newTaskDue}
                onToggleAdd={() => setAddTaskOpen((open) => !open)}
                onNewTaskNameChange={setNewTaskName}
                onNewTaskDueChange={setNewTaskDue}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={setTaskToDelete}
            />

            <ConfirmModal
                isOpen={showDeleteProjectModal}
                title={`Delete project "${name}"?`}
                message="This action is irreversible."
                confirmButtonVariant="danger"
                confirmButtonText="Delete"
                onCancel={() => setShowDeleteProjectModal(false)}
                onConfirm={handleDeleteProject}
            />

            <ConfirmModal
                isOpen={Boolean(taskToDelete)}
                title={`Delete task "${taskToDelete?.title ?? ""}"?`}
                message="This action is irreversible."
                confirmButtonVariant="danger"
                confirmButtonText="Delete"
                onCancel={() => setTaskToDelete(null)}
                onConfirm={handleConfirmDeleteTask}
            />
        </div>
    );
}
