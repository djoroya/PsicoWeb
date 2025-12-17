import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username'));

    const login = (authToken, authUsername) => {
        localStorage.setItem('token', authToken);
        localStorage.setItem('username', authUsername);
        setToken(authToken);
        setUsername(authUsername);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setToken(null);
        setUsername(null);
    };

    const isAuthenticated = !!token;

    return {
        token,
        username,
        isAuthenticated,
        login,
        logout
    };
};
