import {collection, addDoc, deleteDoc, doc, updateDoc, query, where, onSnapshot} from "firebase/firestore";

import { db } from "../lib/firebase";



export const subscribeToTodos = (teamId: string, callback: any, onError: any) => {
    const q = query(
        collection(db, "todos"),
        where("teamId", "==", teamId)
    );

    return onSnapshot(q, callback, onError);
};

export const addTodo = async (uid: string, teamId:string, text: string, folderId: string | null) => {
    return await addDoc(collection(db, "todos"), {
        text,
        completed: false,
        uid,
        teamId,
        folderId: folderId ?? null
        
    });
    
};

export const deleteTodo = async (id: string) => {
    return await deleteDoc(doc(db, "todos", id));
};

export const updateTodoText = async (id: string, text: string) => {
    return await updateDoc(doc(db, "todos", id), {
        text
    });
};

export const toggleTodoComplete = async (id: string, completed: boolean) => {
    return await updateDoc(doc(db, "todos", id), {
        completed
    });
};

export const clearCompletedTodos = async (todos: any[]) => {
    const promises = todos
        .filter(t => t.completed)
        .map(t => deleteDoc(doc(db, "todos", t.id)));

    return Promise.all(promises);
};