import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postsReducer from "./slices/postsSlice";
import tasksReducer from "./slices/tasksSlice";

export const store = configureStore({
	reducer: {
		users: userReducer,
		posts: postsReducer,
		tasks: tasksReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
