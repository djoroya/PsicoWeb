import { apiRequest } from './apiClient';

export const loginRequest = (username, password) =>
  apiRequest('/login', { method: 'POST', body: { username, password } });
