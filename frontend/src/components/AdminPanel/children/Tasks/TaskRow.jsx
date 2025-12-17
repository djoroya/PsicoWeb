const TaskRow = ({ task }) => {
    return (
        <tr>
            <td>{task.title}</td>
            <td>{task.username}</td>
            <td>
                <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {task.completed ? '✓ Completed' : '○ Pending'}
                </span>
            </td>
            <td><code className="text-muted">{task._id}</code></td>
        </tr>
    );
};

export default TaskRow;
