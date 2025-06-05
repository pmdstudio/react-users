import { Link } from "react-router-dom";
import React, { useState } from "react";
import { User, Users } from "../../../types";
import UserEdit from "./UserEdit";
import { useUsersManager } from "../../../hooks";
import UserInfo from "./UserInfo";

type Props = {
	users: Users;
	onChange: (user: User) => void;
};

const UsersTable: React.FC<Props> = ({ users, onChange }) => {
	const [viewEditUser, setViewEditUser] = useState<boolean>(false);
	const { updateUser } = useUsersManager();

	const handleEditUser = () => {
		setViewEditUser(!viewEditUser);
	};

	const handleUpdateUserData = (newUserData: User) => {
		// simulate backend update
		updateUser(newUserData);
		// simulate frontend update in the parent component
		onChange(newUserData);
		// close the edit view
		handleEditUser();
	};

	return (
		<>
			<h2>
				<i className='bi bi-person me-4'></i>Users
			</h2>
			<div className='accordion' id='usersAccordion'>
				{users.map((user) => (
					<div className='accordion-item' key={user.id}>
						<h2
							className='accordion-header'
							id={`heading-${user.id}`}>
							<button
								className='accordion-button collapsed'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target={`#collapse-${user.id}`}
								aria-expanded='false'
								aria-controls={`collapse-${user.id}`}>
								<span className='badge text-bg-primary me-2'>
									{user.id}
								</span>{" "}
								{user.name}
							</button>
						</h2>
						<div
							id={`collapse-${user.id}`}
							className='accordion-collapse collapse'
							aria-labelledby={`heading-${user.id}`}
							data-bs-parent='#usersAccordion'>
							<div className='accordion-body'>
								{viewEditUser && (
									<UserEdit
										userData={user}
										onSubmit={handleUpdateUserData}
										onClose={() => setViewEditUser(false)}
									/>
								)}
								{!viewEditUser && (
									<>
										<UserInfo userData={user} />
										<div className='mt-2'>
											<Link
												className='btn btn-primary btn-sm me-1'
												to={`/users/${user.id}`}>
												View posts
											</Link>
											<div
												className='btn btn-link text-danger btn-sm'
												onClick={handleEditUser}>
												Edit user
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default UsersTable;
