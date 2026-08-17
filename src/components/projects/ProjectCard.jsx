import Button from "../ui/Button";
import TaskCheckbox from "./TaskCheckbox";
import TaskCompletionProgressBar from "../ui/TaskCompletionProgressBar";

import { Trash, SquarePen } from 'lucide-react';

export default function ProjectCard(
    {
        name,
        description,
        color,
        manager,
        tasks,
        dueDate,
        status
    }
) {
    return (
        <div className="bg-white rounded-md shadow-md p-2">
            <div className="flex items-center justify-between">
                <div className="flex gap-1 items-center">
                    <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: color }}
                    ></div>
                    <h1 className="text-xl font-semibold">{name}</h1>
                </div>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" icon={<SquarePen size={18} />}></Button>
                    <Button variant="danger" icon={<Trash size={18} />}></Button>
                </div>


            </div>


            <p className="text-xs text-gray-500">{description}</p>

            <div className="my-2">
                <TaskCompletionProgressBar percentage={10}></TaskCompletionProgressBar>
            </div>

            <div className="rounded-md bg-gray-200 p-2">
                <h2 className="text-base font-bold">Tasks</h2>
                <table className="w-full text-sm mt-1">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left px-2 py-1">Title</th>
                            <th className="text-left px-2 py-1">Due date</th>
                            <th className="text-left px-2 py-1">Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id} className="border-b border-gray-400">
                                <td className="px-2 py-0.5">{task.title}</td>
                                <td className="px-2 py-0.5">
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
                                        // Only flag as overdue if not completed
                                        if (dueDate < currentDate && !task.completed) {
                                            return <span className="text-red-600 font-bold ml-1">!</span>;
                                        }
                                        return null;
                                    })()}
                                </td>

                                <td className="px-2 py-0.5">
                                    <TaskCheckbox check={task.completed} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}