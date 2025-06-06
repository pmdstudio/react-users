import React from "react";
import { User } from "../../../types";

type Props = {
	userData: User;
};

const getUserAbbreviation = (name?: string) => {
	if (!name) return "";
	return name
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase())
		.join("");
};

const UserInfo: React.FC<Props> = ({ userData }) => {
	const abbr = getUserAbbreviation(userData.name);
	if (
		!userData ||
		!userData.name ||
		!userData.username ||
		!userData.email ||
		!userData.address
	) {
		return;
	}

	return (
		<div className='card mb-1'>
			<div className='card-body d-flex align-items-center'>
				<img
					src={`https://placehold.co/80x80?text=${abbr}`}
					alt={userData.name}
					className='rounded-circle me-3'
				/>
				<div className='flex-grow-1'>
					<div className='row'>
						<div className='col-md-5'>
							<h4 className='card-title mb-1'>{userData.name}</h4>
							<h6 className='card-subtitle mb-2 text-muted'>
								@{userData.username}
							</h6>
						</div>
						<div className='col-md-7'>
							<i className='bi bi-envelope'></i> {userData.email}
							<br />
							<i className='bi bi-geo-alt'></i>{" "}
							{`${userData.address.street}, ${userData.address.suite}, ${userData.address.city}`}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
