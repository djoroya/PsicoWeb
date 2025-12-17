import UserStatusBadge from './UserStatusBadge';
import UserActions from './UserActions';

const UserRow = ({ user, onApprove, onReject, onDelete }) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>
                <UserStatusBadge status={user.status} />
            </td>
            <td>{user.task_count}</td>
            <td>
                <UserActions
                    user={user}
                    onApprove={onApprove}
                    onReject={onReject}
                    onDelete={onDelete}
                />
            </td>
        </tr>
    );
};

export default UserRow;
