import React, { useContext, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { email, password });
            login(res.data.token);
            alert('Login successful!');
            window.location.href = "/dashboard"; // redirect to dashboard
        } catch (err) {
            alert("Login failed!");
        }
    };

    return (
        <form onSubmit={handleLogin}>
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