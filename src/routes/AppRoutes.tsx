import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Navbar, Breadcrumbs } from "../components";

// Lazy pages
const Home = lazy(() => import("../pages/Home"));
const UsersPage = lazy(() => import("../pages/users/UsersPage"));
const UserInfoPage = lazy(() => import("../pages/users/UserInfoPage"));
const TasksPage = lazy(() => import("../pages/tasks/TasksPage"));

const AppLayout = () => (
	<>
		<Navbar />
		<div className="container position-relative overflow-hidden flex flex-grow-1 py-5">
			<Breadcrumbs />
			<Outlet />
		</div>
		<footer className="footer mt-auto py-3 bg-body-tertiary">
			<div className="container text-center">
				<span className="text-body-secondary">
					develop by <strong>Marin Petrov</strong>, petrovm@abv.bg
				</span>
			</div>
		</footer>
	</>
);

const AppRoutes = () => {
	return (
		<Suspense>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/users">
						<Route index element={<UsersPage />} />
						<Route path=":userId" element={<UserInfoPage />} />
					</Route>
					<Route path="/tasks" element={<TasksPage />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
