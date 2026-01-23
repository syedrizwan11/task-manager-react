import axios from "axios"
import { TASK_COMPLETE_API_URL } from "../../constants"
import { useState } from "react"

export const MarkTaskAsCompleted = ({ taskId, getUpdatedTaskData }) => {
  const [loading, setLoading] = useState(false)

  const completeTask = async (id) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${TASK_COMPLETE_API_URL}`,
        { id },
        { withCredentials: true },
      )
      if (res.data.success) {
        const { completedAt, status } = res.data.data
        getUpdatedTaskData(taskId, { completedAt, status })
      }
    } catch (error) {
      console.error("Failed to complete task", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <button
      onClick={() => completeTask(taskId)}
      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
    >
      {loading ? "Marking Complete..." : "Mark Complete"}
    </button>
  )
}
