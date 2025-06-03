import { Breadcrumbs, Loading } from '../../components';
import { useTasksManager } from '../../hooks';
import React, { useEffect } from 'react';
import TasksFilter from './components/TasksFilter';
import { TaskFilter } from '../../types';


const TasksPage: React.FC = () => {

    const { loadingTasks, setCurrentPage, setPageSize, tasksPages, setFilter, tasks } = useTasksManager();
    const [selectedPage, setSelectedPage] = React.useState(1);
    const pageSize = 15; // Default page size, can be adjusted as needed

    useEffect(() => {
        // Set the number of tasks per page
        setPageSize(pageSize); 
    }, [setPageSize]);

    const handlePageChange = (page: number) => {
        setSelectedPage(page);
        setCurrentPage(page);
    };
    

    const onFilterChange = (filter: TaskFilter) => {
        // Logic to handle filter change can be added here
        setFilter(filter);
        setSelectedPage(1); // Reset to first page on filter change
        setCurrentPage(1);        
    };

return (
    <>
    <Breadcrumbs />
    <div className='container position-relative h-100'>
        {loadingTasks && <Loading text='Loading tasks' />}
        {!loadingTasks && (
<>
<h2 className="mb-4">Tasks</h2>
<TasksFilter onFilterChange={onFilterChange} />
<div className='table-responsive'>
				<table className='table table-hover'>
					<thead className='table-light'>
						<tr>
							<th scope='col' style={{ width: "30px" }}></th>
							<th scope='col'>Title</th>
                            <th scope='col'>User</th>
							<th scope='col' style={{ width: "100px" }}></th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task, index) => (
							<tr key={task.id}>
                                <td>{(selectedPage - 1) * pageSize + index + 1}</td>
								<td>{task.title}</td>
                                <td>{task.userId}</td>
                                <td>
									<span
										className={`badge bg-${task.completed ? "success" : "warning"}`}>
										{task.completed
											? "Completed"
											: "Pending"}
									</span>
								</td>
							</tr>
						))}
					</tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="text-center">

                                <nav>
                                    <ul className="pagination justify-content-center">
                                        {Array.from({ length: tasksPages }, (_, index) => {
                                            const page = index + 1;
                                            return (
                                                <li
                                                    key={page}
                                                    className={`page-item ${
                                                        selectedPage === page ? "active" : ""
                                                    }`}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() => handlePageChange(page)}
                                                    >
                                                        {page}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </nav>
                            </td>
                        </tr>
                    </tfoot>
				</table>
			</div>
</>
        )}
    </div>
    </>
)
}

export default TasksPage;