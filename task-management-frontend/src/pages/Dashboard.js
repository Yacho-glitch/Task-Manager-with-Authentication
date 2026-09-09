import React, { useState, useEffect } from "react";
import api from './../api/api';
import TaskForm from './../components/TaskForm';

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get('/tasks')
            .then(res => setTasks(res.data.tasks))
            .catch(err => console.log(err));
    }, []);

    const handleTaskCreated = (newTask) => {
        setTasks([...tasks, newTask]);
    }

    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.status ? "✅ Done" : "⌛ Pending"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;