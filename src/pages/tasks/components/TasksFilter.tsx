import React, { useState } from "react";
import { TaskFilter, TASK_STATUS } from "../../../types";
import { UsersFilter } from "../../../components";

interface TasksFilterProps {
	onFilterChange: (filter: TaskFilter) => void;
}

const TasksFilter: React.FC<TasksFilterProps> = ({ onFilterChange }) => {
	const emptyFilter = {
		completed: "",
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
					<div className='col-md-6 col-lg-3'>
						<label htmlFor='statusFilter' className='form-label'>
							Status
						</label>
						<select
							className='form-select form-select-sm'
							id='statusFilter'
							name='completed'
							value={filter.completed ?? undefined}
							onChange={handleFilterChange}>
							<option value=''>All</option>
							<option value={0}>{TASK_STATUS.pending}</option>
							<option value={1}>{TASK_STATUS.completed}</option>
						</select>
					</div>

					<div className='col-md-6 col-lg-5'>
						<label htmlFor='titleFilter' className='form-label'>
							Task Title
						</label>
						<input
							type='text'
							className='form-control form-control-sm'
							id='titleFilter'
							name='title'
							value={filter.title}
							placeholder='Search by title'
							onChange={handleFilterChange}
						/>
					</div>

					<div className='col-md-6 col-lg-3'>
						<label htmlFor='ownerFilter' className='form-label'>
							Owner
						</label>
						<UsersFilter
							onChange={handleFilterChange}
							value={filter.userId}
						/>
					</div>

					<div className='col d-flex align-items-end'>
						<button
							type='button'
							onClick={handleClearFilter}
							className='btn btn-primary btn-sm w-100'
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
