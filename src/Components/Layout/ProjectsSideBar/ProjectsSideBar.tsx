import { CustomButton } from "../../UI/Button/Button";
import { Project } from "../../../types/Project";
import "./ProjectsSideBar.css";

type ProjectsSidebarProps = {
  projects: Project[];
  selectedProject: string | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<string | null>>;
  newProject: string;
  setNewProject: React.Dispatch<React.SetStateAction<string>>;
  handleAddProject: () => Promise<void>;
  className?: string;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProjectsSidebar = ({
  projects,
  selectedProject,
  setSelectedProject,
  newProject,
  setNewProject,
  handleAddProject,
  className,
  setSidebarOpen
}: ProjectsSidebarProps) => {
  return (
    <div className={className ? className : "sidebar"}>
      <button className="sidebar-close" onClick={() => setSidebarOpen?.(false)}>
        ✕
      </button>

      <h3>Projects</h3>

      <CustomButton
        label="All"
        hoverColor="white"
        active={selectedProject === null}
        onClick={() => setSelectedProject(null)}
      />

      <div className="project-list">
        {projects.map((project) => (
          <CustomButton
            key={project.id}
            label={project.name}
            hoverColor="white"
            active={selectedProject === project.id}
            onClick={() => setSelectedProject(project.id)}
          />
        ))}
      </div>

      <input
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
        placeholder="New Project"
      />

      <CustomButton
        hoverColor="green"
        onClick={handleAddProject}
        label="Add Project"
      />

    </div>
  );
};