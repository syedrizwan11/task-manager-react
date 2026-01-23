import { useEffect, useState } from "react"
import axios from "axios"
import { USER_API_URL, TASK_ASSIGN_API_URL } from "../../constants"
import { GrStatusGood } from "react-icons/gr"

export const AssignTask = ({ assignedTo, taskId, getUpdatedTaskData }) => {
  const [users, setUsers] = useState([])
  const [selectedEmail, setSelectedEmail] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await axios.get(USER_API_URL, {
          withCredentials: true,
        })
        setUsers(res.data.data)
      } catch (err) {
        console.error("Failed to fetch users:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    if (!users || !assignedTo) return

    const assignedUser = users.find((u) => u.email === assignedTo)
    if (!assignedUser) return
    setSelectedEmail(assignedUser.email)
  }, [assignedTo, users])

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
    setSelectedEmail(email)

    const user = users.find((u) => u.email === email)
    if (user) {
      assignTask(user._id)
    }
  }

  return (
    <div className="max-w-xs flex gap-4 items-center">
      <select
        value={selectedEmail}
        onChange={handleChange}
        className="block w-full py-2 text-center border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
