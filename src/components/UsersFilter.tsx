import React from "react";
import { useUsersManager } from "../hooks";

type Props = {
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const UsersFilter: React.FC<Props> = ({ onChange }) => {
	const { users } = useUsersManager();
	return (
		<select
			className='form-select'
			id='userFilter'
			name='userId'
			onChange={onChange}>
			<option value=''>All</option>
			{users.map((user) => (
				<option key={user.id} value={user.id}>
					{user.name}
				</option>
			))}
		</select>
	);
};

export default UsersFilter;
