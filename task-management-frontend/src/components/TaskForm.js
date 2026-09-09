import { useState, useEffect } from "react";
import api from "../api/api";

export default function TaskForm() {
    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        status: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        api.post('/task')
            .then(res => setTaskForm(res.data.tasks))
            .catch(err => console.error(err))
    }, []);

    return (
        <div>
            <form>
                
            </form>
        </div>
    )
}