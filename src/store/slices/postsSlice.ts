// store/slices/postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts, deletePost, updatePost } from "../../services";
import { Post } from "../../types";

interface PostsState {
	posts: Post[];
	loadingPosts: boolean;
	updatingPost: boolean;
	errorPosts: string | null;
	errorUpdate: string | null;
}

const initialState: PostsState = {
	posts: [],
	loadingPosts: false,
	updatingPost: false,
	errorPosts: null,
	errorUpdate: null,
};

// Thunks
export const getPosts = createAsyncThunk<Post[], number>(
	"posts/getPosts",
	async (userId) => await fetchPosts(userId)
);

export const deletePostInfo = createAsyncThunk<number, number>(
	"posts/deletePostInfo",
	async (postId) => {
		await deletePost(postId);
		return postId;
	}
);

export const updatePostInfo = createAsyncThunk<Post, Post>(
	"posts/updatePostInfo",
	async (post) => await updatePost(post)
);

// Slice
const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// GET POSTS
		builder.addCase(getPosts.pending, (state) => {
			state.loadingPosts = true;
			state.errorPosts = null;
		});
		builder.addCase(
			getPosts.fulfilled,
			(state, action: PayloadAction<Post[]>) => {
				const incoming = action.payload;
				const incomingMap = new Map(incoming.map((p) => [p.id, p]));

				state.posts = state.posts.map((localPost) =>
					incomingMap.has(localPost.id)
						? { ...incomingMap.get(localPost.id)!, ...localPost }
						: localPost
				);

				const currentIds = new Set(state.posts.map((p) => p.id));
				incoming.forEach((post) => {
					if (!currentIds.has(post.id)) {
						state.posts.push(post);
					}
				});

				state.loadingPosts = false;
			}
		);
		builder.addCase(getPosts.rejected, (state) => {
			state.errorPosts = "Failed to fetch posts";
			state.loadingPosts = false;
		});

		// DELETE POST
		builder.addCase(
			deletePostInfo.fulfilled,
			(state, action: PayloadAction<number>) => {
				state.posts = state.posts.filter(
					(post) => Number(post.id) !== Number(action.payload)
				);
			}
		);

		// UPDATE POST
		builder.addCase(updatePostInfo.pending, (state) => {
			state.updatingPost = true;
			state.errorUpdate = null;
		});
		builder.addCase(
			updatePostInfo.fulfilled,
			(state, action: PayloadAction<Post>) => {
				state.posts = state.posts.map((p) =>
					p.id === action.payload.id ? action.payload : p
				);
				state.updatingPost = false;
			}
		);
		builder.addCase(updatePostInfo.rejected, (state) => {
			state.errorUpdate = "Failed to update post";
			state.updatingPost = false;
		});
	},
});

export default postsSlice.reducer;
