import Button from "../ui/Button";
import Input from "../ui/Input";
import TaskCheckbox from "./TaskCheckbox";
import TaskCompletionProgressBar from "../ui/TaskCompletionProgressBar";
import ProjectStatusChip from "./ProjectStatusChip";

import { useState } from "react";
import { Trash, SquarePen, Plus, Minus } from 'lucide-react';

import { useAppContext } from "../../context/appContext";

export default function ProjectCard(
    {
        name,
        id,
        description,
        color,
        creatorID,
        tasks,
        dueDate,
        status
    }
) {
    const [addTaskOpen, setAddTaskOpen] = useState(false);

    const handleOpenAddTask = () => {
        addTaskOpen ? setAddTaskOpen(false) : setAddTaskOpen(true)
        console.log(addTaskOpen)
    };

    const { toggleTask } = useAppContext();


    const totalTask = tasks.length;
    const taskCompleted = tasks.filter(task => task.completed).length;
    const taskTodo = tasks.filter(task => !task.completed).length;

    // (100 * TC) / TT  -> Percentuale di task completate su tutte le task
    // Il calcolo corretto: completed / total * 100
    const tasksPercentage = totalTask === 0 ? 0 : ((100 * taskCompleted) / totalTask).toFixed(0);

    const { users } = useAppContext();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-shadow hover:shadow-xl">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex gap-3 items-center">
                    <div
                        className="h-4 w-4 rounded-full border-2 border-white shadow"
                        style={{ backgroundColor: color }}
                    ></div>
                    <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
                    <ProjectStatusChip status={status} />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" icon={<SquarePen size={18} />} className="transition hover:bg-blue-100"></Button>
                    <Button variant="danger" icon={<Trash size={18} />} className="transition hover:bg-red-100"></Button>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-2 italic">{description}</p>

            {/* Meta Info Row */}
            <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <span>
                    <span className="font-medium text-gray-700">Created by: </span>
                    {(() => {
                        const creator = users.find(user => user.id === creatorID);
                        return creator
                            ? <span className="ml-1">{creator.name} {creator.surname}</span>
                            : <span className="ml-1 text-gray-400">Unknown</span>;
                    })()}
                </span>
                <span>
                    <span className="font-medium">Due: </span>
                    <span className="">{dueDate ? (() => {
                        const d = new Date(dueDate);
                        const day = String(d.getDate()).padStart(2, '0');
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const year = d.getFullYear();
                        return `${day}/${month}/${year}`;
                    })() : '-'}</span>
                </span>
            </div>

            {/* Progress and Stats */}
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between text-sm mb-1">
                    <div>
                        <span>Task completed:</span>
                        <span className="font-semibold ml-1">{taskCompleted}</span>
                        <span className="text-gray-400">/</span>
                        <span className="font-semibold">{totalTask}</span>
                    </div>
                </div>
                <div className="my-2">
                    <TaskCompletionProgressBar percentage={tasksPercentage} />
                </div>
            </div>
       

            {/* Tasks Table */}
            <div className="rounded-lg bg-gray-50 p-3 mt-2 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-bold text-gray-900 tracking-tight">Tasks</h2>
                    <Button
                        variant="ghostPrimary"
                        icon={!addTaskOpen ? <Plus size={18} /> : <Minus size={18} />}
                        onClick={handleOpenAddTask}
                        className="transition hover:bg-purple-100"
                    >
                        {addTaskOpen ? "Close" : "Add task"}
                    </Button>
                </div>
                <div className="overflow-x-auto rounded">
                    <table className="w-full text-sm border-separate border-spacing-y-1">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-left px-2 py-1 rounded-l">Title</th>
                                <th className="text-left px-2 py-1">Due date</th>
                                <th className="text-left px-2 py-1 rounded-r">Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id} className="group hover:bg-blue-50 border-b border-gray-200 transition-colors">
                                    <td className="px-2 py-1 font-medium text-gray-900">{task.title}</td>
                                    <td className="px-2 py-1">
                                        {task.dueDate
                                            ? (() => {
                                                const d = new Date(task.dueDate);
                                                const day = String(d.getDate()).padStart(2, '0');
                                                const month = String(d.getMonth() + 1).padStart(2, '0');
                                                const year = d.getFullYear();
                                                return `${day}/${month}/${year}`;
                                            })()
                                            : '-'
                                        }
                                        {task.dueDate && (() => {
                                            const currentDate = new Date();
                                            const dueDate = new Date(task.dueDate);
                                            if (dueDate < currentDate && !task.completed) {
                                                return <span className="text-red-600 font-bold ml-1 animate-pulse">!</span>;
                                            }
                                            return null;
                                        })()}
                                    </td>
                                    <td className="px-2 py-1">
                                        <div className="flex justify-center">
                                            <TaskCheckbox
                                                checked={task.completed}
                                                onChange={() => toggleTask(id, task.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {addTaskOpen && (
                                <tr className="bg-yellow-50 border-b border-gray-200 animate-fade-in">
                                    <td className="px-2 py-0.5"><Input placeholder="Task title..." /></td>
                                    <td className="px-2 py-0.5"><Input placeholder="YYYY-MM-DD" /></td>
                                    <td className="px-2 py-0.5">
                                        <div className="flex justify-center opacity-50 cursor-not-allowed">
                                            <TaskCheckbox checked={false} disabled={true} />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  
    );
}