const API_BASE = '/api';

const getHeaders = (token, includeContentType = false) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }

    return headers;
};

export const fetchTasks = async (token) => {
    const res = await fetch(`${API_BASE}/tasks`, {
        headers: getHeaders(token)
    });

    if (!res.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return res.json();
};

export const createTask = async (token, title) => {
    const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: getHeaders(token, true),
        body: JSON.stringify({ title })
    });

    if (!res.ok) {
        throw new Error('Failed to create task');
    }

    return res.json();
};

export const updateTask = async (token, taskId, updates) => {
    const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'PUT',
        headers: getHeaders(token, true),
        body: JSON.stringify(updates)
    });

    if (!res.ok) {
        throw new Error('Failed to update task');
    }

    return res.json();
};

export const deleteTask = async (token, taskId) => {
    const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });

    if (!res.ok) {
        throw new Error('Failed to delete task');
    }
};
