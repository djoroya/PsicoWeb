import { useState } from 'react';
import { useAppContext } from '@context/AppContext';

const TaskForm = () => {
    const { addTask } = useAppContext();
    const [newTask, setNewTask] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        await addTask(newTask);
        setNewTask('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={!newTask.trim()}
                >
                    <i className="bi bi-plus-lg"></i> Add
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
