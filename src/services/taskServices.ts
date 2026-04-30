import {collection, addDoc, deleteDoc, doc, updateDoc, query, where, onSnapshot, QuerySnapshot, DocumentData} from "firebase/firestore";

import { db } from "../lib/firebase";

import { TaskStatus } from "../types/Task";


export const subscribeToTasks = (
    teamId: string,
    callback: (snapshot: QuerySnapshot<DocumentData>) => void,
    onError: (err: unknown) => void) => {
    const q = query(
        collection(db, "tasks"),
        where("teamId", "==", teamId)
    );

    return onSnapshot(q, callback, onError);
};

export const addTask = async (
    uid: string,
    teamId:string,
    text: string,
    folderId: string | null) => {
    return await addDoc(collection(db, "tasks"), {
        text,
        teamId,
        folderId: folderId,
        status: "todo",
        createdBy:uid
    });
    
};

export const deleteTask = async (id: string) => {
    return await deleteDoc(doc(db, "tasks", id));
};

export const updateTaskText = async (id: string, text: string) => {
    return await updateDoc(doc(db, "tasks", id), {
        text
    });
};

export const updateTaskStatus = async (
    id: string, 
    status: "todo" | "in-progress" | "done") => {
    return await updateDoc(doc(db, "tasks", id), {
        status
    });
};

export const getNextStatus = (currentStatus:TaskStatus) : TaskStatus => {
    return currentStatus === "todo" 
    ? "in-progress"
    : currentStatus === "in-progress"
    ? "done"
    : "todo";
}