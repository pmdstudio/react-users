import React from "react";
import { Task, TaskWithUser, TASK_STATUS } from "../../../types";

type Props = {
	tasks: TaskWithUser[];
	selectedPage: number;
	pageSize: number;
	onStatusChange: (updatedTask: Task) => void;
	updatingTaskId: number;
};

const TasksList: React.FC<Props> = ({
	tasks,
	selectedPage,
	pageSize,
	onStatusChange,
	updatingTaskId,
}) => {
	return (
		<>
			{tasks.length === 0 && (
				<div className="alert alert-warning text-center" role="alert">
					No tasks found.
				</div>
			)}

			{tasks.length > 0 && (
				<table className="table table-hover m-0">
					<thead className="table-light">
						<tr>
							<th scope="col" style={{ width: "30px" }}></th>
							<th scope="col">Title</th>
							<th scope="col" style={{ width: "300px" }}>
								User
							</th>
							<th scope="col" style={{ width: "100px" }}></th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task, index) => (
							<tr key={task.id}>
								<td>
									{(selectedPage - 1) * pageSize + index + 1}
								</td>
								<td>{task.title}</td>
								<td>{task.user?.name}</td>
								<td>
									<div className="btn-group w-100">
										<button
											type="button"
											className={`btn  ${
												task.completed
													? "btn-success"
													: "btn-warning"
											} btn-sm`}
											disabled={
												updatingTaskId === task.id
											}
										>
											{updatingTaskId === task.id ? (
												<span
													className="spinner-border spinner-border-sm w-full"
													role="status"
													aria-hidden="true"
												></span>
											) : task.completed ? (
												TASK_STATUS.completed
											) : (
												TASK_STATUS.pending
											)}
										</button>
										<button
											type="button"
											className={`btn ${
												task.completed
													? "btn-success"
													: "btn-warning"
											} btn-sm dropdown-toggle dropdown-toggle-split`}
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											<span className="visually-hidden">
												Toggle Dropdown
											</span>
										</button>
										<ul className="dropdown-menu p-0 overflow-hidden">
											<li>
												<button
													type="button"
													className={`dropdown-item p-2 ${
														task.completed
															? "text-warning"
															: "text-success"
													}`}
													onClick={(e) => {
														onStatusChange({
															...task,
															completed:
																!task.completed,
														});

														// Close Bootstrap dropdown manually
														const dropdown =
															e.currentTarget.closest(
																".dropdown"
															);
														if (dropdown) {
															dropdown.classList.remove(
																"show"
															);
														}
													}}
												>
													{task.completed
														? "Open"
														: "Complete"}
												</button>
											</li>
										</ul>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default TasksList;
