import React from "react";
import { Link, useParams } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
	const { userId } = useParams();

	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb p-3 bg-body-tertiary rounded-3">
				<li className="breadcrumb-item">
					<Link to="/" className="link-body-emphasis">
						<i className="bi bi-house-door-fill"></i>
						<span className="visually-hidden">Home</span>
					</Link>
				</li>
				<li className="breadcrumb-item">
					<Link
						to="/users"
						className="link-body-emphasis fw-semibold text-decoration-none"
					>
						Users
					</Link>
				</li>
				{userId && (
					<li className="breadcrumb-item active" aria-current="page">
						Posts
					</li>
				)}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
