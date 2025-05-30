import { useState, useEffect } from 'react';
import { fetchPosts, Post } from '../services';
import { useParams } from 'react-router-dom';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);
  const { userId } = useParams();

  useEffect(() => {
    if (userId !== undefined && !isNaN(Number(userId))) {
      setLoadingPosts(true);
      fetchPosts(Number(userId))
        .then(data => setPosts(data))
        .catch(err => setErrorPosts(err.message))
        .finally(() => setLoadingPosts(false));
    } else {
      setLoadingPosts(false);
    }
  }, [userId]);

  return { posts, loadingPosts, errorPosts };
}