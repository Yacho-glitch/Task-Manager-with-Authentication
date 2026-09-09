import { useState, useEffect } from "react";
import api from "../api/api";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get('/tasks')
            .then(res => setTasks(res.data.tasks))
            .catch(err => console.error(err))
    }, []);

    return (
        <div>
            <h2>My Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.status ? "✅ Done" : "⏳ Pending"}
                    </li>
                ))}
            </ul>
        </div>
    );
}