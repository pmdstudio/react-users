import React from "react";
import UsersTable from "./components/UsersTable";
import { Loading } from "../../components";

import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const UsersPage: React.FC = () => {
	const users = useSelector((state: RootState) => state.users.users);
	const loadingUsers = useSelector(
		(state: RootState) => state.users.loadingUsers
	);

	return (
		<>
			<div className="container position-relative h-100 p-0">
				{loadingUsers && <Loading text="Loading users ..." />}
				<h2 className="my-4">
					<i className="bi bi-person me-2"></i>Users
				</h2>
				<UsersTable users={users} />
			</div>
		</>
	);
};

export default UsersPage;
