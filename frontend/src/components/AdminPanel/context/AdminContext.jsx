import { createContext, useContext, useState, useEffect } from 'react';
import { useAppContext } from '@context/AppContext';
import { fetchAllUsers, fetchAllTasks, approveUser, rejectUser, deleteUser } from '@services/adminService';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const { token } = useAppContext();

    // State
    const [users, setUsers] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('users');

    // Load data on mount
    useEffect(() => {
        loadAdminData();
    }, []);

    // Data loading
    const loadAdminData = async () => {
        setLoading(true);
        setError('');
        try {
            const [usersData, tasksData] = await Promise.all([
                fetchAllUsers(token),
                fetchAllTasks(token)
            ]);
            setUsers(usersData);
            setAllTasks(tasksData);
        } catch (err) {
            setError('Failed to load admin data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // User management handlers
    const handleApproveUser = async (userId) => {
        try {
            await approveUser(token, userId);
            const usersData = await fetchAllUsers(token);
            setUsers(usersData);
            setError('');
        } catch (err) {
            setError('Failed to approve user: ' + err.message);
        }
    };

    const handleRejectUser = async (userId) => {
        try {
            await rejectUser(token, userId);
            const usersData = await fetchAllUsers(token);
            setUsers(usersData);
            setError('');
        } catch (err) {
            setError('Failed to reject user: ' + err.message);
        }
    };

    const handleDeleteUser = async (userId, username) => {
        if (!window.confirm(`Are you sure you want to delete user "${username}" and all their tasks? This action cannot be undone.`)) {
            return;
        }

        try {
            await deleteUser(token, userId);
            const [usersData, tasksData] = await Promise.all([
                fetchAllUsers(token),
                fetchAllTasks(token)
            ]);
            setUsers(usersData);
            setAllTasks(tasksData);
            setError('');
        } catch (err) {
            setError('Failed to delete user: ' + err.message);
        }
    };

    // Computed values
    const pendingCount = users.filter(u => u.status === 'pending').length;

    const value = {
        // State
        users,
        allTasks,
        loading,
        error,
        activeTab,

        // Setters
        setActiveTab,

        // Computed
        pendingCount,

        // Handlers
        handleApproveUser,
        handleRejectUser,
        handleDeleteUser,
        loadAdminData
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdminContext must be used within an AdminProvider');
    }
    return context;
};
