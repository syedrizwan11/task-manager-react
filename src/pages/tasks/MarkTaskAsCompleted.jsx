import axios from "axios"
import { TASK_COMPLETE_API_URL } from "../../constants"
import { useState } from "react"
import { ActionButton } from "../../components/ActionButton"
import { MdTaskAlt } from "react-icons/md"

export const MarkTaskAsCompleted = ({
  taskId,
  getUpdatedTaskData,
  disabled,
}) => {
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
    <ActionButton
      onClick={() => completeTask(taskId)}
      disabled={disabled || loading}
      icon={MdTaskAlt}
      bgColor="bg-green-600"
      textColor="text-white"
      label="Mark As Completed"
      className="enabled:hover:bg-green-700"
    />
  )
}
