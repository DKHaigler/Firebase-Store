import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import {query, where} from 'firebase/firestore';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './Todo.css';

const Todo = ({user}) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    // Fetch Todos from Firestore
    useEffect(() => {
        if (!user) return;
        
        const fetchTodos = async () => {
            const q = query(
                collection(db, "todos"),
                where("uid", "==", user.uid)
            )
            const querySnapshot = await getDocs(q);
            setTodos(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id})))
        };
        fetchTodos();
    }, [user]); // Only runs once

    // Add a new Todo
    const addTodo = async () => {
        if(!user) return;
        if (newTodo.trim() === '') return;
        const docRef = await addDoc(collection(db, "todos"), {
            text: newTodo,
            completed: false,
            uid: user.uid
        })
        setTodos([...todos, { text: newTodo, completed: false, id: docRef.id }]);
        setNewTodo('');
    }

    // Delete a Todo
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "todos", id));
        setTodos(todos.filter(todo => todo.id !== id))
    }

    // Start editing a todo
    const startEdit = (id, currentText) => {
        setEditId(id);
        setEditText(currentText);
    }

    // Save the edited todo
    const saveEdit = async (id) => {
        const docRef = doc(db, "todos", id);
        await updateDoc(docRef, {
            text: editText
        });
        setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editText } : todo))
        setEditId(null); // Exiting the edit mode
        setEditText(''); // Clearing the edit text
    }

    // Mark completed
    const taskComplete = async (id) => {
        const todoUpdate = todos.find(todo => todo.id === id);
        if (!todoUpdate) return;
        const flipped = !todoUpdate.completed;
        setTodos(todos.map(todo =>
            todo.id === id ?{...todo, completed: flipped } : todo
        ));
        const docRef = doc(db, "todos", id);
        await updateDoc(docRef, { completed: flipped });
        
    }

    return (
        <>
        <header className='header__title'>
            <h1>Todo</h1>
        </header>
        <div>
            <input type="text" value={newTodo} onChange={(event) => setNewTodo(event.target.value)}/>
            <button onClick={addTodo}>Add Todo</button>
        </div>
        <ul>
            {todos.map(todo => (
                <li key={todo.id} className='todo__container'>
                    {
                        editId === todo.id ? (
                            <>
                            <input 
                                type="text"
                                value={editText}
                                onChange={(event) => setEditText(event.target.value)}
                            />
                                <button className='save' onClick={() => saveEdit(editId, editText)}>Save</button>
                            </>
                        ) : (
                            <div className='todo-inner__container'>
                            <input type="checkbox" checked={todo.completed} onChange={() => taskComplete(todo.id)} />
                                <div className={todo.completed ? "completed": ""}>
                                {todo.text}
                                </div>
                                <div className='button__container'>
                                <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                                <button className='delete' onClick={() => deleteTodo(todo.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    }
                </li>
            ))}
        </ul>
        </>
    )
}

export default Todo;