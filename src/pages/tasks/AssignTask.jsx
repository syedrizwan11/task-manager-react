import { useContext } from "react"
import { UsersContext } from "../../context/users/usersContext"
import { assignTaskApi } from "../../api/tasks.api"
import { toast } from "sonner"

export const AssignTask = ({ assignedTo, taskId, getUpdatedTaskData }) => {
  const { users, loading } = useContext(UsersContext)

  const assignTask = async (userId) => {
    try {
      const res = await assignTaskApi(taskId, userId)

      if (res.success) {
        getUpdatedTaskData(taskId, { assignedTo: res.data.assignedTo })
      }
    } catch (error) {
      console.error("Failed to assign task", error)
      toast.error("An error occurred. Please try again.")
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
