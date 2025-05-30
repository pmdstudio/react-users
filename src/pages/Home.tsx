import React from 'react'
import TasksBlock from './tasks/components/TasksBlock';
import UsersBlock from './users/components/UsersBlock';

const Home: React.FC = () => {
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
          <UsersBlock />
        </div>
        <div className="col-md-6">
          <TasksBlock />
        </div>
      </div>
    </>
  );
}

export default Home;