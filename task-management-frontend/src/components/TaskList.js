import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onTaskUpdated, onTaskDelete }) {
    return (
        <ul>
            {tasks.map(task => (
                <TaskItem 
                    key={task.id}
                    task={task}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDelete}
                />
            ))}
        </ul>
    )
}

export default TaskList;