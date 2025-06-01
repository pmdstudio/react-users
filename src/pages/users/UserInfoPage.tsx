import { useUserInfo, usePosts } from '../../hooks';
import React from 'react';
import UserInfo from './components/UserInfo';

const UserInfoPage: React.FC = () => {

    const { userInfo, loadingUserInfo, errorUserInfo } = useUserInfo();   
    const { posts, loadingPosts, errorPosts } = usePosts();

    if (loadingUserInfo || loadingPosts) return <p className="text-center mt-4">Loading ...</p>
    if (errorUserInfo || errorPosts) return <p className="text-danger text-center mt-4">Error: {errorUserInfo}</p>

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <UserInfo userData={userInfo} />
        </div>
      </div>
      <div className="row">
        <div className="col">
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
      </div>

    </div>
  )
}

export default UserInfoPage;