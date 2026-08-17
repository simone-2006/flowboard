import Page from "../components/layout/Page";
import ProjectCard from "../components/projects/ProjectCard";
import { useAppContext } from "../context/appContext";

export default function Projects() {
    const { projects } = useAppContext();

    return (
        <Page title="Projects">
            <div className="grid grid-cols-1 gap-6">
                {projects.map(project =>
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        name={project.name}
                        description={project.description}
                        color={project.color}
                        manager={project.manager}
                        tasks={project.tasks}
                        dueDate={project.dueDate}
                        status={project.status}
                    />
                )}
            </div>
        </Page>
    )
}