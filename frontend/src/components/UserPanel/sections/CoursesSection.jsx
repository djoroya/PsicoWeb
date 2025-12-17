const CoursesSection = () => {
    // Placeholder data - esto se conectará a tu backend más adelante
    const courses = [
        {
            id: 1,
            title: 'React Fundamentals',
            description: 'Learn the basics of React',
            progress: 75,
            status: 'in-progress'
        },
        {
            id: 2,
            title: 'Advanced JavaScript',
            description: 'Deep dive into JS concepts',
            progress: 30,
            status: 'in-progress'
        },
        {
            id: 3,
            title: 'Python for Beginners',
            description: 'Start your Python journey',
            progress: 0,
            status: 'not-started'
        }
    ];

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">
                    <i className="bi bi-mortarboard"></i> My Courses
                </h3>
                <button className="btn btn-sm btn-primary">
                    <i className="bi bi-plus-lg"></i> Enroll in Course
                </button>
            </div>

            <div className="row g-3">
                {courses.map(course => (
                    <div key={course.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text text-muted small">{course.description}</p>

                                <div className="mb-2">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <small className="text-muted">Progress</small>
                                        <small className="fw-bold">{course.progress}%</small>
                                    </div>
                                    <div className="progress" style={{ height: '8px' }}>
                                        <div
                                            className={`progress-bar ${course.progress === 0 ? 'bg-secondary' :
                                                    course.progress < 50 ? 'bg-warning' :
                                                        course.progress < 100 ? 'bg-info' : 'bg-success'
                                                }`}
                                            role="progressbar"
                                            style={{ width: `${course.progress}%` }}
                                            aria-valuenow={course.progress}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                </div>

                                <div className="d-flex gap-2 mt-3">
                                    <button className="btn btn-sm btn-outline-primary flex-grow-1">
                                        {course.progress === 0 ? 'Start' : 'Continue'}
                                    </button>
                                    <button className="btn btn-sm btn-outline-secondary">
                                        <i className="bi bi-info-circle"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {courses.length === 0 && (
                <div className="text-center text-muted py-5">
                    <i className="bi bi-book" style={{ fontSize: '3rem' }}></i>
                    <p className="mt-3">No courses yet. Enroll in your first course!</p>
                </div>
            )}
        </div>
    );
};

export default CoursesSection;
