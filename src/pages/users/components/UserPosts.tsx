import React from "react";
import { Post } from "../../../types";
import { DeleteConfirmationModal } from "../../../components/";
import { EditableTitle } from "./EditableTitle";

type Props = {
	userPosts: Post[];
	onDelete: (post: Post) => void;
	onUpdate: (post: Post) => void;
};

const UserPosts: React.FC<Props> = ({ userPosts, onDelete, onUpdate }) => {
	const [deletePost, setDeletePost] = React.useState<Post>();
	const [viewDeletePost, setViewDeletePost] = React.useState<boolean>(false);

	const handleEditPost = (post: Post, title: string) => {
		const updatedPost = { ...post, title };
		onUpdate(updatedPost);
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
			<div className='table-responsive card'>
				<table className='table table-hover m-0'>
					<thead className='table-light'>
						<tr>
							<th
								scope='col'
								className='text-end'
								style={{ width: "50px" }}>
								#
							</th>
							<th scope='col'>Title</th>
							<th scope='col' style={{ width: "100px" }}>
								Status
							</th>
							<th scope='col' style={{ width: "50px" }}></th>
						</tr>
					</thead>
					<tbody>
						{userPosts.map((post) => (
							<tr key={post.id}>
								<td>
									<div className='fw-bold text-end py-1'>
										{post.id}
									</div>
								</td>
								<td>
									<EditableTitle
										title={post.title}
										onChange={(title) =>
											handleEditPost(post, title)
										}
									/>
								</td>
								<td>
									<span
										className={`btn btn-sm btn-outline-${post.completed ? "success" : "warning"}`}>
										{post.completed
											? "Completed"
											: "Pending"}
									</span>
								</td>
								<td>
									<button
										className='btn btn-danger btn-sm'
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
