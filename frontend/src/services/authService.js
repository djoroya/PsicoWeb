const API_BASE = '/api';

export const loginUser = async (username, password) => {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Login failed');
    }

    return data;
};

export const registerUser = async (username, password) => {
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
    }

    return data;
};
