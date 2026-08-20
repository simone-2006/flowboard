import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Plus, Minus, X } from "lucide-react";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import TaskCheckbox from "./TaskCheckbox";
import { showAlert } from "../ui/Alert";
import { formatDateGGMMAAAA } from "../../utils/functions";

const labelClass = "block mb-1 font-medium text-gray-900 dark:text-gray-100";

function isTaskOverdue(dueDate, completed) {
    if (!dueDate || completed) return false;
    const due = String(dueDate).slice(0, 10);
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    return due < today;
}

function formatTaskDue(dueDate) {
    if (!dueDate) return "-";
    const formatted = formatDateGGMMAAAA(dueDate);
    return formatted || "-";
}

export default function ProjectForm({
    title,
    subtitle,
    initialValues,
    submitLabel,
    submittingLabel,
    onSubmit,
}) {
    const [name, setName] = useState(initialValues.name ?? "");
    const [description, setDescription] = useState(initialValues.description ?? "");
    const [color, setColor] = useState(initialValues.color || "#ffd000");
    const [dueDate, setDueDate] = useState(initialValues.dueDate ?? "");
    const [status, setStatus] = useState(initialValues.status || "active");
    const [tasks, setTasks] = useState(initialValues.tasks ?? []);

    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDue, setNewTaskDue] = useState("");
    const [saving, setSaving] = useState(false);

    function handleAddTask() {
        if (newTaskName.trim() === "") {
            showAlert("Task name can't be empty", "error");
            return;
        }
        setTasks((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                title: newTaskName.trim(),
                dueDate: newTaskDue,
                completed: false,
            },
        ]);
        setAddTaskOpen(false);
        setNewTaskName("");
        setNewTaskDue("");
    }

    function handleDeleteTask(taskID) {
        setTasks((prev) => prev.filter((task) => task.id !== taskID));
    }

    function handleToggleTask(taskID) {
        setTasks((prev) =>
            prev.map((task) =>
                task.id !== taskID ? task : { ...task, completed: !task.completed }
            )
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (name.trim() === "") {
            showAlert("Project name can't be empty", "error");
            return;
        }
        setSaving(true);
        try {
            await onSubmit({
                name: name.trim(),
                description: description.trim(),
                color,
                dueDate: dueDate || null,
                status,
                tasks,
            });
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between gap-2">
                    <Link to="/projects">
                        <Button variant="ghost" icon={<ChevronLeft size={18} />}>Back</Button>
                    </Link>
                    <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? submittingLabel : submitLabel}
                    </Button>
                </div>

                <h1 className="font-bold text-2xl my-2 text-black dark:text-white">
                    {title}
                    {subtitle ? <span className="text-gray-500 dark:text-gray-400 font-semibold"> ({subtitle})</span> : null}
                </h1>

                <div className="md:max-w-2xl">
                    <div className="mb-4">
                        <label htmlFor="project-name" className={labelClass}>
                            Project name <span className="text-red-500 dark:text-red-400">*</span>
                        </label>
                        <Input
                            id="project-name"
                            name="projectName"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className={labelClass}>Description</label>
                        <TextArea
                            id="description"
                            name="description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                        <label htmlFor="color" className={labelClass}>Color:</label>
                        <div className="flex">
                            <input
                                id="color"
                                name="color"
                                type="color"
                                className="hidden"
                                onChange={(e) => setColor(e.target.value)}
                                value={color}
                            />
                            <label htmlFor="color" className="cursor-pointer">
                                <div
                                    className="w-6 h-6 border border-gray-300 dark:border-gray-600"
                                    style={{ backgroundColor: color }}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="due-date" className={labelClass}>Due date</label>
                            <Input
                                id="due-date"
                                name="dueDate"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className={labelClass}>Status</label>
                            <Select
                                id="status"
                                name="status"
                                required
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="active">Active</option>
                                <option value="planning">Planning</option>
                            </Select>
                        </div>
                    </div>

                    <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-3 mt-2 mb-4 border border-gray-100 dark:border-gray-600 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                                Tasks
                                <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-300">
                                    {tasks.length}
                                </span>
                            </h2>
                            <Button
                                variant="ghostPrimary"
                                icon={!addTaskOpen ? <Plus size={18} /> : <Minus size={18} />}
                                onClick={() => setAddTaskOpen((open) => !open)}
                                type="button"
                            >
                                {addTaskOpen ? "Close" : "Add task"}
                            </Button>
                        </div>

                        {tasks.length === 0 && !addTaskOpen ? (
                            <p className="text-sm text-gray-500 dark:text-gray-300 px-1 py-3">
                                No tasks yet. Add one to get started.
                            </p>
                        ) : (
                            <div className="overflow-x-auto rounded">
                                <table className="w-full text-sm border-separate border-spacing-y-1 table-fixed">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                                            <th className="w-1/4 text-left px-2 py-1 rounded-l">Title</th>
                                            <th className="w-1/4 text-left px-2 py-1">Due date</th>
                                            <th className="w-1/4 text-left px-2 py-1">Completed</th>
                                            <th className="w-1/4 text-left px-2 py-1 rounded-r">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task) => (
                                            <tr
                                                key={task.id}
                                                className="group hover:bg-blue-50 dark:hover:bg-blue-900/30 border-b border-gray-200 dark:border-gray-600 transition-colors"
                                            >
                                                <td className="w-1/4 px-2 py-1 font-medium text-gray-900 dark:text-gray-200">
                                                    {task.title}
                                                </td>
                                                <td className="w-1/4 px-2 py-1">
                                                    {formatTaskDue(task.dueDate)}
                                                    {isTaskOverdue(task.dueDate, task.completed) ? (
                                                        <span className="text-red-600 dark:text-red-400 font-bold ml-1 animate-pulse">!</span>
                                                    ) : null}
                                                </td>
                                                <td className="w-1/4 px-2 py-1">
                                                    <div className="flex justify-start">
                                                        <TaskCheckbox
                                                            checked={task.completed}
                                                            onChange={() => handleToggleTask(task.id)}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="w-1/4 px-2 py-1">
                                                    <button
                                                        type="button"
                                                        className="text-red-600 dark:text-red-400 cursor-pointer"
                                                        title="Delete task"
                                                        onClick={() => handleDeleteTask(task.id)}
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {addTaskOpen && (
                                            <tr className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-gray-200 dark:border-gray-600">
                                                <td className="px-2 py-0.5">
                                                    <Input
                                                        placeholder="Task title..."
                                                        autoFocus
                                                        onChange={(e) => setNewTaskName(e.target.value)}
                                                        value={newTaskName}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                handleAddTask();
                                                            }
                                                        }}
                                                    />
                                                </td>
                                                <td className="px-2 py-0.5">
                                                    <Input
                                                        type="date"
                                                        onChange={(e) => setNewTaskDue(e.target.value)}
                                                        value={newTaskDue}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                handleAddTask();
                                                            }
                                                        }}
                                                    />
                                                </td>
                                                <td></td>
                                                <td className="px-2 py-0.5 flex justify-start items-center">
                                                    <Button onClick={handleAddTask} type="button">
                                                        Add
                                                    </Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </>
    );
}
