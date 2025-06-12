import { Task, Tasks } from "../types";

export async function fetchTasks(): Promise<Tasks> {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/todos`
		);
		const data: Tasks = await response.json();

		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function updateTask(taskData: Task): Promise<Task> {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/todos/${taskData.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(taskData),
			}
		);

		const result = await response.json();
		return result;
	} catch (error) {
		return Promise.reject(error);
	}
}
