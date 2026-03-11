import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import {query, where} from 'firebase/firestore';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './Todo.css';
import { TodoInput } from '../TodoInput/TodoInput';
import { TodoList } from '../TodoList/TodoList';

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
        setTodos(prevtodos => [...prevtodos, { text: newTodo, completed: false, id: docRef.id }]);
        setNewTodo('');
    }

    // Delete a Todo
    const deleteTodo = async (id) => {
        console.log("Deleting:", id);
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
            <h1 className='title'>Todo</h1>
        </header>
        <div className='todo__container'>
            <TodoInput
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                addTodo={addTodo}
            />
            <TodoList 
                todos={todos}
                editId={editId}
                editText={editText}
                setEditText={setEditText}
                startEdit={startEdit}
                saveEdit={saveEdit}
                deleteTodo={deleteTodo}
                taskComplete={taskComplete}
            />
        </div>
        </>
    )
}

export default Todo;