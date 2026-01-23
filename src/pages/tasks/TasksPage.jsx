import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import axios from "axios"
import { TASKS_API_URL, UserRole } from "../../constants"
import { TaskCard } from "./TaskCard"
import { Loader } from "../../components/Loader"
import { Link } from "react-router"
import { BackButton } from "../../components/BackButton"

export const TasksPage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(TASKS_API_URL, { withCredentials: true })
      setTasks(res.data.data)
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${TASKS_API_URL}/${taskId}`, {
        withCredentials: true,
      })
      setTasks((prev) => prev.filter((task) => task._id !== taskId))
    } catch (error) {
      console.error(error)
      alert("Failed to delete task")
    }
  }

  const updateCurrentTask = (taskId, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, ...updatedFields } : task,
      ),
    )
  }

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          {user.role === UserRole.ADMIN && (
            <BackButton label="Dashboard" to="/admin-page" />
          )}
          <h2 className="text-2xl font-bold">All Tasks</h2>
          <Link
            to="/tasks/form"
            className="bg-blue-800 text-white px-8 py-2 rounded-full hover:bg-blue-700 text-xl"
          >
            + Create Task
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-4">
            {tasks.length === 0 && (
              <p className="text-gray-500 text-center">No tasks available</p>
            )}
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onUpdate={updateCurrentTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
