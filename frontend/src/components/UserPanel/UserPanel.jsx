import { useState } from 'react';
import Header from '../Header';
import ErrorMessage from '../ErrorMessage';
import TasksSection from './sections/TasksSection';
import CoursesSection from './sections/CoursesSection';

const UserPanel = () => {
    const [activeTab, setActiveTab] = useState('tasks');

    return (
        <div className="bg-white rounded shadow-sm p-4">
            <Header />
            <ErrorMessage />

            {/* Navigation Tabs */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tasks')}
                    >
                        <i className="bi bi-check2-square"></i> Tasks
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('courses')}
                    >
                        <i className="bi bi-book"></i> Courses
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <i className="bi bi-person"></i> Profile
                    </button>
                </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'tasks' && <TasksSection />}
                {activeTab === 'courses' && <CoursesSection />}
                {activeTab === 'profile' && (
                    <div className="text-center text-muted py-5">
                        <i className="bi bi-person-circle" style={{ fontSize: '3rem' }}></i>
                        <p className="mt-3">Profile section coming soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPanel;
