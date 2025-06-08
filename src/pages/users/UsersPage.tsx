import React, { useEffect, useState } from "react";
import UsersTable from "./components/UsersTable";
import { Loading } from "../../components";
import { User } from "../../types";
import { useUsers } from "../../contexts/UsersContext";

const UsersPage: React.FC = () => {
	const { users, loadingUsers } = useUsers();
	const [usersList, setUsersList] = useState<User[]>([]);

	useEffect(() => {
		if (users && !loadingUsers) {
			setUsersList(users);
		}
	}, [users, loadingUsers]);

	const updateUsersList = (updatedUser: User) => {
		setUsersList((prevUsers) =>
			prevUsers.map((user) =>
				user.id === updatedUser.id ? { ...user, ...updatedUser } : user
			)
		);
	};

	return (
		<>
			<div className='container position-relative h-100 p-0'>
				{loadingUsers && <Loading text='Loading users ...' />}
				<h2 className='my-4'>
					<i className='bi bi-person me-2'></i>Users
				</h2>
				<UsersTable users={usersList} onChange={updateUsersList} />
			</div>
		</>
	);
};

export default UsersPage;
