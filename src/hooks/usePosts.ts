/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { fetchPosts, updatePost, deletePost } from "../services";
import { useParams } from "react-router-dom";
import { Post } from "../types";
import { update } from "lodash-es";

export function usePostsManager() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loadingPosts, setLoadingPosts] = useState(true);
	const [errorPosts, setErrorPosts] = useState<string | null>(null);
	const { userId } = useParams();

	// fetch posts for specific user
	const getPosts = useCallback(async () => {
		setLoadingPosts(true);
		setErrorPosts(null);
		try {
			const data = await fetchPosts(Number(userId));
			setPosts(data);
		} catch (error) {
			setErrorPosts("Error fetching posts");
		} finally {
			// simulate a delay for loading state
			setTimeout(() => setLoadingPosts(false), 1000);
		}
	}, []);

	// update post data
	const updatePostInfo = async (data: Post) => {
		setLoadingPosts(true);
		try {
			updatePost(data);
			// Update the posts in the state
			setPosts((prevPosts) =>
				prevPosts.map((post) => (post.id === data.id ? data : post))
			);
		} catch (error) {
			setErrorPosts("Failed to update posts");
		} finally {
			setTimeout(() => setLoadingPosts(false), 1000);
		}
	};

	const deletePostInfo = async (post: Post) => {
		try {
			deletePost(post.id);
			// Remove the post from the state
			setPosts((prev) => prev.filter((item) => item.id !== post.id));
		} catch (err) {
			setErrorPosts("Failed to delete post");
		}
	};

	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return {
		posts,
		loadingPosts,
		errorPosts,
		getPosts,
		updatePostInfo,
		deletePostInfo,
	};
}
