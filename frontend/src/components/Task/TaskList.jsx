import { useAppContext } from '@context/AppContext';
import TaskItem from './TaskItem';

const TaskList = () => {
    const { tasks } = useAppContext();

    if (tasks.length === 0) {
        return (
            <div className="text-center text-muted py-5">
                <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
                <p className="mt-3">No tasks yet. Add one above!</p>
            </div>
        );
    }

    return (
        <div className="list-group">
            {tasks.map(task => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
