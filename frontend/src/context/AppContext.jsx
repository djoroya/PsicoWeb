import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    // Authentication state
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

    // Tasks state
    const [tasks, setTasks] = useState([]);

    // Error state
    const [error, setError] = useState('');

    // Load tasks when token changes
    useEffect(() => {
        if (token) {
            loadTasks();
        } else {
            setTasks([]);
        }
    }, [token]);

    // Authentication methods
    const login = async (username, password) => {
        try {
            const data = await loginUser(username, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('isAdmin', data.isAdmin || false);
            setToken(data.token);
            setUsername(data.username);
            setIsAdmin(data.isAdmin || false);
            setError('');
            return { success: true };
        } catch (err) {
            setError(err.message || 'Login failed');
            return { success: false, error: err.message };
        }
    };

    const register = async (username, password) => {
        try {
            await registerUser(username, password);
            setError('');
            return { success: true, message: 'Registration successful! Please login.' };
        } catch (err) {
            setError(err.message || 'Registration failed');
            return { success: false, error: err.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        setToken(null);
        setUsername(null);
        setIsAdmin(false);
        setTasks([]);
        setError('');
    };

    // Task methods
    const loadTasks = async () => {
        try {
            const data = await fetchTasks(token);
            setTasks(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch tasks');
        }
    };

    const addTask = async (title) => {
        if (!title.trim()) return;

        try {
            const newTask = await createTask(token, title);
            setTasks([...tasks, newTask]);
            setError('');
        } catch (err) {
            setError('Failed to add task');
        }
    };

    const toggleTask = async (task) => {
        try {
            const updated = await updateTask(token, task._id, { completed: !task.completed });
            setTasks(tasks.map(t => t._id === task._id ? updated : t));
            setError('');
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const removeTask = async (taskId) => {
        try {
            await deleteTask(token, taskId);
            setTasks(tasks.filter(t => t._id !== taskId));
            setError('');
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    const clearError = () => setError('');

    const value = {
        // Auth state
        token,
        username,
        isAuthenticated: !!token,
        isAdmin,

        // Tasks state
        tasks,

        // Error state
        error,

        // Auth methods
        login,
        register,
        logout,

        // Task methods
        addTask,
        toggleTask,
        removeTask,

        // Utility methods
        clearError
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
