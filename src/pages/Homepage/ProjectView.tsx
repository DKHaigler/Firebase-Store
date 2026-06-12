import { useNavigate } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";

export const ProjectView = () => {
    const { projects } = useProjects();
    const navigate = useNavigate();

    return (
        <div className="project__container">

            {projects.map((project) => (
                <div
                    key={project.id}
                    className="project-card"
                    onClick={() =>
                        navigate("/tasks", {
                            state: {
                                projectId: project.id,
                            },
                        })
                    }
                >
                    <h3>{project.name}</h3>
                </div>
            ))}

        </div>
    );
};