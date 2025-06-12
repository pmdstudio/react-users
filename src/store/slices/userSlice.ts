// src/store/slices/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, getUserInfo, updateUserInfo } from "../../services";
import { User } from "../../types";

// Async actions
export const getUsers = createAsyncThunk("users/getUsers", async () => {
	return await fetchUsers();
});

export const getUser = createAsyncThunk(
	"users/getUser",
	async (userId: string) => {
		return await getUserInfo(userId);
	}
);

export const updateUser = createAsyncThunk(
	"users/updateUser",
	async (data: User) => {
		const updatedUser = await updateUserInfo(data);
		return updatedUser;
	}
);

// State type
interface UserState {
	users: User[];
	selectedUser: User | null;
	loadingUsers: boolean;
	loadingUser: boolean;
	updatingUser: boolean;
	errorUsers: string | null;
	errorUser: string | null;
	errorUserUpdate: string | null;
}

const initialState: UserState = {
	users: [],
	selectedUser: null,
	loadingUsers: false,
	loadingUser: false,
	updatingUser: false,
	errorUsers: null,
	errorUser: null,
	errorUserUpdate: null,
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// getUsers
		builder.addCase(getUsers.pending, (state) => {
			state.loadingUsers = true;
			state.errorUsers = null;
		});
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.users = action.payload;
			state.loadingUsers = false;
		});
		builder.addCase(getUsers.rejected, (state) => {
			state.errorUsers = "Error fetching users";
			state.loadingUsers = false;
		});

		// getUser
		builder.addCase(getUser.pending, (state) => {
			state.loadingUser = true;
			state.errorUser = null;
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.selectedUser = action.payload;
			state.loadingUser = false;
		});
		builder.addCase(getUser.rejected, (state) => {
			state.errorUser = "Failed to fetch user info";
			state.loadingUser = false;
		});

		// updateUser
		builder.addCase(updateUser.pending, (state) => {
			state.updatingUser = true;
			state.errorUserUpdate = null;
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			const updatedUser = action.payload;

			state.users = state.users.map((user) =>
				user.id === updatedUser.id ? updatedUser : user
			);

			if (state.selectedUser?.id === updatedUser.id) {
				state.selectedUser = updatedUser;
			}

			state.updatingUser = false;
			state.errorUserUpdate = null;
		});
		builder.addCase(updateUser.rejected, (state) => {
			state.errorUserUpdate = "Failed to update user information";
			state.updatingUser = false;
		});
	},
});

export default userSlice.reducer;
