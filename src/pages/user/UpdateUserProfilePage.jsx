import { useEffect, useState } from "react"
import { UserRole } from "../../constants"
import { useAuth } from "../../hooks/useAuth"
import { BackButton } from "../../components/BackButton"
import { gotoDashboard } from "../../utils/gotoDashboard"
import { fetchCurrentUserApi, updateUserProfileApi } from "../../api/user.api"
import { toast } from "sonner"

export const UpdateUserProfilePage = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      await updateUserProfileApi(formData)
      gotoDashboard(user.role)
      toast.success("Profile updated successfully!")
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "An error occurred. Please try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetchCurrentUserApi()
        setFormData({
          name: res.data.name,
          email: res.data.email,
        })
      } catch (err) {
        console.error("Failed to fetch user data:", err)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="mx-auto w-full max-w-md m-10">
      <BackButton
        to={user.role === UserRole.ADMIN ? "/admin-page" : "/tasks"}
        label={user.role === UserRole.ADMIN ? "Dashboard" : "Tasks"}
      />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 mt-5 rounded-lg shadow-md border border-gray-200"
      >
        <h2 className=" m-3 text-2xl font-bold text-center">
          Update User Profile
        </h2>

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Update User Profile"}
        </button>
      </form>
    </div>
  )
}
