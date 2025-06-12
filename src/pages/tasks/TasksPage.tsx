import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
	getTasks,
	updateTaskData,
	setCurrentPage,
	setPageSize,
	selectPaginatedTasks,
} from "../../store/slices/tasksSlice";
import { Loading } from "../../components";
import TasksList from "./components/TasksList";
import { Task } from "../../types";
import TasksFilter from "./components/TasksFilter";
import { getUsers } from "../../store/slices/userSlice";

const TasksPage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const tasks = useSelector(selectPaginatedTasks);
	const tasksPages = useSelector(
		(state: RootState) => state.tasks.tasksPages
	);
	const currentPage = useSelector(
		(state: RootState) => state.tasks.currentPage
	);
	const loadingTasks = useSelector(
		(state: RootState) => state.tasks.loadingTasks
	);

	const updatingTaskId = useSelector(
		(state: RootState) => state.tasks.updatingTaskId
	);

	const [selectedPage, setSelectedPage] = useState(currentPage);

	const pageSize = 20;

	useEffect(() => {
		dispatch(setPageSize(pageSize));
		dispatch(getUsers());
		dispatch(getTasks());
	}, [dispatch]);

	const handlePageChange = (page: number) => {
		setSelectedPage(page);
		dispatch(setCurrentPage(page));
	};

	const onStatusChange = (updatedTask: Task) => {
		dispatch(updateTaskData(updatedTask));
	};

	return (
		<div className="container position-relative h-100">
			{loadingTasks && <Loading text="Loading tasks" />}
			{!loadingTasks && (
				<>
					<h2 className="my-4">
						<i className="bi bi-list-task me-2"></i> Tasks
					</h2>
					<TasksFilter />
					<div className="table-responsive card p-1">
						<TasksList
							tasks={tasks}
							selectedPage={selectedPage}
							pageSize={pageSize}
							onStatusChange={onStatusChange}
							updatingTaskId={updatingTaskId}
						/>
						{tasks.length > 0 && (
							<nav className="d-flex justify-content-center bg-light">
								<ul className="pagination m-2">
									{Array.from(
										{ length: tasksPages },
										(_, index) => {
											const page = index + 1;
											return (
												<li
													key={page}
													className={`page-item ${
														selectedPage === page
															? "active"
															: ""
													}`}
												>
													<button
														className="page-link"
														onClick={() =>
															handlePageChange(
																page
															)
														}
													>
														{page}
													</button>
												</li>
											);
										}
									)}
								</ul>
							</nav>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default TasksPage;
