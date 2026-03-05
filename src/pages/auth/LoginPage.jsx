import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import { gotoDashboard } from "../../utils/gotoDashboard"
import { loginApi } from "../../api/auth.api"

export const LoginPage = () => {
  const { setUserData, user } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await loginApi(formData)
      setUserData(res.data)
      window.alert("Logged in successfully!")
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
    if (!user) return
    gotoDashboard(user.role)
  }, [user])

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto m-10 space-y-4 p-4 rounded-lg shadow-md w-full max-w-md border border-gray-200"
    >
      <h2 className=" m-3 text-2xl font-bold text-center">Login</h2>

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

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p class="text-slate-600 text-sm text-center">
        Don't have an account yet?{" "}
        <Link to="/signup" class="text-blue-600 font-medium hover:underline">
          Register here
        </Link>
      </p>
    </form>
  )
}
