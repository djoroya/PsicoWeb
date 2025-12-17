import { useAppContext } from '@context/AppContext';

const TaskItem = ({ task }) => {
    const { toggleTask, removeTask } = useAppContext();

    return (
        <div className="list-group-item d-flex justify-content-between align-items-center">
            <div className="form-check flex-grow-1">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={`task-${task._id}`}
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                />
                <label
                    className={`form-check-label ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
                    htmlFor={`task-${task._id}`}
                >
                    {task.title}
                </label>
            </div>
            <button
                onClick={() => removeTask(task._id)}
                className="btn btn-sm btn-outline-danger"
                title="Delete task"
            >
                <i className="bi bi-trash"></i>
            </button>
        </div>
    );
};

export default TaskItem;
