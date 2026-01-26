import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import axios from "axios"
import { TASKS_API_URL, UserRole } from "../../constants"
import { Loader } from "../../components/Loader"
import { Link } from "react-router"
import { BackButton } from "../../components/BackButton"
import { adminTaskGroups } from "./adminTaskGroups"
import { userTaskGroups } from "./userTaskGroups"
import { TaskSection } from "./TaskSection"

export const TasksPage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(TASKS_API_URL, {
        withCredentials: true,
      })
      setTasks(res.data.data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${TASKS_API_URL}/${taskId}`, {
        withCredentials: true,
      })
      setTasks((prev) => prev.filter((t) => t._id !== taskId))
    } catch {
      alert("Failed to delete task")
    }
  }

  const updateCurrentTask = (taskId, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, ...updatedFields } : t)),
    )
  }

  const isAdmin = user.role === UserRole.ADMIN

  const adminGroups = adminTaskGroups(tasks)
  const userGroups = userTaskGroups(tasks, user.id)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-8">
        {isAdmin && <BackButton label="Dashboard" to="/admin-page" />}
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Link
          to="/tasks/form"
          className="bg-blue-800 text-white px-8 py-2 rounded-full hover:bg-blue-700 text-xl"
        >
          + Create Task
        </Link>
      </div>

      {loading && <Loader />}

      {tasks.length === 0 && !loading && (
        <p className="text-gray-500 text-center">No tasks available</p>
      )}

      {!loading && tasks.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {isAdmin ? (
            <>
              <TaskSection
                title="Unassigned Tasks"
                tasks={adminGroups.unassigned}
                onDelete={deleteTask}
                onUpdate={updateCurrentTask}
              />

              <TaskSection
                title="Assigned Tasks"
                tasks={adminGroups.assigned}
                onDelete={deleteTask}
                onUpdate={updateCurrentTask}
              />

              <TaskSection
                title="Completed Tasks"
                tasks={adminGroups.completed}
                onDelete={deleteTask}
                onUpdate={updateCurrentTask}
              />
            </>
          ) : (
            <>
              <TaskSection
                title="Created by You"
                tasks={userGroups.createdByYou}
                onDelete={deleteTask}
                onUpdate={updateCurrentTask}
              />

              <TaskSection
                title="Assigned to You"
                tasks={userGroups.assignedToYou}
                onDelete={deleteTask}
                onUpdate={updateCurrentTask}
              />

              <TaskSection
                title="Completed Tasks"
                tasks={userGroups.completed}
                onDelete={deleteTask}
                onUpdate={updateCurrentTask}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}
