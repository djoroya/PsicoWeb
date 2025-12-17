const API_BASE = '/api';

const getHeaders = (token) => ({
    'Authorization': `Bearer ${token}`
});

export const fetchAllUsers = async (token) => {
    const res = await fetch(`${API_BASE}/admin/users`, {
        headers: getHeaders(token)
    });

    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }

    return res.json();
};

export const fetchAllTasks = async (token) => {
    const res = await fetch(`${API_BASE}/admin/tasks`, {
        headers: getHeaders(token)
    });

    if (!res.ok) {
        throw new Error('Failed to fetch all tasks');
    }

    return res.json();
};

export const approveUser = async (token, userId) => {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/approve`, {
        method: 'PUT',
        headers: getHeaders(token)
    });

    if (!res.ok) {
        throw new Error('Failed to approve user');
    }

    return res.json();
};

export const rejectUser = async (token, userId) => {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/reject`, {
        method: 'PUT',
        headers: getHeaders(token)
    });

    if (!res.ok) {
        throw new Error('Failed to reject user');
    }

    return res.json();
};

export const deleteUser = async (token, userId) => {
    const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });

    if (!res.ok) {
        throw new Error('Failed to delete user');
    }

    return res.json();
};
