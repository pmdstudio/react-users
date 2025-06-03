import React, { useEffect, useState } from "react";
import { useUsersManager } from "../../hooks";
import UsersTable from "./components/UsersTable";
import { Breadcrumbs, Loading } from "../../components";
import { User } from "../../types";

const UsersPage: React.FC = () => {
	const { users, loadingUsers } = useUsersManager();

	const [usersList, setUsersList] = useState<User[]>([]);

	// This effect runs when the users data is fetched or updated
	useEffect(() => {
		if (users && !loadingUsers) {
			setUsersList(users);
		}
	}, [users, loadingUsers]);

	// This function updates the users list when a user is edited
	const updateUsersList = (updatedUser: User) => {
		setUsersList((prevUsers) =>
			prevUsers.map((user) =>
				user.id === updatedUser.id ? { ...user, ...updatedUser } : user
			)
		);
	};

	return (
		<>
			<Breadcrumbs />
			<div className='container position-relative h-100'>
				{loadingUsers && <Loading text='Loading users ...' />}
				<UsersTable users={usersList} onChange={updateUsersList} />
			</div>
		</>
	);
};

export default UsersPage;
