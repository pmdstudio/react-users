import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../../store";
import { getUser, updateUser } from "../../store/slices/userSlice";
import {
	deletePostInfo,
	getPosts,
	updatePostInfo,
} from "../../store/slices/postsSlice";

import UserPosts from "./components/UserPosts";
import UserInfo from "./components/UserInfo";
import UserEdit from "./components/UserEdit";
import { Loading } from "../../components";
import { User } from "../../types";

const UserInfoPage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch<AppDispatch>();

	const selectedUser = useSelector((state: RootState) =>
		state.users.users.find((u) => u.id === Number(userId))
	);
	const loadingUser = useSelector(
		(state: RootState) => state.users.loadingUser
	);
	const errorUser = useSelector((state: RootState) => state.users.errorUser);

	const posts = useSelector((state: RootState) => state.posts.posts);
	const loadingPosts = useSelector(
		(state: RootState) => state.posts.loadingPosts
	);
	const errorPosts = useSelector(
		(state: RootState) => state.posts.errorPosts
	);

	const [viewEditUser, setViewEditUser] = useState(false);

	const handleEditUser = () => setViewEditUser(!viewEditUser);

	const handleUpdateUserData = (newUserData: User) => {
		dispatch(updateUser(newUserData));
		setViewEditUser(false);
	};

	useEffect(() => {
		if (userId) {
			if (userId && !selectedUser?.id) {
				dispatch(getUser(userId));
			}
			dispatch(getPosts(Number(userId)));
		}
	}, [userId, selectedUser, dispatch]);

	useEffect(() => {
		if (errorUser) console.error("Error fetching user info:", errorUser);
		if (errorPosts) console.error("Error fetching posts:", errorPosts);
	}, [errorUser, errorPosts]);

	return (
		<div className="container position-relative p-0">
			{loadingUser || loadingPosts ? <Loading /> : null}

			<div className="row">
				<div className="col position-relative">
					{viewEditUser && selectedUser && (
						<>
							<div className="card mb-1">
								<div className="card-body">
									<UserEdit
										userData={selectedUser}
										onSubmit={handleUpdateUserData}
										onClose={() => setViewEditUser(false)}
									/>
								</div>
							</div>
							<a
								className="btn btn-link btn-sm my-2 mx-4 text-danger position-absolute top-0 end-0 z-10"
								onClick={() => setViewEditUser(false)}
							>
								<i className="bi bi-x-lg"></i>
							</a>
						</>
					)}

					{!viewEditUser && selectedUser && (
						<>
							<UserInfo userData={selectedUser} />
							<div
								className="btn btn-link btn-sm my-2 mx-4 text-danger position-absolute top-0 end-0 z-10"
								onClick={handleEditUser}
							>
								Edit
							</div>
						</>
					)}
				</div>
			</div>

			<div className="row mt-4">
				<div className="col">
					<h3 className="mb-4">User posts</h3>
					{posts && (
						<UserPosts
							userPosts={posts}
							onDelete={(post) =>
								dispatch(deletePostInfo(post.id))
							}
							onUpdate={(post) => dispatch(updatePostInfo(post))}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserInfoPage;
