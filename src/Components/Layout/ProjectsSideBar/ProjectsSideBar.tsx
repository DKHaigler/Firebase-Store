import { CustomButton } from "../../UI/Button/Button";
import { Project } from "../../../types/Project";
import './ProjectsSideBar.css'

type ProjectsSidebarProps = {
  projects: Project[];
  selectedProject: string | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<string | null>>;
  newProject: string;
  setNewProject: React.Dispatch<React.SetStateAction<string>>;
  handleAddProject: () => Promise<void>;
};

export const ProjectsSidebar = ({
  projects,
  selectedProject,
  setSelectedProject,
  newProject,
  setNewProject,
  handleAddProject,
}: ProjectsSidebarProps) => {
  return (
    <div className="sidebar">
      <h3>Projects</h3>

      <CustomButton
          label="All"
          hoverColor="white"
          active={selectedProject === null}
          className="project-item"
          onClick={() => setSelectedProject(null)}
        />
        
        {projects.map((project) => (
          <CustomButton
            key={project.id}
            label={project.name}
            hoverColor="white"
            active={selectedProject === project.id}
            className="project-item"
            onClick={() => setSelectedProject(project.id)}
          />
        ))}

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