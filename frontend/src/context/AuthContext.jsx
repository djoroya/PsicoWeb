import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest } from '../services/authService';
import { validateAdmin } from '../services/adminService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(localStorage.getItem('username'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rehydrate = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const valid = await validateAdmin(token);
        if (!valid && isAdmin) {
          logout();
        }
      } catch (err) {
        console.error('Token validation failed', err);
        if (isAdmin) logout();
      } finally {
        setLoading(false);
      }
    };
    rehydrate();
  }, []);

  const login = async (username, password) => {
    const data = await loginRequest(username, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('isAdmin', data.isAdmin || false);
    setToken(data.token);
    setUser(data.username);
    setIsAdmin(data.isAdmin || false);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    setToken(null);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAdmin,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
