import React, { useState } from "react";
import { TaskFilter, taskStatuses } from "../../../types";
import { UsersFilter } from "../../../components";

interface TasksFilterProps {
	onFilterChange: (filter: TaskFilter) => void;
}

const TasksFilter: React.FC<TasksFilterProps> = ({ onFilterChange }) => {
	const emptyFilter = {
		completed: undefined,
		title: "",
		userId: 0,
	};

	const [filter, setFilter] = useState<TaskFilter>(emptyFilter);
	const [filterChanged, setFilterChanged] = useState<boolean>(false);

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		const newFilter = { ...filter, [name]: value } as TaskFilter;

		onFilterChange(newFilter);
		setFilter(newFilter);
		setFilterChanged(true);
	};

	// const handleSubmitFilter = () => {
	// 	onFilterChange(filter);
	// };

	const handleClearFilter = () => {
		onFilterChange(emptyFilter);
		setFilter(emptyFilter);
		setFilterChanged(false);
	};

	return (
		<div className='card mb-4'>
			<div className='card-body'>
				<div className='row g-3'>
					<div className='col-md-3'>
						<label htmlFor='statusFilter' className='form-label'>
							Status
						</label>
						<select
							className='form-select'
							id='statusFilter'
							name='completed'
							value={
								filter.completed === undefined
									? ""
									: filter.completed
							}
							onChange={handleFilterChange}>
							<option value=''>All</option>
							{taskStatuses.map((status) => (
								<option key={status.value} value={status.value}>
									{status.title}
								</option>
							))}
						</select>
					</div>

					<div className='col-md-4'>
						<label htmlFor='titleFilter' className='form-label'>
							Task Title
						</label>
						<input
							type='text'
							className='form-control'
							id='titleFilter'
							name='title'
							value={filter.title}
							placeholder='Search by title'
							onChange={handleFilterChange}
						/>
					</div>

					<div className='col-md-3'>
						<label htmlFor='ownerFilter' className='form-label'>
							Owner
						</label>
						<UsersFilter
							onChange={handleFilterChange}
							value={filter.userId}
						/>
					</div>

					<div className='col-md-2 d-flex align-items-end'>
						<button
							type='button'
							onClick={handleClearFilter}
							className='btn btn-primary w-100'
							disabled={!filterChanged}>
							Clear
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TasksFilter;
