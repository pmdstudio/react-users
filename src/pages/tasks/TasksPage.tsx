import { Loading } from "../../components";
import { useTasksManager } from "../../hooks";
import React, { useEffect } from "react";
import TasksFilter from "./components/TasksFilter";
import { Task, TaskFilter } from "../../types";
import TasksList from "./components/TasksList";

const TasksPage: React.FC = () => {
	const {
		loadingTasks,
		setCurrentPage,
		setPageSize,
		tasksPages,
		setFilter,
		tasks,
		updateTaskData,
		updatingTaskId,
	} = useTasksManager();

	const [selectedPage, setSelectedPage] = React.useState(1);
	const pageSize = 20;

	useEffect(() => {
		// Set the number of tasks per page
		setPageSize(pageSize);
	}, [setPageSize]);

	const handlePageChange = (page: number) => {
		setSelectedPage(page);
		setCurrentPage(page);
	};

	const onFilterChange = (filter: TaskFilter) => {
		setFilter(filter);
		setSelectedPage(1);
		setCurrentPage(1);
	};

	const onStatusChange = (updatedTask: Task) => {
		updateTaskData(updatedTask);
	};

	return (
		<>
			<div className='container position-relative h-100'>
				{loadingTasks && <Loading text='Loading tasks' />}
				{!loadingTasks && (
					<>
						<h2 className='my-4'>
							<i className='bi bi-list-task me-2'></i> Tasks
						</h2>
						<TasksFilter onFilterChange={onFilterChange} />
						<div className='table-responsive card p-1'>
							<TasksList
								tasks={tasks}
								selectedPage={selectedPage}
								pageSize={pageSize}
								onStatusChange={onStatusChange}
								updatingTaskId={updatingTaskId}
							/>
							{tasks.length > 0 && (
								<nav className='d-flex justify-content-center bg-light'>
									<ul className='pagination m-2'>
										{Array.from(
											{ length: tasksPages },
											(_, index) => {
												const page = index + 1;
												return (
													<li
														key={page}
														className={`page-item ${
															selectedPage ===
															page
																? "active"
																: ""
														}`}>
														<button
															className='page-link'
															onClick={() =>
																handlePageChange(
																	page
																)
															}>
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
		</>
	);
};

export default TasksPage;
