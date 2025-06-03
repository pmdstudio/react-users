import React from "react";
import { Post } from "../../../types";
import { DeleteConfirmationModal } from "../../../components/";

type Props = {
	userPosts: Post[];
	onDelete: (post: Post) => void;
};

const UserPosts: React.FC<Props> = ({ userPosts, onDelete }) => {
	const [deletePost, setDeletePost] = React.useState<Post>();
	// const [viewEditPost, setViewEditPost] = React.useState<boolean>(false);
	const [viewDeletePost, setViewDeletePost] = React.useState<boolean>(false);

	const handleEditPost = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// Logic to handle post editing can be added here
		console.log("Edit post clicked");
	};

	const handleConfirmDelete = (post: Post) => {
		setDeletePost(post);
		setViewDeletePost(true);
	};

	const handleDeletePost = () => {
		if (deletePost === undefined) return;
		onDelete(deletePost);
		setViewDeletePost(false);
		setDeletePost(undefined);
	};

	return (
		<>
			<div className='table-responsive'>
				<table className='table table-hover'>
					<thead className='table-light'>
						<tr>
							<th scope='col' style={{ width: "100px" }}></th>
							<th scope='col'>Title</th>
							<th scope='col' style={{ width: "100px" }}></th>
						</tr>
					</thead>
					<tbody>
						{userPosts.map((post) => (
							<tr key={post.id}>
								<td>
									<span
										className={`badge bg-${post.completed ? "success" : "warning"}`}>
										{post.completed
											? "Completed"
											: "Pending"}
									</span>
								</td>
								<td>{post.title}</td>
								<td>
									<button
										className='btn btn-primary btn-sm'
										onClick={handleEditPost}>
										<i className='bi bi-pencil'></i>
									</button>
									<button
										className='btn btn-danger btn-sm ms-2'
										onClick={() =>
											handleConfirmDelete(post)
										}>
										<i className='bi bi-x'></i>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{viewDeletePost && (
				<DeleteConfirmationModal
					show={true}
					onClose={() => setViewDeletePost(false)}
					onDeleteConfirm={handleDeletePost}
					itemName={deletePost?.title || "this post"}
				/>
			)}
		</>
	);
};

export default UserPosts;
