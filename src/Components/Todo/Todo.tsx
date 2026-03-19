import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import {query, where} from 'firebase/firestore';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './Todo.css';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoList } from '../TodoList/TodoList';
import { CustomButton } from '../Button/Button';
import { writeBatch } from 'firebase/firestore';


type TodoProps = {
    user:any;
};

type TodoItem = {
    id: string;
    text: string;
    completed: boolean;
    uid?: string;
}
const Todo: React.FC<TodoProps> = ({user}) => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")


    // Fetch Todos from Firestore
    useEffect(() => {

        if (!user) {
            setLoading(false);
            return;
        }
        const fetchTodos = async () => {
                try {
                const q = query(
                    collection(db, "todos"),
                    where("uid", "==", user.uid)
                );
                const querySnapshot = await getDocs(q);
                setTodos(querySnapshot.docs.map(doc => ({ 
                    ...(doc.data() as Omit<TodoItem, "id">),
                     id: doc.id})))
            } catch (err) {
                console.error(err);
                setError("Failed to load todos");
            } finally {
                setLoading(false);
            }
        };
            fetchTodos();
    }, [user]); // Only runs once

    // Add a new Todo
    const addTodo = async () => {
        try {

            if(!user) return;
            if (newTodo.trim() === '') return;
            const docRef = await addDoc(collection(db, "todos"), {
                text: newTodo,
                completed: false,
                uid: user.uid
            })
            setTodos(prevtodos => [...prevtodos, { text: newTodo, completed: false, id: docRef.id }]);
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
            await deleteDoc(doc(db, "todos", id));
            setError(null);
            setTodos(prevTodos => 
                prevTodos.filter(todo => todo.id !== id)
            )
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
            const docRef = doc(db, "todos", id);
            await updateDoc(docRef, {
                text: editText
            });
            setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editText } : todo))
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

            const todoUpdate = todos.find(todo => todo.id === id);
            if (!todoUpdate) return;
            const flipped = !todoUpdate.completed;
            setTodos(todos.map(todo =>
                todo.id === id ?{...todo, completed: flipped } : todo
            ));
            const docRef = doc(db, "todos", id);
            await updateDoc(docRef, { completed: flipped });
        } catch (err) {
            console.error(err)
            setError("Failed to mark complete")
        }
        
    }

    // Filter todos
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    })

    //Todo Counter
    const activeCount = todos.filter(todo => !todo.completed).length;

    //Delete Completed
    const clearCompleted = async () => {
        try {
            const completedTodo = todos.filter(todo => todo.completed);
            for (const todo of completedTodo) {
                await deleteDoc(doc(db, "todos", todo.id))
            }
            
            setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
        }   catch (err) {
            console.error(err);
            setError("Failed to clear completed todos")
        }
    }

    const hasCompleted = todos.some(todo => todo.completed);

    //Loading Screen
    if (loading) {
            return <p>Loading todos...</p>
        }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
        <header className='header__title'>
            <h1 className='title'>Todo</h1>
        </header>
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
        </>
        
    )
}

export default Todo;