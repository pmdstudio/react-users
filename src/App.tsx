import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home, UsersPage, UserInfoPage, TasksPage } from './pages'

function App() {
	return (
		<BrowserRouter>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
				<div className="container">
					<a className="navbar-brand" href="/">React Users</a>
					<div className="navbar-nav">
						<Link className="nav-link" to="/users">Users</Link>
						<Link className="nav-link" to="/tasks">Tasks</Link>
					</div>
				</div>
			</nav>

			<div className="container flex flex-grow-1 py-5">
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb p-3 bg-body-tertiary rounded-3">
						<li className="breadcrumb-item">
							<a className="link-body-emphasis" href="/">
								<i className="bi bi-house-door-fill"></i>
								<span className="visually-hidden">Home</span>
							</a>
						</li>
						<li className="breadcrumb-item">
							<a className="link-body-emphasis fw-semibold text-decoration-none" href="/users">Users</a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Data
						</li>
					</ol>
				</nav>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/users">
						<Route index element={<UsersPage />} />
						<Route path=":userId" element={<UserInfoPage />} />
					</Route>
					<Route path="/tasks" element={<TasksPage />} />
				</Routes>
			</div>

			<footer className="footer mt-auto py-3 bg-body-tertiary">
				<div className="container text-center">
					<span className="text-body-secondary">
						develop by <strong>Marin Petrov</strong>, petrovm@abv.bg
					</span>
				</div>
			</footer>
		</BrowserRouter>
	)
}

export default App