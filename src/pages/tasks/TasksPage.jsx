import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import axios from "axios"
import {
  TASKS_API_URL,
  TaskStatus,
  UPDATE_TASK_STATUS_API_URL,
  UserRole,
} from "../../constants"
import { Loader } from "../../components/Loader"
import { Link } from "react-router"
import { BackButton } from "../../components/BackButton"
import { TaskSection } from "./TaskSection"
import { DndContext } from "@dnd-kit/core"
import { taskGroupsByStatus } from "../../utils/tasks/taskGroupsByStatus"

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

  const updateTaskStatus = async (taskId, status) => {
    const task = tasks.find((t) => t._id === taskId)
    const prevTaskStatus = {
      status: task.status,
      completedAt: task.completedAt,
    }
    updateCurrentTask(taskId, { status })

    try {
      const res = await axios.patch(
        `${UPDATE_TASK_STATUS_API_URL.replace(":id", taskId)}`,
        {
          status,
        },
        { withCredentials: true },
      )

      updateCurrentTask(taskId, {
        status: res.data.data.status,
        completedAt: res.data.data.completedAt,
      })
    } catch (error) {
      updateCurrentTask(taskId, prevTaskStatus)
      console.error("Failed to update task status", error)
    }
  }

  const isAdmin = user.role === UserRole.ADMIN

  const taskGroups = taskGroupsByStatus(tasks)

  const handleDragEnd = async (event) => {
    const { active, over } = event

    if (over && active.data.current.type !== over.data.current.type)
      await updateTaskStatus(active.id, over.data.current.type)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
          <div className="grid grid-cols-3">
            <TaskSection
              title="Pending Tasks"
              type={TaskStatus.PENDING}
              tasks={taskGroups.pending}
              onDelete={deleteTask}
              onUpdate={updateCurrentTask}
            />

            <TaskSection
              title="In Progress Tasks"
              type={TaskStatus.INPROGRESS}
              tasks={taskGroups.inProgress}
              onDelete={deleteTask}
              onUpdate={updateCurrentTask}
            />

            <TaskSection
              title="Completed Tasks"
              type={TaskStatus.COMPLETED}
              tasks={taskGroups.completed}
              onDelete={deleteTask}
              onUpdate={updateCurrentTask}
            />
          </div>
        )}
      </div>
    </DndContext>
  )
}
