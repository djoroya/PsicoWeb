import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export const useTasks = (token) => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) {
            loadTasks();
        }
    }, [token]);

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

    return {
        tasks,
        error,
        addTask,
        toggleTask,
        removeTask
    };
};
