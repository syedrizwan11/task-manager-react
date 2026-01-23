import axios from "axios"
import { useEffect, useState } from "react"
import { TASKS_API_URL } from "../../constants"
import { Link, useLocation } from "react-router"
import { IoArrowBackCircleSharp } from "react-icons/io5"
import { BackButton } from "../../components/BackButton"

export const TaskFormPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const taskId = searchParams.get("taskId")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      taskId
        ? await axios.patch(
            `${TASKS_API_URL}/${taskId}`,
            {
              title: formData.title,
              description: formData.description,
              dueDate: formData.dueDate,
            },
            { withCredentials: true },
          )
        : await axios.post(
            TASKS_API_URL,
            {
              title: formData.title,
              description: formData.description,
              dueDate: formData.dueDate,
            },
            { withCredentials: true },
          )
      window.alert("Operation successful!")
      setFormData({
        title: "",
        description: "",
        dueDate: "",
      })
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        window.alert(err.response.data.error)
      } else {
        window.alert("An error occurred. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!taskId) return

    const fetchTaskData = async () => {
      try {
        const res = await axios.get(`${TASKS_API_URL}/${taskId}`, {
          withCredentials: true,
        })
        const task = res.data.data
        setFormData({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        })
      } catch (err) {
        console.error("Failed to fetch task data:", err)
      }
    }

    fetchTaskData()
  }, [taskId])

  return (
    <div className="mx-auto w-full max-w-md m-10">
      <BackButton label="Tasks" to="/tasks" />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 rounded-lg shadow-md border border-gray-200"
      >
        <h2 className=" m-3 text-2xl font-bold text-center">
          {taskId ? "Update Task" : "Create Task"}
        </h2>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full h-24 border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : taskId ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  )
}
