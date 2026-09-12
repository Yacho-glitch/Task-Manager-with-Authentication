import React, { useState } from 'react';
import api from '../api/api';
import "./../styles/Register.css";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/register', { name, email, password });
            alert("Registration successful!");
            window.location.href = "/login"; // redirect to login
        } catch (error) {
            alert("Registration failed!");
        }
    };

    return (
        <form className='register-form' onSubmit={handleRegister}>
            <h2>Register</h2>
            <input 
                type="text"
                className='register-input'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />

            <input 
                type="email"
                className='register-input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />

            <input 
                type="password"
                className='register-input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
            />

            <button className='register-button' type="submit">Register</button>
        </form>
    )
}