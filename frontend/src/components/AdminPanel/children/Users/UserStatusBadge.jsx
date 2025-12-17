const UserStatusBadge = ({ status }) => {
    const getBadgeClass = () => {
        switch (status) {
            case 'pending':
                return 'bg-warning text-dark';
            case 'approved':
                return 'bg-success';
            case 'rejected':
                return 'bg-danger';
            default:
                return 'bg-success';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'pending':
                return '⏳ Pending';
            case 'approved':
                return '✓ Approved';
            case 'rejected':
                return '✗ Rejected';
            default:
                return '✓ Approved';
        }
    };

    return (
        <span className={`badge ${getBadgeClass()}`}>
            {getStatusText()}
        </span>
    );
};

export default UserStatusBadge;
