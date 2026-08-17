import Page from "../components/layout/Page";
import Input from "../components/ui/Input";
import ProjectCard from "../components/projects/ProjectCard";
import { Search } from 'lucide-react'

import { useAppContext } from "../context/appContext";
import { useState } from "react";

export default function Projects() {
    const { projects } = useAppContext();
    const [filter, setFilter] = useState("");

    const query = filter.trim().toLowerCase();

    const filteredProjects = query === ""
        ? projects
        : projects.filter((project) =>
            project.name.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.status.toLowerCase().includes(query)
        );

    return (
        <Page>
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-2xl my-2">Projects</h3>
                <Input
                    icon={<Search size={18} />}
                    placeholder="Search or filter projects..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    type="search"
                />
            </div>

            <div className="grid grid-cols-1 gap-6">
                {filteredProjects.map(project =>
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        name={project.name}
                        description={project.description}
                        color={project.color}
                        creatorID={project.creatorID}
                        tasks={project.tasks}
                        dueDate={project.dueDate}
                        status={project.status}
                    />
                )}
            </div>
        </Page>
    )
}
