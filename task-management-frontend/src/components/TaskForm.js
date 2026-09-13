import React, { useState } from "react";
import api from "../api/api";
import "./../styles/TaskForm.css";

export default function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.post("/tasks", { title, status: false });
        onTaskCreated(res.data);
        setTitle("");
    }

    return (
            <form className="task-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New task..."
                />
                <button type="submit">Add Task</button>
            </form>
    )
}