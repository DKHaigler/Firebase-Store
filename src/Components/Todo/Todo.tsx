import { useState } from 'react';
import { addTodo as addTodoService, deleteTodo as deleteTodoService, updateTodoText, toggleTodoComplete, clearCompletedTodos } from '../../services/todoServices';
import './Todo.css';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoList } from '../TodoList/TodoList';
import { CustomButton } from '../Button/Button';
import { useTodos } from '../../hooks/useTodos';
import { useFolders } from '../../hooks/useFolders';


type TodoProps = {
    user:any;
};

const Todo: React.FC<TodoProps> = ({user}) => {
    const {todos, loading} = useTodos(user);
    const {folders, addFolder} = useFolders(user);
    const [newTodo, setNewTodo] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const [error,setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const [newFolder, setNewFolder] = useState("");
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

    // Fetch Todos from Firestore

    // Add a new Todo
    const addTodo = async () => {
        try {

            if(!user) return;
            if (newTodo.trim() === '') return;

            await addTodoService(user.uid, newTodo, selectedFolder);
            setNewTodo('');
        } catch (err) {
            console.error(err)
            setError("Failed to add todo")
        }
        }

    // Delete a Todo
    const deleteTodo = async (id: string) => {
        try{

            console.log("Deleting:", id);
            await deleteTodoService(id)
            setError(null);
            setDeleteId(null)
        } catch (err) {
            console.error(err)
            setError("failed to delete todo")
        }

    }

    // Start editing a todo
    const startEdit = (id: string, currentText: string) => {
        setEditId(id);
        setEditText(currentText);
    }

    // Save the edited todo
    const saveEdit = async (id: string) => {
        try {
            await updateTodoText(id, editText)
            setEditId(null); // Exiting the edit mode
            setEditText(''); // Clearing the edit text
        } catch (err) {
            console.error(err)
            setError("Failed to save todo")
        }
    }

    // Mark completed
    const taskComplete = async (id: string) => {
        try {

            const todoUpdate = todos.find(t => t.id === id);
            if (!todoUpdate) return;
            await toggleTodoComplete(id, !todoUpdate.completed)
        } catch (err) {
            console.error(err)
            setError("Failed to mark complete")
        }
        
    }

    // Filter todos
    const filteredTodos = todos.filter(todo => {
        if (selectedFolder === null) {
        return !todo.folderId;
        } 
        if (todo.folderId !== selectedFolder) return false;
        

        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    })

    //Todo Counter
    const activeCount = filteredTodos.filter(todo => !todo.completed).length;

    //Delete Completed
    const clearCompleted = async () => {
        try {
                await clearCompletedTodos(filteredTodos);
            }
          catch (err) {
            console.error(err);
            setError("Failed to clear completed todos")
        }
    }

    const hasCompleted = filteredTodos.some(todo => todo.completed);

    // Add Folder
    const handleAddFolder = async () => {
  if (!user) return;
  if (!newFolder.trim()) return;

  try {
    await addFolder(user.uid, newFolder);
    setNewFolder("");
  } catch (err) {
    console.error(err);
    setError("Failed to add folder");
  }
};

    //Loading Screen
    if (loading) {
            return <p>Loading todos...</p>
        }
    if (error) {
        return <p>{error}</p>
    }

    

    return (
    <div className='app-layout'>
        <header className='header__title'>
            <h1 className='title'>Todo</h1>
        </header>
             <div className='sidebar'>
                <h3>Folders</h3>
                <CustomButton
                onClick={() => setSelectedFolder(null)}
                label='Inbox'
                hoverColor='white'
                />
                
              {folders.map(folder => (
                  <CustomButton
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  label={folder.name}
                  hoverColor='white'
                />
                
                ))}
                <input 
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                    placeholder='New Folder'
                />

                <CustomButton
                hoverColor='green'
                onClick={handleAddFolder}
                label='Add Folder'
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
                    hoverColor="Yellow" 
                    onClick={() => setFilter("all")}
                    active={filter === "all"}
                    />

                    <CustomButton 
                    label="Active" 
                    hoverColor="Red" 
                    onClick={() => setFilter("active")}
                    active={filter === "active"}
                    />
                    <CustomButton 
                    label="Completed" 
                    hoverColor="Green" 
                    onClick={() => setFilter("completed")}
                    active={filter === "completed"}
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
                {filteredTodos.length === 0 && (
                  <p className="empty-state">
                    {selectedFolder === null
                      ? filter === "active"
                        ? "No active tasks"
                        : filter === "completed"
                        ? "No completed tasks"
                        : "No tasks yet, add one above"
                      : "No tasks in this folder yet, add one above"}
                  </p>
                )}
                {filteredTodos.length > 0 && (

                    <TodoList 
                    filteredTodos={filteredTodos}
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
                <p>Are you sure you want to delete this todo?</p>
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

export default Todo;