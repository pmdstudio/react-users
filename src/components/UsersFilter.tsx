import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

type Props = {
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	value: number;
};

const UsersFilter: React.FC<Props> = ({ onChange, value }) => {
	const users = useSelector((state: RootState) => state.users.users);
	if (!users.length) {
		return (
			<select className="form-select form-select-sm" disabled>
				<option>Loading users...</option>
			</select>
		);
	}

	return (
		<select
			className="form-select form-select-sm"
			id="userFilter"
			name="userId"
			value={value}
			onChange={onChange}
		>
			<option value="0">All</option>
			{users.map((user) => (
				<option key={user.id} value={user.id}>
					{user.name}
				</option>
			))}
		</select>
	);
};

export default UsersFilter;
