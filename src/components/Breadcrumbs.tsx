import React from "react";
import { useParams } from "react-router-dom";

const Breadcrumbs = () => {
	const { userId } = useParams();

	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb p-3 bg-body-tertiary rounded-3'>
				<li className='breadcrumb-item'>
					<a className='link-body-emphasis' href='/'>
						<i className='bi bi-house-door-fill'></i>
						<span className='visually-hidden'>Home</span>
					</a>
				</li>
				<li className='breadcrumb-item'>
					<a
						className='link-body-emphasis fw-semibold text-decoration-none'
						href='/users'>
						Users
					</a>
				</li>
				{userId && (
					<li className='breadcrumb-item active' aria-current='page'>
						Posts
					</li>
				)}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
