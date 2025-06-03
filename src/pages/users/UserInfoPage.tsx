import { useUserInfo, usePostsManager, useUsersManager } from "../../hooks";
import React, { useEffect, useState } from "react";
import { User } from "../../types";
import UserPosts from "./components/UserPosts";
import UserInfo from "./components/UserInfo";
import UserEdit from "./components/UserEdit";
import { Breadcrumbs, Loading } from "../../components";

const UserInfoPage = () => {
	const { userInfo, loadingUserInfo, errorUserInfo } = useUserInfo();
	const [userData, setUserData] = useState<User | null>(null);

	const { posts, loadingPosts, errorPosts, deletePostInfo } =
		usePostsManager();

	const [viewEditUser, setViewEditUser] = React.useState<boolean>(false);
	const { updateUser } = useUsersManager();

	const handleEditUser = () => {
		setViewEditUser(!viewEditUser);
	};
	const handleUpdateUserData = (newUserData: User) => {
		// backend update
		updateUser(newUserData);
		// frontend update
		setUserData(newUserData);
		handleEditUser();
	};

	useEffect(() => {
		if (errorUserInfo) {
			console.error("Error fetching user info:", errorUserInfo);
		}
		if (errorPosts) {
			console.error("Error fetching posts:", errorPosts);
		}
	}, [errorPosts, errorUserInfo]);

	return (
		<>
			<Breadcrumbs />
			<div className='container position-relative'>
				{(loadingUserInfo || loadingPosts) && <Loading />}
				<div className='row'>
					<div className='col'>
						{viewEditUser && (
							<UserEdit
								userData={userData || userInfo}
								onSubmit={handleUpdateUserData}
								onClose={() => setViewEditUser(false)}
							/>
						)}
						{!viewEditUser && (
							<>
								<UserInfo userData={userData || userInfo} />
								<div
									className='btn btn-link text-danger'
									onClick={handleEditUser}>
									Edit user
								</div>
							</>
						)}
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<h2>User posts</h2>
						{posts && (
							<UserPosts
								userPosts={posts}
								onDelete={deletePostInfo}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfoPage;
