import React, { useState } from "react";
import { TaskFilter, taskStatuses } from "../../../types";
import { UsersFilter } from "../../../components";

interface TasksFilterProps {
	onFilterChange: (filter: TaskFilter) => void;
}

const TasksFilter: React.FC<TasksFilterProps> = ({ onFilterChange }) => {
	const [filter, setFilter] = useState<TaskFilter>({
		completed: 0,
		title: "",
		userId: 0,
	});

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		// onFilterChange({ ...filters, [name]: value } as TaskFilter);
		setFilter((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmitFilter = () => {
		console.log("Submitting filter:", filter);
		onFilterChange(filter);
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
							placeholder='Search by title'
							onChange={handleFilterChange}
						/>
					</div>

					<div className='col-md-3'>
						<label htmlFor='ownerFilter' className='form-label'>
							Owner
						</label>
						<UsersFilter onChange={handleFilterChange} />
					</div>

					<div className='col-md-2 d-flex align-items-end'>
						<button
							type='button'
							onClick={handleSubmitFilter}
							className='btn btn-primary w-100'>
							Filter
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TasksFilter;
