{/*
    ==================================== TODO =============================================
    Per ora è solo una copia di create project
*/}

import Page from "../components/layout/Page";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import TaskCheckbox from "../components/projects/TaskCheckbox";

import { ChevronLeft, Plus, Minus, X } from "lucide-react";

import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";

import { useAppContext } from "../context/appContext";
import { showAlert } from "../components/ui/Alert";

import { getNow } from "../utils/functions";

export default function EditProject() {
    {/* AUTH USER + USER ACTIVITIES */ }
    const { authUserData } = useAppContext();
    const { createUserActivity } = useAppContext()

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const [tasks, setTasks] = useState([]);

    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDue, setNewTaskDue] = useState("");

    const handleOpenAddTask = () => {
        addTaskOpen ? setAddTaskOpen(false) : setAddTaskOpen(true)
    };

    function handleAddTask() {
        if (newTaskName === "") {
            showAlert("Error task name can't be empty", "error")
            return
        }
        if (newTaskDue === "") {
            showAlert("Error task due date can't be empty", "error")
            return
        }

        setTasks(prev => [
            ...prev,
            {
                id: prev.length > 0 ? Math.max(...prev.map(t => t.id)) + 1 : 1,
                title: newTaskName,
                dueDate: newTaskDue,
                completed: false
            }
        ]);
        setAddTaskOpen(false)
        setNewTaskName("")
        setNewTaskDue("")
    }

    function handleDeleteTask(taskID) {
        setTasks(prev => prev.filter(task => task.id !== taskID))
    }

    function handleToggleTask(taskID) {
        setTasks(prev =>
            prev.map(task =>
                task.id !== taskID
                    ? task
                    : { ...task, completed: !task.completed }
            )
        )
    }



    return (
        <Page>
            <h3 className="font-bold text-2xl my-2">Edit project (project name)</h3>
            <form>
                <div className="mb-4">
                    <label htmlFor="project-name" className="block mb-1 font-medium">Project name: </label>
                    <Input id="project-name" name="projectName" type="text" required value={name} onChange={e => setName(e.target.value)} disabled/>
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-1 font-medium">Description:</label>
                    <Input id="description" name="description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="mb-4 flex items-center gap-2">
                    <label htmlFor="color" className="block mb-1 font-medium">Color:</label>
                    <div className="flex">
                        <input
                            id="color"
                            name="color"
                            type="color"
                            className="hidden"
                            onChange={e => {
                                setColor(e.target.value);
                            }}
                            value={color}
                        />
                        <label htmlFor="color" className="cursor-pointer">
                            <div className="w-6 h-6 border border-gray-300" style={{ backgroundColor: color }}></div>
                        </label>
                    </div>

                </div>
                <div className="mb-4">
                    <label htmlFor="due-date" className="block mb-1 font-medium">Due date:</label>
                    <Input id="due-date" name="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block mb-1 font-medium">Status:</label>
                    <Select id="status" name="status" required value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="active">Active</option>
                        <option value="planning">Planning</option>
                    </Select>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 mt-2 mb-4 border border-gray-100 shadow-sm">
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
                        <table className="w-full text-sm border-separate border-spacing-y-1 table-fixed">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="w-1/4 text-left px-2 py-1 rounded-l">Title</th>
                                    <th className="w-1/4 text-left px-2 py-1">Due date</th>
                                    <th className="w-1/4 text-left px-2 py-1 rounded-r">Completed</th>
                                    <th className="w-1/4 text-left px-2 py-1 rounded-r">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <tr key={task.id} className="group hover:bg-blue-50 border-b border-gray-200 transition-colors">
                                        <td className="w-1/4 px-2 py-1 font-medium text-gray-900">{task.title}</td>
                                        <td className="w-1/4 px-2 py-1">
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
                <div className="flex items-center gap-1">
                    <Link to="/projects"><Button variant="ghost" icon={<ChevronLeft size={18} />}>Back</Button></Link>
                    <Button type="submit" variant="primary" >Create Project</Button>
                </div>
            </form>


        </Page>
    );
}