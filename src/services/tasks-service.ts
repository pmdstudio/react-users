import { Tasks} from "../types";

  export async function fetchTasks(): Promise<Tasks> {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const data: Tasks = await response.json();
      
      return Promise.resolve(data);

    } catch (error) {
      return Promise.reject(error);
    }
  }