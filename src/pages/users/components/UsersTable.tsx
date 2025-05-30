import { Link } from 'react-router-dom';
import React from 'react';
import { Users } from '../../../types';

type Props = {
  users: Users;
}

const UsersTable: React.FC<Props> = ({users}) => {

  return (
    <>
    <h2 className="mb-4">Users</h2>
      <div className="accordion" id="usersAccordion">
        {users.map((user) => (
          <div className="accordion-item" key={user.id}>
            <h2 className="accordion-header" id={`heading-${user.id}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${user.id}`}
                aria-expanded="false"
                aria-controls={`collapse-${user.id}`}
              >
                {user.name}
              </button>
            </h2>
            <div
              id={`collapse-${user.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading-${user.id}`}
              data-bs-parent="#usersAccordion"
            >
              <div className="accordion-body">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}</p>
                <Link className="nav-link" to={`/users/${user.id}`}>View posts</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default UsersTable;