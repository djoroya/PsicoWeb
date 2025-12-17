import { useAppContext } from '@context/AppContext';

const Header = () => {
    const { username, logout } = useAppContext();

    return (
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <h1 className="h3 mb-0">📝 To-Do List</h1>
            <div className="d-flex align-items-center gap-3">
                <span className="text-muted">
                    <i className="bi bi-person-circle"></i> {username}
                </span>
                <button onClick={logout} className="btn btn-sm btn-outline-secondary">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Header;
