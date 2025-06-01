import React, { useEffect, useState } from 'react';
import { useUsers } from '../../hooks';
import UsersTable from './components/UsersTable';
import { Loading } from '../../components';
import { User } from '../../types';

const UsersPage: React.FC = () => {
	const { users, loading } = useUsers();

	const [usersList, setUsersList] = useState(users || []);

	// This effect runs when the users data is fetched or updated
	useEffect(() => {
		if (users) {
			setUsersList(users);
		}
	}, [users]);

	// This function updates the users list when a user is edited
	const updateUsersList = (updatedUser: User) => {
			setUsersList(prevUsers =>
				prevUsers.map((user) =>
					user.id === updatedUser.id
					? { ...user, ...updatedUser }
					: user
				)
			);
		};

	return (
		<>
		<div className='container position-relative h-100'>
			{loading && <Loading text='Loading users ...'/>}
			{!loading && <UsersTable users={usersList} onChange={updateUsersList} /> }
		</div>
		</>
	);
};

export default UsersPage;