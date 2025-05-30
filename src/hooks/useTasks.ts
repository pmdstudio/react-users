import { useState } from 'react'
import { fetchTasks, Task } from '../services'

export function useTasks() {
const [tasks, setTasks] = useState<Task[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

fetchTasks()
    .then(data => setTasks(data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false))

return { tasks, loading, error }
}
