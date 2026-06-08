import { useState, useEffect } from 'react';
import { addProject } from '../../services/projectService';
import './TasksPage.css';
import { TodoInput } from '../../features/tasks/components/TodoInput/TodoInput';
import { TodoList } from '../../features/tasks/components/TodoList/TodoList';
import { CustomButton } from '../../Components/UI/Button/Button'; 
import { useTasks } from '../../features/tasks/hooks/useTasks';
import { useProjects } from '../../hooks/useProjects';
import { useTeam } from '../../context/TeamContext';
import { TasksStats } from '../../features/tasks/components/TaskStats';
import { TasksFilter } from '../../features/tasks/components/TaskFilters';
import { useTaskActions } from '../../features/tasks/hooks/useTasksActions';
import { getMembersByTeam } from '../../services/membersService';
import { Member } from '../../types/Members';

type TodoProps = {
    user:any;
};

const TasksPage: React.FC<TodoProps> = ({user}) => {
    const {tasks, loading} = useTasks();
    const {projects} = useProjects();
    const [members, setMembers] = useState<Member[]>([]);
    
    const [newTodo, setNewTodo] = useState("");
    const [dueDate, setDueDate] = useState("")
    const [editId, setEditId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const [error,setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "todo" | "in-progress" | "done">("all");
    const [newProject, setNewProject] = useState("");
    const [selectedProject, setSelectedProject] = useState<string | null>(null)
    const {activeTeamId} = useTeam();
    const { addTodo, deleteTodo, saveEdit, taskComplete, clearCompleted, error: actionError,} = useTaskActions({ user, activeTeamId, tasks,});
    const [ assignedTo, setAssignedTo ] = useState<string>("")
    

    // Start editing a todo
    const startEdit = (id: string, text: string) => {
        setEditId(id);
        setEditText(text);
    }

    // Filter todos
    const filteredTasks = tasks.filter(task => {
        const matchesProject =
            selectedProject === null || task.projectId === selectedProject;

        const matchesFilter =
            filter === "all" ? true : task.status === filter;

        return matchesProject && matchesFilter;
    })

    // Add Project
    const handleAddProject = async () => {
        try {
          if (!activeTeamId || !newProject.trim()) return;
            await addProject(activeTeamId, newProject, user.uid);
            setNewProject("");
          } catch (err) {
            console.error(err);
            setError("Failed to add project");
          }
        };
    
    useEffect(() => {
      if (!activeTeamId) return;
        
      const loadMembers = async () => {
        try {
          const teamMembers = await getMembersByTeam(activeTeamId);
          setMembers(teamMembers);
        } catch (err) {
          console.error(err);
        }
      };
    
      loadMembers();
    }, [activeTeamId]);

    console.log(members);
        //Loading Screen
        if (loading) {
                return <p>Loading tasks...</p>
            }
        if (error) {
            return <p>{error}</p>
        }

    return (        
    <div className='app-layout'>
        
             <div className='sidebar'>
                <h3>Projects</h3>
                <CustomButton
                    onClick={() => setSelectedProject(null)}
                    label='All'
                    hoverColor='white'
                />
                
              {projects.map(project => (
                <CustomButton
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  label={project.name}
                  hoverColor='white'
                />
                
                ))}
                <input 
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    placeholder='New Project'
                />

                <CustomButton
                    hoverColor='green'
                    onClick={handleAddProject}
                    label='Add Project'
                />  
            </div>
        <div className='main-content'>
                
            <div className='todo__container'>
                <TodoInput
                    newTodo={newTodo}
                    setNewTodo={setNewTodo}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    addTodo={addTodo}
                    selectedProject={selectedProject}
                    assignedTo={assignedTo}
                    setAssignedTo={setAssignedTo}
                    members={members}
                />
                <TasksFilter
                    filter={filter}
                    setFilter={setFilter}
                />
                <TasksStats
                    tasks={tasks}
                    clearCompleted={clearCompleted}
                />
                  {filteredTasks.length === 0 && (
                <p className="empty-state">
                  No tasks here yet
                </p>
                  )}
                    {filteredTasks.length > 0 && (

                <TodoList 
                    filteredTasks={filteredTasks}
                    editId={editId}
                    editText={editText}
                    setEditText={setEditText}
                    startEdit={startEdit}
                    saveEdit={saveEdit}
                    deleteTodo={deleteTodo}
                    taskComplete={taskComplete}
                    setDeleteId={setDeleteId}
                />
                )}

            </div>
        </div>
        {deleteId !== null && (
            <div className="delete-modal">
                <p>Are you sure you want to delete this task?</p>
                <CustomButton 
                    label="Cancel" 
                    hoverColor="Green" 
                    onClick={() => setDeleteId(null)}
                />
                <CustomButton 
                    label="Delete" 
                    hoverColor="Red" 
                    onClick={() => deleteTodo(deleteId)}
                />
            </div>
        )}
    </div>
        
    )
}

export default TasksPage;