/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { fetchTasks, updateTask } from "../services";
import { Task, TaskFilter } from "../types";

export function useTasksManager() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [allTasks, setAllTasks] = useState<Task[]>([]);

	const [loadingTasks, setLoadingTasks] = useState(true);
	const [errorTasks, setErrorTasks] = useState<string | null>(null);

	const [updatingTaskId, setUpdatingTaskId] = useState<number>(0);

	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState<number>(10);
	const [filter, setFilter] = useState<TaskFilter>({
		status: "",
		title: "",
		userId: 0,
	});

	const tasksPages = Math.ceil(tasks.length / pageSize);

	const getTasks = useCallback(async () => {
		setLoadingTasks(true);
		setErrorTasks(null);
		try {
			const data = await fetchTasks();
			setTasks(data);
			setAllTasks(data);
		} catch (error) {
			setErrorTasks("Error fetching tasks");
		} finally {
			// simulate a delay for loading state
			setTimeout(() => setLoadingTasks(false), 1000);
		}
	}, []);

	const paginateTasks = useCallback(() => {
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedTasks = tasks.slice(startIndex, endIndex);
		return paginatedTasks;
	}, [currentPage, tasks]);

	const applyTasksFilter = useCallback(
		(filter: TaskFilter) => {
			const filteredTasks = allTasks.filter((task) => {
				const matchesStatus = filter.status
					? filter.status === "completed"
						? task.completed
						: !task.completed
					: true;
				const matchesTitle = filter.title
					? task.title
							.toLowerCase()
							.includes(filter.title.toLowerCase())
					: true;
				const matchesUserId = filter.userId
					? task.userId === filter.userId
					: true;
				return matchesStatus && matchesTitle && matchesUserId;
			});
			setTasks(filteredTasks);
		},
		[filter]
	);

	const updateTaskData = useCallback(
		async (taskData: Task) => {
			setUpdatingTaskId(taskData.id);
			try {
				updateTask(taskData);
				const updatedTasks = tasks.map((task) =>
					task.id === taskData.id
						? { ...task, completed: taskData.completed }
						: task
				);
				// Simulate a delay
				setTimeout(() => setTasks(updatedTasks), 1000);

				setAllTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === taskData.id
							? { ...task, completed: taskData.completed }
							: task
					)
				);
			} catch (error) {
				setErrorTasks("Failed to update task status");
			} finally {
				setTimeout(() => setUpdatingTaskId(0), 1000);
			}
		},
		[tasks]
	);

	useEffect(() => {
		getTasks();
	}, [getTasks]);

	useEffect(() => {
		applyTasksFilter(filter);
	}, [filter, applyTasksFilter]);

	return {
		tasks: paginateTasks(),
		loadingTasks,
		errorTasks,
		setCurrentPage,
		setPageSize,
		tasksPages,
		setFilter,
		updateTaskData,
		updatingTaskId,
	};
}
