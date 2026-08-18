import Page from "../components/layout/Page";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

import { ChevronLeft } from "lucide-react";

import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";

import { useAppContext } from "../context/appContext";
import { showAlert } from "../components/ui/Alert";

export default function CreateProject() {
    const navigate = useNavigate();

    const [name, setName] = useState("New Project");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#ffd000");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("active");
    const [tasks, setTasks] = useState([]) //TODO: task

    const { projects } = useAppContext();

    const { addProject } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            name,
            description,
            color,
            dueDate,
            tasks,
            status
        };
        addProject(newProject) ? navigate("/projects") : showAlert("error", "Error");
        
    };

    return (
        <Page>
            <h3 className="font-bold text-2xl my-2">Create a project</h3>
            <form>
                <div className="mb-4">
                    <label htmlFor="project-name" className="block mb-1 font-medium">Project name: <span className="text-red-500">*</span></label>
                    <Input id="project-name" name="projectName" type="text" required value={name} onChange={e => setName(e.target.value)} />
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
                <div className="flex items-center gap-1">
                    <Link to="/projects"><Button variant="ghost" icon={<ChevronLeft size={18}/>}>Back</Button></Link>
                    <Button type="submit" variant="primary" onClick={handleSubmit}>Create Project</Button>
                </div>
            </form>


        </Page>
    );
}