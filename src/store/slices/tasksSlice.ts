import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	createSelector,
} from "@reduxjs/toolkit";
import { fetchTasks, updateTask } from "../../services";
import { Task, TaskFilter, TaskWithUser } from "../../types";
import { RootState } from "..";
import { getUsers } from "./userSlice";

interface TasksState {
	allTasks: TaskWithUser[];
	tasks: TaskWithUser[];
	loadingTasks: boolean;
	errorTasks: string | null;
	updatingTaskId: number;
	currentPage: number;
	pageSize: number;
	tasksPages: number;
	filter: TaskFilter;
}

const initialState: TasksState = {
	allTasks: [],
	tasks: [],
	loadingTasks: true,
	errorTasks: null,
	updatingTaskId: 0,
	currentPage: 1,
	pageSize: 10,
	tasksPages: 1,
	filter: {} as TaskFilter,
};

export const getTasks = createAsyncThunk<
	TaskWithUser[],
	void,
	{ state: RootState }
>("tasks/getTasks", async (_, { getState, dispatch }) => {
	const state = getState();
	let users = state.users.users;

	if (users.length === 0) {
		const resultAction = await dispatch(getUsers());

		if (getUsers.fulfilled.match(resultAction)) {
			users = resultAction.payload;
		} else {
			throw new Error("Failed to fetch users before fetching tasks.");
		}
	}

	const fetchedTasks = await fetchTasks();
	const tasksWithUsers = fetchedTasks.map((task) => ({
		...task,
		user:
			users.find((user) => Number(user.id) === Number(task.userId)) ??
			null,
	}));

	return tasksWithUsers;
});

export const updateTaskData = createAsyncThunk<Task, Task>(
	"tasks/update",
	async (task) => {
		const updated = await updateTask(task);
		return updated;
	}
);

const filterTasks = (
	allTasks: TaskWithUser[],
	filter: TaskFilter
): TaskWithUser[] => {
	const { completed, title, userId } = filter;

	return allTasks.filter((task) => {
		const matchesStatus =
			completed === "" || completed === undefined
				? true
				: Number(task.completed) === Number(completed);

		const matchesTitle =
			title && title !== ""
				? task.title.toLowerCase().includes(title.toLowerCase())
				: true;

		const matchesUserId =
			userId && Number(userId) > 0
				? Number(task.userId) === Number(userId)
				: true;

		return matchesStatus && matchesTitle && matchesUserId;
	});
};

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setPageSize(state, action: PayloadAction<number>) {
			state.pageSize = action.payload;
			state.tasksPages = Math.ceil(state.tasks.length / state.pageSize);
		},
		setFilter(state, action: PayloadAction<TaskFilter>) {
			state.filter = action.payload;
			state.currentPage = 1;
			state.tasks = filterTasks(state.allTasks, action.payload);
			state.tasksPages = Math.ceil(state.tasks.length / state.pageSize);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getTasks.pending, (state) => {
			state.loadingTasks = true;
			state.errorTasks = null;
		});
		builder.addCase(
			getTasks.fulfilled,
			(state, action: PayloadAction<TaskWithUser[]>) => {
				state.allTasks = action.payload;
				state.tasks = filterTasks(action.payload, state.filter);
				state.tasksPages = Math.ceil(
					state.tasks.length / state.pageSize
				);
				state.loadingTasks = false;
			}
		);
		builder.addCase(getTasks.rejected, (state) => {
			state.errorTasks = "Failed to fetch tasks";
			state.loadingTasks = false;
		});
		builder.addCase(updateTaskData.pending, (state, action) => {
			state.updatingTaskId = action.meta.arg.id;
		});
		builder.addCase(updateTaskData.fulfilled, (state, action) => {
			const { id, completed } = action.payload;
			state.allTasks = state.allTasks.map((task) =>
				task.id === id ? { ...task, completed } : task
			);
			state.tasks = filterTasks(state.allTasks, state.filter);
			state.tasksPages = Math.ceil(state.tasks.length / state.pageSize);
			state.updatingTaskId = 0;
		});
		builder.addCase(updateTaskData.rejected, (state) => {
			state.errorTasks = "Failed to update task status";
			state.updatingTaskId = 0;
		});
	},
});

export const selectPaginatedTasks = createSelector(
	[
		(state: RootState) => state.tasks.tasks,
		(state: RootState) => state.tasks.currentPage,
		(state: RootState) => state.tasks.pageSize,
	],
	(tasks, currentPage, pageSize) => {
		const start = (currentPage - 1) * pageSize;
		const end = start + pageSize;
		return tasks.slice(start, end);
	}
);

export const { setCurrentPage, setPageSize, setFilter } = tasksSlice.actions;

export default tasksSlice.reducer;
