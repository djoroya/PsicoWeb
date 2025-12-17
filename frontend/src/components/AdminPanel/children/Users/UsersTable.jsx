import { useAdminContext } from '@components/AdminPanel/context/AdminContext';
import UserRow from './UserRow';

const UsersTable = () => {
    const { users, handleApproveUser, handleRejectUser, handleDeleteUser } = useAdminContext();

    return (
        <div className="mt-3">
            <h3>Registered Users</h3>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Username</th>
                            <th>Status</th>
                            <th>Task Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <UserRow
                                key={user._id}
                                user={user}
                                onApprove={handleApproveUser}
                                onReject={handleRejectUser}
                                onDelete={handleDeleteUser}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;
