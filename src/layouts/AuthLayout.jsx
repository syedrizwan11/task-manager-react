import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import axios from "axios"
import { TOKEN_DECODE_API_URL } from "../constants"
import { FaUserCircle } from "react-icons/fa"
import UserProfilePopup from "../components/UserProfilePopup"

export const AuthLayout = () => {
  const { user, setUserData } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) return

    const fetchUserFromToken = async () => {
      try {
        const res = await axios.get(TOKEN_DECODE_API_URL, {
          withCredentials: true,
        })

        setUserData(res.data.data)
      } catch (error) {
        console.error("Failed to fetch user from token", error)
        navigate("/login")
      } finally {
        setLoading(false)
      }
    }
    fetchUserFromToken()
  }, [navigate, setUserData, user])
  if (loading) {
    return <div className="flex justify-center mt-[10%]">Loading...</div>
  }
  return (
    <>
      <UserProfilePopup />
      <Outlet />
    </>
  )
}
