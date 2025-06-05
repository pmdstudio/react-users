export type Task = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export type Tasks = Task[];
export type TaskStatus = "completed" | "pending";

export type TaskFilter = {
	completed: number | undefined;
	title: string;
	userId: number;
};
export const taskStatuses: { value: number; title: string }[] = [
	{ value: 0, title: "Pending" },
	{ value: 1, title: "Completed" },
];
