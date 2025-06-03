export type Task = {
    userId: number
    id: number
    title: string
    completed: boolean
}

export type Tasks = Task[];
export type TaskStatus = 'completed' | 'pending';

export type TaskFilter = {
    status: string;
    title: string;
    userId: number;
};