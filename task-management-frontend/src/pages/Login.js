import React, { useState } from "react";
import api from "../api/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogic = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { email, password });
            localStorage.setItem('token', res.data.token);
            alert('Login successful!');
        } catch (err) {
            alert("Login failed!");
        }
    }

    return (
        <form onSubmit={handleLogic}>
            <h2>Login</h2>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    )
}