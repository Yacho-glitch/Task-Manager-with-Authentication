import React, { useStatet } from "react";
import api from "../api/api";

export default function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.post("/tasks", { title, status: false });
        onTaskCreated(res.data);
        setTitle("");
    }

    return (
        <div>
            <form>
                
            </form>
        </div>
    )
}