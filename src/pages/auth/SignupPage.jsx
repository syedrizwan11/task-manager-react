import axios from "axios"
import { useState } from "react"
import { SIGNUP_API_URL } from "../../constants"
import { Link, useNavigate } from "react-router"

export const SignupPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "password" || name === "confirmPassword") {
      if (
        (name === "password" && formData.confirmPassword !== value) ||
        (name === "confirmPassword" && formData.password !== value)
      ) {
        setError("Passwords do not match")
      } else {
        setError("")
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (error) return
    setLoading(true)

    try {
      const res = await axios.post(SIGNUP_API_URL, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      console.log(res)
      window.alert("Account created successfully!")
      navigate("/login")
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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto m-10 space-y-4 p-4 rounded-lg shadow-md w-full max-w-md border border-gray-200"
    >
      <h2 className=" m-3 text-2xl font-bold text-center">Create Account</h2>

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

      <div>
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter password"
        />
      </div>

      {error && <p className="text-red-500 -mt-3 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>

      <p class="text-slate-600 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" class="text-blue-600 font-medium hover:underline">
          Login here
        </Link>
      </p>
    </form>
  )
}
