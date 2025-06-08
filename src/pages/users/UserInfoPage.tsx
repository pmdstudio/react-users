import React, { useEffect, useState } from "react";
import { User } from "../../types";
import UserPosts from "./components/UserPosts";
import UserInfo from "./components/UserInfo";
import UserEdit from "./components/UserEdit";
import { Loading } from "../../components";
import { useUsers } from "../../contexts/UsersContext";
import { usePosts } from "../../contexts/PostsContext";
import { useParams } from "react-router-dom";

const UserInfoPage = () => {
	const { userId } = useParams();
	const { getUser, updateUser, errorUser, loadingUser } = useUsers();
	const { posts, loadingPosts, errorPosts, deletePostInfo, updatePostInfo } =
		usePosts();

	const [userData, setUserData] = useState<User | null>(null);

	const [viewEditUser, setViewEditUser] = React.useState<boolean>(false);

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
		if (errorUser) {
			console.error("Error fetching user info:", errorUser);
		}
		if (errorPosts) {
			console.error("Error fetching posts:", errorPosts);
		}
	}, [errorPosts, errorUser]);

	useEffect(() => {
		if (userId) {
			const fetchUser = async () => {
				const user = await getUser(userId);
				setUserData(user);
			};
			fetchUser();
		}
	}, [userId]);

	return (
		<>
			<div className='container position-relative p-0'>
				{loadingUser || (loadingPosts && <Loading />)}
				<div className='row'>
					<div className='col position-relative'>
						{viewEditUser && userData && (
							<>
								<div className='card mb-1'>
									<div className='card-body'>
										<UserEdit
											userData={userData}
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
						{!viewEditUser && userData && (
							<>
								<UserInfo userData={userData} />
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
