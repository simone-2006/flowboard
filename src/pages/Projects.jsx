import Page from "../components/layout/Page";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Plus } from 'lucide-react';


import ProjectCard from "../components/projects/ProjectCard";
import { Search } from 'lucide-react'

import { Link } from "react-router-dom";

import { listProjects } from "../api/projects";
import { useEffect, useState } from "react";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        listProjects()
            .then(setProjects)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

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

                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-2xl my-2 text-black dark:text-white">Projects</h3>
                    <Link to="/createproject">
                        <Button
                            variant="ghostPrimary"
                            icon={<Plus size={18} />}
                        >
                            Create new project
                        </Button>
                    </Link>
                </div>

                <Input
                    icon={<Search size={18} />}
                    placeholder="Search or filter projects..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    type="search"
                />
            </div>

            {loading && <p className="text-sm text-gray-500 mb-2">Loading...</p>}
            {error && <p className="text-sm text-red-600 mb-2">Could not load projects.</p>}

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
                        onDeleted={(projectId) =>
                            setProjects((prev) => prev.filter((item) => item.id !== projectId))
                        }
                    />
                )}
            </div>
        </Page>
    )
}
