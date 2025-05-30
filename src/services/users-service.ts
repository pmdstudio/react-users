import { User } from '../types';
  
export async function fetchUsers(): Promise<User[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        return Promise.resolve(response.json())
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getUserInfo(userId: string): Promise<User> {
    if (userId === undefined) {
        throw new Error('Invalid userId');
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.json();
}
