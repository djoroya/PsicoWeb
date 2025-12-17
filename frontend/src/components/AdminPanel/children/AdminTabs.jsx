import { useAdminContext } from '@components/AdminPanel/context/AdminContext';

const AdminTabs = () => {
    const { activeTab, setActiveTab, users, allTasks, pendingCount } = useAdminContext();

    return (
        <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users ({users.length})
                    {pendingCount > 0 && (
                        <span className="badge bg-warning text-dark ms-2">
                            {pendingCount} pending
                        </span>
                    )}
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tasks')}
                >
                    All Tasks ({allTasks.length})
                </button>
            </li>
        </ul>
    );
};

export default AdminTabs;
