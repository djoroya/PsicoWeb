const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const apiRequest = async (path, { method = 'GET', token, body } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Error de servidor');
  }
  return res.json();
};

export const getPublicData = (path) => apiRequest(`/public${path}`);
export const getAdminData = (path, token) => apiRequest(`/admin${path}`, { token });
export const postAdminData = (path, token, body) => apiRequest(`/admin${path}`, { method: 'POST', token, body });
export const putAdminData = (path, token, body) => apiRequest(`/admin${path}`, { method: 'PUT', token, body });
export const deleteAdminData = (path, token) => apiRequest(`/admin${path}`, { method: 'DELETE', token });
