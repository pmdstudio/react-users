import { Post } from '../types';

export async function fetchPosts(userId: number): Promise<Post[]> {
  
  if (!userId || typeof userId !== 'number') {
    throw new Error('No userId provided. It must be a number.');
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const data: Post[] = await response.json();
    
    return Promise.resolve(data);

  } catch (error) {
    return Promise.reject(error);
  }
}