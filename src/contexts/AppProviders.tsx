import React from "react";
import { UsersProvider } from "./UsersContext";
import { PostsProvider } from "./PostsContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
	<UsersProvider>
		<PostsProvider>{children}</PostsProvider>
	</UsersProvider>
);
