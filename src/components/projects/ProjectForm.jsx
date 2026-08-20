import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import ConfirmModal from "../ui/ConfirmModal";
import TasksTable from "./TasksTable";
import { showAlert } from "../ui/Alert";

const labelClass = "block mb-1 font-medium text-gray-900 dark:text-gray-100";

function snapshot(values) {
    return JSON.stringify({
        name: values.name ?? "",
        description: values.description ?? "",
        color: values.color ?? "",
        dueDate: values.dueDate || "",
        status: values.status ?? "",
        tasks: (values.tasks ?? []).map((task) => ({
            id: task.id,
            title: task.title,
            dueDate: task.dueDate || "",
            completed: Boolean(task.completed),
        })),
    });
}

export default function ProjectForm({
    title,
    subtitle,
    initialValues,
    submitLabel,
    submittingLabel,
    onSubmit,
}) {
    const navigate = useNavigate();
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
    const [warningExitModal, setWarningExitModal] = useState(false);

    const initialSnapshot = useMemo(() => snapshot(initialValues), [initialValues]);
    const isDirty = snapshot({ name, description, color, dueDate, status, tasks }) !== initialSnapshot;

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

    function handleDeleteTask(task) {
        setTasks((prev) => prev.filter((item) => item.id !== task.id));
    }

    function handleToggleTask(taskID) {
        setTasks((prev) =>
            prev.map((task) =>
                task.id !== taskID ? task : { ...task, completed: !task.completed }
            )
        );
    }

    function handleBack() {
        if (isDirty) {
            setWarningExitModal(true);
            return;
        }
        navigate("/projects");
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
                    <Button variant="ghost" icon={<ChevronLeft size={18} />} onClick={handleBack}>
                        Back
                    </Button>
                    <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? submittingLabel : submitLabel}
                    </Button>
                </div>

                <h1 className="font-bold text-2xl my-2 text-black dark:text-white">
                    {title}
                    {subtitle ? (
                        <span className="text-gray-500 dark:text-gray-400 font-semibold"> ({subtitle})</span>
                    ) : null}
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
                        onDeleteTask={handleDeleteTask}
                    />
                </div>
            </form>

            <ConfirmModal
                isOpen={warningExitModal}
                title="Leave without saving?"
                message="Your edits won't be saved. Tasks and project data will stay as they are now."
                confirmButtonVariant="danger"
                confirmButtonText="Leave without saving"
                cancelButtonText="Keep editing"
                onCancel={() => setWarningExitModal(false)}
                onConfirm={() => navigate("/projects")}
            />
        </>
    );
}
