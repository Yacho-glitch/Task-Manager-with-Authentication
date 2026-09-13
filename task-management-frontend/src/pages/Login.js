import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "./../styles/Login.css";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { email, password });
            login(res.data.token);
            alert('Login successful!');
            // window.location.href = "/dashboard"; // redirect to dashboard
            navigate("/dashboard");

            console.log(res.data);
        } catch (err) {
            alert("Login failed!");
        }
    };

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input 
                type="email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input 
                type="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="login-button" type="submit">Login</button>
        </form>
    )
}