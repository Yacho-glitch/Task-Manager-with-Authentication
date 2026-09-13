import React from "react";
import api from "../api/api";
import "./../styles/TaskItem.css";

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
        <li className={`task-item ${task.status ? "done" : "pending"}`}>
            <span className="task-title">
                {task.title} {task.status ? "✅" : "⏳"}
            </span>
            <div className="task-actions">
                <button className="complete-btn" onClick={toggleStatus}>
                    {task.status ? "Undo" : "Complete"}
                </button>
                <button className="edit-btn" onClick={() => console.log("Edit feature coming soon")}>
                    Edit
                </button>
                <button className="delete-btn" onClick={deleteTask}>
                    Delete
                </button>
            </div>
        </li>
    );
}
