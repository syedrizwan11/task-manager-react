import { useEffect, useState } from "react"
import { Link } from "react-router"
import { BackButton } from "../../components/BackButton"
import { Loader } from "../../components/Loader"
import { MdDelete } from "react-icons/md"
import { ActionButton } from "../../components/ActionButton"
import { deleteUserApi, fetchUsersApi } from "../../api/user.api"
import { toast } from "sonner"

export const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchUsersApi()
        setUsers(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast.error(
          error?.response?.data?.error ||
            "An error occurred. Please try again.",
        )
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return

    try {
      toast.promise(deleteUserApi(id), {
        loading: "Deleting user...",
        success: "User deleted successfully!",
      })
      setUsers(users.filter((user) => user._id !== id))
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Error deleting user")
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <BackButton label="Dashboard" to="/admin-page" />
        <h1 className="text-2xl font-bold mr-15">Users</h1>
        <Link
          to={"/users/form"}
          className="bg-blue-900 text-white px-8 py-2 rounded-xl cursor-pointer  hover:bg-blue-600"
        >
          Add User
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-blue-900 text-white text-left">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <ActionButton
                      onClick={() => {
                        handleDelete(user._id)
                      }}
                      icon={MdDelete}
                      bgColor="bg-gray-200"
                      textColor="text-red-500"
                      border="border-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
