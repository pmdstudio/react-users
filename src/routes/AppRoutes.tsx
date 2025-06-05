import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// loaded pages async
const Home = lazy(() => import("../pages/Home"));
const UsersPage = lazy(() => import("../pages/users/UsersPage"));
const UserInfoPage = lazy(() => import("../pages/users/UserInfoPage"));
const TasksPage = lazy(() => import("../pages/tasks/TasksPage"));

const AppRoutes = () => {
	return (
		<Suspense>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/users'>
					<Route index element={<UsersPage />} />
					<Route path=':userId' element={<UserInfoPage />} />
				</Route>
				<Route path='/tasks' element={<TasksPage />} />
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
