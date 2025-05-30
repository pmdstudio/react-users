import { useUsers } from '../hooks';
import React from 'react';


const UsersList = () => {

    const { users, loading, error } = useUsers()

    if (loading) return <p className="text-center mt-4">Loading users...</p>
    if (error) return <p className="text-danger text-center mt-4">Error: {error}</p>

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users</h2>
      <div className="accordion" id="usersAccordion">
        {users.map((user, index) => (
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersList;