import { useUserInfo, usePosts } from '../../hooks';
import React from 'react';

const UserInfoPage: React.FC = () => {

    const { userInfo, loadingUserInfo, errorUserInfo } = useUserInfo();   
    const { posts, loadingPosts, errorPosts } = usePosts();

    if (loadingUserInfo || loadingPosts) return <p className="text-center mt-4">Loading ...</p>
    if (errorUserInfo || errorPosts) return <p className="text-danger text-center mt-4">Error: {errorUserInfo}</p>

  return (
    <div className="container mt-4">
    <div className="card mb-4 shadow-sm">
      <div className="card-body d-flex align-items-center">
        <img
        src="https://placehold.co/80x80?text=LG"
        alt={userInfo.name}
        className="rounded-circle me-3"
        />
        <div>
        <h4 className="card-title mb-1">{userInfo.name}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{userInfo.email}</h6>
        </div>
      </div>
    </div>
    <h2>User posts</h2>
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
        <th>Title</th>
        <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
        <tr key={post.id}>
          <td>{post.title}</td>
          <td>{post.completed ? 'Completed' : 'Not Completed'}</td>
        </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default UserInfoPage;