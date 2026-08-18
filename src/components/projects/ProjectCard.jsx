import Button from "../ui/Button";
import Input from "../ui/Input";
import TaskCheckbox from "./TaskCheckbox";
import TaskCompletionProgressBar from "../ui/TaskCompletionProgressBar";
import ProjectStatusChip from "./ProjectStatusChip";


import { useContext, useState } from "react";
import { Trash, SquarePen, Plus, Minus, X } from 'lucide-react';

import { useAppContext } from "../../context/appContext";

import { showAlert } from "../ui/Alert";
import { formatDateGGMMAAAA, getNow } from "../../utils/functions";


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
    {/* AUTH USER + USER ACTIVITIES */ }
    const { authUserData } = useAppContext();
    const { createUserActivity } = useAppContext()

    const totalTask = tasks.length;
    const taskCompleted = tasks.filter(task => task.completed).length;
    const taskTodo = tasks.filter(task => !task.completed).length;
    const tasksPercentage = totalTask === 0 ? 0 : ((100 * taskCompleted) / totalTask).toFixed(0);


    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDue, setNewTaskDue] = useState("");

    const handleOpenAddTask = () => {
        addTaskOpen ? setAddTaskOpen(false) : setAddTaskOpen(true)
    };

    const { toggleTask } = useAppContext();

    const handleToggleTask = (taskID) => {
        {/* Funzione per fare il toggle tra completata e non */ }
        toggleTask(id, taskID) === "completed"
            ? createUserActivity(authUserData.id, id, taskID, "Completed a task", getNow())
            : ""
    }


    const { addTaskToProject } = useAppContext();
    function handleAddTask() {
        if (addTaskToProject(id, newTaskName, newTaskDue)) {
            createUserActivity(authUserData.id, id, "", `Created a new task: ${newTaskName}`, getNow())

            setAddTaskOpen(false)
            setNewTaskName("")
            setNewTaskDue("")
        }
    }

    const { deleteTask } = useAppContext();
    function handleDeleteTask(taskID) {
        if (deleteTask(id, taskID)) {
            createUserActivity(authUserData.id, id, taskID, `Deleted a task`, getNow())
        }
    }

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

                        if (creatorID === authUserData.id) {
                            return <span className="ml-1">you ({creator.name} {creator.surname})</span>;
                        }

                        // console.log(authUserData.id)
                        return creator
                            ? <span className="ml-1">{creator.name} {creator.surname}</span>
                            : <span className="ml-1 text-gray-400">Unknown</span>;
                    })()}
                </span>
                <span>
                    <span className="font-medium">Due: </span>
                    <span className="">{dueDate ? (() => {
                        return formatDateGGMMAAAA(dueDate)
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
                                <th className="text-left px-2 py-1 rounded-r">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr
                                    key={task.id}
                                    className={`group hover:bg-blue-50 border-b border-gray-200 transition-colors ${task.completed ? " bg-green-200/60" : ""}`}
                                >
                           
                                    <td className="px-2 py-1 font-medium text-gray-900">{task.title}</td>
                                    <td className="px-2 py-1">
                                        {task.dueDate
                                            ? (() => {
                                                return formatDateGGMMAAAA(task.dueDate)
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
                                        <div className="flex justify-start">
                                            <TaskCheckbox
                                                checked={task.completed}
                                                onChange={() => handleToggleTask(task.id)}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-2 py-1">
                                        <button
                                            className="text-red-600 cursor-pointer" title="Delete task"
                                            onClick={() => handleDeleteTask(task.id)}
                                        >
                                            <X size={18} />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            {addTaskOpen && (
                                <tr className="bg-yellow-50 border-b border-gray-200 animate-fade-in">
                                    <td className="px-2 py-0.5"><Input placeholder="Task title..." onChange={e => setNewTaskName(e.target.value)} value={newTaskName} /></td>
                                    <td className="px-2 py-0.5"><Input type="date" onChange={e => setNewTaskDue(e.target.value)} value={newTaskDue} /></td>
                                    <td></td>
                                    <td className="px-2 py-0.5 flex justify-start items-center">
                                        <Button onClick={handleAddTask}>
                                            Add
                                        </Button>
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