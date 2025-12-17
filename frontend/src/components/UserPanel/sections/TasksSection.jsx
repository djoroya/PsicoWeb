import TaskForm from '../../Task/TaskForm';
import TaskList from '../../Task/TaskList';

const TasksSection = () => {
    return (
        <div>
            <h3 className="mb-3">
                <i className="bi bi-list-task"></i> My Tasks
            </h3>
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default TasksSection;
