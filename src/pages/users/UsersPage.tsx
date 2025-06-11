import React, { useEffect } from "react";
import UsersTable from "./components/UsersTable";
import { Loading } from "../../components";

import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/slices/userSlice";
import type { RootState, AppDispatch } from "../../store";

const UsersPage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const users = useSelector((state: RootState) => state.users.users);
	const loadingUsers = useSelector(
		(state: RootState) => state.users.loadingUsers
	);

	useEffect(() => {
		if (users.length === 0) {
			dispatch(getUsers());
		}
	}, [dispatch, users]);

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
