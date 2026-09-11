import { useState, useEffect } from "react";
import api from "../api/api";

export default function useTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get('/tasks')
            .then(res => setTasks(res.data.tasks))
            .catch(err => console.error(err));
    }, []);

    const addTask = async (taskData) => {
        const res = await api.post('/tasks', taskData);
        setTasks([...tasks, res.data]);
    };

    const updateTask = async (id, updatedData) => {
        const res = await api.put(`/tasks/${id}`, updatedData);
        setTasks(tasks.map(t => t.id === id ? res.data : t));
    };

    const deleteTask = async (id) => {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter(t => t.id !== id));
    };

    return { tasks, addTask, updateTask, deleteTask };
}