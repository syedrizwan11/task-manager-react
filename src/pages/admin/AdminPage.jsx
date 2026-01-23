import { useEffect, useState } from "react"
import axios from "axios"
import { TASK_COUNT_API_URL, USER_COUNT_API_URL } from "../../constants"
import { Link } from "react-router"
import { LuExternalLink } from "react-icons/lu"
import { Loader } from "../../components/Loader"

export const AdminPage = () => {
  const [count, setCount] = useState({ users: 0, tasks: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [usersRes, tasksRes] = await Promise.all([
          axios.get(USER_COUNT_API_URL, { withCredentials: true }),
          axios.get(TASK_COUNT_API_URL, { withCredentials: true }),
        ])

        setCount({
          users: usersRes.data.data,
          tasks: tasksRes.data.data,
        })
      } catch (error) {
        console.error("Failed to fetch admin counts", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-5 sm:max-w-lg w-full">
      <Link
        to="/tasks"
        className="relative flex-1 bg-yellow-500 text-white border rounded-lg p-6 shadow-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <LuExternalLink className=" text-2xl mb-1" />
        </div>
        <p className="text-3xl font-bold text-green-700">{count.tasks}</p>
      </Link>
      <Link
        to="/users"
        className="flex-1 bg-blue-800 text-white border rounded-lg p-6 shadow-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Users</h2>
          <LuExternalLink className=" text-2xl mb-1" />
        </div>
        <p className="text-3xl font-bold text-blue-200">{count.users}</p>
      </Link>
    </div>
  )
}
