import { User } from "../types";

export async function fetchUsers(): Promise<User[]> {
	try {
		const response = await fetch(
			"https://jsonplaceholder.typicode.com/users"
		);
		return Promise.resolve(response.json());
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function getUserInfo(userId: string): Promise<User> {
	if (userId === undefined) {
		throw new Error("Invalid userId");
	}

	const response = await fetch(
		`https://jsonplaceholder.typicode.com/users/${userId}`
	);
	return response.json();
}

export async function updateUserInfo(userData: User): Promise<User> {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/users/${userData.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			}
		);

		const result = await response.json();
		return result;
	} catch (error) {
		return Promise.reject(error);
	}
}
