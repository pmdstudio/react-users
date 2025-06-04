import React from "react";
import { Task } from "../../../types";

type Props = {
	tasks: Task[];
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
	const handleChangeStatus = (task: Task) => {
		onStatusChange({
			...task,
			completed: !task.completed,
		});
	};

	return (
		<>
			{tasks.length === 0 && (
				<div className='alert alert-warning text-center' role='alert'>
					No tasks found.
				</div>
			)}
			{tasks.length > 0 && (
				<table className='table table-hover'>
					<thead className='table-light'>
						<tr>
							<th scope='col' style={{ width: "30px" }}></th>
							<th scope='col'>Title</th>
							<th scope='col' style={{ width: "300px" }}>
								User
							</th>
							<th scope='col' style={{ width: "100px" }}></th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task, index) => (
							<tr key={task.id}>
								<td>
									{(selectedPage - 1) * pageSize + index + 1}
								</td>
								<td>{task.title}</td>
								<td>{task.userId}</td>
								<td>
									<div className='btn-group w-100'>
										<button
											type='button'
											className={`btn ${task.completed ? "btn-success" : "btn-warning"} btn-sm`}
											disabled={
												updatingTaskId === task.id
											}>
											{updatingTaskId === task.id ? (
												<span
													className='spinner-border spinner-border-sm'
													role='status'
													aria-hidden='true'></span>
											) : task.completed ? (
												"Completed"
											) : (
												"Pending"
											)}
										</button>
										<button
											type='button'
											className={`btn ${task.completed ? "btn-success" : "btn-warning"} btn-sm dropdown-toggle dropdown-toggle-split`}
											data-bs-toggle='dropdown'
											aria-expanded='false'
											disabled={
												updatingTaskId === task.id
											}>
											<span className='visually-hidden'>
												Toggle Dropdown
											</span>
										</button>
										<ul className='dropdown-menu'>
											<li>
												<button
													className='dropdown-item'
													type='button'
													onClick={() =>
														handleChangeStatus(task)
													}>
													{task.completed
														? "Pending"
														: "Completed"}
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
