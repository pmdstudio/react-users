import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Breadcrumbs, Navbar } from "./components";

const App = () => {
	return (
		<>
			<Navbar />
			<div className='container position-relative overflow-hidden flex flex-grow-1 py-5'>
				<Breadcrumbs />
				<AppRoutes />
			</div>

			<footer className='footer mt-auto py-3 bg-body-tertiary'>
				<div className='container text-center'>
					<span className='text-body-secondary'>
						develop by <strong>Marin Petrov</strong>, petrovm@abv.bg
					</span>
				</div>
			</footer>
		</>
	);
};

export default App;
