import { useState } from 'react';
import { deleteTask, updateTaskText, updateTaskStatus, addTask, getNextStatus } from '../../services/taskServices';
import { addProject } from '../../services/projectService';
import './TasksPage.css';
import { TodoInput } from '../../features/tasks/components/TodoInput/TodoInput';
import { TodoList } from '../../features/tasks/components/TodoList/TodoList';
import { CustomButton } from '../../Components/UI/Button/Button'; 
import { useTasks } from '../../features/tasks/hooks/useTasks';
import { useProjects } from '../../hooks/useProjects';
import { useTeam } from '../../context/TeamContext';


type TodoProps = {
    user:any;
};

const TasksPage: React.FC<TodoProps> = ({user}) => {
    const {tasks, loading} = useTasks();
    const {projects} = useProjects();
    
    const [newTodo, setNewTodo] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const [error,setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "todo" | "in-progress" | "done">("all");
    const [newProject, setNewProject] = useState("");
    const [selectedProject, setSelectedProject] = useState<string | null>(null)
    const {activeTeamId} = useTeam();
    
    
    // Fetch Todos from Firestore
    
    
    // Add a new Todo
    const addTodo = async () => {
        try {
            
            if(!user || !activeTeamId) return;
            if (newTodo.trim() === '') return;
           
            await addTask(user.uid, activeTeamId, newTodo, selectedProject);
            setNewTodo('');
        } catch (err) {
            console.error(err)
            setError("Failed to add todo")
        }
        }

    // Delete a Todo
    const deleteTodo = async (id: string) => {
        try{
            await deleteTask(id)
            setDeleteId(null)
        } catch (err) {
            console.error(err)
            setError("failed to delete task")
        }

    }

    // Start editing a todo
    const startEdit = (id: string, text: string) => {
        setEditId(id);
        setEditText(text);
    }

    // Save the edited todo
    const saveEdit = async (id: string) => {
        try {
            await updateTaskText(id, editText)
            setEditId(null); // Exiting the edit mode
            setEditText(''); // Clearing the edit text
        } catch (err) {
            console.error(err)
            setError("Failed to save task")
        }
    }

    // Mark completed
    const taskComplete = async (id: string) => {
        try {

            const task = tasks.find(t => t.id === id);
            if (!task) return;

             const nextStatus = getNextStatus(task.status)
                

            await updateTaskStatus(id, nextStatus)
        } catch (err) {
            console.error(err)
            setError("Failed to update Task")
        }
        
    }

    // Filter todos
    const filteredTasks = tasks.filter(task => {
        const matchesProject =
            selectedProject === null || task.projectId === selectedProject;

        const matchesFilter =
            filter === "all" ? true : task.status === filter;

        return matchesProject && matchesFilter;
    })

    //Todo Counter
    const activeCount = tasks.filter(
        (task) => task.status !== "done"
    ).length;

    //Task Complete
    const hasCompleted = tasks.some(task => task.status === "done");

    //Delete Completed
    const clearCompleted = async () => {
        try {
                const completedTasks = tasks.filter(
                    task => task.status === "done"
                );
                await Promise.all(
                    completedTasks.map(task =>
                        deleteTask(task.id)
                    )
                )
            }
          catch (err) {
            console.error(err);
            setError("Failed to clear completed tasks")
        }
    }

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
                    addTodo={addTodo}
                    />
                <div className="filters">
                    <CustomButton 
                    label="All" 
                    hoverColor="white" 
                    onClick={() => setFilter("all")}
                    active={filter === "all"}
                    />

                    <CustomButton
                    label='Todo'
                    hoverColor='red'
                    onClick={() => setFilter("todo")}
                    active={filter === "todo"}
                    />

                    <CustomButton 
                    label="In-Progress" 
                    hoverColor="yellow" 
                    onClick={() => setFilter("in-progress")}
                    active={filter === "in-progress"}
                    />
                    <CustomButton 
                    label="Done" 
                    hoverColor="green" 
                    onClick={() => setFilter("done")}
                    active={filter === "done"}
                    />
                    </div>
                    <div className='tasks__container'>

                    <p>
                        {activeCount} {activeCount === 1 ? "task" : "tasks"} remaining
                    </p>
                    {hasCompleted && (
                        <CustomButton 
                        label="Clear Completed" 
                        hoverColor="Green" 
                        onClick={clearCompleted}
                        />
                    )}    
                </div>
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