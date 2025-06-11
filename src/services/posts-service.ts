import { Post } from "../types";

export async function fetchPosts(userId: number): Promise<Post[]> {
	if (!userId || typeof userId !== "number") {
		throw new Error("No userId provided. It must be a number.");
	}

	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts?userId=${userId}`
		);
		const data: Post[] = await response.json();

		return Promise.resolve(data);
	} catch (error) {
		return Promise.reject(error);
	}
}

export async function updatePost(postData: Post): Promise<Post> {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${postData.id}`,
			{
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(postData),
			}
		);

		return await response.json();
	} catch (error) {
		return Promise.reject(error);
	}
}
export async function deletePost(postId: number): Promise<void> {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${postId}`,
			{
				method: "DELETE",
			}
		);
		return Promise.resolve(response.json());
	} catch (error) {
		return Promise.reject(error);
	}
}
