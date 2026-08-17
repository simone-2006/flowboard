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
        manager,
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

    return (
        <div className="bg-white rounded-md shadow-md p-2">
            <div className="flex items-center justify-between">

                <div className="flex gap-1 items-center">
                    <div
                        className="h-3 w-3"
                        style={{ backgroundColor: color }}
                    ></div>
                    <h1 className="text-xl font-semibold">{name}</h1>
                    <ProjectStatusChip status={status} />
                </div>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" icon={<SquarePen size={18} />}></Button>
                    <Button variant="danger" icon={<Trash size={18} />}></Button>
                </div>

            </div>


            <p className="text-xs text-gray-500">{description}</p>


            <div className="my-2 text-gray-900 flex text-base">
                <p>Task completed: </p>
                {taskCompleted}/{totalTask}
            </div>

            <div className="my-2">
                <TaskCompletionProgressBar percentage={tasksPercentage}></TaskCompletionProgressBar>
            </div>

            <div className="rounded-md bg-gray-200 p-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold">Tasks</h2>
                    <Button variant="ghostPrimary" icon={!addTaskOpen ? <Plus size={18} /> : <Minus size={18} />} onClick={handleOpenAddTask}>
                        Add task
                    </Button>

                </div>
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
                                    <TaskCheckbox
                                        checked={task.completed}
                                        onChange={() => toggleTask(id, task.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        {addTaskOpen ? (
                            <tr className="border-b border-gray-400">
                                <td className="px-2 py-0.5"><Input></Input></td>
                                <td className="px-2 py-0.5">
                                    <Input></Input>
                                </td>
                                <td className="px-2 py-0.5">
                                    {/* <TaskCheckbox
                                        checked={task.completed}
                                        onChange={() => toggleTask(id, task.id)}
                                    /> */}
                                    ???
                                </td>
                            </tr>

                        )

                            : ""}
                    </tbody>
                </table>
            </div>

        </div>
    );
}