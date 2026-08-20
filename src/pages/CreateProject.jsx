import Page from "../components/layout/Page";
import ProjectForm from "../components/projects/ProjectForm";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProfileById } from "../api/profiles";
import { createProject } from "../api/projects";
import { DEV_USER_ID } from "../utils/auth";
import { showAlert } from "../components/ui/Alert";

import useSound from "use-sound";
import dingSound from "../sound/Ding.mp3";

const CREATE_DEFAULTS = {
    name: "New Project",
    description: "",
    color: "#ffd000",
    dueDate: "",
    status: "active",
    tasks: [],
};

export default function CreateProject() {
    const [authUserData, setAuthUserData] = useState(null);
    const [playDing] = useSound(dingSound);
    const navigate = useNavigate();

    useEffect(() => {
        getProfileById(DEV_USER_ID).then(setAuthUserData).catch(() => { });
    }, []);

    async function handleSubmit(values) {
        try {
            await createProject(values, authUserData?.id);
            showAlert("Project created successfully", "success");
            playDing();
            navigate("/projects");
        } catch {
            showAlert("Error creating project", "error");
        }
    }

    return (
        <Page>
            <ProjectForm
                title="Create a project"
                initialValues={CREATE_DEFAULTS}
                submitLabel="Create project"
                submittingLabel="Creating..."
                onSubmit={handleSubmit}
            />
        </Page>
    );
}
