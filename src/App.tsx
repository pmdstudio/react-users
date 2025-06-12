import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./store/slices/userSlice";
import type { AppDispatch, RootState } from "./store";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
	const dispatch = useDispatch<AppDispatch>();
	const users = useSelector((state: RootState) => state.users.users);

	useEffect(() => {
		if (users.length === 0) {
			dispatch(getUsers());
		}
	}, [dispatch, users.length]);

	return <AppRoutes />;
};

export default App;
