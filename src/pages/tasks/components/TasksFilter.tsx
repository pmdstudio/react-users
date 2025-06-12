import React from "react";
import { TASK_STATUS } from "../../../types";
import { UsersFilter } from "../../../components";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setFilter } from "../../../store/slices/tasksSlice";

const TasksFilter: React.FC = () => {
	const dispatch = useDispatch();
	const filter = useSelector((state: RootState) => state.tasks.filter);

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		dispatch(setFilter({ ...filter, [name]: value }));
	};

	const handleClearFilter = () => {
		dispatch(setFilter({ completed: "", title: "", userId: 0 }));
	};

	const filterChanged =
		filter.completed !== "" || filter.title !== "" || filter.userId !== 0;

	return (
		<div className="card mb-4">
			<div className="card-body">
				<div className="row g-3">
					<div className="col-md-6 col-lg-3">
						<label htmlFor="statusFilter" className="form-label">
							Status
						</label>
						<select
							className="form-select form-select-sm"
							id="statusFilter"
							name="completed"
							value={filter.completed ?? ""}
							onChange={handleFilterChange}
						>
							<option value="">All</option>
							<option value={0}>{TASK_STATUS.pending}</option>
							<option value={1}>{TASK_STATUS.completed}</option>
						</select>
					</div>

					<div className="col-md-6 col-lg-5">
						<label htmlFor="titleFilter" className="form-label">
							Task Title
						</label>
						<input
							type="text"
							className="form-control form-control-sm"
							id="titleFilter"
							name="title"
							value={filter.title ?? ""}
							placeholder="Search by title"
							onChange={handleFilterChange}
						/>
					</div>

					<div className="col-md-6 col-lg-3">
						<label htmlFor="ownerFilter" className="form-label">
							Owner
						</label>
						<UsersFilter
							onChange={handleFilterChange}
							value={filter.userId ?? 0}
						/>
					</div>

					<div className="col d-flex align-items-end">
						<button
							type="button"
							onClick={handleClearFilter}
							className="btn btn-primary btn-sm w-100"
							disabled={!filterChanged}
						>
							Clear
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TasksFilter;
