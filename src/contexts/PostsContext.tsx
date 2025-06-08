import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
	useEffect,
} from "react";
import { fetchPosts, updatePost, deletePost } from "../services";
import { Post } from "../types";
import { useParams } from "react-router-dom";

interface PostsContextType {
	posts: Post[];
	getPosts: () => Promise<Post[] | null | undefined>;
	updatePostInfo: (post: Post) => Promise<void>;
	deletePostInfo: (post: Post) => Promise<void>;

	loadingPosts: boolean;
	updatingPost: boolean;
	deletingPost: boolean;

	errorPosts: string | null;
	errorUpdatePost: string | null;
	errorDeletePost: string | null;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
	const { userId } = useParams();
	const [posts, setPosts] = useState<Post[]>([]);

	const [loadingPosts, setLoadingPosts] = useState(true);
	const [updatingPost, setUpdatingPost] = useState(false);
	const [deletingPost, setDeletingPost] = useState(false);

	const [errorPosts, setErrorPosts] = useState<string | null>(null);
	const [errorUpdatePost, setErrorUpdatePost] = useState<string | null>(null);
	const [errorDeletePost, setErrorDeletePost] = useState<string | null>(null);

	const getPosts = useCallback(async () => {
		setLoadingPosts(true);
		setErrorPosts(null);
		try {
			const data = await fetchPosts(Number(userId));
			setPosts(data);
			return data;
		} catch {
			setErrorPosts("Error fetching posts");
			return null;
		} finally {
			setTimeout(() => setLoadingPosts(false), 1000);
		}
	}, [userId]);

	const updatePostInfo = async (updatedPost: Post) => {
		setUpdatingPost(true);
		setErrorUpdatePost(null);
		try {
			await updatePost(updatedPost);
			setPosts((prev) =>
				prev.map((post) =>
					post.id === updatedPost.id ? updatedPost : post
				)
			);
		} catch {
			setErrorUpdatePost("Failed to update post");
		} finally {
			setTimeout(() => setUpdatingPost(false), 500);
		}
	};

	const deletePostInfo = async (post: Post) => {
		setDeletingPost(true);
		setErrorDeletePost(null);
		try {
			await deletePost(post.id);
			setPosts((prev) => prev.filter((p) => p.id !== post.id));
		} catch {
			setErrorDeletePost("Failed to delete post");
		} finally {
			setTimeout(() => setDeletingPost(false), 500);
		}
	};

	useEffect(() => {
		if (userId) {
			getPosts();
		}
	}, [userId]);

	return (
		<PostsContext.Provider
			value={{
				posts,
				getPosts,
				updatePostInfo,
				deletePostInfo,
				loadingPosts,
				updatingPost,
				deletingPost,
				errorPosts,
				errorUpdatePost,
				errorDeletePost,
			}}>
			{children}
		</PostsContext.Provider>
	);
};

export const usePosts = (): PostsContextType => {
	const context = useContext(PostsContext);
	if (!context) {
		throw new Error("usePosts must be used within a PostsProvider");
	}
	return context;
};
