import React, { useState, useEffect } from "react";
import api from './../api/api';
import TaskForm from './../components/TaskForm';
import TaskItem from "./../components/TaskItem";
// import TaskList from './../components/TaskList';

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks when page loads
    useEffect(() => {
        api.get('/tasks')
            .then(res => setTasks(res.data.tasks))
            .catch(err => console.log(err));
    }, []);

    const handleTaskCreated = (newTask) => {
        setTasks([...tasks, newTask]);
    }

    const handleTaskUpdate = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    }

    const handleTaskDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <ul>
                {tasks.map(task => (
                    <TaskItem 
                        key={task.id}
                        task={task}
                        onTaskUpdated={handleTaskUpdate}
                        onTaskDeleted={handleTaskDelete}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;