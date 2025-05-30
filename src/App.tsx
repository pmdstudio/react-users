import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { UsersList, TasksList } from './pages';

function Home() {
  return (
    <>
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome</h1>
          <p className="col-md-8 fs-4">
            This is a simple users list application built with React + TypeScript, Bootstrap fo UI and JSON Placeholder for API testing and prototyping. You can view the list of users, their details, and navigate through different pages.
          </p>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h2>Users</h2>
            <p>
              This section displays a list of users fetched from the JSON Placeholder API. Click on a user to see more details about them.
            </p>
            <Link to="/users" className="btn btn-outline-light">
              View users
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-body-tertiary border rounded-3">
            <h2>Tasks</h2>
            <p>
              This section displays a list of tasks that can be managed. You can add, edit, or delete tasks as needed and assign it to a user.
            </p>
            <Link to="/tasks" className="btn btn-outline-secondary">
              View tasks
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
          <a className="navbar-brand" href="/">My App</a>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/tasks">Tasks</Link>
          </div>
        </nav>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/tasks" element={<TasksList />} />
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App