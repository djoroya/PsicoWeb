import { useAdminContext } from '@components/AdminPanel/context/AdminContext';
import TaskRow from './TaskRow';

const TasksTable = () => {
    const { allTasks } = useAdminContext();

    return (
        <div className="mt-3">
            <h3>All Tasks</h3>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Task</th>
                            <th>Owner</th>
                            <th>Status</th>
                            <th>Task ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTasks.map(task => (
                            <TaskRow key={task._id} task={task} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TasksTable;
