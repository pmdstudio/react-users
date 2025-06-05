import { useUserInfo, usePostsManager, useUsersManager } from "../../hooks";
import React, { useEffect, useState } from "react";
import { User } from "../../types";
import UserPosts from "./components/UserPosts";
import UserInfo from "./components/UserInfo";
import UserEdit from "./components/UserEdit";
import { Loading } from "../../components";

const UserInfoPage = () => {
	const { userInfo, loadingUserInfo, errorUserInfo } = useUserInfo();
	const [userData, setUserData] = useState<User | null>(null);

	const { posts, loadingPosts, errorPosts, deletePostInfo, updatePostInfo } =
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
			<div className='container position-relative p-0'>
				{(loadingUserInfo || loadingPosts) && <Loading />}
				<div className='row'>
					<div className='col position-relative'>
						{viewEditUser && (
							<>
								<div className='card mb-1'>
									<div className='card-body'>
										<UserEdit
											userData={userData || userInfo}
											onSubmit={handleUpdateUserData}
											onClose={() =>
												setViewEditUser(false)
											}
										/>
									</div>
								</div>
								<a
									className='btn btn-link btn-sm my-2 mx-4 text-danger position-absolute top-0 end-0 z-10'
									onClick={() => setViewEditUser(false)}>
									<i className='bi bi-x-lg'></i>
								</a>
							</>
						)}
						{!viewEditUser && (
							<>
								<UserInfo userData={userData || userInfo} />
								<div
									className='btn btn-link btn-sm my-2 mx-4 text-danger position-absolute top-0 end-0 z-10'
									onClick={handleEditUser}>
									Edit
								</div>
							</>
						)}
					</div>
				</div>
				<div className='row mt-4'>
					<div className='col'>
						<h3 className='mb-4'>User posts</h3>
						{posts && (
							<UserPosts
								userPosts={posts}
								onDelete={deletePostInfo}
								onUpdate={updatePostInfo}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfoPage;
