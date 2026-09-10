import React from "react";
import api from "../api/api";

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const toggleStatus = async () => {
        const res = await api.put(`/tasks/${task.id}`, { ...task, status: !task.status });
        onTaskUpdated(res.data);
    };

    const deleteTask = async () => {
        await api.delete(`/tasks/${task.id}`);
        onTaskDeleted(task.id);
    };

    return (
        <li>
            {task.title} - {task.status ? "✅ Done" : "⌛ Pending"}
            <button onClick={toggleStatus}>Toggle</button>
            <button onClick={deleteTask}>Delete</button>
        </li>
    )
}