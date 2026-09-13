import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from './../context/AuthContext';
import "./../styles/Navbar.css";

function Navbar() {
    const { logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="logo">Task Manager</div>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
                {!isAuthenticated && <li><Link to="/register">Register</Link></li>}
                {isAuthenticated && (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;