export interface User {
    id: number
    name: string
    email: string
    username: string
    address: {
        street: string;
        suite: string;
        city: string;
    };
  }
  
export async function fetchUsers(): Promise<User[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        return Promise.resolve(response.json())
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getUserInfo(userId: number): Promise<User> {
    if (typeof userId !== 'number') {
        throw new Error('Invalid userId. It must be a positive number.');
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.json();
}
