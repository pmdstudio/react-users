import React from 'react';
import { Link } from 'react-router-dom';

const TasksBlock: React.FC = () => {
    return (
          <div className="h-100 p-5 bg-body-tertiary border rounded-3">
            <h2>Tasks</h2>
            <p>
              This section displays a list of tasks that can be managed. You can add, edit, or delete tasks as needed and assign it to a user.
            </p>
            <Link to="/tasks" className="btn btn-outline-secondary">
              View tasks
            </Link>
          </div>
    );
};

export default TasksBlock;