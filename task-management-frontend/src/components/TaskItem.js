import React, { useState } from "react";
import api from "../api/api";
import "./../styles/TaskItem.css";

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    
    const toggleStatus = async () => {
        const res = await api.put(`/tasks/${task.id}`, { ...task, status: !task.status });
        onTaskUpdated(res.data);
    };

    const deleteTask = async () => {
        await api.delete(`/tasks/${task.id}`);
        onTaskDeleted(task.id);
    };

    const saveEdit = async () => {
        const res = await api.put(`/tasks/${task.id}`, { ...task, title: newTitle });
        onTaskUpdated(res.data);
        setIsEditing(false);
    }

    return (
        <li className={`task-item ${task.status ? "done" : "pending"}`}>
            {isEditing ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="edit-input"
                />
            ) : (
                <span className="task-title">
                    {task.title} {task.status ? "✅" : "⏳"}
                </span>
            )}

            <div className="task-actions">
                <button className="complete-btn" onClick={toggleStatus}>
                    {task.status ? "Undo" : "Complete"}
                </button>

                {isEditing ? (
                    <button className="edit-btn" onClick={saveEdit}>Save</button>
                ) : (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                )}

                <button className="delete-btn" onClick={deleteTask}>Delete</button>
            </div>
        </li>
    );
}
