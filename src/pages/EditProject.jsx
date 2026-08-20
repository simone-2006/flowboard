import Page from "../components/layout/Page";
import ProjectForm from "../components/projects/ProjectForm";
import Button from "../components/ui/Button";

import { ChevronLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { showAlert } from "../components/ui/Alert";
import { getProfileById } from "../api/profiles";
import { updateProject, listProjects } from "../api/projects";
import { DEV_USER_ID } from "../utils/auth";

function toDateInputValue(value) {
    if (!value) return "";
    return String(value).slice(0, 10);
}

export default function EditProject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [authUserData, setAuthUserData] = useState(null);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfileById(DEV_USER_ID).then(setAuthUserData).catch(() => { });
    }, []);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        listProjects(id)
            .then((projects) => {
                if (!isMounted) return;
                const loaded = Array.isArray(projects) ? projects[0] : projects;
                if (!loaded) {
                    setLoading(false);
                    showAlert("Project not found", "error");
                    return;
                }
                setProject({
                    name: loaded.name ?? "",
                    description: loaded.description ?? "",
                    color: loaded.color || "#ffd000",
                    dueDate: toDateInputValue(loaded.dueDate),
                    status: loaded.status || "active",
                    tasks: (loaded.tasks ?? []).map((task) => ({
                        ...task,
                        dueDate: toDateInputValue(task.dueDate),
                    })),
                });
                setLoading(false);
            })
            .catch(() => {
                if (!isMounted) return;
                setLoading(false);
                showAlert("Error loading project", "error");
            });

        return () => {
            isMounted = false;
        };
    }, [id]);

    async function handleSubmit(values) {
        try {
            await updateProject({ id, ...values }, authUserData?.id);
            showAlert("Project updated!", "success");
            navigate("/projects");
        } catch (e) {
            showAlert("Save failed: " + String(e), "error");
        }
    }

    if (loading) {
        return (
            <Page>
                <div className="flex items-center justify-between gap-2">
                    <Link to="/projects">
                        <Button variant="ghost" icon={<ChevronLeft size={18} />}>Back</Button>
                    </Link>
                </div>
                <h1 className="font-bold text-2xl my-2 text-black dark:text-white">Edit project</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Loading project...</p>
            </Page>
        );
    }

    if (!project) {
        return (
            <Page>
                <div className="flex items-center justify-between gap-2">
                    <Link to="/projects">
                        <Button variant="ghost" icon={<ChevronLeft size={18} />}>Back</Button>
                    </Link>
                </div>
                <h1 className="font-bold text-2xl my-2 text-black dark:text-white">Edit project</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Project not found.</p>
            </Page>
        );
    }

    return (
        <Page>
            <ProjectForm
                key={id}
                title="Edit project"
                subtitle={project.name}
                initialValues={project}
                submitLabel="Save changes"
                submittingLabel="Saving..."
                onSubmit={handleSubmit}
            />
        </Page>
    );
}
