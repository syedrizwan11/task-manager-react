import { useContext } from "react"
import axios from "axios"
import { USER_API_URL, TASK_ASSIGN_API_URL } from "../../constants"
import { UsersContext } from "../../context/users/usersContext"

export const AssignTask = ({ assignedTo, taskId, getUpdatedTaskData }) => {
  const { users, loading } = useContext(UsersContext)

  const assignTask = async (userId) => {
    try {
      const res = await axios.post(
        TASK_ASSIGN_API_URL,
        {
          id: taskId,
          assignedTo: userId,
        },
        { withCredentials: true },
      )

      if (res.data.success) {
        getUpdatedTaskData(taskId, { assignedTo: res.data.data.assignedTo })
      }
    } catch (error) {
      console.error("Failed to assign task", error)
    }
  }

  const handleChange = (e) => {
    const email = e.target.value

    const user = users.find((u) => u.email === email)
    if (user) {
      assignTask(user._id)
    }
  }

  return (
    <div className="w-full flex gap-4 items-center">
      <select
        value={assignedTo || ""}
        onChange={handleChange}
        className="block w-full py-1.5 text-center border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option disabled value="">
          {loading ? "Loading..." : "Assign to"}
        </option>

        {users.map((user) => (
          <option key={user._id} value={user.email}>
            {user.email}
          </option>
        ))}
      </select>
    </div>
  )
}
