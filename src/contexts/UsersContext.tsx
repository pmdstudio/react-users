import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	ReactNode,
} from "react";
import { fetchUsers, getUserInfo, updateUserInfo } from "../services";
import { User } from "../types";

interface UsersContextType {
	users: User[];
	loadingUsers: boolean;
	loadingUser: boolean;
	updatingUser: boolean;
	errorUsers: string | null;
	errorUser: string | null;
	errorUserUpdate: string | null;
	getUsers: () => Promise<void>;
	updateUser: (data: User) => Promise<void>;
	getUser: (userId: string) => Promise<User | null>;
	selectedUser: User;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUser, setSelectedUser] = useState<User>({} as User);

	const [loadingUsers, setLoadingUsers] = useState(true);
	const [loadingUser, setLoadingUser] = useState(true);
	const [updatingUser, setUpdatingUser] = useState(false);

	const [errorUsers, setErrorUsers] = useState<string | null>(null);
	const [errorUser, setErrorUser] = useState<string | null>(null);
	const [errorUserUpdate, setErrorUserUpdate] = useState<string | null>(null);

	const getUsers = useCallback(async () => {
		setLoadingUsers(true);
		setErrorUsers(null);
		try {
			const data = await fetchUsers();
			setUsers(data);
		} catch {
			setErrorUsers("Error fetching users");
		} finally {
			// simulate delay
			setTimeout(() => setLoadingUsers(false), 1000);
		}
	}, []);

	const updateUser = async (data: User) => {
		setUpdatingUser(true);
		try {
			const updatedUser = await updateUserInfo(data);
			setUsers((prev) =>
				prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
			);
		} catch {
			setErrorUserUpdate("Failed to update user information");
		} finally {
			setTimeout(() => setUpdatingUser(false), 1000);
		}
	};

	const getUser = async (userId: string): Promise<User | null> => {
		setLoadingUser(true);
		try {
			const user = await getUserInfo(userId);
			setSelectedUser(user);
			return user;
		} catch {
			setErrorUser("Failed to fetch user info");
			return null;
		} finally {
			setTimeout(() => setLoadingUser(false), 1000);
		}
	};

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	return (
		<UsersContext.Provider
			value={{
				users,
				loadingUsers,
				loadingUser,
				updatingUser,
				errorUsers,
				errorUser,
				errorUserUpdate,
				getUsers,
				updateUser,
				getUser,
				selectedUser,
			}}>
			{children}
		</UsersContext.Provider>
	);
};

export const useUsers = (): UsersContextType => {
	const context = useContext(UsersContext);
	if (!context) {
		throw new Error("useUsers must be used within a UsersProvider");
	}
	return context;
};
