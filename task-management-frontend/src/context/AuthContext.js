import React, { createContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isAuthentication, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
    }, [token]);

    const login = (newToken) => setToken(newToken);
    const logout = () => setToken(null);

    return (
        <AuthContext.Provider value={{ token, isAuthentication, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}