import React from "react";
import TasksBlock from "./tasks/components/TasksBlock";
import UsersBlock from "./users/components/UsersBlock";
import globe from "../assets/globe-bg.png";

const Home: React.FC = () => {
	return (
		<>
			<div
				className='p-5 mb-4 bg-body-tertiary rounded-3'
				style={{
					backgroundImage: `url(${globe})`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: "bottom right",
				}}>
				<div className='container-fluid py-5'>
					<h1 className='display-5 fw-bold'>Welcome</h1>
					<p className='col-md-8 fs-4'>
						This is a simple users list application built with React
						+ TypeScript, Bootstrap fo UI and JSON Placeholder for
						API testing and prototyping. You can view the list of
						users, their details, and navigate through different
						pages.
					</p>
				</div>
			</div>

			<div className='row align-items-md-stretch mb-4'>
				<div className='col-md-6'>
					<UsersBlock />
				</div>
				<div className='col-md-6'>
					<TasksBlock />
				</div>
			</div>

			<div className='row align-items-md-stretch my-4'>
				<div className='col'>
					<h2 className='card-title text-center p-4'>App Features</h2>
					<p className='lead text-muted text-center'>
						Responsive UI, functional components, empty & loading
						states, intuitive UI, form validation
					</p>
					<div className='card shadow-sm'>
						<div className='card-body'>
							<div className='row'>
								<div className='col-md-4'>
									<h5>
										Users
										<hr />
									</h5>
									<ul className='list-group list-group-flush'>
										<li className='list-group-item'>
											<i className='bi bi-plus me-2' />
											View a collapsable list of users
										</li>
										<li className='list-group-item'>
											<i className='bi bi-plus me-2' />
											Edit existing user information
										</li>
										<li className='list-group-item'>
											<i className='bi bi-plus me-2' />
											View user posts
										</li>
									</ul>
								</div>
								<div className='col-md-4'>
									<h5>
										Posts
										<hr />
									</h5>
									<ul className='list-group list-group-flush'>
										<li className='list-group-item'>
											<i className='bi bi-plus me-2' />
											Display a list of posts
										</li>
										<li className='list-group-item'>
											<i className='bi bi-plus me-2' />
											Delete post data
										</li>
										<li className='list-group-item'>
											<i className='bi bi-plus me-2' />
											Edit post title
										</li>
									</ul>
								</div>

								<div className='col-md-4'>
									<h5>
										Tasks
										<hr />
									</h5>
									<ul className='list-group list-group-flush'>
										<li className='list-group-item'>
											<i className='bi bi-plus me-2' />
											Display a list of tasks with
											pagination
										</li>
										<li className='list-group-item'>
											<i className='bi bi-plus me-2' />
											Filter tasks by title, status and
											user
										</li>
										<li className='list-group-item'>
											<i className='bi bi-plus me-2' />
											Live search by task title
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
