export interface Task {
    userId: number
    id: number
    title: string
    completed: boolean
  }

  export async function fetchTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const data: Task[] = await response.json();
      
      return Promise.resolve(data);

    } catch (error) {
      return Promise.reject(error);
    }
  }