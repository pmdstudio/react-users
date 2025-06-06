import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
{
	/* <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-3'>
				<div className='container'>
					<a className='navbar-brand' href='/'>
						React Users
					</a>
					<div className='navbar-nav'>
						<Link className='nav-link' to='/users'>
							Users
						</Link>
						<Link className='nav-link' to='/tasks'>
							Tasks
						</Link>
					</div>
				</div>
			</nav> */
}

const Navbar: React.FC = () => (
	<nav className='navbar navbar-expand-lg navbar-dark bg-dark px-3'>
		<div className='container'>
			<Link className='navbar-brand' to='/'>
				<img
					src={logo}
					height='50'
					className='me-4 d-inline-block align-text-center'
				/>
				React Users
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				data-bs-toggle='collapse'
				data-bs-target='#navbar'
				aria-controls='navbar'
				aria-expanded='false'
				aria-label='Toggle navigation'>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse' id='navbar'>
				<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
					<li className='nav-item'>
						<Link className='nav-link' to='/'>
							Home
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/users'>
							Users
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/tasks'>
							Tasks
						</Link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
);

export default Navbar;
