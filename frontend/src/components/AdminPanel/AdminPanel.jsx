import { AdminProvider } from './context/AdminContext';
import { useAdminContext } from './context/AdminContext';
import { useAppContext } from '@context/AppContext';
import AdminTabs from './children/AdminTabs';
import UsersTable from './children/Users/UsersTable';
import TasksTable from './children/Tasks/TasksTable';

const AdminPanelContent = () => {
    const { loading, error, activeTab } = useAdminContext();
    const { username, logout } = useAppContext();

    if (loading) {
        return (
            <div className="container mt-4">
                <h2>Admin Panel</h2>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <h2>Admin Panel</h2>
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            {/* Header with logout */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <h2 className="mb-0">🔐 Admin Panel</h2>
                <div className="d-flex align-items-center gap-3">
                    <span className="text-muted">
                        <i className="bi bi-person-circle"></i> {username} (Admin)
                    </span>
                    <button onClick={logout} className="btn btn-sm btn-outline-secondary">
                        Logout
                    </button>
                </div>
            </div>

            <AdminTabs />
            {activeTab === 'users' && <UsersTable />}
            {activeTab === 'tasks' && <TasksTable />}
        </div>
    );
};

const AdminPanel = () => {
    return (
        <AdminProvider>
            <AdminPanelContent />
        </AdminProvider>
    );
};

export default AdminPanel;
