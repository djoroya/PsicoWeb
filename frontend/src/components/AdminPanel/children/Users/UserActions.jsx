const UserActions = ({ user, onApprove, onReject, onDelete }) => {
    return (
        <div className="btn-group" role="group">
            {user.status === 'pending' && (
                <>
                    <button
                        className="btn btn-sm btn-success"
                        onClick={() => onApprove(user._id)}
                    >
                        ✓ Approve
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onReject(user._id)}
                    >
                        ✗ Reject
                    </button>
                </>
            )}
            {user.status === 'rejected' && (
                <button
                    className="btn btn-sm btn-success"
                    onClick={() => onApprove(user._id)}
                >
                    ✓ Approve
                </button>
            )}
            <button
                className="btn btn-sm btn-secondary"
                onClick={() => onDelete(user._id, user.username)}
                title="Delete user and all their tasks"
            >
                🗑️ Delete
            </button>
        </div>
    );
};

export default UserActions;
