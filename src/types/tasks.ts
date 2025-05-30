export type Task = {
    userId: number
    id: number
    title: string
    completed: boolean
}

export type Tasks = Task[];
export type TaskStatus = 'completed' | 'pending';