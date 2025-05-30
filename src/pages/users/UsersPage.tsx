import React from 'react';
import { useParams } from 'react-router-dom';
import { useUsers } from '../../hooks';
import UserInfo from './components/UserInfo';
import UsersTable from './components/UsersTable';

const UsersPage: React.FC = () => {
	const { users, loading, error } = useUsers();
	const { userId } = useParams();

	if (loading) {
		return <p className="text-center mt-4">Loading users...</p>;
	}

	if (error) {
		return <p className="text-danger text-center mt-4">Error: {error}</p>;
	}

	if (userId) {
		return <UserInfo />;
	}

	return <UsersTable users={users} />;
};

export default UsersPage;