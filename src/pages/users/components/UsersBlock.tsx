import React from 'react';
import { Link } from 'react-router-dom';

const UsersBlock: React.FC = () => {
    return (
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h2>Users</h2>
            <p>
              This section displays a list of users fetched from the JSON Placeholder API. Click on a user to see more details about them.
            </p>
            <Link to="/users" className="btn btn-outline-light">
              View users
            </Link>
          </div>
    );
};

export default UsersBlock;