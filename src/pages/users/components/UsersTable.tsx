import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { User, Users } from "../../../types";
import UserEdit from "./UserEdit";
import UserInfo from "./UserInfo";
import { updateUser } from "../../../store/slices/userSlice";

type Props = {
	users: Users;
};

const UsersTable: React.FC<Props> = ({ users }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [viewEditUser, setViewEditUser] = useState<boolean>(false);

	const handleEditUser = () => {
		setViewEditUser(!viewEditUser);
	};

	const handleUpdateUserData = (newUserData: User) => {
		// update backend data
		dispatch(updateUser(newUserData));
		setViewEditUser(false);
	};

	return (
		<div className="accordion" id="usersAccordion">
			{users.map((user) => (
				<div className="accordion-item" key={user.id}>
					<h2 className="accordion-header" id={`heading-${user.id}`}>
						<button
							className="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target={`#collapse-${user.id}`}
							aria-expanded="false"
							aria-controls={`collapse-${user.id}`}
						>
							<span className="badge text-bg-primary me-2">
								{user.id}
							</span>{" "}
							{user.name}
						</button>
					</h2>
					<div
						id={`collapse-${user.id}`}
						className="accordion-collapse collapse"
						aria-labelledby={`heading-${user.id}`}
						data-bs-parent="#usersAccordion"
					>
						<div className="accordion-body position-relative">
							{viewEditUser ? (
								<>
									<UserEdit
										userData={user}
										onSubmit={handleUpdateUserData}
										onClose={() => setViewEditUser(false)}
									/>
									<a
										className="btn btn-link btn-sm my-2 mx-4 text-danger position-absolute top-0 end-0 z-10"
										onClick={() => setViewEditUser(false)}
									>
										<i className="bi bi-x-lg"></i>
									</a>
								</>
							) : (
								<>
									<UserInfo userData={user} />
									<div className="mt-2">
										<Link
											className="btn btn-primary btn-sm me-1"
											to={`/users/${user.id}`}
										>
											View posts
										</Link>
										<div
											className="btn btn-link btn-sm m-4 text-danger position-absolute top-0 end-0 z-10"
											onClick={handleEditUser}
										>
											Edit
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default UsersTable;
