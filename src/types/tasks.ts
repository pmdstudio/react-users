import { User } from "./users";

export type Task = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export type TaskWithUser = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
	user: User | null;
};

export type Tasks = Task[];
export type TaskStatus = "completed" | "pending";

export const TASK_STATUS = {
	completed: "Completed",
	pending: "Pending",
};

export type TaskFilter = {
	completed: number | string;
	title: string;
	userId: number;
};
