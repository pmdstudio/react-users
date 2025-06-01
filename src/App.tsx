import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home, UsersPage, UserInfoPage, TasksPage } from './pages';

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
				<span className="text-body-secondary">develop by <strong>Marin Petrov</strong>, petrovm@abv.bg</span>
			</div>
		</footer>			
		</BrowserRouter>
	)
}

export default App