import { Plus, Minus, X } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import TaskCheckbox from "./TaskCheckbox";
import { Table, TableRow, TableCell } from "../ui/Table";
import { formatDateGGMMAAAA } from "../../utils/functions";

const TASK_COLUMNS = [
    { key: "title", label: "Title", width: "w-1/4" },
    { key: "dueDate", label: "Due date", width: "w-1/4" },
    { key: "completed", label: "Completed", width: "w-1/4" },
    { key: "action", label: "Action", width: "w-1/4" },
];

function isTaskOverdue(dueDate, completed) {
    if (!dueDate || completed) return false;
    const due = String(dueDate).slice(0, 10);
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    return due < today;
}

function formatTaskDue(dueDate) {
    if (!dueDate) return "-";
    return formatDateGGMMAAAA(dueDate) || "-";
}

export default function TasksTable({
    tasks = [],
    addTaskOpen = false,
    newTaskName = "",
    newTaskDue = "",
    onToggleAdd,
    onNewTaskNameChange,
    onNewTaskDueChange,
    onAddTask,
    onToggleTask,
    onDeleteTask,
}) {
    const showTable = tasks.length > 0 || addTaskOpen;

    function handleAddKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            onAddTask?.();
        }
    }

    return (
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
                    onClick={onToggleAdd}
                    type="button"
                >
                    {addTaskOpen ? "Close" : "Add task"}
                </Button>
            </div>

            {showTable ? (
                <Table columns={TASK_COLUMNS}>
                    {tasks.map((task) => (
                        <TableRow key={task.id} completed={task.completed}>
                            <TableCell className="font-medium">{task.title}</TableCell>
                            <TableCell>
                                {formatTaskDue(task.dueDate)}
                                {isTaskOverdue(task.dueDate, task.completed) ? (
                                    <span className="text-red-600 dark:text-red-400 font-bold ml-1 animate-pulse">!</span>
                                ) : null}
                            </TableCell>
                            <TableCell>
                                <TaskCheckbox
                                    checked={task.completed}
                                    onChange={() => onToggleTask?.(task.id)}
                                />
                            </TableCell>
                            <TableCell>
                                <button
                                    type="button"
                                    className="text-red-600 dark:text-red-400 cursor-pointer"
                                    title="Delete task"
                                    onClick={() => onDeleteTask?.(task)}
                                >
                                    <X size={18} />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {addTaskOpen && (
                        <TableRow highlight>
                            <TableCell className="py-0.5">
                                <Input
                                    placeholder="Task title..."
                                    autoFocus
                                    value={newTaskName}
                                    onChange={(e) => onNewTaskNameChange?.(e.target.value)}
                                    onKeyDown={handleAddKeyDown}
                                />
                            </TableCell>
                            <TableCell className="py-0.5">
                                <Input
                                    type="date"
                                    value={newTaskDue}
                                    onChange={(e) => onNewTaskDueChange?.(e.target.value)}
                                    onKeyDown={handleAddKeyDown}
                                />
                            </TableCell>
                            <TableCell />
                            <TableCell className="py-0.5">
                                <Button onClick={onAddTask} type="button">Add</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-300 px-1 py-3">
                    No tasks yet. Add one to get started.
                </p>
            )}
        </div>
    );
}
