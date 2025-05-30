import { useTasks } from '../hooks';
import React from 'react';


const TasksList = () => {

    const { tasks, loading, error } = useTasks()

    if (loading) return <p className="text-center mt-4">Loading users...</p>
    if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

return (
    <div className="container mt-4">
        <h2 className="mb-4">Tasks</h2>
        <div className="accordion" id="tasksAccordion">
            {tasks.map((task) =>

                    <div className="accordion-item" key={task.id}>
                        <h2 className="accordion-header" id={`heading-${task.id}`}>
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-${task.id}`}
                                aria-expanded="false"
                                aria-controls={`collapse-${task.id}`}
                            >
                                {task.title}
                            </button>
                        </h2>
                        <div
                            id={`collapse-${task.id}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading-${task.id}`}
                            data-bs-parent="#tasksAccordion"
                        >
                            <div className="accordion-body">
                                <p><strong>ID:</strong> {task.id}</p>
                                <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
                                
                            </div>
                        </div>
                    </div>
                
            )}
        </div>
    </div>
)
}

export default TasksList;