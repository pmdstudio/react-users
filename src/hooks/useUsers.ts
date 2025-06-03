/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { fetchUsers, updateUserInfo, getUserInfo } from "../services";
import { User } from "../types";
import { useParams } from "react-router-dom";

export function useUsersManager() {
	const [users, setUsers] = useState<User[]>([]);
	const [loadingUsers, setLoadingUsers] = useState(true);
	const [errorUsers, setErrorUsers] = useState<string | null>(null);

	const getUsers = useCallback(async () => {
		setLoadingUsers(true);
		setErrorUsers(null);
		try {
			const data = await fetchUsers();
			setUsers(data);
		} catch (error) {
			setErrorUsers("Error fetching users");
		} finally {
			// simulate a delay for loading state
			setTimeout(() => setLoadingUsers(false), 1000);
		}
	}, []);

	const updateUser = async (data: User) => {
		setLoadingUsers(true);
		try {
			const updatedUser = await updateUserInfo(data);

			// Update the user in the state
			setUsers((prevUsers) =>
				prevUsers.map((user) =>
					user.id === updatedUser.id ? updatedUser : user
				)
			);
		} catch (error) {
			setErrorUsers("Failed to update user information");
		} finally {
			// simulate a delay for loading state
			setTimeout(() => setLoadingUsers(false), 1000);
		}
	};

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	return { users, loadingUsers, errorUsers, getUsers, updateUser };
}

export function useUserInfo() {
	const { userId } = useParams();

	const [loadingUserInfo, setLoadingUserInfo] = useState<boolean>(true);
	const [errorUserInfo, setErrorUserInfo] = useState<string | null>(null);
	const [userInfo, setUserInfo] = useState<User>({} as User);

	useEffect(() => {
		if (userId !== undefined && !isNaN(Number(userId))) {
			setLoadingUserInfo(true);
			getUserInfo(userId)
				.then((data) => setUserInfo(data))
				.catch((err) => setErrorUserInfo(err.message))
				.finally(() => setLoadingUserInfo(false));
		} else {
			setLoadingUserInfo(false);
		}
	}, [userId]);

	return { userInfo, loadingUserInfo, errorUserInfo };
}
